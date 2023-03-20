import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Navbar} from "../components/Navbar";
import {AppRouter} from "../features/AppRouter";

function App() {

    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
