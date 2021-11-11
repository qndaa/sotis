from django.contrib import admin
from .models import Section


class SectionsAdmin(admin.ModelAdmin):
    pass


admin.site.register(Section, SectionsAdmin)
