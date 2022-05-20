import base64
import os
from datetime import datetime, timedelta

import numpy as np
import pandas as pd
import simplejson as json
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from orders.designer import Designer
# Create your views here.
from orders.finish_experiment import get_result, to_list
from orders.models import Experiment, UsersGroup, ExperimentResult
from orders.serializers import MyTokenObtainPairSerializer, RegisterSerializer, PostSerializersExperiment, \
    StartExperimentSerializer, PostSerializersExperimentResult
from orders.splitter import Splitter


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


class GetExperiment(generics.ListAPIView):
    model = Experiment
    paginate_by = 10
    serializer_class = PostSerializersExperiment

    def get_queryset(self):
        return Experiment.objects.filter(author=self.request.user, id=self.request.query_params['id'])


class GetExperimentResult(generics.ListAPIView):
    model = ExperimentResult
    paginate_by = 10
    serializer_class = PostSerializersExperimentResult

    def get_queryset(self):
        experiment = Experiment.objects.filter(author=self.request.user, id=self.request.query_params['id'])[0]
        return ExperimentResult.objects.filter(exp=experiment)


class DeleteExperiment(generics.DestroyAPIView):
    model = Experiment
    paginate_by = 10
    serializer_class = PostSerializersExperiment

    def delete(self, request, *args, **kwargs):
        exp = Experiment.objects.filter(author=self.request.user, id=self.request.query_params['id'])
        exp.delete()
        return Response(status=200)


class AddNewExperiment(generics.CreateAPIView):
    serializer_class = PostSerializersExperiment

    def create(self, request, *args, **kwargs):
        history_data = (self.request.data['data2'].read().decode())
        data = (self.request.data['data'].read().decode())
        experiment = Experiment.objects.create(
            author=self.request.user,
            name=self.request.data['name'],
            text=self.request.data['text'],
            main_metric=self.request.data['main_metric'],
            second_metric=self.request.data['second_metric'],
            power=self.request.data['power'],
            significance_level=self.request.data['significance_level'],
            mde=self.request.data['mde'],
            data=data.encode('utf-8'),
            history_data=history_data.encode('utf-8'),
            base_link=self.request.data['base_link'],
            start_date=datetime.now(),
            finish_date=datetime.now() + timedelta(days=int(self.request.data['duration']))
        )
        experiment.save()

        return Response(status=200)


class StartExperiment(generics.CreateAPIView):
    serializer_class = StartExperimentSerializer

    def create(self, request, *args, **kwargs):

        experiment = Experiment.objects.filter(author=self.request.user, id=self.request.data['id'])[0]

        experiment.is_started = True
        experiment.save()

        datafile = experiment.data.decode('utf-8')
        file = open("data.csv", "w")

        file.write(datafile)
        users = pd.read_csv('data.csv')
        file.close()
        os.remove("data.csv")

        datafile = experiment.history_data.decode('utf-8')
        file = open("data.csv", "w")

        file.write(datafile)
        history = pd.read_csv('data.csv', header=0)
        file.close()
        os.remove("data.csv")

        variance = np.sqrt(np.var(history[experiment.main_metric].values))

        significance_level = 0.05
        if experiment.significance_level is not None:
            significance_level = float(experiment.significance_level)
        test_power = 0.05
        if experiment.power is not None:
            test_power = float(experiment.power)

        mde = 1
        if experiment.power is not None:
            mde = float(experiment.mde)

        designer = Designer()
        designer.set_params(error='two-sided', method='variations', test_power=test_power,
                            significance_level=significance_level, expected_effect=mde, variations=variance,
                            conversion_rate=0.1)
        # at the moment parametrs are random

        with open('file.txt', 'w') as f:
            f.write(str(designer.sample_size))

        splitter = Splitter(users, designer.sample_size / 2)  # designer.sample_size must be less, than size of users
        control_group, test_group = splitter.split()

        users_group = UsersGroup()
        users_group.exp = experiment
        users_group.test_group = json.dumps(test_group.tolist())
        users_group.control_group = json.dumps(control_group.tolist())

        users_group.save()

        return Response(status=200)


class FinishExperiment(generics.CreateAPIView):

    def create(self, request, *args, **kwargs):
        experiment = Experiment.objects.filter(author=self.request.user, id=self.request.data['id'])[0]
        experiment.is_finished = True
        experiment.save()
        user_group = UsersGroup.objects.filter(exp=experiment)[0]
        a_group = to_list(user_group.test_group)
        b_group = to_list(user_group.control_group)
        main_metric = experiment.main_metric
        conn_url = experiment.base_link
        sign_lvl = experiment.significance_level
        result = get_result(a_group, b_group, conn_url, main_metric, sign_lvl)
        image_name = result['image name'][0]
        with open('file2.txt', 'w') as f:
            f.write(str(image_name))
        with open(image_name, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())

        experiment_result = ExperimentResult.objects.create(
            exp=experiment,
            name=experiment.name,
            confidence_interval_l=result["confidence interval"][0],
            confidence_interval_r=result["confidence interval"][1],
            graph=encoded_string,
            effect_value=result['effect_value'],
            description=result['answer']
        )

        experiment_result.save()

        return Response(status=200)
