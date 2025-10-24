from django.db import models
from django.conf import settings

#Manages user profiles linked to the built-in User model
class Gender(models.TextChoices):
    MALE = 'Male', 'male'
    FEMALE = 'Female', 'female'

class Role(models.TextChoices):
    USER = 'User', 'user'
    ADMIN = 'Admin', 'admin'
    SUPER_ADMIN = 'Super Admin', 'super_admin'

class Profile(models.Model):
    #Linking Profile to built-in User model
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    suffix = models.CharField(max_length=20, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=Gender.choices, blank=True, null=True)
    student_number = models.CharField(max_length=13, unique=True)
    course = models.CharField(max_length=100, blank=True, null=True)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.USER)

    def __str__(self):
        #Shows user's email in admin panel
        return f"{self.user.email}"