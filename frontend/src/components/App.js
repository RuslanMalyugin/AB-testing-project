import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './Home';
import './App.css';
import About from './About'
import Registration from './Registration'
import Login from "./Login";
import Orders from "./Orders";
import Experiments from "./Experiments";
import NewExperiment from "./NewExperiment";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path='/' element={< Home/>}/>
                    <Route path='/about' element={< About/>}/>
                    <Route path='/registration' element={< Registration/>}/>
                    <Route path='/login' element={< Login/>}/>
                    <Route path='/take_order' element={< Orders />} />
                    <Route path='/account' element={< Experiments />} />
                    <Route path='/new_exp' element={< NewExperiment />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;