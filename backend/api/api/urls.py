"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_swagger.views import get_swagger_view
from rest_framework.routers import DefaultRouter
from src.users.urls import usersRouter
from src.answers.urls import answersRouter
from src.questions.urls import questionsRouter
from src.sections.urls import sectionsRouter
from src.tests.urls import testsRouter
from src.test_history.urls import testHistoryRouter
from src.connections.urls import connectionsRouter
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from src.knowledge_spaces.urls import knowledge_space_router

from src.users.views import CustomTokenObtainPairView

schema_view = get_schema_view(
    openapi.Info(
        title="SOTIS API",
        default_version="v1",
        description="LMS",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

swagger_urlpatterns = [
    re_path(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    re_path(
        r"^swagger/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    re_path(
        r"^redoc/$", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"
    ),
]


router = DefaultRouter()
router.registry.extend(usersRouter.registry)
router.registry.extend(answersRouter.registry)
router.registry.extend(questionsRouter.registry)
router.registry.extend(testsRouter.registry)
router.registry.extend(sectionsRouter.registry)
router.registry.extend(testHistoryRouter.registry)
router.registry.extend(connectionsRouter.registry)
router.registry.extend(knowledge_space_router.registry)


swagger_docs_view = get_swagger_view(title="SOTIS Api")

urls = []

urlpatterns = (
    [
        path("admin/", admin.site.urls),
        path("api/v1/", include(router.urls)),
        path("api/v1/login/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
        path("api/v1/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    ]
    + urls
    + swagger_urlpatterns
)
