from django.contrib import admin
from .models import Question


class QuestionsAdmin(admin.ModelAdmin):
    pass


admin.site.register(Question, QuestionsAdmin)
