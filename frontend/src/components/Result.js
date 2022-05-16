import React, {Component, useContext, useEffect, useState} from 'react';
import Header from './Header';
import './Experiments.css';
import './NewExperiment.css';
import {Link} from "react-router-dom";
import Login from "./Login";
import './Orders.css'
import AuthContext from "../services/Api";
import api from "../services/Api";
import useAxios from "../services/useAxios";


function Result() {
    const {user} = useContext(AuthContext);

    const len_base_url = '/result/'.length;
    let current_id = (window.location.pathname);
    current_id = current_id.slice(len_base_url);
    current_id = parseInt(current_id);


    const [res, setRes] = useState([]);
    const api = useAxios();

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get("api/get_experiment_result/", {
                params:
                    {
                        id: current_id
                    }
            });
            setRes(response.data);

        };
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {user ? (
                <div>
                    <Header/>
                    <main className='NewMainRes'>
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
                                            {res.map(exp => (
                                                exp.name
                                            ))}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Доверительный интервал:
                                        </td>
                                        <td>
                                            {res.map(exp => (
                                                '(' + exp.confidence_interval_l + ', ' + exp.confidence_interval_r + ')'
                                            ))}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Величина эффекта:
                                        </td>
                                        <td>
                                            {res.map(exp => (
                                                exp.effect_value
                                            ))}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Итог:
                                        </td>
                                        <td>
                                            {res.map(exp => (
                                                exp.description
                                            ))}
                                        </td>
                                    </tr>

                                </table>

                            </div>
                            <div>

                                {res.map(exp => (
                                    <p className="fig">
                                        <img width={1500} src={"data:image/png;base64," + exp.graph.slice(2, -1)}/>
                                    </p>
                                ))}
                            </div>



                                <div className='ButtonReturn'>
                                    <Link to={`/experiment/${current_id}`}> Назад </Link>
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

export default Result;