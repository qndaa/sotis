from django.contrib.auth import password_validation


def validate_password(password):
    password_validation.validate_password(password)
