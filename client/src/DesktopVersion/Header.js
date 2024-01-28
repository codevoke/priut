import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './css/Header.css';

export default function Header () {
    const navigate = useNavigate();
    return (
        <div className="Header">
            <div className='title'>Priut</div>
            <Button variant="outlined" onClick={ () => { navigate("/login"} }>Login</Button>
        </div>
    )
}
