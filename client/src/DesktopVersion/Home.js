import { useContext, useEffect, useState } from "react"
import { Data } from "../App"
import Fab from '@mui/material/Fab';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

import './css/Home.css';


export default function Home() {
    return (
        <div className="HomePage">
            <PostLoader />
            <NewPostButton />
        </div>
    )
}


function NewPostButton () {
    const data = useContext(Data);

    return data.user.auth &&
        <div className="fab-wrapper">
            <Fab
                variant="extended"
                color="primary"
                aria-label="add"
                href="/new-post"
            > 
                + new post
            </Fab>
        </div>
}

function PostLoader () {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        axios.get("/post").then(
            res => {setPosts(res.data.posts)}
        );
    }, [])

    return (
        <div className="post-wrapper"> {
            posts ?
                posts.map(post => 
                    <Post 
                        key={post.id} 
                        title={post.title} 
                        content={post.content}
                        image={post.image} />
                )
                : "loading..." 
        }
        </div>
    )
}

function Post ({title, content, image}) {
    return (
        <Card sx={{ maxWidth: 600 }}>
            <CardMedia
                sx={{ height: 500 }}
                image={image}
                title="picture of post"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
            </CardContent>
        </Card>
    )
}
