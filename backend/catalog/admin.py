from django.contrib import admin
from .models import Book, Tag, Status, BookCopy, BookTag

# Register your models here.
admin.site.register(Book)
admin.site.register(Tag)
admin.site.register(Status)
admin.site.register(BookCopy)
admin.site.register(BookTag)