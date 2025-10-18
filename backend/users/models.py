from django.db import models

# Create your models here.
class UserLogin(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    class Meta:
        db_table = 'user_login'
        managed = False
