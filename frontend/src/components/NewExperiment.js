import React, {Component} from 'react';
import Header from './Header';
import './Experiments.css';
import './NewExperiment.css';
import axios from 'axios';
import {AuthProvider} from "../services/Api";


class Uploader extends Component {

    state = {

        // Initially, no file is selected
        selectedFile: null
    };

    // On file select (from the pop up)

    onFileChange = event => {

        // Update the state
        this.setState({selectedFile: event.target.files[0]});

    };

    // On file upload (click the upload button)
    onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file
        console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        axios.post("api/uploadfile", formData);
    };

    // File content to be displayed after
    // file upload is complete


    render() {
        return (

            <div className="DataBox">
                <div className="Text">
                    Место для файла с пользователями
                </div>

                <input type="file" onChange={this.onFileChange}/>
                <button onClick={this.onFileUpload}>
                    Upload!
                </button>
            </div>

        );
    }
}


function NewForm() {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [metric, setMetric] = React.useState('');
    const [addMetric, setAddMetric] = React.useState('');
    const [power, setPower] = React.useState('');
    const [level, setLevel] = React.useState('');
    const [error, setError] = React.useState('');
    const [dbref, setdbref] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
    };


    return (
        <form onSubmit={handleSubmit} className='RecCenter'>

            <input type="title" name='title' placeholder="Название эксперимента*" value={title}
                   onChange={(e) => setTitle(e.target.value)}/>

            <input type="description" name='description' placeholder="Краткое описание" value={description}
                   onChange={(e) => setDescription(e.target.value)}/>

            <input type="metric" name='metric' placeholder="Основная метрика*" value={metric}
                   onChange={(e) => setMetric(e.target.value)}/>

            <input type="addMetric" name='addMetric' placeholder="Дополнительная метрика" value={addMetric}
                   onChange={(e) => setAddMetric(e.target.value)}/>

            <input type="power" name='power' placeholder="Мощность критерия*" value={power}
                   onChange={(e) => setPower(e.target.value)}/>

            <input type="level" name='level' placeholder="Уровень значимости*" value={level}
                   onChange={(e) => setLevel(e.target.value)}/>

            <input type="error" name='error' placeholder="Стандартное отклонение*" value={error}
                   onChange={(e) => setError(e.target.value)}/>


            <Uploader/>

            <input type="dbref" name='dbref' placeholder="Ссылка на подключение к бд с метриками*" value={dbref}
                   onChange={(e) => setdbref(e.target.value)}/>

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
                                Текущие
                            </div>
                            <div className='SmallRecRight'>
                                Завершённые
                            </div>
                        </div>

                        <NewForm/>

                        <div className='SmallRecUndButton '>
                            <div className='ButtonConcl'>
                                Итог
                            </div>
                            <div className='ButtonMoreConcl'>
                                Подробная информация
                            </div>
                        </div>

                    </div>

                </main>
            </AuthProvider>
        </div>
    );
}

export default NewExperiment;