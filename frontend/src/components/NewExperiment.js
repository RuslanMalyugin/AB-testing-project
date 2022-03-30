import React from 'react';
import Header from './Header';
import './Experiments.css';
import './NewExperiment.css';


function NewExperiment() {
    return (
        <div>
            <Header/>
            <main className='MainNewExp'>
                <div className='Rectangle'>
                    <div className='Menu' >
                        <div className='SmallRecLeft' >
                            Текущие
                        </div>
                        <div className='SmallRecRight' >
                            Завершённые
                        </div>
                    </div>
                    <div className='RecCenter'>
                        <div className='RowRecCenter'>
                            Название эксперимента*
                        </div>
                        <div className='RowRecCenter' >
                            Краткое описание
                        </div>
                        <div className='RowRecCenter'>
                            Основная метрика*
                        </div>
                        <div className='RowRecCenter'>
                            Дополнительная метрика
                        </div>
                        <div className='RowRecCenter'>
                            Мощность критерия*
                        </div>
                        <div className='RowRecCenter'>
                            Уровень значимости*
                        </div>
                        <div className='RowRecCenter'>
                            Стандартное отклонение*
                        </div>
                        <div className="DataBox">
                            Место для ваших данных
                        </div>

                    </div>
                    <div className='SmallRecUndButton ' >
                        <div  className='ButtonConcl'>
                            Итог
                        </div>
                        <div  className='ButtonMoreConcl'>
                            Подробная информация
                        </div>
                    </div>

                </div>

            </main>

        </div>
    );
}

export default NewExperiment;