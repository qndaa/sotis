from .views import ConnectionViewSet, DomainConnectionViewSet
from rest_framework.routers import SimpleRouter

connectionsRouter = SimpleRouter()
connectionsRouter.register(r"connections", ConnectionViewSet)
connectionsRouter.register(r"domain-connections", DomainConnectionViewSet)
