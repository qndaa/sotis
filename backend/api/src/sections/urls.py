from .views import SectionViewSet
from rest_framework.routers import SimpleRouter

sectionsRouter = SimpleRouter()
sectionsRouter.register(r"sections", SectionViewSet)
