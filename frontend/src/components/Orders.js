// import React, {Component} from 'react';
// import Header from './Header';
// import './Home.css';
// import './Orders.css'
// import {downloadOrders} from "../services/Api";
//
// class GetOrders extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             catalogue: [],
//             value: '123',
//         }
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleClick = this.handleClick.bind(this);
//     }
//
//
//     componentDidMount() {
//         downloadOrders()
//             .then(json => {
//                 this.setState({catalogue: json})
//             })
//     }
//
//
//     handleSubmit(event) {
//         event.preventDefault();
//     }
//
//     handleClick(value) {
//         let cart = JSON.parse(localStorage.getItem('cart'));
//         if (!cart) {
//             cart = {
//                 items: []
//             }
//         }
//         cart.items.push(value)
//         localStorage.setItem('cart', JSON.stringify(cart))
//     }
//
//
//     render() {
//         return (
//             this.state.catalogue.map(order => (
//                 <tr onSubmit={this.handleSubmit}>
//                     <td>{order.id}</td>
//                     <td>{order.specialization}</td>
//                     <td>{order.date}</td>
//                     <td>{order.price + ' руб.'}</td>
//                     <td>
//                         <button className='TakeButton' onClick={() => this.handleClick(order)}>
//                             Добавить
//                         </button>
//                     </td>
//                 </tr>
//             ))
//         )
//     }
// }
//
//
// function Orders() {
//     return (
//         <body>
//         <Header/>
//         <div className='Orders'>
//             <table>
//                 <tr>
//                     <th>Заказ</th>
//                     <th>Специализация</th>
//                     <th>Дата</th>
//                     <th>Стоимость</th>
//                     <th>Взять заказ</th>
//                 </tr>
//                 <GetOrders/>
//             </table>
//         </div>
//         </body>
//     );
// }
//
// export default Orders;