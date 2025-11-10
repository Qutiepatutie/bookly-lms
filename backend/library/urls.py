from django.urls import path
from . import views

urlpatterns =[
    path('addBook/', views.add_books, name='add_book'),
    path('getBooks/', views.get_books, name='get_books'),
]