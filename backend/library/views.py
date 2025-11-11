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
    if request.method == 'POST':
        data = json.loads(request.body)

        call_number = data.get("callNumber")
        ISBN = data.get("isbn")
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

        if not all([call_number, ISBN, title, author]):
            return JsonResponse({'status': 'failed', 'message': 'missing important fields'})
        
        if Books.objects.filter(ISBN=ISBN).exists():
            return JsonResponse({'status': 'failed', 'message': 'Book already exists'})
        
        Books.objects.create(
            call_number = call_number,
            ISBN = ISBN,
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
    
    return JsonResponse({'status' : 'failed', 'message': 'Invalid Request'}) 

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

