import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './Registration.css';
import './Login.css';
import {authUser} from '../services/Api.js';

function Auth() {
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [usernameErr, setUsernameErr] = React.useState('');
    const [passwordErr, setPasswordErr] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        authUser(Object.fromEntries(formData))
            .then(data => {
                if (data.hasOwnProperty('username')) {
                    setUsernameErr(data.username)
                    setPasswordErr(data.password)
                } else if (data.hasOwnProperty('password')) {
                    setUsernameErr(data.username)
                    setPasswordErr(data.password)
                } else if (data.hasOwnProperty('detail')) {
                    setUsernameErr(data.detail)
                    setPasswordErr(data.password)
                } else if (data.hasOwnProperty('access_token') || data.hasOwnProperty('refresh')) {
                    localStorage.setItem('access_token', data.access)
                    window.location.href = "/"
                }
            })
    };

    return (
        <form onSubmit={handleSubmit} className="LoginForm">
            <div className="RegName">
                Логин:
            </div>
            <div className="Text">
                <div>Логин:</div>
                <input type='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="Text">
                <div>Пароль:</div>
                <input type='password' name='password' id='password' value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="Enter">
                <button className='RegButton'>
                    Войти
                </button>
            </div>

            <a className='AlreadyReg' href='/registration'>
                Нет аккаунта?
            </a>

        </form>
    );
}


function Login() {
    return (
        <div>
            <Header/>
            <div className="Rectangle">
                <Auth />
            </div>
            <Footer/>
        </div>
    );
}

export default Login;