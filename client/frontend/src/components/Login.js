import BlogContext from "./BlogContext";
import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from "@mui/material/Typography";
import { Alert } from "@mui/material";
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


const Login = () => {

    let {setUserId} = useContext(BlogContext)
    let [input, setInput] = useState({username:"", password:""})
    let [alert, setAlert] = useState(false)
    let [alertContent, setAlertContent] = useState('');
    let [alertLevel, setAlertLevel] = useState('')

    let handleChange = (e) => {
        const value = e.target.value;
        setInput({
          ...input,
          [e.target.name]: value
        });
        e.preventDefault();
    }

    const handleSubmit = (e) =>{
        
        console.log("working...?")
        fetch(`${ApiUrl}login`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        })
        .then(res => {
            if (res.status !== 200){
                setAlertLevel("error")
                setAlertContent("Trouble logging in, please check your username and password");
                setAlert(true);
            }
            return res
        })
        .then(res=>res.json())
        .then(data => {
            console.log(data.body)
            setUserId(data.body)
            console.log("success")
        })
        e.preventDefault()
    }

    return (
        <Container maxWidth="lg" className="post-page" sx={{ height:"100%", background:"#E9F3EB" }}>
             {alert ? <Alert severity={alertLevel}>{alertContent}</Alert> : <></> }
            <form onSubmit={handleSubmit}>
                <Box m={2} pt={3}>
                <Grid container spacing={3} direction="column" alignItems="center" justifyContent="space-evenly">
                    <Box m={2} pt={3}><Typography>Please login to make your own content!</Typography></Box>
                    <Box m={1}><TextField label = 'Username' name = "username" value = {input.username} onChange = {handleChange} required="required"/></Box>
                    <Box m={1}><TextField label = 'Password' type="password" name = "password" value = {input.password} onChange = {handleChange} required="required"/></Box>
                    <Box m={2} pt={3}></Box><Button className = 'submitButton' type="submit" value="Submit">Submit</Button>
                </Grid>
                </Box>
            </form>
        </Container>
    )
}

export default Login