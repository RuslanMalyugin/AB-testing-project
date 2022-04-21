import React, {useContext, useState} from 'react';
import Header from './Header';
import './Registration.css';
import AuthContext, {AuthProvider} from "../services/Api";

function RegistrationForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const {registerUser} = useContext(AuthContext);

    const handleSubmit = async e => {
        e.preventDefault();
        registerUser(username, password, password2);
    };

    return (

        <form onSubmit={handleSubmit} className="RegistrationForm">
            <div className="RegName">
                Регистрация:
            </div>
            <div className="RegText">
                <div>Логин:</div>
                <input
                    type="text"
                    id="username"
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
            </div>
            <div className="RegText">
                <label htmlFor="password">Пароль</label>
                <input
                    type="password"
                    id="password"
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
            </div>

            <div className="RegText">
                <label htmlFor="password">Повторите пароль</label>
                <input
                    type="password"
                    id="confirm-password"
                    onChange={e => setPassword2(e.target.value)}
                    placeholder="Confirm Password"
                    required
                />
                <p>{password2 !== password ? "Passwords do not match" : ""}</p>
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
        <AuthProvider>
            <div>
                <Header/>
                <div className="RegMain">
                    <div className="RegRectangle">
                        <RegistrationForm/>
                    </div>
                </div>
            </div>
        </AuthProvider>
    );
}

export default Registration;