from celery import shared_task
from django.core.mail import send_mail
from api.settings import SENDER_ADDRESS


@shared_task
def send_email(subject, message, recipients):

    send_mail(
        subject,
        message,
        SENDER_ADDRESS,
        recipients,
        fail_silently=False,
    )
