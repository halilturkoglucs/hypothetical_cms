from rest_framework.serializers import ModelSerializer
from .models import Employee, Employer, CustomUser, Task

class UserSerializer(ModelSerializer):
    """ A serializer class for the User model """
    class Meta:
        # Specify the model we are using
        model = CustomUser
        # Specify the fields that should be made accessible.
        # Mostly it is all fields in that model
        fields = ('id', 'email', 'first_name', 'last_name',
                  'password', 'role')
        extra_kwargs = {
            'password': {'write_only': True}
        }

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
        fields = ('id', 'user', 'company_name')

    def to_representation(self, instance):
        self.fields['user'] = UserSerializer(read_only=False)
        return super(EmployerSerializer, self).to_representation(instance)


class EmployeeSerializer(ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'user', 'employer')

    def to_representation(self, instance):
        self.fields['user'] = UserSerializer(read_only=False)
        self.fields['employer'] = EmployerSerializer(read_only=False)
        return super(EmployeeSerializer, self).to_representation(instance)


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'employee', 'description', 'status')

    def to_representation(self, instance):
        self.fields['employee'] = EmployeeSerializer(read_only=False)
        return super(TaskSerializer, self).to_representation(instance)

