from rest_framework.routers import DefaultRouter

from .views import EventsViewSet

router = DefaultRouter()
router.register('events', EventsViewSet)

urlpatterns = router.urls