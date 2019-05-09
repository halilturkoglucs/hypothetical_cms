from django.shortcuts import render

from rest_framework import viewsets, permissions, generics
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .models import Employee, Employer, CustomUser, Task
from .serializers import EmployeeSerializer, EmployerSerializer, UserSerializer, TaskSerializer

from django_filters.rest_framework import DjangoFilterBackend


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ['email']
    authentication_classes = (JSONWebTokenAuthentication,)
    # permission_classes = (permissions.IsAuthenticated,)


class EmployerViewSet(viewsets.ModelViewSet):
    queryset = Employer.objects.all()
    serializer_class = EmployerSerializer
    permission_classes = (permissions.AllowAny,)


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = (permissions.AllowAny,)


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = (DjangoFilterBackend,)
