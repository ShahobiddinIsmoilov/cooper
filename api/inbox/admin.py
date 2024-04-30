from django.contrib import admin

from .models import Notification


class NotificationAdmin(admin.ModelAdmin):
    list_display = ('notification_type', 'receiver', 'sender', 'id')
    
    def notification_type(self, obj):
        if obj.type == 'comment_reply':
            return 'Comment reply'
        
        if obj.type == 'post_reply':
            return 'Post reply'
        
        return 'Other'

    fields = ('type',
              'receiver',
              'sender',
              'comment',
              'community',
              'created_at',
              'is_read')
    
    readonly_fields = ('type',
                       'receiver',
                       'sender',
                       'comment',
                       'community',
                       'created_at',
                       'is_read')


admin.site.register(Notification, NotificationAdmin)