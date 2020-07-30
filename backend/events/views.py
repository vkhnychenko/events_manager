from datetime import timedelta, datetime
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from celery.result import AsyncResult
from .models import Events
from .serializers import EventsSerializers
from .service import MyPagination, EventFilter
from .tasks import send_email


class EventsViewSet(ModelViewSet):
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    search_fields = ['title']
    filterset_class = EventFilter
    permission_classes = [IsAuthenticated]
    serializer_class = EventsSerializers
    queryset = Events.objects.all()
    pagination_class = MyPagination

    def perform_create(self, serializer):
        result = send_email.apply_async(
            (self.request.user.email, self.request.data['title']),
            eta=datetime.strptime(self.request.data['datetime'], "%Y-%m-%dT%H:%M:%S.%fZ") - timedelta(hours=1)
        )
        serializer.save(task_id=result.id)

    def perform_update(self, serializer):
        instance = self.get_object()
        task = AsyncResult(instance.task_id)
        task.revoke()
        result = send_email.apply_async(
            (self.request.user.email, self.request.data['title']),
            eta=datetime.strptime(self.request.data['datetime'], "%Y-%m-%dT%H:%M:%S.%fZ") - timedelta(hours=1)
        )
        serializer.save(task_id=result.id)

    def perform_destroy(self, instance):
        task = AsyncResult(instance.task_id)
        task.revoke()
        instance.delete()

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.filter(user=self.request.user)
        return query_set