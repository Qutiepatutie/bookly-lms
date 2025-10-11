from django.shortcuts import render
from django.http import JsonResponse
import requests

# Create your views here.

def getBooks(request):
    books = []

    generalSearch = request.GET.get("generalsearch", "") or request.GET.get("generalSearch", "") or ""
    category = request.GET.get("category", "")
    
    if generalSearch:
        resp = requests.get(f"http://openlibrary.org/search.json?q={generalSearch.replace(' ','+')}")
        data_key = "docs"
        
    elif category:
        resp = requests.get(f"http://openlibrary.org/subjects/{category}.json?limit=50")
        data_key = "works"

    for work in resp.json().get(data_key, []):
        title = work.get("title")

        if data_key =="docs":
            authors = [{"name" : n} for n in work.get("author_name", [])]
            cover_id = work.get("cover_i")

        else:
            authors = work.get("authors", [])
            cover_id = work.get("cover_id")

        if title and authors and len(authors) > 0:
            cover_url = f"https://covers.openlibrary.org/b/id/{cover_id}-L.jpg" if cover_id else None

            author = authors[0].get("name")

            books.append({
                "title" : title,
                "author" : author,
                "cover_url" : cover_url
            })

    return JsonResponse(books, safe=False)