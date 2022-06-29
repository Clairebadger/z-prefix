import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import BlogContext from "./BlogContext";
import BlogPost from "./BlogPost";
import './styles/Posts.css'
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const Posts = ({user}) => {
    let [posts, setPosts] = useState([])
    let {userId} = useContext(BlogContext)
    console.log(userId)
    console.log(user)
    let getUrl 
    let navigate = useNavigate()

    //get the posts inside useEffect. if user is true, then get it with the user id. else get them all 
    //have a post button 

    const handleClick = (val, user) =>{ //handle the navigations on click
        console.log(val)
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
        <div className="post-page">
            {
                user ? <button onClick={() => handleClick(0)}>Add post</button> : <></>
            }
            <div className="post-container">
                {
                    posts.map((element) => {
                        return (
                            <div onClick = {() => handleClick(element.id, element.userid)}>
                                <BlogPost title = {element.title} username = {element.username} content = {element.content}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

}

export default Posts
