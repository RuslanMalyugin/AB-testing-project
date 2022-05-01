import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './Home';
import './App.css';
import About from './About'
import Registration from './Registration'
import Login from "./Login";
import Experiments from "./Experiments";
import NewExperiment from "./NewExperiment";
import {AuthProvider} from "../services/Api";

function App() {

    return (
        <div className="App">

            <Router>
                <AuthProvider>
                    <Routes>
                        <Route exact path='/' element={< Home/>}/>
                        <Route path='/about' element={< About/>}/>
                        <Route path='/registration' element={< Registration/>}/>
                        <Route path='/login' element={< Login/>}/>
                        <Route path='/account' element={< Experiments/>}/>
                        <Route path='/new_exp' element={< NewExperiment/>}/>
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;