from django.shortcuts import render

from rest_framework import viewsets, permissions
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .models import Employee, Employer
from django.contrib.auth.models import User
from .serializers import EmployeeSerializer, EmployerSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)
    # authentication_classes = (JSONWebTokenAuthentication,)
    # permission_classes = (permissions.IsAuthenticated,)


class EmployerViewSet(viewsets.ModelViewSet):
    queryset = Employer.objects.all()
    serializer_class = EmployerSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
