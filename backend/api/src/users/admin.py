from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin


class UsersAdmin(UserAdmin):
    list_display = ('email', 'is_staff', 'is_active',)
    list_filter = ('email', 'is_staff', 'is_active',)
    fieldsets = (
        (None, {'fields': (
        'email', 'password', 'first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'groups')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
            'email', 'password1', 'password2', 'is_staff', 'is_active', 'first_name', 'last_name')}
         ),
    )
    search_fields = ('email',)
    ordering = ('email',)


admin.site.register(User, UsersAdmin)
