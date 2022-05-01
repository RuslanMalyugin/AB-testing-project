import React, {useContext} from 'react';
import './Header.css';
import logo from "./imgs/AB-logo.png";
import AuthContext from "../services/Api";

function Header() {

    const {user, logoutUser} = useContext(AuthContext);

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
                    <button onClick={logoutUser} className='item'>
                        Выход
                    </button>
                ) : (
                    <div className="item">
                        <a href='/registration'>
                            Логин
                        </a>
                    </div>
                )}

            </div>

        </div>
    );
}

export default Header;