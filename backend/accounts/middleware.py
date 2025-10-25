from django.http import JsonResponse
from functools import wraps
import jwt
from django.conf import settings
from .models import UserLogin

def generate_token(user):
    """Generate JWT token for authenticated users"""
    payload = {
        'user_id': user.id,
        'email': user.email,
        'role': user.role
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

def token_required(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return JsonResponse({'error': 'No token provided'}, status=401)
        
        try:
            # Remove 'Bearer ' prefix if present
            if token.startswith('Bearer '):
                token = token[7:]
            
            # Decode token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            
            # Get user
            user = UserLogin.objects.get(id=payload['user_id'])
            request.user = user
            
            return view_func(request, *args, **kwargs)
            
        except jwt.ExpiredSignatureError:
            return JsonResponse({'error': 'Token has expired'}, status=401)
        except jwt.InvalidTokenError:
            return JsonResponse({'error': 'Invalid token'}, status=401)
        except UserLogin.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=401)
        
    return wrapper

def role_required(allowed_roles):
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            if not hasattr(request, 'user'):
                return JsonResponse({'error': 'Authentication required'}, status=401)
            
            if request.user.role not in allowed_roles:
                return JsonResponse({'error': 'Permission denied'}, status=403)
            
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator