from django.contrib.auth.models import Group
from django.contrib import admin
from .models import User, Code


class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "display_name", "phone_number", "id")

    fields = (
        "username",
        "display_name",
        "phone_number",
        "id",
        "created_at",
        "votes",
        "avatar",
        "telegram",
        "instagram",
        "facebook",
        "twitter",
        "is_verified",
        "is_active",
        "is_warned",
        "is_banned",
        "is_staff",
        "is_superuser",
    )

    readonly_fields = ("username", "id", "phone_number", "votes", "created_at")

admin.site.register(User, UserAdmin)


class CodeAdmin(admin.ModelAdmin):
    list_display = ("object_type", "phone", "code", "id")
    
    def object_type(self, obj):
        return "Authentication code"
    
    fields = ("phone", "code", "id")
    
    readonly_fields = ("phone", "code", "id")
    
admin.site.register(Code, CodeAdmin)

admin.site.unregister(Group)
