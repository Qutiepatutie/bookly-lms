from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.utils.decorators import method_decorator
import json

from .models import UserLogin
from .models import UserInfos

@csrf_exempt  # disable CSRF for testing (use proper protection later)
def get_users(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        email = data.get('email')
        password = data.get('password')

        # Optional: query your Supabase table
        user_exists = UserLogin.objects.filter(email=email, password=password).exists()

        if user_exists:
            
            first_name = UserInfos.objects.get(user__email=email).first_name
            student_number = UserInfos.objects.get(user__email=email).student_number
            role = UserLogin.objects.get(email=email).role

            return JsonResponse({'status': 'success', 'user' : first_name, 'student_number' : student_number, 'role': role})
        else:
            return JsonResponse({'status': 'failed', 'message': 'Invalid credentials'})

    return JsonResponse({'error': 'POST request required'})

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        first_name = data.get('first_name')
        middle_name = data.get('middle_name')
        last_name = data.get('last_name')
        sex = data.get('sex')
        student_number = data.get('student_number')
        program = data.get('program')
        email = data.get('email')
        password = data.get('confirm_password')
        role = data.get('role')

        if not all([first_name, last_name, student_number, email, password]):
            return JsonResponse({'status': 'failed', 'message': 'Missing required fields'})

        if UserLogin.objects.filter(email=email).exists():
            return JsonResponse({'status': 'failed', 'message': 'User already exists'})
        
        if UserInfos.objects.filter(student_number=student_number).exists():
            return JsonResponse({'status': 'failed', 'message': 'Student Number Already Exists'})

        user_login = UserLogin.objects.create(
            email = email,
            password = password,
            role=role,
        )

        UserInfos.objects.create(
            user=user_login,
            first_name = first_name,
            middle_name = middle_name,
            last_name = last_name,
            sex = sex,
            student_number = student_number,
            program = program,
        )

        return JsonResponse({'status': 'success', 'message':'Registered Successfully'})
    return JsonResponse({'status': 'failed', 'message': 'invalid request'})