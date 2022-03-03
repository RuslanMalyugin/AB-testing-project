import React from 'react';
import './Footer.css';

import email from './imgs/email.png'
import phone from './imgs/phone.png'
import telegram from './imgs/telegram.png'
import vk from './imgs/vk.png'


function Footer() {
    return (
        <footer className="Footer">
            <div className="Contact">

                <img src={email} width="32px" alt="email"/>
                <a href='mailto: ololo1234123@bk.ru'>
                    ololo1234123@bk.ru
                </a>
            </div>
            <div className="Contact">
                <img src={phone} width="32px" alt="phone"/>
                <a href='tel:+7 (925) 420 57 00'>
                    +7 (925) 420 57 00
                </a>
            </div>
            <div className="Contact">
                <img src={telegram} width="32px" alt="telegram"/>
                <a href='https://t.me/MalyuginRuslan'>
                    @MalyuginRuslan
                </a>
            </div>
            <div className="Contact">
                <img src={vk} width="32px" alt="vk"/>
                <a href='https://vk.com/id326977916'>
                    vk.com/id326977916
                </a>
            </div>
            <div className="Contact" >
                <div className="Contact" style={{color: '#03045E'}}> Разработчик: Малюгин Руслан</div>
            </div>
        </footer>
    );
}

export default Footer;