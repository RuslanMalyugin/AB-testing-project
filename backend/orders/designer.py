import numpy as np
import pandas as pd
import scipy.stats as sps


class Designer(object):
    """Класс Designer используется для вычисления размера выборки

        Attributes
        ----------
        main_metric : str
            название основной метрики по которой будем проводить тестирование
        other_metrics : list
            список побочных метрик, для которых было бы интересно посмотреть изменение
        data : pandas.DataFrame
            данные
        test_power : float
            мощность критерия
        significance_level : float
            уровень значимости
        variations : float
            стандартное отклонение
        expected_effect : float
            список строк исходного файла
        conversion_rate: float
            изначальный уровень конверсии

        Methods
        -------
        set_params()
            Задает параметры для дальнейшего тестирования
        """

    def __init__(self):
        self.test_power = None
        self.significance_level = None
        self.variations = None
        self.expected_effect = None
        self.conversion_rate = None
        self.sample_size = 0

    def set_params(self, error='two-sided', method='variations', test_power=0.8, significance_level=0.05,
                   expected_effect=0.1, variations=None, conversion_rate=None):

        """Задает параметры для дальнейшего тестирования.
        Так же подсчитывает необходимый размер выборки для теста
        (вычисляется размер ОДНОЙ выборки).

        Keyword arguments:
        criteria -- Односторонняя или двухсторонняя ошибка.
            Возможные значения ['one-sided', 'two-sided'], (default: 'two-sided')
        method -- Метод подсчета размера выборки. Подсчет может вестись на основе дисперсии или конверсии.
            Возможные значения ['variations', 'conversion-rate'], (default: 'two-sided')
        test_power -- Мошность критерия
            (default: 0.8)
        significance_level -- Уровень значимости критерия
            (default: 0.05)
        expected_effect -- Ожидаемое увеличении метрики в процентном отношении.
            (default: 0.1)
        variations -- Среднее отклонение. Используется только, если в качестве method выбрано 'variations'
            (default: None)
        conversion_rate -- Конверсия. Используется только, если в качестве method выбрано 'conversion-rate'
            (default: None)

        """

        if error not in ['one-sided', 'two-sided']:
            raise ValueError("criteria must be only 'one-sided' or  'two-sided'.")
        sides = 1 if error == 'one-sided' else 2

        if method not in ['variations', 'conversion-rate']:
            raise ValueError("method must be only 'variations' or  'conversion-rate'.")
        value = variations ** 2 if method == 'variations' else conversion_rate * (1 - conversion_rate)

        if value is None:
            raise ValueError(f"in this method {method} can't be None")

        error1 = sps.norm.ppf(1 - significance_level / sides)
        error2 = sps.norm.ppf(test_power)

        size = int((2 * value * (error1 + error2) ** 2) / (expected_effect ** 2))

        self.sample_size = size
        self.test_power = test_power
        self.significance_level = significance_level
        self.variations = variations
        self.expected_effect = expected_effect
        self.conversion_rate = conversion_rate
