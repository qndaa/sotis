from .views import UserViewSet
from rest_framework.routers import SimpleRouter

usersRouter = SimpleRouter()
usersRouter.register(r"users", UserViewSet)
