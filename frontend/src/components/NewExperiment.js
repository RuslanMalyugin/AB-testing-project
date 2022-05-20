import React, {Component} from 'react';
import Header from './Header';
import './Experiments.css';
import './NewExperiment.css';
import axios from 'axios';
import {AuthProvider} from "../services/Api";
import {Link, useNavigate} from "react-router-dom";
import useAxios from "../services/useAxios";
import {AxiosError} from "axios";

function ValidateField(value) {
    return 0 < value < 1;

}

function NewForm() {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [metric, setMetric] = React.useState('');
    const [addMetric, setAddMetric] = React.useState('');
    const [power, setPower] = React.useState('');
    const [level, setLevel] = React.useState('');
    const [dbref, setdbref] = React.useState('');
    const [mde, setMde] = React.useState(1);
    const [file, setFile] = React.useState(null);
    const [file2, setFile2] = React.useState(null);
    const [exp_duration, setExp_duration] = React.useState('');


    const api = useAxios();
    let navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        let formData = new FormData(e.target)
        formData.append('name', title)
        formData.append('text', description)
        formData.append('second_metric', addMetric)
        formData.append('power', power)
        formData.append('main_metric', metric)
        formData.append('significance_level', level)
        formData.append('base_link', dbref)
        formData.append('mde', mde)
        var blob = new Blob([file], { type: 'text/csv;charset=utf-8;'});
        formData.append('data', blob)
        var blob2 = new Blob([file2], { type: 'text/csv;charset=utf-8;'});
        formData.append('data2', blob2)
        console.log(file2)
        formData.append('duration', exp_duration)
        if ((power_valid && level_valid)) {
            alert("Уровень значимости и мощность критерия должны быть числами от 0 до 1!")
        } else {
            api.post('api/add_experiment/', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((response: AxiosResponse) => {
                navigate('/account')
            }).catch((reason: AxiosError) => {
                alert("Something went wrong")
                console.log(reason.message)
            })
        }
    };


    const [power_valid, setPowerValid] = React.useState(false);
    const [level_valid, setLevelValid] = React.useState(false);


    const handleUserInputPower = (e) => {
        const val = e.target.value;
        setPower(val);
        setPowerValid(ValidateField(val));
    }

    const handleUserInputLevel = (e) => {
        const val = e.target.value;
        setLevel(val);
        setLevelValid(ValidateField(val));
    }

    return (
        <form onSubmit={handleSubmit} className='RecCenter'>

            <input
                type="title"
                id='title'
                placeholder="Название эксперимента*"
                onChange={e => setTitle(e.target.value)}
                required
            />

            <input
                type="description"
                id='description'
                placeholder="Краткое описание"
                onChange={e => setDescription(e.target.value)}
            />

            <input
                type="metric"
                id='metric'
                placeholder="Основная метрика*"
                onChange={e => setMetric(e.target.value)}
                required
            />

            <input
                type="addMetric"
                id='addMetric'
                placeholder="Дополнительная метрика"
                onChange={e => setAddMetric(e.target.value)}
            />

            <input
                type="power"
                type="number"
                step="any"
                id='power'
                placeholder="Мощность критерия*"
                onChange={handleUserInputPower}
                min="0" max="1"
                required
            />

            <input
                type="level"
                type="number"
                step="any"
                id='level'
                placeholder="Уровень значимости*"
                onChange={handleUserInputLevel}
                min="0" max="1"
                required
            />

            <input
                type="level"
                type="number"
                step="any"
                id='level'
                placeholder="Минимальное детектируемое изменение(абсолютное)*"
                onChange={e => setMde(e.target.value)}
                required
            />


            <div className="DataBox">
                <div className="Text">
                    Место для файла с пользователями
                </div>

                <input type="file" onChange={e => {
                    setFile(e.target.files[0])
                }

                }/>
            </div>

            <div className="DataBox">
                <div className="Text">
                    Место для файла с историческими данными
                </div>

                <input type="file" onChange={e => {
                    setFile2(e.target.files[0])
                }

                }/>
            </div>

            <input
                type="dbref"
                id='dbref'
                placeholder="Ссылка на подключение к бд с метриками*"
                onChange={e => setdbref(e.target.value)}
                required
            />

            <input
                type="exp_duration"
                id="exp_duration"
                placeholder="Длительностей эксперимента в днях*"
                onChange={e => setExp_duration(e.target.value)}
                required
            />

            <button className='ButtonAdd'>
                Добавить
            </button>
        </form>
    )

}

function NewExperiment() {
    return (
        <div>
            <AuthProvider>
                <Header/>
                <main className='MainNewExp'>
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

                        <NewForm/>


                    </div>

                </main>
            </AuthProvider>
        </div>
    );
}

export default NewExperiment;