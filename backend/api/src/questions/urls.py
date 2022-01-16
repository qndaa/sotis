from .views import QuestionViewSet, DomainViewSet
from rest_framework.routers import SimpleRouter

questionsRouter = SimpleRouter()
questionsRouter.register(r"questions", QuestionViewSet)
questionsRouter.register(r"domains", DomainViewSet)
