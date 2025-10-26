from django.db import models
from django.core.validators import RegexValidator, MinValueValidator
from django.utils import timezone

#NOT FINISHED, PLS DON'T TEST :)

class BookStatus(models.TextChoices):
    ACTIVE = 'active', 'Active'
    DUE = 'due', 'Due'
    OVERDUE = 'overdue', 'Overdue'
    PENDING = 'pending', 'Pending'

class BookCallnumberCategory(models.TextChoices):
    GENERAL_IFORMATION = '001-099', 'General Information'
    PHILOSOPHY_PSYCHOLOGY = '100-199', 'Philosophy & Psychology'
    RELIGION = '200-299', 'Religion'
    SOCIAL_SCIENCES = '300-399', 'Social Sciences'
    LANGUAGE = '400-499', 'Language'
    SCIENCE = '500-599', 'Science'
    TECHNOLOGY = '600-699', 'Technology'
    ARTS_RECREATION = '700-799', 'Arts & Recreation'
    LITERATURE = '800-899', 'Literature'
    HISTORY_GEOGRAPHY = '900-999', 'History & Geography'    

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
                regex='^(?:\d{10}|\d{13})$',
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
    
    #MetaData
    date_aquired = models.DateField(
        default=timezone.now,
        help_text='Date book was acquired'
    )
#   updated_at (If admin decides to update book info)
    
    #Media
    book_cover_path = models.ImageField(
        upload_to='books_covers/',
        blank=True,
        null=True,
        help_text='Path book cover image'
    )


    class Meta:
        db_table = 'books'

    def __str__(self):
        return self.book_title
    
class Staus(models.Model):

    status = models.CharField(
        max_length=20,
        choices=BookStatus.choices,
        default=BookStatus.ACTIVE,
    )