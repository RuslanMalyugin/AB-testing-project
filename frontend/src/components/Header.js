import React from 'react';
import './Header.css';
import logo from "./imgs/AB-logo.png";

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
                    <img src={logo} width={100}/>
                </a>
            </div>
            <div className="items">
                <div className="item">
                    <a href="#aboutUs">
                        О нас <br/>
                    </a>
                </div>
                <div className="item">
                    <Greeting/>
                </div>
            </div>

        </div>
    );
}

export default Header;