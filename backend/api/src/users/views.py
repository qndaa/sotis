from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView

from .filters import UsersFilter
from .models import User
from .serializers import CreateUserSerializer, UserSerializer, CustomTokenObtainPairSerializer
from rest_framework import mixins
from src.commons.auth.validations import validate_password


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializers = {
        "default": UserSerializer,
        "create": CreateUserSerializer,
    }
    permissions = {"default": (IsAuthenticatedOrReadOnly,), "create": (AllowAny,)}
    filterset_class = UsersFilter

    def get_serializer_class(self):
        return self.serializers.get(self.action, self.serializers["default"])

    def get_permissions(self):
        self.permission_classes = self.permissions.get(
            self.action, self.permissions["default"]
        )
        return super().get_permissions()

    def list(self, request):
        serializer_class = self.get_serializer_class()
        queryset = self.filter_queryset(self.get_queryset())
        serializer = serializer_class(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods={'GET'}, url_path=r"students")
    def get_students(self, request):
        # students = self.get_queryset().filter(is_superuser=False).filter(is_staff=False).filter(is_active=True)
        students = self.get_queryset().filter(is_active=True)
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(students, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            validate_password(request.data["password"])
        except Exception as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer.save()
            headers = self.get_success_headers(serializer.data)
            user = User(serializer.data)
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
                status=status.HTTP_201_CREATED,
                headers=headers,
            )


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
