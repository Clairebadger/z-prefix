import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BlogContext from "./BlogContext";
import { Alert } from "@mui/material";
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import EditableText from "./EditableText";
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const ViewPost = () => {
    let {userId} = useContext(BlogContext)
    let [input, setInput] = useState({userid:userId, title: "", content:"",})
    let [post, setPost] = useState({id: null, title : '', author : '', content : ''})
    let [alert, setAlert] = useState(false)
    let [alertContent, setAlertContent] = useState('');
    let [alertLevel, setAlertLevel] = useState('')

    let navigate = useNavigate()
    let temp = window.location.href.split('/')
    let id = temp[temp.length-1]

    let formatPatchReq = () =>{
        let body = {}
        Object.keys(input).forEach((x) => {
            if (input[x] !== '' && input[x] !== null){
                body[x] = input[x]
            }
        })
        return body
    }

    const removePost = async () => {
        await fetch(`${ApiUrl}post/${id}`, { method: 'DELETE' })
            .then(() => console.log('Delete successful'))
        navigate(`/posts`)
    }

    

    const handleSubmit = (e) =>{
        //do some things to make it work for both PATCH and POST
        let request = 'PATCH'
        let body = formatPatchReq() 
        let url = `${ApiUrl}post/${id}`

        fetch(url, {
            method: request,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        .then(res => {
            console.log(res)
            if(res.status ===200){
                setAlertLevel("success")
                setAlertContent("Post is now changed!");
                setAlert(true);
                
            }
            else{
                setAlertLevel("error")
                setAlertContent("An error occurred");
                setAlert(true);
            }
        })
        e.preventDefault()
        
    }

    useEffect (()=> { //fetch the details of the post
        fetch(`${ApiUrl}posts/details/${id}`)
            .then(res => res.json())
            .then(data => {
                setPost(data[0])
            })
    },[])

    //if the user is equal to the post id then the user can edit it or remove it
    return (
        <Container maxWidth="lg" className="post-page" sx={{ height:"100%", background:"#E9F3EB" }}>
            {alert ? <Alert severity={alertLevel}>{alertContent}</Alert> : <></> }
            {userId === post.userid ? <> <Box m={2} pt={3}><Button variant = "outlined" onClick={removePost}> Delete </Button></Box> </>: <></>}
            
            <Grid container spacing={3} direction="column" alignItems="center" justifyContent="space-evenly">
                <Box m={2} pt={3}><EditableText field={"title"} val={post.title} canEdit = {userId === post.userid} callback = {setInput} input = {input}/></Box>
                <Box m={2} pt={3}><EditableText field={"content"} val={post.content} canEdit = {userId === post.userid} callback = {setInput} input = {input}/></Box>

                {userId === post.userid ? <> <Box m={10} pt={3}><Button variant = "outlined" className = 'submitButton' onClick={handleSubmit}>Submit</Button></Box> </>: <></>}
            </Grid>
        </Container>
    )

}

export default ViewPost
