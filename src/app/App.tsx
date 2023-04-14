import React, {createContext, useState} from 'react';
import styles from "./App.module.scss";
import {BrowserRouter} from "react-router-dom";
import {Navbar} from "../components/Navbar";
import {AppRouter} from "../features/AppRouter";

export type SearchContextType = {
    searchValue: string
    setSearchValue: (text: string) => void
}
export const SearchContext = createContext<SearchContextType | null>(null)

function App() {
    const [searchValue, setSearchValue] = useState('')

    return (
        <BrowserRouter>
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Navbar/>
                <div className={styles.container}>
                    <AppRouter/>
                </div>
            </SearchContext.Provider>
        </BrowserRouter>
    );
}

export default App;
