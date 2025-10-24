from django.db import models
from django.conf import settings
from catalog.models import BookCopy

#Manages what the users do (Borrowing books)
class BorrowRecord(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    book_copy = models.ForeignKey(BookCopy, on_delete=models.CASCADE)
    borrow_date = models.DateField(auto_now_add=True)
    return_date = models.DateField(blank=True, null=True)
    due_date = models.DateField()

    def __str__(self):
        return f"{self.user.username} - {self.book_copy.book.title}"