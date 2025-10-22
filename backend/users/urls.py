from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.get_users, name='get_users'),
    path('register/', views.register_user, name='register_user'),
]