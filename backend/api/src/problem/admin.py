from django.contrib import admin
from django.contrib.admin import ModelAdmin

from .models import Problem


class ProblemAdmin(ModelAdmin):
    pass

admin.site.register(Problem, ProblemAdmin)