from django.contrib import admin
from django.contrib.admin import ModelAdmin

from .models import Course


class CourseAdmin(ModelAdmin):
    pass


admin.site.register(Course, CourseAdmin)
