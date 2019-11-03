from django.contrib import admin

# Register your models here.

from django import forms
from django.contrib.sites.models import Site
from django.contrib.auth.models import User

from .models import Entry, Lottery, SweepUser, Sweepstakes, Tablet
from import_export.admin import ImportExportModelAdmin, ImportMixin
from import_export import resources

class SweepUserResource(resources.ModelResource):
    class Meta:
        model = SweepUser
        fields =  ('id','first_name','last_name','address','phone','suite_po_box','city','state','zipcode', 'email')

class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""

    class Meta:
        model = SweepUser
        fields = ('first_name','last_name','address','phone','suite_po_box','city','state','zipcode', 'email')

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
        fields = ('first_name','last_name','address','phone','suite_po_box','city','state','zipcode', 'email')

class SweepUsersAdmin(ImportMixin, admin.ModelAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    resource_class = SweepUserResource

    fields =  ('first_name','last_name','address','phone','suite_po_box','city','state','zipcode', 'email', 'checkSMS', 'checkEmail')
    list_display = ('first_name','last_name','address','phone','suite_po_box','city','state','zipcode', 'email', 'label', 'checkSMS', 'checkEmail')
    search_fields = ('first_name','last_name','address','phone','suite_po_box','city','state','zipcode', 'email')

admin.site.register(SweepUser, SweepUsersAdmin)

class SweepstakesAdmin(admin.ModelAdmin):
    fields =  ('name','startdate','enddate','logo','background','disclaimer','fontsize','current')
    list_display = ('name','startdate','enddate','logo','background','disclaimer','current')
    search_fields = ('name','startdate','enddate','logo','background','disclaimer','current')

admin.site.register(Sweepstakes, SweepstakesAdmin)

class TabletChangeForm(forms.ModelForm):
    """A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    password hash display field.
    """
    # password = ReadOnlyPasswordHashField()
    class Meta:
        model = Tablet
        fields = ('name','address','city','state','zipcode','password', 'confirm_password')

    password = forms.CharField(widget=forms.PasswordInput, required=False)
    confirm_password=forms.CharField(widget=forms.PasswordInput(), required=False)

    def clean(self):
        cleaned_data = super(TabletChangeForm, self).clean()
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")

        if password != confirm_password:
            raise forms.ValidationError(
                "password and confirm_password does not match"
            )

class TabletAdmin(admin.ModelAdmin):
    form = TabletChangeForm

    fields =  ('name','address','city','state','zipcode','password', 'confirm_password')
    list_display = ('name','address','city','state','zipcode')
    search_fields = ('name','address','city','state','zipcode')

admin.site.register(Tablet, TabletAdmin)

admin.site.unregister(Site)
admin.site.unregister(User)
