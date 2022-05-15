from datetime import datetime
from typing import Text
from django.db import models

from django.contrib.auth.models import User


class Experiment(models.Model):
    id = models.BigAutoField(primary_key=True)
    author = models.ForeignKey('auth.User', related_name='exps', on_delete=models.CASCADE)
    name = models.CharField(max_length=100, default='')
    text = models.TextField(default='Your description')
    main_metric = models.CharField(max_length=100, default='Main metric')
    second_metric = models.CharField(max_length=100, default='Second metric')
    power = models.FloatField(default=0.8)
    significance_level = models.FloatField(default=0.05)
    mde = models.FloatField(default=1)
    data = models.BinaryField(default=None)
    history_data = models.BinaryField(default=None)
    base_link = models.TextField(default='BaseLink')
    is_finished = models.BooleanField(default=False)
    is_started = models.BooleanField(default=False)
    start_date = models.DateTimeField(default=datetime.now)
    finish_date = models.DateTimeField(default=datetime.now)


class UsersGroup(models.Model):
    id = models.BigAutoField(primary_key=True)
    exp = models.ForeignKey(Experiment, unique=True, on_delete=models.CASCADE)
    control_group = models.TextField(default='')
    test_group = models.TextField(default='')


class ExperimentResult(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100, default='')
    exp = models.ForeignKey(Experiment, unique=True, on_delete=models.CASCADE)
    confidence_interval_r = models.FloatField(default=1)
    confidence_interval_l = models.FloatField(default=1)
    effect_value = models.FloatField(default=1)
    graph = models.TextField(default='')
    description = models.TextField(default='')
