import pandas as pd
from sqlalchemy import create_engine
from orders import tester
from orders import conclusion
import numpy as np


def to_list(s: str) -> list:
    s = s[1:]
    s = s[:-1]
    l = s.split(', ')
    l = [float(val) for val in l]
    return l


def get_metrics(a_group: list, b_group: list, connection_url: str,
                main_metric: str, function) -> pd.DataFrame:
    '''
    Provides list of users id for Tester.
    Arguments
    ---------
    ::connection_url: str
        Url to DataBase
    :project_id: int
        id of project
    :function: function
        to be applied to metrics

    Returnssqlalchemy
    -------
    :users: pd.DataFrame
        List of users with their groups(two columns)
    '''
    engine = create_engine(connection_url)
    request = 'SELECT user_id, {m_m} FROM AB_test.Metrics ' \
              'WHERE {m_m} is not Null'.format(m_m=main_metric)
    users = pd.read_sql_query(request, con=engine)

    users[main_metric] = users.groupby('user_id')[main_metric].transform(function)
    users = users.drop_duplicates(subset=['user_id'])

    n = users.shape[0]
    users.index = range(n)

    mask_1 = [False] * n
    mask_2 = [False] * n

    for i in range(n):
        u_id = users["user_id"][i]
        if u_id in a_group:
            mask_1[i] = True
        elif u_id in b_group:
            mask_2[i] = True

    return users[mask_1], users[mask_2]


def get_result(a_group: list, b_group: list, connection_url: str,
               main_metric: str, sign_level: float):
    function = np.mean
    if main_metric == "sum":
        function = np.sum

    data = get_metrics(a_group, b_group, connection_url, main_metric, function)

    t = tester.Tester(data[0], data[1], main_metric, sign_level)
    boots_result = t.bootstrap()
    result = {}
    result["effect_value"] = boots_result["effect_value"]
    result["confidence interval"] = boots_result["confidence interval"]

    finish = conclusion.Graph(boots_result)
    result["answer"] = finish.answer()
    result["image name"] = finish.draw_graph()

    return result
