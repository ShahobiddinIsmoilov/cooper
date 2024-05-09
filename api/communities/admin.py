from django.contrib import admin
from .models import Community, UserCommunity


class CommunityAdmin(admin.ModelAdmin):
    list_display = ("name", "members", "owner", "id")

    fields = (
        "name",
        "description",
        "rules",
        "avatar",
        "banner",
        "link",
        "members",
        "posts",
        "comments",
        "created_at",
        "owner",
    )

    readonly_fields = ("link", "members", "posts", "comments", "created_at", "owner")


admin.site.register(Community, CommunityAdmin)


class UserCommunityAdmin(admin.ModelAdmin):
    list_display = ("object_type", "user", "community", "id")

    def object_type(self, obj):
        return "User-community relationship"

    fields = ("user", "community", "id")

    readonly_fields = ("user", "community", "id")


admin.site.register(UserCommunity, UserCommunityAdmin)
