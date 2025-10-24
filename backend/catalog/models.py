from django.db import models

#Manages what the library owns (Books, Book Copies, Tags)
class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=100, blank=True, null=True)
    publisher = models.CharField(max_length=100, blank=True, null=True)
    year_published = models.IntegerField(blank=True, null=True)
    isbn = models.CharField(max_length=20, unique=True)
    edition = models.CharField(max_length=50, blank=True, null=True)
    pages = models.IntegerField(blank=True, null=True)
    book_cover_path = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.title
    
class Tag(models.Model):
    tag_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.tag_name
    
class Status(models.Model):
    status_name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.status_name
    
    class Meta:
        verbose_name_plural = "Statuses"

class BookCopy(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    call_number = models.CharField(max_length=100, blank=True, null=True)
    date_acquired = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"{self.book.title} (Copy)"
    
    class Meta:
        verbose_name_plural = "Book Copies"

class BookTag(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.book.title} - {self.tag.tag_name}"