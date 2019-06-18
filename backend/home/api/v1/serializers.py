from customauth.models import MyUser
from rest_framework import serializers
from home.models import CustomText, HomePage, Sweepstakes, Tablet, SweepWinner, SweepUser, Settings, SweepCheckIn
from rest_framework.decorators import api_view
import base64

class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('id', 'first_name', 'last_name', 'phone','email', 'address', 'city', 'state', 'zipcode', 'check_time', 'po_box_unit_number', 'suite', 'label', 'password')
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
            password=validated_data.get('password'),
            po_box_unit_number=validated_data.get('po_box_unit_number'),
            suite=validated_data.get('suite'),
            label= validated_data.get('label')
        )
        user.save()
        return user

    def update(self, instance, validated_data):
        if validated_data.get('phone') != None:
            instance.phone = validated_data.get('phone')
        if validated_data.get('check_time') != None:
            instance.check_time = validated_data.get('check_time')
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
        if validated_data.get('po_box_unit_number') != None:
            instance.po_box_unit_number = validated_data.get('po_box_unit_number')
        if validated_data.get('suite') != None:
            instance.suite = validated_data.get('suite')
        if validated_data.get('password') != None:
            instance.setPassword(validated_data.get('password'))
        instance.save()
        return instance

class SweepUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SweepUser
        fields = ('id', 'first_name', 'last_name', 'phone','email', 'address', 'city', 'state', 'zipcode', 'check_time', 'po_box_unit_number', 'suite', 'label', 'password')
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
        user = SweepUser.objects.create(
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            email=validated_data.get('email'),
            phone=validated_data.get('phone'),
            address=validated_data.get('address'),
            check_time=validated_data.get('check_time'),
            city=validated_data.get('city'),
            state=validated_data.get('state'),
            zipcode=validated_data.get('zipcode'),
            password=validated_data.get('password'),
            po_box_unit_number=validated_data.get('po_box_unit_number'),
            suite=validated_data.get('suite'),
            label= validated_data.get('label')
        )
        user.save()
        return user

    def update(self, instance, validated_data):
        if validated_data.get('phone') != None:
            instance.phone = validated_data.get('phone')
        if validated_data.get('check_time') != None:
            instance.check_time = validated_data.get('check_time')
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
        if validated_data.get('po_box_unit_number') != None:
            instance.po_box_unit_number = validated_data.get('po_box_unit_number')
        if validated_data.get('suite') != None:
            instance.suite = validated_data.get('suite')
        if validated_data.get('password') != None:
            instance.setPassword(validated_data.get('password'))
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

class SweepCheckInSerializer(serializers.ModelSerializer):
    class Meta:
        model = SweepCheckIn
        fields = '__all__'

    def create(self, validated_data):
        tablet = SweepCheckIn.objects.create(
            user_id=validated_data.get('user_id_id'),
            sweep_id=validated_data.get('sweep_id_id'),
            tablet_id=validated_data.get('tablet_id_id'),
            check_time=validated_data.get('check_time'))
        tablet.save()
        return tablet

    def update(self, instance, validated_data):
        if validated_data.get('user_id_id') != None:
            instance.user_id_id = validated_data.get('user_id_id')
        if validated_data.get('sweep_id_id') != None:
            instance.sweep_id_id = validated_data.get('sweep_id_id')
        if validated_data.get('tablet_id_id') != None:
            instance.tablet_id_id = validated_data.get('tablet_id_id')
        if validated_data.get('check_time') != None:
            instance.check_time = validated_data.get('check_time')
        instance.save()
        return instance

class SweepstakesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sweepstakes
        fields = '__all__'

class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Settings
        fields = '__all__'

    def create(self, validated_data):
        settings = Settings.objects.create(
            name=validated_data.get('device_code')
            )
        settings.save()
        return settings

    def update(self, instance, validated_data):
        if validated_data.get('device_code') != None:
            instance.device_code = validated_data.get('device_code')
        instance.save()
        return instance

class TabletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tablet
        fields = '__all__'

    def create(self, validated_data):
        tablet = Tablet.objects.create(
            name=validated_data.get('name'),
            address=validated_data.get('address'),
            city=validated_data.get('city'),
            state=validated_data.get('state'),
            zipcode=validated_data.get('zipcode'),
            sweep_ids=validated_data.get('sweep_ids'),
            user_id_id=int(validated_data.get('user_id_id')),
            tablet_id_code=validated_data.get('tablet_id_code'),
            active_sweep=validated_data.get('active_sweep'))
        tablet.save()
        return tablet

    def update(self, instance, validated_data):
        if validated_data.get('name') != None:
            instance.name = validated_data.get('name')
        if validated_data.get('address') != None:
            instance.address = validated_data.get('address')
        if validated_data.get('city') != None:
            instance.city = validated_data.get('city')
        if validated_data.get('state') != None:
            instance.state = validated_data.get('state')
        if validated_data.get('zipcode') != None:
            instance.zipcode = validated_data.get('zipcode')
        if validated_data.get('sweep_ids') != None:
            instance.sweep_ids = validated_data.get('sweep_ids')
        if validated_data.get('active_sweep') != None:
            instance.active_sweep = validated_data.get('active_sweep')
        if validated_data.get('user_id_id') != None:
            instance.user_id = validated_data.get('user_id_id')
        if validated_data.get('tablet_id_code') != None:
            instance.tablet_id_code = validated_data.get('tablet_id_code')
        instance.save()
        return instance

class SweepwinnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SweepWinner
        fields = '__all__'

    def create(self, validated_data):
        tablet = SweepWinner.objects.create(
            windate=validated_data.get('windate'),
            sweep_id_id=validated_data.get('sweep_id_id'),
            tablet_id_id=validated_data.get('tablet_id_id'),
            checkIn_id_id=validated_data.get('checkIn_id_id'))
        tablet.save()
        return tablet

