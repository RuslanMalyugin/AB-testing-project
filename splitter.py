import sys
import pandas as pd
import os
from base64 import b64encode
import hashlib
import numpy as np


def encode_id(x: str, salt: str) -> int:
    """
    Generate hash ids using prefered salt value and sha256 algorithm.
    Arguments
    ---------
    :x: str
        Encoding string
    :salt: str
        Salt for endoing (x + salt)

    Returns
    -------
    :x_hashed: int - hash of x
    """
    x = str(x)
    x += salt
    x = x.encode()
    x_hashed = hashlib.sha256(x)
    x_hashed = x_hashed.hexdigest()
    x_hashed = x_hashed[:10]
    x_hashed = int(x_hashed, 16)
    return x_hashed

class Splitter(object):
    """
    Attributes:
    -----------
    data : pandas.DataFrame 
        таблица данных
    sample_size : int
        размер общей выборки 
    w_1 : float
        доля пользователей тестовой группы
        
    Methods:
    ---------
    split()
        делит пользователей группы test и control,
        возращает id-шники каждой из групп
        
    """
    
    def __init__(self, data, test_group_size, w_1=0.5):
        
        self.data = data
        self.sample_size = int(float(test_group_size) / w_1)
        self.w_1 = w_1
    
    def split(self, salt=None):
        df = pd.DataFrame({'id_column': np.random.choice(self.data['id_column'],
                                                         self.sample_size, 
                                                         replace=False)})

        # генерируем соль
        if not salt:
            salt = b64encode(os.urandom(8)).decode('ascii')

        # вычислим хеш-функцию для каждого id + salt
        df['hashed_id'] = [encode_id(x, salt) % sys.maxsize for x in df['id_column']]

        # сортируем пользователей по хешу
        df.sort_values(by='hashed_id', inplace=True)

        # разбиваем пользователей на группы A и B с весами w_1 и w_2 (где: w_1 + w_2 = 1)
        num_a = int(self.w_1 * self.sample_size)
        test_group = df['id_column'][:num_a].values
        control_group = df['id_column'][num_a:].values

        return test_group, control_group
