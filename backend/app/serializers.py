from rest_framework.serializers import ModelSerializer
from .models import Employee, Employer

class EmployerSerializer(ModelSerializer):
    class Meta:
        model = Employer
        fields = ('user', 'company_name')

class EmployeeSerializer(ModelSerializer):
    class Meta:
        model = Employee
        fields = ('user', 'employer')