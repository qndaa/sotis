from .views import AnswerViewSet
from rest_framework.routers import SimpleRouter

answersRouter = SimpleRouter()
answersRouter.register(r"answers", AnswerViewSet)
