from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

from .models import Books

@csrf_exempt
def add_books(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        call_number = data.get("callNumber")
        ISBN = data.get("isbn")
        book_title = data.get("title")
        edition = data.get("edition")
        book_author = data.get("author")
        publisher = data.get("publisher")
        year_published = data.get("yearPublished")
        pages = data.get("pages")
        book_cover_path = data.get("coverURL")
        tags = data.get("tags")
        date_acquired = data.get("dateAcquired")

        if not all([call_number, ISBN, book_title, book_author]):
            return JsonResponse({'status': 'failed', 'message': 'missing important fields'})
        
        if Books.objects.filter(ISBN=ISBN, call_number=call_number).exists():
            return JsonResponse({'status': 'failed', 'message': 'Book already exists'})
        
        Books.objects.create(
            call_number = call_number,
            ISBN = ISBN,
            book_title = book_title,
            edition = edition,
            book_author = book_author,
            publisher = publisher,
            year_published = year_published,
            pages = pages,
            book_cover_path = book_cover_path,
            tags = tags,
            date_acquired = date_acquired
        )

        return JsonResponse ({'status': 'success', 'message':'Book Successfully Added!'})
    
    return JsonResponse({'status' : 'failed', 'message': 'Invalid Request'}) 
