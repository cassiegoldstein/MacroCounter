from django.db import models

class macros(models.Model):
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    weight = models.IntegerField()
    gender = models.CharField(max_length=6)
    lifestyle = models.CharField(max_length=9)
    password = models.CharField(max_length=99)