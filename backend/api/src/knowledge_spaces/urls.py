from .views import KnowledgeSpaceViewSet
from rest_framework.routers import SimpleRouter

knowledge_space_router = SimpleRouter()
knowledge_space_router.register(r"knowledge-spaces", KnowledgeSpaceViewSet)
