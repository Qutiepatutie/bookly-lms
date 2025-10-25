from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.db import transaction
import json
import re

from .models import UserLogin, UserProfile
from .middleware import generate_token, token_required, role_required

def validate_password(password):
    """Validate password strength"""
    if len(password) < 8:
        return False
    if not re.search("[a-z]", password):
        return False
    if not re.search("[A-Z]", password):
        return False
    if not re.search("[0-9]", password):
        return False
    return True

def login(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST request required'}, status=405)

    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return JsonResponse({'status': 'failed', 'message': 'Email and password required'}, status=400)

        try:
            user = UserLogin.objects.get(email=email)
        except UserLogin.DoesNotExist:
            return JsonResponse({'status': 'failed', 'message': 'Invalid credentials'}, status=401)
        
        if not check_password(password, user.password):
            return JsonResponse({'status': 'failed', 'message': 'Invalid credentials'}, status=401)
        
        try:
            profile = user.profile
        except UserProfile.DoesNotExist:
            return JsonResponse({'status': 'failed', 'message': 'User profile not found'}, status=404)

        # Generate token
        token = generate_token(user)

        return JsonResponse({
            'status': 'success',
            'token': token,
            'user': {
                'name': profile.first_name,
                'student_number': profile.student_number,
                'role': user.role
            }
        })
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def register(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST request required'}, status=405)

    try:
        data = json.loads(request.body)

        # Required fields validation
        required_fields = ['first_name', 'last_name', 'student_number', 'email', 'confirm_password']
        for field in required_fields:
            if not data.get(field):
                return JsonResponse({
                    'status': 'failed', 
                    'message': f'Missing required field: {field}'
                }, status=400)

        # Email validation
        try:
            validate_email(data['email'])
        except ValidationError:
            return JsonResponse({
                'status': 'failed', 
                'message': 'Invalid email format'
            }, status=400)

        # Password strength validation
        if not validate_password(data['confirm_password']):
            return JsonResponse({
                'status': 'failed',
                'message': 'Password must be at least 8 characters and contain uppercase, lowercase, and numbers'
            }, status=400)

        # Check existing users
        if UserLogin.objects.filter(email=data['email']).exists():
            return JsonResponse({
                'status': 'failed', 
                'message': 'Email already registered'
            }, status=400)
        
        if UserProfile.objects.filter(student_number=data['student_number']).exists():
            return JsonResponse({
                'status': 'failed', 
                'message': 'Student number already exists'
            }, status=400)

        # Create user and profile in a transaction
        with transaction.atomic():
            user_login = UserLogin.objects.create(
                email=data['email'],
                password=make_password(data['confirm_password']),
                role=data.get('role', 'student'),
            )

            UserProfile.objects.create(
                user=user_login,
                first_name=data['first_name'],
                middle_name=data.get('middle_name', ''),
                last_name=data['last_name'],
                sex=data.get('sex', ''),
                student_number=data['student_number'],
                program=data.get('program', ''),
            )

        return JsonResponse({
            'status': 'success', 
            'message': 'Registration successful'
        })

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@token_required
def get_profile(request):
    """Get user profile information"""
    try:
        profile = request.user.profile
        return JsonResponse({
            'status': 'success',
            'profile': {
                'first_name': profile.first_name,
                'middle_name': profile.middle_name,
                'last_name': profile.last_name,
                'email': request.user.email,
                'student_number': profile.student_number,
                'program': profile.program,
                'role': request.user.role
            }
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@token_required
@role_required(['admin'])
def get_all_users(request):
    """Admin only: Get all users"""
    try:
        users = UserProfile.objects.select_related('user').all()
        user_list = [{
            'id': user.user.id,
            'email': user.user.email,
            'name': f"{user.first_name} {user.last_name}",
            'student_number': user.student_number,
            'role': user.user.role
        } for user in users]
        
        return JsonResponse({
            'status': 'success',
            'users': user_list
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)