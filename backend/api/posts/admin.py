from django.contrib import admin
from .models import Post, UpvotePost, DownvotePost, SavePost


admin.site.register(Post)
admin.site.register(UpvotePost)
admin.site.register(SavePost)
admin.site.register(DownvotePost)