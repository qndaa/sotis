from .views import TestHistoryViewSet
from rest_framework.routers import SimpleRouter

testHistoryRouter = SimpleRouter()
testHistoryRouter.register(r"test-history", TestHistoryViewSet)
