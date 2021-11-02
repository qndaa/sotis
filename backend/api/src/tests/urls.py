from .views import TestViewSet
from rest_framework.routers import SimpleRouter

testsRouter = SimpleRouter()
testsRouter.register(r"tests", TestViewSet)
