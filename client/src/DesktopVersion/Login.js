import axios from "axios";
import { Data } from "../App";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Divider } from "@mui/material";

import './css/Form.css';


export default function Form() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const data = useContext(Data);

    const auth = () => {
            
        var body = {
            username: login,
            password: password
        }
        
        axios.post('/auth', body)
        .then(res => {
            toast.success("Authorization successful");
            data.setter({token: res.data.access_token, auth: true});

            var urlParams = new URLSearchParams(window.location.search);

            if (urlParams.get("redirect"))
                navigate(urlParams.get("redirect"));
            else
                navigate("/");
        })
        .catch(err => {
            console.log(err);
            toast.error("Something went wrong: " + err.message || err.request.message);
        })
    }

    return (

        <div className="form-wrapper">
            <center><span className="title"> Create new post </span></center>
            <Divider />
            <TextField
                label="login" 
                variant="outlined" 
                placeholder="no 'admin'!"
                onChange={e => setLogin(e.target.value)} />
            <TextField 
                label="password" 
                variant="outlined" 
                placeholder="please don't write 0000 here"
                multiline
                maxRows={10}
                minRows={5}
                onChange={e => setPassword(e.target.value)} />
            <Button variant="contained" color="primary" onClick={auth} className="submit">Submit</Button>
        </div>
    )
}
