from django.urls import path
from . import views

urlpatterns =[
    path('addBook/', views.add_books, name='add_book'),
]