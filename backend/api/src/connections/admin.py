from django.contrib import admin
from .models import Connection, DomainConnection


class ConnectionsAdmin(admin.ModelAdmin):
    pass


class DomainConnectionsAdmin(admin.ModelAdmin):
    pass


admin.site.register(Connection, ConnectionsAdmin)
admin.site.register(DomainConnection, DomainConnectionsAdmin)
