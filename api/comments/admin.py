from django.contrib import admin

from .models import Comment, UpvoteComment, DownvoteComment


class CommentAdmin(admin.ModelAdmin):
    list_display = ("body", "post_id", "community", "user", "id")
    
    fields = (
        "body_text",
        "body",
        "parent",
        "post",
        "community",
        "user",
        "id",
        "created_at",
        "edited",
        "edited_at",
        "upvotes",
        "downvotes",
        "votes",
        "ratio",
        "deleted",
    )

    readonly_fields = (
        "user",
        "post",
        "community",
        "parent",
        "body_text",
        "body",
        "id",
        "created_at",
        "edited",
        "edited_at",
        "upvotes",
        "downvotes",
        "votes",
        "ratio",
    )


admin.site.register(Comment, CommentAdmin)


class UpvoteCommentAdmin(admin.ModelAdmin):
    list_display = ("object_type", "user", "comment_id", "id")

    def object_type(self, obj):
        return "Comment upvote"

    fields = ("user", "comment", "id")

    readonly_fields = ("user", "comment", "id")


admin.site.register(UpvoteComment, UpvoteCommentAdmin)


class DownvoteCommentAdmin(admin.ModelAdmin):
    list_display = ("object_type", "user", "comment_id", "id")

    def object_type(self, obj):
        return "Comment downvote"

    fields = ("user", "comment", "id")

    readonly_fields = ("user", "comment", "id")


admin.site.register(DownvoteComment, DownvoteCommentAdmin)
