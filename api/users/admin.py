from django.contrib.auth.models import Group
from django.contrib import admin
from .models import User


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
admin.site.unregister(Group)
