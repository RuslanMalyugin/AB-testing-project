import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './Home';
import './App.css';
import Registration from './Registration'
import Login from "./Login";
import Experiments from "./Experiments";
import NewExperiment from "./NewExperiment";
import Completed from "./Completed";
import {AuthProvider} from "../services/Api";
import Experiment from "./Experiment";
import Result from "./Result";
import BigResult from "./BigResult";

function App() {

    return (
        <div className="App">

            <Router>
                <AuthProvider>
                    <Routes>
                        <Route exact path='/' element={< Home/>}/>
                        <Route path='/completed' element={< Completed/>}/>
                        <Route path='/registration' element={< Registration/>}/>
                        <Route path='/login' element={< Login/>}/>
                        <Route path='/account' element={< Experiments/>}/>
                        <Route path='/new_exp' element={< NewExperiment/>}/>
                        <Route path='/result/:expid' element={< Result/>}/>
                        <Route path='/big_result/:expid' element={< BigResult/>}/>
                        <Route path="/experiment/:expid" element={< Experiment/>} />
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;