import React, {useContext, useEffect, useState} from 'react';
import './Header.css';
import logo from "./imgs/AB-logo.png";
import AuthContext from "../services/Api";
import {Link} from "react-router-dom";
import useAxios from "../services/useAxios";

function Header() {

    const {user, logoutUser} = useContext(AuthContext);


    const [res, setRes] = useState([]);
    const api = useAxios();

    useEffect(() => {
        const fetchData = async () => {
            // TO DO finished exp not unfinished
            const response = await api.get("api/unfinished_experiments/");
            setRes(response.data);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="Header">
            <div className="logo">
                <a href='/'>
                    <img src={logo} width={100}/>
                </a>
            </div>
            <div className="items">
                <div className="item">
                    <a href="/#aboutUs">
                        О нас <br/>
                    </a>
                </div>

                {user ? (
                    <>
                    <div className="item">
                        <Link to="/account">
                            Мои эксперименты
                        </Link>
                    </div>

                    <button onClick={logoutUser} className='item'>
                        Выход
                    </button>
                    </>
                ) : (
                    <>
                    <div className="item">
                        <a href='/registration'>
                            Зарегистрироваться
                        </a>
                    </div>
                    <div className="item">
                        <a href='/login'>
                        Войти
                        </a>
                    </div>
                    </>
                )}

            </div>

        </div>
    );
}

export default Header;