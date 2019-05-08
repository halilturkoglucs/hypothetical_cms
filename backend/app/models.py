from django.db import models
from django.contrib.auth.models import User


class Employer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company_name = models.CharField(name="company_name", max_length=60)

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    employer = models.ForeignKey(Employer, on_delete=models.PROTECT)