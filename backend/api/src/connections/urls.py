from .views import ConnectionViewSet
from rest_framework.routers import SimpleRouter

connectionsRouter = SimpleRouter()
connectionsRouter.register(r"connections", ConnectionViewSet)
