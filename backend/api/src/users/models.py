from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
from .managers import UserManager
from django.dispatch import receiver
from django.db.models.signals import post_save
from src.commons.tasks.emails import send_email


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    username = None

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email
