import React from 'react';
import styles from "./App.module.scss";
import {BrowserRouter} from "react-router-dom";
import {Navbar} from "../components/Navbar";
import {AppRouter} from "../features/AppRouter";

function App() {

    return (
        <BrowserRouter>
            <Navbar/>
            <div className={styles.container}><AppRouter/></div>
        </BrowserRouter>
    );
}

export default App;
