import random
import string
import pandas as pd


def split(users_id, w_1=0.5):
    df = pd.DataFrame({'users_id': users_id})

    # генерируем соль
    salt = ''.join([random.choice(string.ascii_letters) for i in range(10)])

    # вычислим хеш-функцию для каждого id + salt
    df['users_hash'] = [hash(str(id) + salt) for id in users_id]

    # сортируем пользователей по хешу
    df.sort_values(by='users_hash', inplace=True)

    # разбиваем пользователей на группы A и B с весами w_1 и w_2 (где: w_1 + w_2 = 1)
    num_a = int(w_1 * users_id.size)
    test_group = df['users_id'][:num_a].values
    control_group = df['users_id'][num_a:].values

    return test_group, control_group
