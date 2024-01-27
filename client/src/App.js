import React from 'react';
import { createContext, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './DesktopVersion/Home';
import Header from './DesktopVersion/Header';
import Form from './DesktopVersion/Form';
import Login from './DesktopVersion/Login';
// import MobileHome from './MobileVersion/Home';
// import MobileHeader from './MobileVersion/Header';


const Data = createContext(null);

export default function App() {
    const [data, setData] = useState({
        auth: localStorage.getItem("auth") === "true" || false,
        token: localStorage.getItem("access_token"),
    })

    const setterWrapper = (data) => {
        setData(data);
        localStorage.setItem("auth", data.auth);
        localStorage.setItem("access_token", data.token);
    }   

    axios.defaults.baseURL = "https://priut-29ra.onrender.com/api";
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

    return (
        <Data.Provider value={{user: data, setter: setterWrapper}}>
            <BrowserView>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/new-post" element={<Form />} />
                    </Routes>
                </BrowserRouter>
                <MobileView>
                    {/* <MobileHeader /> */}
                    <Routes>
                        {/* <Route path="/" element={<MobileHome />} />
                        <Route path="/login" element={<MobileLogin />} /> */}
                    </Routes>
                </MobileView>
            </BrowserView>
            <ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored" />
        </Data.Provider >
    )
}

export {Data};