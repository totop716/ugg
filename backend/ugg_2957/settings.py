"""
Django settings for ugg_2957 project.

Generated by 'django-admin startproject' using Django 1.11.16.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
"""

import os
import environ

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env.str('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool('DEBUG', default=True)

ALLOWED_HOSTS = ['*']

SITE_ID = 1

ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_EMAIL_REQUIRED = False
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'phone'

# Application definition

INSTALLED_APPS = [
    'suit',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'django.contrib.redirects',
    'import_export',
    'home'
]
LOCAL_APPS = [
    # 'home',
    'customauth'
]
THIRD_PARTY_APPS = [
    'rest_framework',
    # 'rest_framework.authtoken',
    'bootstrap4',
    'allauth',
    # 'allauth.account',
    # 'allauth.socialaccount',
    # 'allauth.socialaccount.providers.google',
]
INSTALLED_APPS += LOCAL_APPS + THIRD_PARTY_APPS

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

ROOT_URLCONF = 'ugg_2957.urls'

MEDIA_ROOT = os.path.join(BASE_DIR, 'static/img/uploads')

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates'), ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

SUIT_CONFIG = {
    'ADMIN_NAME': 'UGG Admin',
    'SEARCH_URL': '',
    'MENU': (
    {'label': 'Users', 'icon':'icon-user', 'url': '/admin/customauth/myuser/', 'models': ('MyUser')},
    {'label': 'Sweepstakes', 'icon':'icon-bell', 'url': '/admin/home/sweepstakes/' },
    {'label': 'Tablets', 'icon':'icon-camera', 'url': '/admin/home/tablet/'},
    {'label': 'Reports', 'icon':'icon-book', 'url': '/admin/reports/'},
    ),
}

WSGI_APPLICATION = 'ugg_2957.wsgi.application'

# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
       'ENGINE': 'django.db.backends.postgresql_psycopg2',
       'NAME': 'ugg_2957',
       'USER': 'postgres',
       'PASSWORD': '123',
       'HOST': 'localhost',
       'PORT': '5432',
    }
}

# AUTH_USER_MODEL = 'customauth.MyUser'

if env.str('DATABASE_URL', default=None):
    DATABASES = {
        # 'default': {
        #     'ENGINE': 'django.db.backends.postgresql_psycopg2',
        #     'NAME': env.str('DATABASE_NAME'),
        #     'USER': env.str('DATABASE_USER'),
        #     'PASSWORD': env.str('DATABASE_PASS'),
        #     'HOST': env.str('DATABASE_HOST'),
        #     'PORT': env.str('DATABASE_PORT'),
        # }
        'default': env.db()
    }

# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static')
]
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
)

if DEBUG:
    # output email to console instead of sending
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

EMAIL_HOST = 'smtp.sendgrid.net'
EMAIL_HOST_USER = env.str('SENDGRID_USERNAME', '')
EMAIL_HOST_PASSWORD = env.str('SENDGRID_PASSWORD', '')
EMAIL_PORT = 587
EMAIL_USE_TLS = True


# Import local settings
try:
    from .local_settings import *

    INSTALLED_APPS += DEBUG_APPS
except:
    pass
