import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './About.css'

function About() {
    return (
        <div >
            <Header />
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
            <Footer />
        </div>
    );
}

export default About;