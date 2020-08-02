import os
import datetime
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = os.getenv("SECRET_KEY", '+ownf%0op*r)rytn0^u38y7sbp_w6nf-uf9cbtm0sk2o#b1^bj')

DEBUG = int(os.getenv("DEBUG", default=1))

ALLOWED_HOSTS = os.getenv("DJANGO_ALLOWED_HOSTS", '*').split(" ")

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'djoser',
    'rest_framework_simplejwt',
    'rest_framework',
    'events',
    'accounts',
    'rest_framework_json_api',
    'rest_framework_jwt',
    'django_filters',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = False

CORS_ORIGIN_WHITELIST = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]

ROOT_URLCONF = 'events_manager.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

WSGI_APPLICATION = 'events_manager.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': os.getenv("SQL_ENGINE", "django.db.backends.sqlite3"),
        'NAME': os.getenv("SQL_DATABASE", os.path.join(BASE_DIR, "db.sqlite3")),
        'USER': os.getenv("SQL_USER", "user"),
        'PASSWORD': os.getenv("SQL_PASSWORD", "password"),
        'HOST': os.getenv("SQL_HOST", "localhost"),
        'PORT': os.getenv("SQL_PORT", "5432"),
    }
}

AUTH_PASSWORD_VALIDATORS = [
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

AUTH_USER_MODEL = "accounts.CustomUser"


REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        # 'rest_framework.permissions.IsAdminUser',
        'rest_framework.permissions.AllowAny',
        'rest_framework.permissions.IsAuthenticated',
    ),

    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PAGINATION_CLASS':
        'rest_framework_json_api.pagination.PageNumberPagination',
    'TEST_REQUEST_DEFAULT_FORMAT': 'json',
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend'
    ),
    'DATETIME_FORMAT': "%d.%m.%Y %H:%M:%S",
}


JWT_AUTH = {
    'JWT_VERIFY': True,
    'JWT_VERIFY_EXPIRATION': True,
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=2),
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=7),  # default
    'JWT_AUTH_HEADER_PREFIX': 'Bearer'
}


# DJOSER = {
#     # 'SEND_ACTIVATION_EMAIL': True,
#     # 'SEND_CONFIRMATION_EMAIL': True,
#     'ACTIVATION_URL': 'auth/activate/{uid}/{token}/',
#     'PASSWORD_RESET_SHOW_EMAIL_NOT_FOUND': True,
#     'PASSWORD_RESET_CONFIRM_URL': 'auth/reset/confirm/{uid}/{token}/',
#     'TOKEN_MODEL': None
# }


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

#smtp
EMAIL_USE_TLS = True
EMAIL_HOST = os.getenv("EMAIL_HOST")
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
EMAIL_PORT = int(os.getenv("EMAIL_PORT"))

#redis and celery
CELERY_BROKER_URL = 'redis://' + os.getenv("REDIS_HOST") + ':' + os.getenv("REDIS_PORT") + '/0'
CELERY_BROKER_TRANSPORT_OPTIONS = {'visibility_timeout': 3600}
CELERY_RESULT_BACKEND = 'redis://' + os.getenv("REDIS_HOST") + ':' + os.getenv("REDIS_PORT") + '/0'
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'




LANGUAGE_CODE = 'ru-RU'

TIME_ZONE = 'UTC'


USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
