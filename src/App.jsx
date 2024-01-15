import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import Pokemoncard from "./component/Pokemon/Pokemoncard.jsx";
import Home from "./pages/Home/Home.jsx";
import {Routes, Route} from 'react-router-dom';
import NotFound from "./pages/Notfound/NotFound.jsx";
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App
