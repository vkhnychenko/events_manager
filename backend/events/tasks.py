from events_manager.celery import app
from .service import send


@app.task(bind=True, default_retry_delay=5 * 60)
def send_email(self, email, title):
    try:
        send(email, title)
    except Exception as e:
        raise self.retry(exc=e, countdown=60)