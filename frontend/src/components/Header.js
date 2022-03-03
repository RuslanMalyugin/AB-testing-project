import React from 'react';
import './Header.css';
import logo from "./imgs/MTS_Logo_rus_r.jpg";

function LogOut() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.removeItem("access_token")
        window.location.reload();

    };
    return (
        <form onSubmit={handleSubmit}>
            <button className='LogOutButton'>
                      Выход
            </button>
        </form>
    );
}

function Greeting(props) {
    if (localStorage.getItem('access_token') !== "undefined" && localStorage.getItem('access_token')) {
        return <LogOut/>;
    }
    return <a href='/registration'>
        Логин
    </a>;
}

function Header() {
    return (
        <div className="Header">
            <div className="logo">
                <a href='/'>
                    <img src={logo} className="MTS_Logo_rus_r.jpg" width={300}/>
                </a>
            </div>
            <nav>
                <a href='/take_order'>
                    Взять заказ
                </a>
                <a href='/make_order'>
                    Оставить заказ
                </a>
                <a href='/about'>
                    О нас
                </a>
                <Greeting/>
            </nav>
        </div>
    );
}

export default Header;