from django.contrib import admin
from .models import TestHistory


class TestHistoryAdmin(admin.ModelAdmin):
    pass


admin.site.register(TestHistory, TestHistoryAdmin)
