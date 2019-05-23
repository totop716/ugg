from customauth.models import MyUser
from rest_framework import serializers
from home.models import CustomText, HomePage
from rest_framework.decorators import api_view

class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('id', 'first_name', 'last_name', 'phone','email', 'address', 'city', 'state', 'zipcode', 'check_time', 'tablet_id', 'po_box', 'unit_number', 'suite')
        extra_kwargs = {
            'first_name' : {
                'required': True
            },
            'last_name' : {
                'required': True
            },
            'address' : {
                'required': True
            },
            'phone': {
                'required':True
            },
        }

    def create(self, validated_data):
        user = MyUser.objects.create_user(
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            email=validated_data.get('email'),
            phone=validated_data.get('phone'),
            address=validated_data.get('address'),
            check_time=validated_data.get('check_time'),
            city=validated_data.get('city'),
            state=validated_data.get('state'),
            zipcode=validated_data.get('zipcode'),
            password='',
            tablet_id=validated_data.get('tablet_id'),
            po_box=validated_data.get('po_box'),
            unit_number=validated_data.get('unit_number'),
            suite=validated_data.get('suite')
        )
        user.save()
        return user

    def update(self, instance, validated_data):
        if validated_data.get('phone') != None:
            instance.phone = validated_data.get('phone')
        if validated_data.get('check_time') != None:
            instance.check_time = validated_data.get('check_time')
        if validated_data.get('tablet_id') != None:
            instance.tablet_id = validated_data.get('tablet_id')
        if validated_data.get('first_name') != None:
            instance.first_name = validated_data.get('first_name')
        if validated_data.get('last_name') != None:
            instance.last_name = validated_data.get('last_name')
        if validated_data.get('address') != None:
            instance.address = validated_data.get('address')
        if validated_data.get('city') != None:
            instance.city = validated_data.get('city')
        if validated_data.get('state') != None:
            instance.state = validated_data.get('state')
        if validated_data.get('zipcode') != None:
            instance.zipcode = validated_data.get('zipcode')
        if validated_data.get('po_box') != None:
            instance.po_box = validated_data.get('po_box')
        if validated_data.get('unit_number') != None:
            instance.unit_number = validated_data.get('unit_number')
        if validated_data.get('suite') != None:
            instance.suite = validated_data.get('suite')
        instance.save()
        return instance

class CustomTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomText
        fields = '__all__'

class HomePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomePage
        fields = '__all__'
