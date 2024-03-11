from django.db import models


class Community(models.Model):
    name = models.CharField(max_length=32, unique=True)
    description = models.TextField(max_length=1024)
    created_at = models.DateTimeField(auto_now_add=True)
    members = models.IntegerField(default=0, null=True)

    def __str__(self):
        return self.name