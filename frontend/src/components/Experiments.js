import React, {Component, useContext, useEffect, useState} from 'react';
import Header from './Header';
import './Experiments.css';
import plus from "./imgs/plus.png";
// import {downloadExperiments} from "../services/Api";
import './Orders.css'
import AuthContext from "../services/Api";
import useAxios from "../services/useAxios";
import Login from "./Login";


function Experiments() {
    const {user} = useContext(AuthContext);

    const [res, setRes] = useState([]);
    const api = useAxios();

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get("api/unfinished_experiments/");
            setRes(response.data);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    console.log(res)

    return (

        <div>
            {user ? (
                    <div>
                        <Header/>
                        <main className='NewMain'>
                            <div className='Rectangle'>
                                <div className='Menu' >
                                    <div className='SmallRecLeft' >
                                        Текущие
                                    </div>

                                    <div className='SmallRecRight' >
                                        Завершённые
                                    </div>
                                </div>
                                <>
                                    {res.map(exp => (<tr>
                                        <td>{exp.name}</td>
                                        <td>{exp.id}</td>
                                    </tr>))}
                                </>

                                <div className='SmallRecUndButton'>

                                    <div className='RoundButton'>
                                        <a href='/new_exp'>
                                            <div className='Plus'>
                                                <img src={plus}/>
                                            </div>
                                        </a>
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


export default Experiments;

