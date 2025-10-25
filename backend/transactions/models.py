from django.db import models
from catalog.models import BookCopy
from accounts.models import UserLogin

class BorrowRecord(models.Model):
    user = models.ForeignKey(UserLogin, on_delete=models.CASCADE)
    book_copy = models.ForeignKey(BookCopy, on_delete=models.CASCADE)
    borrow_date = models.DateField(auto_now_add=True)
    return_date = models.DateField(blank=True, null=True)
    due_date = models.DateField()
    fine_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    is_returned = models.BooleanField(default=False)

    class Meta:
        db_table = 'borrow_record'
        ordering = ['-borrow_date']

    def __str__(self):
        return f"{self.user.profile.first_name} - {self.book_copy.book.title}"

    def calculate_fine(self):
        if not self.is_returned and self.is_overdue():
            # Calculate fine based on days overdue
            from datetime import date
            days_overdue = (date.today() - self.due_date).days
            return max(0, days_overdue * 10.00)  # ₱10 per day
        return 0.00

    def is_overdue(self):
        from datetime import date
        return not self.is_returned and date.today() > self.due_date