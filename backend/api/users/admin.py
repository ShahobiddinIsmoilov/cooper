from django.contrib.auth.models import Group
from django.contrib import admin
from .models import User, Note


admin.site.register(User)
admin.site.register(Note)
admin.site.unregister(Group)