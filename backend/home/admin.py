from django.contrib import admin

# Register your models here.

from django import forms
from django.contrib.sites.models import Site
from django.contrib.auth.models import User

from .models import Entry, Lottery, SweepUser, Sweepstakes, SweepUser, Tablet
from import_export.admin import ImportExportModelAdmin, ImportMixin
from import_export import resources

class SweepUserResource(resources.ModelResource):
    class Meta:
        model = SweepUser
        fields =  ('first_name','last_name','address','phone','po_box_unit_number','suite','city','state','zipcode', 'email', 'password')

class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""

    class Meta:
        model = SweepUser
        fields = ('first_name','last_name','address','phone','po_box_unit_number','suite','city','state','zipcode', 'email', 'password')

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
    # password = ReadOnlyPasswordHashField()
    password = forms.CharField(widget=forms.PasswordInput, required=False)

    class Meta:
        model = SweepUser
        fields = ('first_name','last_name','address','phone','po_box_unit_number','suite','city','state','zipcode', 'email', 'password')

class SweepUsersAdmin(admin.ModelAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    resource_class = SweepUserResource

    fields =  ('first_name','last_name','address','phone','po_box_unit_number','suite','city','state','zipcode', 'email', 'password')
    list_display = ('first_name','last_name','address','phone','po_box_unit_number','suite','city','state','zipcode', 'email', 'label')
    search_fields = ('first_name','last_name','address','phone','po_box_unit_number','suite','city','state','zipcode', 'email')

admin.site.register(SweepUser, SweepUsersAdmin)

class SweepstakesAdmin(admin.ModelAdmin):
    fields =  ('name','startdate','enddate','logo','background','disclaimer','current')
    list_display = ('name','startdate','enddate','logo','background','disclaimer','current')
    search_fields = ('name','startdate','enddate','logo','background','disclaimer','current')

admin.site.register(Sweepstakes, SweepstakesAdmin)

class TabletAdmin(admin.ModelAdmin):
    fields =  ('name','address','city','state','zipcode','user_id')
    list_display = ('name','address','city','state','zipcode')
    search_fields = ('name','address','city','state','zipcode')

admin.site.register(Tablet, TabletAdmin)

admin.site.unregister(Site)
admin.site.unregister(User)
