import { Button } from "@mui/material"
import './css/Header.css';

export default function Header () {

    return (
        <div className="Header">
            <div className='title'>Priut</div>
            <Button variant="outlined">Login</Button>
        </div>
    )
}
