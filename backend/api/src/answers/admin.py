from django.contrib import admin
from .models import Answer


class AnswersAdmin(admin.ModelAdmin):
    pass


admin.site.register(Answer, AnswersAdmin)
