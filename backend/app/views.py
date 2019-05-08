from django.shortcuts import render

from rest_framework import viewsets

from .models import Employee, Employer
from .serializers import EmployeeSerializer, EmployerSerializer


class EmployerViewSet(viewsets.ModelViewSet):
    queryset = Employer.objects.all()
    serializer_class = EmployerSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
