import './NewExperiment.css';
import React, {Component, useContext, useEffect, useState} from 'react';
import Header from './Header';
import './Experiments.css';
import './Experiment.css';
import './Orders.css'
import AuthContext from "../services/Api";
import useAxios from "../services/useAxios";
import Login from "./Login";
import {Link, useNavigate} from "react-router-dom";
import {AxiosError} from "axios";
import {AxiosResponse} from "axios";


function Experiment() {
    const {user} = useContext(AuthContext);

    const len_base_url = '/experiment/'.length;
    let current_id = (window.location.pathname);
    current_id = current_id.slice(len_base_url);
    current_id = parseInt(current_id);
    let navigate = useNavigate();

    function handleSubmitForDelete(event) {
        api.delete('api/delete_experiment/',
            {
                params:
                    {id: current_id}
            }
        ).then((response: AxiosResponse) => {
            navigate('/account')
        }).catch((reason: AxiosError) => {
            alert("Something went wrong")
            console.log(reason.message)
        })
    }

    function handleSubmitForStart(event) {
        api.post('api/start_experiment/',
            {id: current_id}
        ).then((response: AxiosResponse) => {
            window.location.reload(true);
        }).catch((reason: AxiosError) => {
            alert("Something went wrong")
            console.log(reason.message)
        })

    }

    function handleSubmitForFinish(event) {
        api.post('api/finish_experiment/',
            {id: current_id}
        ).then((response: AxiosResponse) => {
            window.location.reload(true);
        }).catch((reason: AxiosError) => {
            alert("Something went wrong")
            console.log(reason.message)
        })
    }

    const [res, setRes] = useState([]);
    const api = useAxios();

    useEffect(() => {
        const fetchData = async () => {
            // TO DO finished exp not unfinished
            const response = await api.get("api/get_experiment/", {
                params:
                    {
                        id: current_id
                    }
            });
            setRes(response.data[0]);
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
                            <div className='Menu'>
                                <div className='SmallRecLeft'>
                                    <div className='Underline'>
                                        <Link to="/account">
                                            Текущие
                                        </Link>
                                    </div>
                                </div>
                                <div className='SmallRecRight'>
                                    <Link to="/completed">
                                        Завершённые
                                    </Link>
                                </div>
                            </div>


                            <div className='RecCenter'>
                                <div className='RowRecCenter'>
                                    {res.name}
                                </div>
                                <div className='RowRecCenter'>
                                    {res.text}
                                </div>
                                {res.finish_date ? (<div className='RowRecCenter'>
                                    {res.main_metric}

                                </div>) : (<div>

                                </div>)}

                            </div>

                            <div className='ExpText'>
                                Статус: {res.is_finished ? "Завершен" : "Не завершен"}
                            </div>


                            {!res.is_finished ? (

                                <div className='SmallRecUndButton '>
                                    {!res.is_started ? (
                                        <>
                                            <button onClick={handleSubmitForStart} className='ButtonConcl'>
                                                {/*<Link to={`/result/${current_id}`}> </Link>*/}
                                                Начать эксперимент
                                            </button>
                                        </>) : (<></>)
                                    }
                                    <button onClick={handleSubmitForDelete} className='ButtonMoreConcl'>
                                        {/*<Link to={`/big_result/${current_id}`}></Link>*/}
                                        Удалить эксперимент
                                    </button>
                                    {res.finish_date ? (

                                        <>
                                            {Date.parse(res.finish_date.slice(5, 7) + "-" +
                                                res.finish_date.slice(8, 10) + "-" +
                                                res.finish_date.slice(0, 4) + " " +
                                                res.finish_date.slice(11, 19)).valueOf() < Date.now().valueOf() ?
                                                (<button onClick={handleSubmitForFinish} className='ButtonMoreConcl'>
                                                    {/*<Link to={`/big_result/${current_id}`}></Link>*/}
                                                    Завершение эксперимента
                                                </button>) : (
                                                    <div className='ButtonMoreConcl'>
                                                        Подождите
                                                        еще {Math.floor(Math.abs(Date.parse(res.finish_date.slice(5, 7)
                                                                + "-"
                                                                +
                                                                res.finish_date.slice(8, 10) +
                                                                "-" +
                                                                res.finish_date.slice(0, 4) +
                                                                " " +
                                                                res.finish_date.slice(11, 19)).valueOf()
                                                            - Date.now().valueOf())
                                                        / (1000 * 3600))} часов
                                                    </div>
                                                )
                                            }
                                        </>
                                    ) : (
                                        <>

                                        </>
                                    )}
                                </div>


                            ) : (
                                <div>
                                    <button onClick={handleSubmitForDelete} className='ButtonMoreConcl'>
                                        Удалить эксперимент
                                    </button>
                                    <dev className='ButtonMoreConcl'>
                                        <Link to={`/result/${current_id}`}>
                                            Итог
                                        </Link>
                                    </dev>
                                </div>
                            )}
                        </div>

                    </main>

                </div>
            ) : (
                <Login/>
            )}
        </div>
    );
}


//
//
// function NewForm() {
//     const [title, setTitle] = React.useState('');
//     const [description, setDescription] = React.useState('');
//     const [metric, setMetric] = React.useState('');
//     const [addMetric, setAddMetric] = React.useState('');
//     const [power, setPower] = React.useState('');
//     const [level, setLevel] = React.useState('');
//     const [dbref, setdbref] = React.useState('');
//
//     const handleSubmit = (e: React.FormEvent) => {
//     };
//
//
//     return (
//         <form onSubmit={handleSubmit} className='RecCenter'>
//
//             <input
//                 type="title"
//                 id='title'
//                 placeholder="Название эксперимента*"
//                 onChange={e => setTitle(e.target.value)}
//                 required
//             />
//
//             <input
//                 type="description"
//                 id='description'
//                 placeholder="Краткое описание"
//                 onChange={e => setDescription(e.target.value)}
//             />
//
//             <input
//                 type="metric"
//                 id='metric'
//                 placeholder="Основная метрика*"
//                 onChange={e => setMetric(e.target.value)}
//                 required
//             />
//
//             <input
//                 type="addMetric"
//                 id='addMetric'
//                 placeholder="Дополнительная метрика"
//                 onChange={e => setAddMetric(e.target.value)}
//             />
//
//             <input
//                 type="power"
//                 id='power'
//                 placeholder="Мощность критерия*"
//                 onChange={e => setPower(e.target.value)}
//                 required
//             />
//
//             <input
//                 type="level"
//                 id='level'
//                 placeholder="Уровень значимости*"
//                 onChange={e => setLevel(e.target.value)}
//                 required
//             />
//
//
//             <Uploader/>
//
//             <input
//                 type="dbref"
//                 id='dbref'
//                 placeholder="Ссылка на подключение к бд с метриками*"
//                 onChange={e => setdbref(e.target.value)}
//                 required
//             />
//             <button className='ButtonAdd'>
//                 Добавить
//             </button>
//         </form>
//     )
//
// }
//
//
// function NewExperiment() {
//     return (
//         <div>
//             <AuthProvider>
//                 <Header/>
//                 <main className='MainNewExp'>
//                     <div className='Rectangle'>
//
//                         <div className='Menu'>
//                             <div className='SmallRecLeft'>
//                                 <Link to="/account">
//                                     Текущие
//                                 </Link>
//                             </div>
//                             <div className='SmallRecRight'>
//                                 <Link to="/completed">
//                                     Завершённые
//                                 </Link>
//                             </div>
//                         </div>
//
//                         <NewForm/>
//
//                         {/*<div className='SmallRecUndButton '>*/}
//                         {/*    <div className='ButtonConcl'>*/}
//                         {/*        Итог*/}
//                         {/*    </div>*/}
//                         {/*    <div className='ButtonMoreConcl'>*/}
//                         {/*        Подробная информация*/}
//                         {/*    </div>*/}
//                         {/*</div>*/}
//
//                     </div>
//
//                 </main>
//             </AuthProvider>
//         </div>
//     );
// }

export default Experiment;