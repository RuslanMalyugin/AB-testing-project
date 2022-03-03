import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './Registration.css';
import {createOrder} from "../services/Api";

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


function NewOrder() {
    return (
        <div>
            <Header/>
            <div className="Rectangle">
                <RegistrationForm/>
            </div>
            <Footer/>
        </div>
    );
}

export default NewOrder;