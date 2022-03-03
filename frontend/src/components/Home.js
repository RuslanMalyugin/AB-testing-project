import React from 'react';
import Header from './Header';
import './Home.css';
import family from './imgs/FreeMan.png'
import Footer from "./Footer";


function Home() {
    return (
        <body>
        <Header/>
        <main className='Main'>
            <div className='Banner'>
                <div className='BannerTop'>
                    СЛОГАН <br/>
                    СЛОГАН <br/>
                    СЛОГАН <br/>
                    СЛОГАН <br/>
                </div>
                <div className='BannerDown'>
                    Наш сервис - для тебя! <br/>
                    Проходи простую регистрацию и оставляй свой заказ.
                </div>
                {/*<a className='Reg' href='/login'>*/}
                {/*    Зарегистрироваться*/}
                {/*</a>*/}
            </div>
            <div>
            </div>
        </main>
        <Footer/>
        </body>
    );
}

export default Home;