from django.db import models
import base64
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

# Create your models here.

class MyUserManager(BaseUserManager):
    def create_user(self, first_name, last_name, email, phone, address, city, state, zipcode, password, check_time, po_box_unit_number, suite, label):
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
            check_time=check_time,
            po_box_unit_number = po_box_unit_number,
            suite = suite,
            label = label,
        )

        user.set_password(base64.b64encode(password))
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
            password=base64.b64encode(password),
            check_time="",
            po_box_unit_number = "",
            suite = "",
            label = "",
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
    phone = models.CharField(max_length =50, unique=True, help_text="Please input Phone No in this format ( ex: 12345667889 or 2345678890)")
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    check_time = models.CharField(max_length =200)
    po_box_unit_number = models.CharField("PO Box/Unit Number", max_length =50)
    suite = models.CharField(max_length =50)
    label = models.CharField(max_length = 100, default="Added by Admin")

    objects = MyUserManager()

    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.email

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
