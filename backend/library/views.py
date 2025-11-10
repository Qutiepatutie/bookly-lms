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
        
        if Books.objects.filter(ISBN=ISBN, call_number=call_number).exists():
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

def get_books(request):
    
    books = list(Books.objects.values())
    return JsonResponse(books, safe=False)
