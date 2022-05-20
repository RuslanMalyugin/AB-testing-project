
import pandas as pd
import psycopg2
import numpy as np
from sqlalchemy import create_engine

def get_users_id_for_spliting(data_base_parametrs: dict, project_id: int, users_number: int) -> list:
    '''
    Provides list of users id for Splitter.
    Arguments
    ---------
    :data_base_parametrs: dict
        Dict of paramers, needed for accessing data base.
    :project_id: int
        id of project
    :users_number: int
        size of list of users needed to be returned

    Returns
    -------
    :users_id: list
        List of users to be devided on two groups
    '''
    connection_url = ('postgresql://{username}:{password}@{ipaddress}:{port}/{db_name}'
    .format(username = data_base_parametrs['username'],
    password = data_base_parametrs['password'],
    ipaddress = data_base_parametrs['ipaddress'],
    port = data_base_parametrs['port'],
    db_name = data_base_parametrs['db_name']))

    engine = create_engine(connection_url)
    request = 'SELECT user_id FROM AB_test.Users WHERE project_id = {pi}'.format(pi = project_id)
    users = pd.read_sql_query(request ,con=engine)
    users_id = np.array(users.values.tolist()).reshape(-1)
    return users_id[:users_number]


def get_users_id_for_testing(data_base_parametrs: dict, project_id: int) -> pd.DataFrame:
    '''
    Provides list of users id for Tester.
    Arguments
    ---------
    :data_base_parametrs: dict
        Dict of paramers, needed for accessing data base.
    :project_id: int
        id of project

    Returns
    -------
    :users: pd.DataFrame
        List of users with their groups(two columns)
    '''
    connection_url = ('postgresql://{username}:{password}@{ipaddress}:{port}/{db_name}'
    .format(username = data_base_parametrs['username'],
    password = data_base_parametrs['password'],
    ipaddress = data_base_parametrs['ipaddress'],
    port = data_base_parametrs['port'],
    db_name = data_base_parametrs['db_name']))

    engine = create_engine(connection_url)
    request = 'SELECT user_id, ab_group FROM AB_test.Users WHERE project_id' \
       '= {pi} and ab_group is not Null'.format(pi = project_id)
    users = pd.read_sql_query(request ,con=engine)
    return users

def get_metrics_changes(data_base_parametrs: dict, project_id: int) -> pd.DataFrame:
    '''
    Provides DataFrmae of changes metrics for Tester.
    Arguments
    ---------
    :data_base_parametrs: dict
        Dict of paramers, needed for accessing data base.
    :project_id: int
        id of project

    Returns
    -------
    :metrics_changes: DataFrame
    '''
    connection_url = ('postgresql://{username}:{password}@{ipaddress}:{port}/{db_name}'
    .format(username = data_base_parametrs['username'],
    password = data_base_parametrs['password'],
    ipaddress = data_base_parametrs['ipaddress'],
    port = data_base_parametrs['port'],
    db_name = data_base_parametrs['db_name']))

    engine = create_engine(connection_url)
    request = 'SELECT date, metric, value FROM AB_test.Metrics' \
       'WHERE project_id = {pi}'.format(pi = project_id)
    metrics_changes = pd.read_sql_query(request ,con=engine)
    return metrics_changes
