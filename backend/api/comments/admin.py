from django.contrib import admin
from .models import Comment, UpvoteComment, DownvoteComment


admin.site.register(Comment)
admin.site.register(UpvoteComment)
admin.site.register(DownvoteComment)