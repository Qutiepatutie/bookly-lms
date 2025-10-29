from django.urls import path
from . import views

urlpatterns =[
    path('books/', views.getBooks, name='getBooks'),
    path('viewBook/', views.viewBook, name='view_book'),
]