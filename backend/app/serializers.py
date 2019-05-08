from rest_framework.serializers import ModelSerializer
from .models import Employee, Employer, CustomUser

class UserSerializer(ModelSerializer):
    """ A serializer class for the User model """
    class Meta:
        # Specify the model we are using
        model = CustomUser
        # Specify the fields that should be made accessible.
        # Mostly it is all fields in that model
        fields = ('id', 'email', 'first_name', 'last_name',
                  'password', 'role')

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        is_active = validated_data.pop('is_active', True)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance

class EmployerSerializer(ModelSerializer):
    class Meta:
        model = Employer
        fields = ('user', 'company_name')

class EmployeeSerializer(ModelSerializer):
    class Meta:
        model = Employee
        fields = ('user', 'employer')