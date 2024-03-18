import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Data } from "../App";
import './css/Header.css';

export default function Header () {
    const navigate = useNavigate();
    const { user } = useContext(Data);
    const handleClick = () => {
        user.auth === true ?
            navigate("/logout") : navigate("/login")
    }
    return (
        <div className="Header">
            <div className='title'>
                <a href="/">Priut</a>   
                <a href="/main">Главная</a>
                <a href="/payments">Payments</a>
            </div>
            <Button variant="outlined" onClick={handleClick}>{ user.auth === true ? "Logout" : "Login" }</Button>
        </div>

    )
}
