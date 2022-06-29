import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BlogContext from "./BlogContext";
import AddEditPost from "./AddEditPost";
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const ViewPost = () => {
    let {userId} = useContext(BlogContext)
    let [post, setPost] = useState({id: null, title : '', author : '', content : ''})
    let [isEdit, setIsEdit] = useState(false)
    let navigate = useNavigate()
    let temp = window.location.href.split('/')
    let id = temp[temp.length-1]

    let toggleEdit = () =>{
        setIsEdit(!isEdit)
    }

    const removePost = async () => {
        await fetch(`${ApiUrl}post/${id}`, { method: 'DELETE' })
            .then(() => console.log('Delete successful'))
        navigate(`/posts`)
    }

    useEffect (()=> { //fetch the details of the post
        fetch(`${ApiUrl}posts/details/${id}`)
            .then(res => res.json())
            .then(data => {
                setPost(data[0])
                console.log(data[0])
            })
    },[])

    //if the user is equal to the post id then the user can edit it

    return (
        <>
            {
                userId === post.userid ? <button onClick={toggleEdit}> Edit </button> : <></>
            }
            {
                userId === post.userid ? <button onClick={removePost}> Delete </button> : <></>
            }
            {
                isEdit ?

                <AddEditPost action='edit' postid = {id}/>

                :
                <>
                    <h1>{post.title}</h1>
                    <div>{post.username}</div>
                    <div>{post.content}</div>
                </>
            }
            
        </>
    )

}

export default ViewPost