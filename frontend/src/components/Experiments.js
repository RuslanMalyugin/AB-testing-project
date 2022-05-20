import React, {Component, useContext, useEffect, useState} from 'react';
import Header from './Header';
import './Experiments.css';
import plus from "./imgs/plus.png";
// import {downloadExperiments} from "../services/Api";
import './Orders.css'
import AuthContext from "../services/Api";
import useAxios from "../services/useAxios";
import Login from "./Login";
import {Link} from "react-router-dom";


/*
function RegistrationForm() {
    const [spec, setSpec] = React.useState('');
    const [date, setDate] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [name, setName] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let formData = new FormData(e.target)
        formData.append('specialization', spec)
        formData.append('name', name)
        formData.append('date', date)
        formData.append('price', price)
        createOrder(Object.fromEntries(formData))
    };

    return (
        <form onSubmit={handleSubmit} className="RegistrationForm">
            <div className="RegName">
                Оставить заказ:
            </div>
            <div className="Text">
                <div>ФИО:</div>
                <input type='name' name='name' value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="Text">
                <div>Специализация:</div>
                <input type='spec' name='spec' value={spec} onChange={(e) => setSpec(e.target.value)}/>
            </div>
            <div className="Text">
                <div>Дата:</div>
                <input type='date' name='date' value={date}
                       onChange={(e) => setDate(e.target.value)}/>
            </div>
            <div className="Text">
                <div>Цена:</div>
                <input type='price' name='price' value={price}
                       onChange={(e) => setPrice(e.target.value)}/>
            </div>
            <div className="Enter">
                <button className='RegButton'>
                    Опубликовать
                </button>
            </div>
        </form>
    );
}
*/



function Experiments() {
    const {user} = useContext(AuthContext);

    const [res, setRes] = useState([]);
    const api = useAxios();

    useEffect(() => {
        const fetchData = async () => {
            // TO DO finished exp not unfinished
            const response = await api.get("api/unfinished_experiments/");
            setRes(response.data);
            console.log(res)
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div>
            {user ? (
                <div>
                    <Header/>
                    <main className='NewMain'>
                        <div className='Rectangle'>
                            <div className='Menu' >
                                <div className='SmallRecLeft' >
                                    <div className='Underline'>
                                        <Link to="/account">
                                            Текущие
                                        </Link>
                                    </div>
                                </div>
                                <div className='SmallRecRight' >
                                    <Link to="/completed">
                                        Завершённые
                                    </Link>
                                </div>
                            </div>

                            <div className='Experiments'>
                                <table>
                                    <>
                                        {res.map(exp => (<tr>
                                            <td> <Link to={`/experiment/${exp.id}`}>{exp.name}</Link>
                                                </td>
                                            {/*<td>{exp.name}</td>*/}
                                            <td>{exp.text}</td>
                                        </tr>))}
                                    </>
                                </table>
                            </div>

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

