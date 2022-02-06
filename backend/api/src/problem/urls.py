from rest_framework.routers import SimpleRouter

from .views import ProblemViewSet

problems_router = SimpleRouter()
problems_router.register(r'problems', ProblemViewSet)