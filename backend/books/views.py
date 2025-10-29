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
        key = work.get("key", "")
        workKey = key.split("/")[2] if "/" in key else key

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
                "cover_url" : cover_url,
                "work_key" : workKey
            })

    return JsonResponse(books, safe=False)

def viewBook(request):
    info = []

    work_key = request.GET.get("work_key")
    if not work_key:
        return JsonResponse({"error" : "Missing work key"})
    

    resp = requests.get(f"https://openlibrary.org/works/{work_key}/editions.json")
    data = resp.json()
    entries = data.get("entries", [])

    if not entries:
        return JsonResponse({"error" : "Failed to fetch editions"})
    

    edition_key = data["entries"][0]["key"]
    edition_data = requests.get(f"https://openlibrary.org{edition_key}.json").json()

    info.append({
        "description" : (edition_data.get("description", {}).get("value")
            if isinstance(edition_data.get("description"), dict)
            else edition_data.get("description", "No description available")),
        "isbn10" : edition_data.get("isbn_10") or [],
        "isbn13" : edition_data.get("isbn_13") or [],
        "pages": edition_data.get("number_of_pages", "Unknown"),
        "publisher": edition_data.get("publishers", ["Unknown"])[0],
        "year_published": edition_data.get("publish_date", "Unknown"),
        "genres": edition_data.get("subjects", []),
    })
    
    return JsonResponse(info, safe=False)


   


