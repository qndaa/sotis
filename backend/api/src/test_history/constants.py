from django.db import models
from django.utils.translation import gettext_lazy as _


class StatusOfTestList(models.TextChoices):
    STARTED = "STARTED", _("Started")
    FINISHED = "FINISHED", _("Finished")
    CANCELLED = "CANCELLED", _("Cancelled")
    PASSED = "PASSED", _("Passed")
    NA = "NA", _("Not available")
