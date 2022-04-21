from django.core import serializers
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.
from orders.models import Experiment
from orders.serializers import MyTokenObtainPairSerializer, RegisterSerializer, PostSerializersExperiment

from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/experiments/'
    ]
    return Response(routes)


class GetUnfinishedExperiments(generics.ListAPIView):
    model = Experiment
    paginate_by = 10
    serializer_class = PostSerializersExperiment

    def get_queryset(self):
        return Experiment.objects.filter(author=self.request.user, is_finished=False)


class GetFinishedExperiments(generics.ListAPIView):
    model = Experiment
    paginate_by = 10
    serializer_class = PostSerializersExperiment

    def get_queryset(self):
        return Experiment.objects.filter(author=self.request.user, is_finished=True)
