import matplotlib.pyplot as plt
from matplotlib.ticker import FuncFormatter
from matplotlib.ticker import FixedLocator
import numpy as np
import scipy.stats as sps
import seaborn as sns


def formatOx(x, pos):
    x = x * 100
    x = float('{:.2f}'.format(x))
    return f"{x}%"


class Graph(object):

    def __init__(self, tester_result):

        self.data = tester_result["data"]
        self.mean = np.mean(tester_result["data"])
        self.var = np.var(tester_result["data"])
        self.conf_interval = tester_result["confidence interval"]
        self.stat_significant = tester_result["statistically significant"]

    def answer(self, ):
        if not self.stat_significant:
            return "Эффект статистически незначим"
        elif self.conf_interval[1] <= 0:
            return "Изменения негативные"

        return "Изменения позитивные"

    def draw_graph(self, ):

        left = min(0, self.conf_interval[0]) - 0.01
        right = max(0, self.conf_interval[1]) + 0.01
        grid = np.linspace(left, right, 10000)

        sns.set(style="whitegrid", font_scale=1.4)
        fig, ax = plt.subplots(figsize=(17, 5))

        y_max = sps.norm.pdf(self.mean, loc=self.mean, scale=self.var)
        ax.vlines(self.mean, 0, y_max, linestyles="dashed")
        ax.vlines(self.conf_interval[0], 0, y_max, linestyles="dashed")
        ax.vlines(self.conf_interval[1], 0, y_max, linestyles="dashed")

        plt.axvspan(left, 0, 0, y_max, alpha=0.2, color="red")
        plt.axvspan(0, right, 0, y_max, alpha=0.2, color="green")

        ax.xaxis.set_major_locator(FixedLocator([self.conf_interval[0],
                                                 self.conf_interval[1],
                                                 self.mean]))
        ax.xaxis.set_major_formatter(FuncFormatter(formatOx))

        plt.xticks(fontsize=10)
        plt.xticks(rotation=45)
        plt.yticks([])
        plt.xlabel("test benefit")
        plt.ylim((0, 1))
        plt.title("Final result", fontsize=20)

        plt.savefig('image.png', bbox_inches='tight')

        return ['image.png']
