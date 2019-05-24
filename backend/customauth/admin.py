from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from import_export import resources
from import_export.admin import ImportExportModelAdmin, ImportMixin

from customauth.models import MyUser

class MyUserResource(resources.ModelResource):
    class Meta:
        model = MyUser

class MyUserAdmin(ImportMixin, admin.ModelAdmin):
    resource_class = MyUserResource
    fields =  ('first_name','last_name','address','phone','po_box','unit_number','suite','city','state','zipcode','email','tablet_id')
    list_display = ('first_name','last_name','email','phone','address','city','state','zipcode','po_box','unit_number','suite')
    search_fields = ('first_name','last_name','email','phone','address','city','state','zipcode','po_box','unit_number','suite')

class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""

    class Meta:
        model = MyUser
        fields = ('first_name','last_name','email','address','city','state','zipcode','password')

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    """A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    password hash display field.
    """
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = MyUser
        fields = ('first_name', 'last_name', 'email', 'phone', 'address','city','state','zipcode','password')

class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserChangeForm
    add_form = UserCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('first_name', 'last_name', 'email', 'phone', 'address','city','state', 'zipcode', 'po_box', 'password')
    list_filter = ('is_admin',)
    ordering = ('phone','email')
    filter_horizontal = ()

admin.site.register(MyUser, MyUserAdmin)
# admin.site.register(MyUser, UserAdmin)
admin.site.unregister(Group)