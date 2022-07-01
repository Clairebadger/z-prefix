import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import config from '../config'
import BlogContext from "./BlogContext";
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const getCurrentDate = () => {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}-${month<10?`0${month}`:`${month}`}-${date<10?`0${date}`:`${date}`}`
}

const AddPost = () => {
    let {userId} = useContext(BlogContext)
    let [input, setInput] = useState({userid:userId, title: "", date:"", content:"",})
    let [errorMsg, setErrorMsg] = useState('')
    let navigate = useNavigate()
    let currdate = getCurrentDate()

    let handleChange = (e) => {
        const value = e.target.value;
        setInput({
          ...input,
          [e.target.name]: value
        });
        e.preventDefault();
    }


    useEffect(()=>{
        setInput({
            ...input,
            date: currdate
          });
    },[])

    const handleSubmit = (e) =>{
        //general variable stuff
        let request = 'POST' 
        let body = input
        let url = `${ApiUrl}post` 
        console.log(body)

        fetch(url, {
            method: request,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        .then(res => {
            console.log(res)
            if(res.status ===200){
                console.log("success")
                navigate('/posts')
            }
            else{
                console.log("not success")
                setErrorMsg("An Error Occured")
            }
        })
        e.preventDefault()
        
    }

    return (
        <Container maxWidth="lg" className="post-page" sx={{marginBottom:"0", background:"#E9F3EB", boxShadow:"0 0 10px rgb(10, 31, 10)", borderRadius:"5px"}}>
            <div>{errorMsg}</div>
            <Box m={2} pt={3}><Typography variant="h4">Add Blog Post</Typography></Box>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3} direction="column" alignItems="center" justifyContent="space-evenly">
                    <Box m={2} pt={3}><TextField placeholder="Title" name = "title" value = {input.title} onChange = {handleChange} required="required"/></Box>   
                    <Box m={2} pt={3}><TextField placeholder="Content" multiline rows={10} maxRows={15} fullWidth name = "content" value = {input.content} onChange = {handleChange} required="required"/> </Box>
                </Grid>
                <Button size="large" className = 'submitButton' type="submit" value="Submit" >Submit</Button>
            </form>
        </Container>
    )
}

export default AddPost