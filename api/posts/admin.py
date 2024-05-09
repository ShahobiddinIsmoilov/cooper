from django.contrib import admin
from .models import Post, UpvotePost, DownvotePost, SavePost


class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "type", "community", "user", "id")

    fields = (
        "type",
        "title",
        "body",
        "image",
        "link",
        "community",
        "user",
        "id",
        "created_at",
        "updated_at",
        "visits",
        "upvotes",
        "downvotes",
        "comments",
        "votes",
        "ratio",
        "score",
    )

    readonly_fields = (
        "type",
        "title",
        "body",
        "image",
        "link",
        "community",
        "user",
        "id",
        "created_at",
        "updated_at",
        "visits",
        "upvotes",
        "downvotes",
        "comments",
        "votes",
        "ratio",
        "score",
    )


admin.site.register(Post, PostAdmin)


class UpvotePostAdmin(admin.ModelAdmin):
    list_display = ("object_type", "user", "post_id", "id")

    def object_type(self, obj):
        return "Post upvote"

    fields = ("user", "post", "id")

    readonly_fields = ("user", "post", "id")


admin.site.register(UpvotePost, UpvotePostAdmin)


class DownvotePostAdmin(admin.ModelAdmin):
    list_display = ("object_type", "user", "post_id", "id")

    def object_type(self, obj):
        return "Post downvote"

    fields = ("user", "post", "id")

    readonly_fields = ("user", "post", "id")


admin.site.register(DownvotePost, DownvotePostAdmin)


class SavePostAdmin(admin.ModelAdmin):
    list_display = ("object_type", "user", "post_id", "id")

    def object_type(self, obj):
        return "Post save"

    fields = ("user", "post", "id")

    readonly_fields = ("user", "post", "id")


admin.site.register(SavePost, SavePostAdmin)
