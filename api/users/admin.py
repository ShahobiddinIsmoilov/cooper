from datetime import datetime
from django.contrib import admin
from django.contrib.auth.models import Group

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
    list_display = ("code_type", "status", "phone", "code", "id")
    
    def code_type(self, obj):
        if obj.type == "register":
            return "Account registration"
        if obj.type == "restore":
            return "Password restoration"
        return "Phone number change"
    
    def status(self, obj):
        created_at = obj.created_at.timestamp()
        now = datetime.now().timestamp()
        passed_seconds = now - created_at
        if passed_seconds > 60:
            return "Expired"
        return "Active"
    
    fields = ("phone", "code", "id")
    
    readonly_fields = ("phone", "code", "id")
    
admin.site.register(Code, CodeAdmin)

admin.site.unregister(Group)
