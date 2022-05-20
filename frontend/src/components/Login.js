import React, {useContext} from 'react';
import Header from './Header';
import './Registration.css';
import './Login.css';
import AuthContext from '../services/Api.js';
import {Link} from "react-router-dom";

function Auth() {
    const {loginUser} = useContext(AuthContext);
    const handleSubmit = e => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        username.length > 0 && loginUser(username, password);
    };


    return (

        <form onSubmit={handleSubmit} className="LoginForm">
            <div className="RegName">
                Войти:
            </div>
            <div className="RegText">
                <div>Логин:</div>
                <input type="text" id="username" placeholder="Enter Username"/>
            </div>
            <div className="RegText">
                <div>Пароль:</div>
                <input type="password" id="password" placeholder="Enter Password"/>
            </div>

            <button className='LogButton'>
                Войти
            </button>


            <Link className='AlreadyReg' to='/registration'>
                Нет аккаунта?
            </Link>

        </form>

    );
}


function Login() {
    return (
        <div>
            <Header/>
            <div className="RegMain">
                <div className="RegRectangle">
                    <Auth/>
                </div>
            </div>
        </div>
    );
}

export default Login;