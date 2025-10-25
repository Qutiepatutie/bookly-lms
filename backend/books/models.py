from django.db import models

# Create your models here.
class Book(models.Model):
    work_key = models.CharField(max_length=100, unique=True, primary_key=True)
    title = models.CharField(max_length=255)

    #limited to one author for simplicity, change as needed
    author = models.CharField(max_length=255)

    cover_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} by {self.author}"
