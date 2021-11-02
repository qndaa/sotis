from .views import QuestionViewSet
from rest_framework.routers import SimpleRouter

questionsRouter = SimpleRouter()
questionsRouter.register(r"questions", QuestionViewSet)
