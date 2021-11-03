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
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter
from src.users.urls import usersRouter
from src.answers.urls import answersRouter
from src.questions.urls import questionsRouter
from src.sections.urls import sectionsRouter
from src.tests.urls import testsRouter
from src.test_history.urls import testHistoryRouter


router = DefaultRouter()
router.registry.extend(usersRouter.registry)
router.registry.extend(answersRouter.registry)
router.registry.extend(questionsRouter.registry)
router.registry.extend(testsRouter.registry)
router.registry.extend(sectionsRouter.registry)
router.registry.extend(testHistoryRouter.registry)
urls = []

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(router.urls)),
    path("api/v1/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/v1/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
] + urls
