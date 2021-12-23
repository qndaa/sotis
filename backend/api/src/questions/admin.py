from django.contrib import admin
from .models import Question, Domain


class QuestionsAdmin(admin.ModelAdmin):
    pass


class DomainsAdmin(admin.ModelAdmin):
    pass


admin.site.register(Question, QuestionsAdmin)
admin.site.register(Domain, DomainsAdmin)
