from django.contrib import admin

from .models import *

admin.site.register(Experiment)
admin.site.register(UsersGroup)
admin.site.register(ExperimentResult)
