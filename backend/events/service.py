from rest_framework.pagination import PageNumberPagination
from django_filters import rest_framework as filters
from django.core.mail import send_mail
from .models import Events


class MyPagination(PageNumberPagination):
    page_size = 10


class EventFilter(filters.FilterSet):
    day = filters.NumberFilter(field_name='datetime', lookup_expr='day')
    week = filters.NumberFilter(field_name='datetime', lookup_expr='week')
    month = filters.NumberFilter(field_name='datetime', lookup_expr='month')

    class Meta:
        model = Events
        fields = ['datetime']


def send(user_email, title):
    send_mail('Рассылка',
              f'Срок вашего события: {title} истекает через 1 час',
              'events.notification2020@gmail.com',
              [user_email],
              fail_silently=False)