from django.contrib import admin
from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('', views.getRoutes),
    path('unfinished_experiments/', views.GetUnfinishedExperiments.as_view(), name='get_unfinished_experiment'),
    path('finished_experiments/', views.GetFinishedExperiments.as_view(), name='get_finished_experiment'),
    path('get_experiment/', views.GetExperiment.as_view(), name='get_experiment'),
    path('get_experiment_result/', views.GetExperimentResult.as_view(), name='get_experiment_result'),
    path('add_experiment/', views.AddNewExperiment.as_view(), name='add_experiment'),
    path('start_experiment/', views.StartExperiment.as_view(), name='start_experiment'),
    path('finish_experiment/', views.FinishExperiment.as_view(), name='finish_experiment'),
    path('delete_experiment/', views.DeleteExperiment.as_view(), name='delete_experiment')
]
