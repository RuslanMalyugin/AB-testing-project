from typing import Text
from django.db import models

from django.contrib.auth.models import User


class Experiment(models.Model):
    id = models.BigAutoField(primary_key=True)
    author = models.ForeignKey('auth.User', related_name='exps', on_delete=models.CASCADE)
    name = models.CharField(max_length=100, default='')
    text = models.TextField(default='')
    main_metric = models.CharField(max_length=100, default='')
    second_metric = models.CharField(max_length=100, default='')
    power = models.FloatField(default=0.8)
    significance_level = models.FloatField(default=0.05)
    data = models.FileField(default='')
    base_link = models.TextField(default='')
    is_finished = models.BooleanField(default = False)


