import React from 'react';
import Header from './Header';
import './Home.css';
import plotleft from "./imgs/plotleft.png";
import plotright from "./imgs/plotright.png";
import {Link} from "react-router-dom";


function Home() {

    return (
        <body>
        <Header/>
        <main className='Main'>
            <div className='BannerLeft'>
                <div className='BannerTop'>
                    ПРОСТОЕ РЕШЕНИЕ<br/>
                    НЕПРОСТЫХ <br/>
                    ЗАДАЧ
                </div>
            </div>
            <div className='BannerRight'>
                <div className='TextHome'>
                    A/B-testing platform <br/>
                </div>

                <div className='Button'>
                    <Link to="/account">
                        Приступить к работе <br/>
                    </Link>
                </div>

                <div className='ButtonMore'>
                    <div className='SmallText'>
                        <a href="#about">
                            Узнать больше <br/>
                        </a>
                    </div>
                </div>
            </div>
        </main>

        <a name="about">
            <div className='BannerDown'>
                <div className='LineUp'>
                </div>
                <div className='SmallText'>
                    A/B-тестирование — это эксперимент, который позволяет сравнить две версии чего-либо, <br/>
                    чтобы проверить гипотезы и определить, какая версия лучше. <br/>
                </div>
                <div className='LineDown'>
                </div>
            </div>
        </a>

        <main className='Main'>
            <div className='BannerRight'>
                <div className='MiddleText'>
                    Подробнее, что такое <br/>
                    А/В-тестирование
                </div>
                <div className='LongText'>
                    A/B-тестирование позволяет оценивать количественные <br/>
                    показатели работы двух вариантов, а также <br/>
                    сравнивать их между собой. Ещё А/В-тестирование помогает <br/>
                    оценивать эффективность изменений например, <br/>
                    добавления новых элементов дизайна или призывов к действию. <br/>
                    А/В-тестирование начинается с оценки метрик существующего
                    варианта А и подбора критерия эффективности изменений. <br/>
                    Затем трафик разделяется между вариантами A и B на две <br/>
                    приблизительно равные части. После сбора данных <br/> высчитывается
                    изменение метрик, и отвергаются <br/> или принимаются изменения.
                </div>
                <div className='Picture'>
                    <img src={plotright} width={250}/>
                </div>
            </div>
            <div className='BannerRightDown'>
                <div className='Picture'>
                    <img src={plotleft} width={250}/>
                </div>
                <a name="aboutUs">
                    <div className='BannerSystemInfo'>
                        <div className='MiddleText'>
                            Как мы работаем <br/>
                        </div>
                        <div className='LongText'>
                            Всё начинается с того, что вы нам подаёте на вход описание эксперимента, <br/>
                            интересующие вас метрики и какой эффект ожидаете. <br/>
                            Мы в свою очередь :
                        </div>
                        <ul className="Points" type="circle">
                            <li className="Point">
                                оцениваем минимальное время эксперимента
                            </li>
                            <li className="Point">
                                разбиваем пользователей на две контрольные группы
                            </li>
                            <li className="Point">
                                по прошествию эксперимента реализуем все необходимые расчёты,
                                которые также будут вам доступны
                            </li>
                            <li className="Point">
                                формируем итог эксперимента.
                            </li>
                        </ul>

                    </div>
                </a>
            </div>

        </main>
        </body>
    );
}

export default Home;