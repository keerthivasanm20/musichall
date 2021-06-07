from django.db import models

# Create your models here.
class HallDetails(models.Model):
       host=models.CharField(max_length=50)
       Name=models.CharField(max_length=50)
       No_of_Users=models.IntegerField()
       No_change_music=models.IntegerField()
       HallName=models.CharField(max_length=50)
       number=models.IntegerField()
#model to store the acces token from user 
class SpotifyToken(models.Model):
       user=models.CharField(max_length=50,unique=True)
       created_at=models.DateTimeField(auto_now_add=True)
       refresh_token=models.CharField(max_length=255)
       access_token=models.CharField(max_length=255)
       expires_in=models.DateTimeField()
      