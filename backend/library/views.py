import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.utils import timezone

from .models import Books, BorrowRecords, UserProfile

def get_books(request):
    
    books = list(Books.objects.values())
    return JsonResponse(books, safe=False)

@csrf_exempt
def add_books(request):
    if request.method != 'POST':
        return JsonResponse({'status' : 'failed', 'message': 'Invalid Request method'}) 
    try:
        data = json.loads(request.body)

        call_number = data.get("callNumber")
        isbn = data.get("isbn")
        title = data.get("title")
        edition = data.get("edition")
        author = data.get("author")
        publisher = data.get("publisher")
        description = data.get("description")
        year_published = data.get("yearPublished")
        pages = data.get("pages")
        cover_path = data.get("coverURL")
        tags = data.get("tags")
        date_acquired = data.get("dateAcquired")
        
    except:
        return JsonResponse({"status":"error", "message":"Invalid JSON"})

    if not all([call_number, isbn, title, author]):
        return JsonResponse({'status': 'failed', 'message': 'missing important fields'})
    
    if Books.objects.filter(ISBN=isbn).exists():
        return JsonResponse({'status': 'failed', 'message': 'Book already exists!'})
    
    Books.objects.create(
        call_number = call_number,
        ISBN = isbn,
        title = title,
        edition = edition,
        author = author,
        publisher = publisher,
        description = description,
        year_published = year_published,
        pages = pages,
        cover_path = cover_path,
        tags = tags,
        date_acquired = date_acquired
    )

    return JsonResponse ({'status': 'success', 'message':'Book Successfully Added!'})

@csrf_exempt
def edit_book(request):
    if request.method != 'POST':
        return JsonResponse({"status":"error", "message":"Invalid request method"})
    
    try:
        data = json.loads(request.body)
    except:
        return JsonResponse({"status":"error", "message":"Invalid JSON"})
    
    isbn = data.get("ISBN")
    if not isbn:
        return JsonResponse({"status":"error", "message":"Missing ISBN"})
    
    try:
        book = Books.objects.get(ISBN=isbn)
    except Books.DoesNotExist:
        return JsonResponse({"status":"error", "message":"Book does not exist"})
    
    book.description = data.get("description", book.description)
    book.title = data.get("title", book.title)
    book.author = data.get("author", book.author)
    book.call_number = data.get("callNumber", book.call_number)
    book.pages = data.get("pages", book.pages)
    book.publisher = data.get("publisher", book.publisher)
    book.year_published = data.get("yearPublished", book.year_published)
    book.tags = data.get("tags", book.tags)

    book.save()

    return JsonResponse ({'status': 'success', 'message':'Book Successfully Edited!'})

def borrow_book(request):
    if request.method != 'POST':
        return JsonResponse({"status":"error", "message":"Invalid request method"})
    
    try:
        data = json.loads(request.body)
        student_number = data.get("student_number")
        call_number = data.get("call_number")
    except:
        return JsonResponse({"status":"error", "message":"Invalid JSON"})
    
    try:
        user = UserProfile.objects.get(student_number=student_number)
        book = Books.objects.get(call_number=call_number)

    except UserProfile.DoesNotExist:
        return JsonResponse({"status":"failed", "message":"User not found"})
    
    except Books.DoesNotExist:
        return JsonResponse({"status":"failed", "message":"Book not found"})
    
    if BorrowRecords.objects.filter(book=book).exists():
        return JsonResponse({"status":"failed", "message":"Book is already borrowed"})
    
    BorrowRecords.objects.create(
        borrow_date = timezone.now(),
        due_date = timezone.now().date() + timezone.timedelta(days=7),
        status = "Pending",
        user = user,
        book = book
    )

    return JsonResponse({"status":"success", "message":"Book successfully borrowed"})

""" def get_borrowed_books(request):
    if request.method != "POST":
        return JsonResponse({"status":"error", "message":"Invalid request method"})
    
    try:
        data = json.loads(request.body)
        student_number = data.get("student_number")
        user = UserProfile.objects.get(student_number=student_number)
        borrowed_books = BorrowRecords.objects.filter(user=user)

        books = []

        for book in borrowed_books:
            books.append({
                "cover_path": book.book.cover_path
            })

        return JsonResponse({"status":"success", "books":books})

    except UserProfile.DoesNotExist:
        return JsonResponse({"status":"failed", "message":"User does not exist"}) """

