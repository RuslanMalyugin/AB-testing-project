import React, {Component, useContext} from 'react';
import Header from './Header';
import './Experiments.css';
import './NewExperiment.css';
import {Link} from "react-router-dom";
import Login from "./Login";
import './Orders.css'
import AuthContext from "../services/Api";


function BigResult() {
    const {user} = useContext(AuthContext);

    const len_base_url = '/experiment/'.length;
    let current_id = (window.location.pathname);
    current_id = current_id.slice(len_base_url);
    current_id = parseInt(current_id);

    return (
        <div>
            {user ? (
                <div>
                    <Header/>
                    <main className='NewMain'>
                        <div className='Rectangle'>
                            <div className='Menu'>
                                <div className='SmallRecLeft'>

                                    <Link to="/account">
                                        Текущие
                                    </Link>

                                </div>
                                <div className='SmallRecRight'>
                                    <Link to="/completed">
                                        Завершённые
                                    </Link>
                                </div>
                            </div>

                            <div className='Experiments'>
                                <table>
                                    <tr>
                                        <td>
                                            Название:
                                        </td>
                                        <td>
                                            algo
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Доверительный интервал:
                                        </td>
                                        <td>
                                            (3, 7)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Итог:
                                        </td>
                                        <td>
                                            Успешно
                                        </td>
                                    </tr>

                                </table>
                            </div>

                            <div className='SmallRecUndButton '>
                                <div className='ButtonConcl'>
                                    <Link to={`/experiment/${current_id}`}> Назад </Link>
                                </div>

                            </div>

                        </div>

                    </main>

                </div>
            ) : (
                <Login/>
            )}
        </div>
    );
}

export default BigResult;