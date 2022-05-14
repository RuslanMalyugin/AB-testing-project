import numpy as np
import scipy.stats as sps
import pandas as pd

# метод cuped для повышения чувствительности
def cuped(metric, covariate):
    
    #находим значение тета
    theta = metric.cov(covariate) / covariate.var()
    
    #находим cuped метрику
    cuped_metric = metric -  theta * (covariate - covariate.mean()) 
    
    return cuped_metric
    
    
class Tester(object):
    """
    Attributes:
    -----------
    control_data : pandas.DataFrame 
        таблица данных контрольной группы
    test_data : pandas.DataFrame 
        таблица данных тестовой группы 
    metrics : str
        целевая метрика
    sgn_lev: float 
        уровень значимости
        
    Methods:
    ---------
    effect()
        рассчитывает эффект ab-теста
    """
    
    def __init__(self, control_data, test_data, metrics, sgn_lev=0.05):
        
        self.control_data = control_data
        self.test_data = test_data
        self.metrics = metrics
        self.sgn_lev = sgn_lev 
        
    def t_test(self, ):
        res = {} 
        res["effect_value"] = (self.test_data[self.metrics].mean() 
                              / self.control_data[self.metrics].mean() - 1)
        
        #находим p-value с помощью t-test
        t_stat, p_val = sps.ttest_ind(self.control_data[self.metrics].values,
                                       self.test_data[self.metrics].values,
                                       equal_var=False)  
        #определим статистическую значимость 
        res["statistically significant"] = (p_val <= self.sgn_lev)
        res["t_statistic"] = t_stat
        return res
    
    def bootstrap(self, ):
        res = {}
        eff_list = []
        for i in range(1000):
            a_group_values = self.control_data[self.metrics].values
            b_group_values = self.test_data[self.metrics].values
            bs_a = np.random.choice(a_group_values, size=len(a_group_values), replace=True)
            bs_b = np.random.choice(b_group_values, size=len(b_group_values), replace=True)
            eff_i = bs_b.mean() / bs_a.mean() - 1
            eff_list.append(eff_i)
        
        effect = np.mean(eff_list)
        ci = np.percentile(eff_list, q=[2.5, 97.5])
        
        p_1 = sps.norm.cdf(x = 0, loc = np.mean(eff_list), 
                       scale = np.std(eff_list))
        p_2 = sps.norm.cdf(x = 0, loc = -np.mean(eff_list), 
                       scale = np.std(eff_list))
        p_val = min(p_1, p_2) * 2
        
        res["effect_value"] = effect
        res["confidence interval"] = ci
        res["statistically significant"] = (p_val <= self.sgn_lev)
        res["data"] = eff_list
        
        return res
    
        
