from django.contrib import admin

# Register your models here.

from django.utils.html import format_html
from django import forms
from django.contrib.sites.models import Site
from django.contrib.auth.models import User
from commons.utils import utils

from .models import Entry, Lottery, SweepUser, Sweepstakes, Tablet, Survey
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
    list_display = ('first_name','last_name','address','phone','suite_po_box','city','state','zipcode', 'email', 'created_date', 'checkSMS', 'checkEmail')
    search_fields = ('first_name','last_name','address','phone','suite_po_box','city','state','zipcode', 'email')

admin.site.register(SweepUser, SweepUsersAdmin)

class SweepstakesCreationForm(forms.ModelForm):
    can_generate_winner_multiple_times = forms.ChoiceField(label='Can Generate Winner Multiple Times', choices=[('yes', 'Yes'), ('no', 'No')], widget=forms.RadioSelect)
    generate_winner_for_each_tabletid = forms.ChoiceField(label='Generate Winner for Each Tablet ID', choices=[('yes', 'Yes'), ('no', 'No')], widget=forms.RadioSelect)
    background_image_after_sweepstake_check = forms.ChoiceField(label='Background Image After Sweepstakes', choices=[('yes', 'Yes'), ('no', 'No')], widget=forms.RadioSelect)
    survey1_check = forms.ChoiceField(label='Survey1', choices=[('yes', 'Yes'), ('no', 'No')], widget=forms.RadioSelect)
    survey2_check = forms.ChoiceField(label='Survey2', choices=[('yes', 'Yes'), ('no', 'No')], widget=forms.RadioSelect)
    prioritize_sweepstakes = forms.ChoiceField(label='Prioritize Sweepstakes', choices=[('yes', 'Yes'), ('no', 'No')], widget=forms.RadioSelect)
    customer_checkin_frequency = forms.ChoiceField(label='Customer Check In Frequency', choices=[(0, 'Once Per Day'), (1, 'Once Every Hour')], widget=forms.RadioSelect)

    class Meta:
        model = Sweepstakes
        fields =  ('name','startdate','enddate','logo','background','disclaimer','fontsize','current', 'disclaimer_color', 'header_text', 'header_font_size', 'header_hex_color', 'button_header_hex_color', 'button_header_font_color', 'can_generate_winner_multiple_times', 'generate_winner_for_each_tabletid', 'background_image_after_sweepstake_check', 'background_image_after_sweepstake', 'survey1_check', 'survey1_name', 'survey2_check', 'survey2_name', 'border_hightlight_hex_color', 'primary_hex_color', 'prioritize_sweepstakes', 'customer_checkin_frequency')
        labels = {'background_image_after_sweepstake':'', 'survey1_name': '', 'survey2_name': ''}

class SweepstakesChangeForm(forms.ModelForm):
    can_generate_winner_multiple_times = forms.ChoiceField(label='Can Generate Winner Multiple Times', choices=[('yes', 'Yes'), ('no', 'No')], widget=forms.RadioSelect)
    generate_winner_for_each_tabletid = forms.ChoiceField(label='Generate Winner for Each Tablet ID', choices=[('yes', 'Yes'), ('no', 'No')], widget=forms.RadioSelect)
    background_image_after_sweepstake_check = forms.ChoiceField(label='Background Image After Sweepstakes', choices=[('yes', 'Yes'), ('no', 'No')], widget=forms.RadioSelect)
    survey1_check = forms.ChoiceField(label='Survey1', choices=[('yes', 'Yes'), ('no', 'No')], widget=forms.RadioSelect)
    survey2_check = forms.ChoiceField(label='Survey2', choices=[('yes', 'Yes'), ('no', 'No')], widget=forms.RadioSelect)
    prioritize_sweepstakes = forms.ChoiceField(label='Prioritize Sweepstakes', choices=[('yes', 'Yes'), ('no', 'No')], widget=forms.RadioSelect)
    customer_checkin_frequency = forms.ChoiceField(label='Customer Check In Frequency', choices=[(0, 'Once Per Day'), (1, 'Once Every Hour')], widget=forms.RadioSelect)

    class Meta:
        model = Sweepstakes
        fields =  ('name','startdate','enddate','logo','background','disclaimer','fontsize','current', 'disclaimer_color', 'header_text', 'header_font_size', 'header_hex_color', 'button_header_hex_color', 'button_header_font_color', 'can_generate_winner_multiple_times', 'generate_winner_for_each_tabletid', 'background_image_after_sweepstake_check', 'background_image_after_sweepstake', 'survey1_check', 'survey1_name', 'survey2_check', 'survey2_name', 'border_hightlight_hex_color', 'primary_hex_color', 'prioritize_sweepstakes', 'customer_checkin_frequency')
        labels = {'background_image_after_sweepstake':'', 'survey1_name': '', 'survey2_name': ''}

class SweepstakesAdmin(admin.ModelAdmin):
    form = SweepstakesCreationForm
    add_form = SweepstakesChangeForm

    list_display = ('name','startdate','enddate','logo','background','disclaimer','current')
    search_fields = ('name','startdate','enddate','logo','background','disclaimer','current')

admin.site.register(Sweepstakes, SweepstakesAdmin)

class SurveyCreationForm(forms.ModelForm):
    class Meta:
        model = Survey
        fields = ('name', 'questions_count')

class SurveyChangeForm(forms.ModelForm):
    class Meta:
        model = Survey
        fields = ('name', 'questions_count')

class SurveyAdmin(admin.ModelAdmin):
    # def created(self, obj):
    #     return format_html(
    #         "<a href='{url}'>{created_at}</a>",
    #         created_at=utils.get_created_at_str(obj),
    #         url='/admin/home/survey/{}/change/'.format(obj.id)
    #     )

    # created.short_description = 'Date Created'

    form = SurveyChangeForm
    add_form = SurveyCreationForm

    fields = ('name', 'questions_count', 'question_1', 'question_2', 'question_3', 'question_4', 'question_5', 'question_6', 'question_7', 'question_8', 'question_9', 'question_10')
    # list_display = ('name','questions_count', 'created')
    list_display = ('name','questions_count', 'created_at')


admin.site.register(Survey, SurveyAdmin)

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

# from rest_framework.authtoken.models import Token

# admin.site.unregister(Token)