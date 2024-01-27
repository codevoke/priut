import axios from "axios";
import { Data } from "../App";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Divider } from "@mui/material";

import './css/Form.css';


export default function Form() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(false);
    const [hasRequest, setHasRequest] = useState(false);

    const navigate = useNavigate();
    const data = useContext(Data);
    
    useEffect(() => {
        if (data.user.auth !== true) {
            toast.info("Please login first");
            navigate("/login?redirect=" + window.location.pathname);
        }
    }, [data.user.auth, navigate]);

    const sendPost = () => {
        if (loading)
            setTimeout(sendPost, 100);
            
        var body = {
            title: title,
            content: content
        }
        file && (body.image = file);

        setHasRequest(true);
        toast.info("Uploading post...");
        
        axios.post('/post', body)
        .then(res => {
            setHasRequest(false);
            toast.success("Post uploaded successfully");
            navigate("/");
        })
        .catch(err => {
            setHasRequest(false);
            toast.error("Something went wrong: " + err.message);
        })
    }

    return (

        <div className="form-wrapper">
            <center><span className="title"> Create new post </span></center>
            <Divider />
            <TextField
                label="title" 
                variant="outlined" 
                placeholder="Title"
                onChange={e => setTitle(e.target.value)} />
            <TextField 
                label="content" 
                variant="outlined" 
                placeholder="Title"
                multiline
                maxRows={10}
                minRows={5}
                onChange={e => setContent(e.target.value)} />
                
            <UploaderInput onChange={
                (file) => {
                    setLoading(true);
                    toast.info("Uploading image...");
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        setFile(reader.result);
                        setLoading(false);
                        toast.success("Image uploaded");
                    }
                }
            }/>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={sendPost} 
                className="submit"
                disabled={loading || hasRequest}
            > Submit </Button>
        </div>
    )
}


function UploaderInput({ onChange }) {
    const [fileName, setFileName] = useState('');
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setFileName(file.name);
        onChange(file);
      }
    };
  
    return (
        <Button component="label" variant="outlined">
            { fileName ? `Прикреплено (${fileName})` : "Прикрепить файл" }
            <input 
                type="file" 
                accept="image/png, image/jpeg" 
                onChange={handleFileChange} 
                id='photo-uploader'
                className="visually-hidden-input"
            />
        </Button>
    );
}

