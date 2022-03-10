import React from 'react';
import Header from './Header';
import './Home.css';
import plotleft from "./imgs/plotleft.png";
import plotright from "./imgs/plotright.png";


function handleSubmit() {
    alert('Что-то');
}

function Home() {
    return (
        <body>
        <Header/>
        <main className='Main'>
            <div className='BannerLeft'>
                <div className='BannerTop'>
                    СЛОГАН <br/>
                    СЛОГАН <br/>
                    СЛОГАН <br/>
                    СЛОГАН <br/>
                </div>
                {/*<a className='Reg' href='/login'>*/}
                {/*    Зарегистрироваться*/}
                {/*</a>*/}
            </div>
            <div className='BannerRight'>
                <div className='Text'>
                    A/B-testing platform <br/>
                </div>
                <div className='Button'>
                    <div className='SmallText'>
                        Приступить к работе <br/>
                    </div>
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


        <a name="about"></a>
        <div className='BannerDown'>
            <div className='SmallText'>
                текст с описанием текст с описанием текст с описанием текст с описанием текст с описанием <br/>
                текст с описанием текст с описанием текст с описанием <br/>
            </div>
        </div>

        <main className='Main'>
            <div className='BannerRight'>
                <div className='MiddleText'>
                    А/В-тестирование круто и очень полезно <br/>
                    А/В-тестирование круто и очень полезно <br/>
                    А/В-тестирование круто и очень полезно <br/>
                    А/В-тестирование круто и очень полезно <br/>
                    А/В-тестирование круто и очень полезно <br/>
                    А/В-тестирование круто и очень полезно <br/>
                    А/В-тестирование круто и очень полезно <br/>
                    А/В-тестирование круто и очень полезно <br/>
                    А/В-тестирование круто и очень полезно <br/>
                    А/В-тестирование круто и очень полезно <br/>
                </div>
                <div className='Picture'>
                    <img src={plotright} width={250}/>
                </div>
            </div>
            <div className='BannerRightDown'>
                <div className='Picture'>
                    <img src={plotleft} width={250}/>
                </div>
                <div className='BannerSystemInfo'>
                    <ul className="Points" type="circle">
                        <li className="Point">
                            Мы помогаем студентам МФТИ справиться с проблемами с успеваемостью по физ-культуре.
                        </li>
                        <li className="Point">
                            На сайте вы можете оставить свою заявку о нужной дате посещения, и другие студенты могут взять ваш заказ.
                        </li>

                        <li className="Point">
                            Гарантируем анонимность до момента подтверждения заказа.
                        </li>

                        <li className="Point">
                            Идея по созданию данного сервиса пришла во время очередной зачетной недели помимо учебных предметов приходилось закрывать в спешке физ-культуру, а так же историями о потерянной стипендии из-за отсутствия нескольких посещений.
                        </li>

                        <li className="Point">
                            Если у вас остались вопросы вы можете связаться с нами, все контакты находятся внизу
                        </li>
                    </ul>

                </div>
            </div>

        </main>

        </body>
    );
}

export default Home;