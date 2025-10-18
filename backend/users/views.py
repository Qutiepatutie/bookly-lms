from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.utils.decorators import method_decorator
import json

from .models import UserLogin

@csrf_exempt  # disable CSRF for testing (use proper protection later)
def get_users(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        email = data.get('email')
        password = data.get('password')

        # Optional: query your Supabase table
        user_exists = UserLogin.objects.filter(email=email, password=password).exists()

        if user_exists:
            return JsonResponse({'status': 'success', 'message': 'User found!', 'user' : email})
        else:
            return JsonResponse({'status': 'failed', 'message': 'Invalid credentials'})

    return JsonResponse({'error': 'POST request required'})