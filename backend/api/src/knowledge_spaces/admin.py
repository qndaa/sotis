from django.contrib import admin
from .models import KnowledgeSpace


class KnowledgeSpaceAdmin(admin.ModelAdmin):
    pass


admin.site.register(KnowledgeSpace, KnowledgeSpaceAdmin)
