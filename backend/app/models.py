from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    role = models.CharField(name="role", max_length=500, default='USER')
    first_name = models.CharField(name="first_name", max_length=500, default='')
    last_name = models.CharField(name="last_name", max_length=500, default='')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Employer(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                             related_name='employer_info')
    company_name = models.CharField(name="company_name", max_length=500)


class Employee(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                             related_name='employment_info')
    employer = models.ForeignKey(Employer, on_delete=models.PROTECT,
                                 related_name='employees')


class Task(models.Model):
    description = models.CharField(name="description", max_length=500)
    employee = models.ForeignKey(Employee, on_delete=models.PROTECT,
                                 related_name='tasks')
    status = models.CharField(name="status", max_length=500, default='TODO')
