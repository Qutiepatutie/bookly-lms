from django.db import models
from django.conf import settings

#Manages user profiles linked to the built-in User model
class Gender(models.TextChoices):
    MALE = 'male', 'Male'
    FEMALE = 'female', 'Female'

class Role(models.TextChoices):
    STUDENT = 'student', 'Student'
    FACULTY = 'faculty', 'Faculty'
    ADMIN = 'admin', 'Admin'

class UserLogin(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=10, choices=Role.choices, default=Role.STUDENT)

    class Meta:
        db_table = 'user_login'

class UserProfile(models.Model):
    user = models.OneToOneField(UserLogin, on_delete=models.CASCADE, related_name='profile')
    
    first_name = models.CharField(max_length=100, blank=True)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True)
    sex = models.CharField(max_length=10, choices=Gender.choices, blank=True, null=True)
    student_number = models.CharField(max_length=13, unique=True)
    program = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        db_table = 'user_profile'