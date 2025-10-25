from django.urls import path
from . import views

urlpatterns = [
    path('api/auth/login/', views.login, name='login'),
    path('api/auth/register/', views.register, name='register'),
    path('api/profile/', views.get_profile, name='profile'),
    path('api/users/', views.get_all_users, name='users'),
]