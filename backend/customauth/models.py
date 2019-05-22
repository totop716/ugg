from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

# Create your models here.

class MyUserManager(BaseUserManager):
    def create_user(self, first_name, last_name, email, phone, address, city, state, zipcode, password, tablet_id, check_time):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        if not phone:
            raise ValueError('Users must have Phone Number')

        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=self.normalize_email(email),
            phone=phone,
            address=address,
            city=city,
            state=state,
            zipcode=zipcode,
            tablet_id=tablet_id,
            check_time=check_time
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone, email, password):
        """
        Creates and saves a superuser with the given phone no.
        """
        user = self.create_user(
            first_name = "",
            last_name = "",
            email = email,
            phone=phone,
            address = "",
            city = "",
            state = "",
            zipcode="",
            password=password,
            tablet_id="",
            check_time=""
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class MyUser(AbstractBaseUser):
    first_name = models.CharField(max_length =50)
    last_name = models.CharField(max_length =50)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    address = models.CharField(max_length =200)
    city = models.CharField(max_length =50)
    state = models.CharField(max_length =50)
    zipcode = models.CharField(max_length =50)
    phone = models.CharField(max_length =50, unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    tablet_id = models.CharField(max_length =50)
    check_time = models.CharField(max_length =200)

    objects = MyUserManager()

    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.phone

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
