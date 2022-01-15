from .views import CourseViewSet
from rest_framework.routers import SimpleRouter

courses_router = SimpleRouter()
courses_router.register(r"courses", CourseViewSet)
