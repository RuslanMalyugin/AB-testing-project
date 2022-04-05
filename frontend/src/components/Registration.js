import React from 'react';
import Header from './Header';
import './Registration.css';
import {createUser} from "../services/Api";

function RegistrationForm() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [usernameErr, setUsernameErr] = React.useState('');
    const [passwordErr, setPasswordErr] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        createUser(Object.fromEntries(formData)).then(data => {
            if (data.hasOwnProperty('username')) {
                if (data.username === username) {
                    window.location.href = "/"
                } else {
                    setUsernameErr(data.username)
                    setPasswordErr(data.password)
                }
            } else if (data.hasOwnProperty('password')) {
                setUsernameErr(data.username)
                setPasswordErr(data.password)
            }
        })
    };

    return (
        <form onSubmit={handleSubmit} className="RegistrationForm">
            <div className="RegName">
                Регистрация:
            </div>
            <div className="Text">
                <div>Электронная почта:</div>
                <input type="email" name='email' placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="Text">
                <div>Логин:</div>
                <input type='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                {usernameErr}
            </div>
            <div className="Text">
                <div>Пароль:</div>
                <input type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                {passwordErr}
            </div>

            <div className="Enter">
                <button className='RegButton'>
                    Зарегистрироваться
                </button>
            </div>

            <a className='AlreadyReg' href='/login'>
                Уже есть аккаунт?
            </a>
        </form>
    );
}


function Registration() {
    return (
        <div>
            <Header/>
            <div className="Rectangle">
                <RegistrationForm/>
            </div>
        </div>
    );
}

export default Registration;