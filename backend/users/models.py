from django.db import models

# Create your models here.
class UserLogin(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=10 ,default='student')

    class Meta:
        db_table = 'user_login'

class UserInfos(models.Model):
    user = models.ForeignKey(UserLogin, on_delete=models.CASCADE, related_name='infos')
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100)
    sex = models.CharField(max_length=6)
    student_number = models.CharField(max_length=11, unique=True)
    program = models.CharField(max_length=100, null=True)

    class Meta:
        db_table = 'user_infos'
