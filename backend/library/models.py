from django.db import models
from django.core.validators import RegexValidator, MinValueValidator
from django.utils import timezone
from accounts.models import UserProfile

#NOT FINISHED, PLS DON'T TEST :)

class StatusChoices(models.TextChoices):
    ACTIVE = 'active', 'Active'
    DUE = 'due', 'Due'
    OVERDUE = 'overdue', 'Overdue'
    PENDING = 'pending', 'Pending'

class BookCallnumberChoices(models.TextChoices):
    GENERAL_INFORMATION = '001', 'General Information'
    PHILOSOPHY_PSYCHOLOGY = '100', 'Philosophy & Psychology'
    RELIGION = '200', 'Religion'
    SOCIAL_SCIENCES = '300', 'Social Sciences'
    LANGUAGE = '400', 'Language'
    SCIENCE = '500', 'Science'
    TECHNOLOGY = '600', 'Technology'
    ARTS_RECREATION = '700', 'Arts & Recreation'
    LITERATURE = '800', 'Literature'
    HISTORY_GEOGRAPHY = '900', 'History & Geography'    

# Manages books
class Books(models.Model):
    call_number = models.CharField(
        primary_key=True,
        max_length=20,
        help_text='Eg... 300.J221 2019'
    )

    ISBN = models.CharField(
        max_length=13,
        blank=True,
        validators=[
            RegexValidator(
                regex=r'^(?:\d{10}|\d{13})$',
                message='ISBN must be either 10 or 13 digits'
            )
        ], 
        help_text='Enter 10 or 13 digit ISBN number'
    )

    book_title = models.CharField(
        max_length=200
        )
    
    edition = models.CharField(
        max_length=50,
        blank=True
    )

    book_author = models.CharField(
        max_length=100
    )

    publisher = models.CharField(
        max_length=100
    )

    year_published = models.PositiveIntegerField(
        validators=[
            MinValueValidator(1000) #if year is less than 1000, raise error
            ],
        help_text='Enter year in YYYY format'
    )

    pages = models.PositiveIntegerField(
        validators=[
            MinValueValidator(1) #at least 1 page
        ],
        help_text='Number of pages'
    )
    

    #Media
    book_cover_path = models.CharField(
        max_length=2048,
        blank=True,
        null=True,
        help_text='Path to book cover image'
    )


    class Meta:
        db_table = 'books'

    def __str__(self):
        return self.book_title
    
class BorrowRecords(models.Model):

    borrow_id = models.AutoField(
        primary_key=True
    )

    user_id = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE
    )

    call_number = models.ForeignKey(
        Books,
        on_delete=models.CASCADE
    )

    borrow_date = models.DateTimeField(
        default=timezone.localdate,
        editable=False
    )

    return_date = models.DateField(
        blank=True,
        null=True
    )

    due_date = models.DateField(
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=StatusChoices.choices,
        default=StatusChoices.ACTIVE,
    )

    def save(self, *args, **kwargs):
        if not self.pk:
            self.due_date = self.borrow_date + timezone.timedelta(days=7)
            super(BorrowRecords, self).save(*args, **kwargs)
