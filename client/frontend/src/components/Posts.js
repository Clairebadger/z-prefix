import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import BlogContext from "./BlogContext";
import BlogPost from "./BlogPost";
import './styles/Posts.css'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { Button } from "@mui/material";
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const Posts = ({user}) => {
    let [posts, setPosts] = useState([])
    let {userId} = useContext(BlogContext)
    let getUrl 
    let navigate = useNavigate()
    //get the posts inside useEffect. if user is true, then get it with the user id. else get them all 
    //have a post button 

    const handleClick = (val, user) =>{ //handle the navigations on click
        if (val === 0){
            navigate('/posts/add')
        }
        else{
            navigate(`/posts/details/${val}`)
        }
        
    }

    useEffect(()=>{ 
        user ? getUrl = `${ApiUrl}posts/${userId}` : getUrl = `${ApiUrl}posts`
        console.log(getUrl)
        fetch(getUrl)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setPosts(data)
                if (user){
                    console.log(userId)
                }
            })
        
    },[user])

    return (
        <>
        {
            user ? <Box m={2} pt={3}><Button variant="contained" onClick={() => handleClick(0)}>Add post</Button></Box> : <></>
        }
        <Container spacing={24} maxWidth="lg" className="post-page">
            
            <Grid container spacing={3} direction="row" justifyContent="space-evenly" alignItems="center">
                {   
                    posts.length === 0 ?
                        
                        <div>
                            Make your first post with the "add" button!
                        </div>
                        
                    :
                    posts.map((element,index) => {
                        return (
                            <Grid item md={4} key={index}>
                                <BlogPost title = {element.title} username = {element.username} content = {element.content} callback = {() => handleClick(element.id, element.userid)}/>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Container>
        </>
    )

}

export default Posts
