import './App.module.css';
import React from 'react'
import Header from "./components/Header/Header";
import Main from "./pages/Home/Main/Main";
import Why from "./pages/Home/Why/Why";
import s from "./App.module.css"
import Advantages from "./pages/Home/Advantages/Advantages";
import RequestForm from "./pages/Home/RequestForm/RequestForm";
import Footer from "./components/Footer/Footer";
import {useEffect, useState} from "react";

function App() {

  return (
        <div  className={s.container}>
            <Header />
            <Main />
            <Footer/>
        </div>
    );
}

export default App;
