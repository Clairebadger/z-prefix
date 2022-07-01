import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from "@mui/material/Typography";
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const SignUp = () => {
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i
    let [input, setInput] = useState({firstname: "", lastname:"", username:"", password:""})
    let [alert, setAlert] = useState(false)
    let [alertContent, setAlertContent] = useState('');
    let [alertLevel, setAlertLevel] = useState('')

    let navigate = useNavigate()

    let handleChange = (e) => {
        const value = e.target.value;
        setInput({
          ...input,
          [e.target.name]: value
        });
        e.preventDefault();
    }


    const handleSubmit = (e) =>{
        if (!input.password.match(passwordRegex)){
            setAlertLevel("error")
            setAlertContent("Password must contain minimum eight characters, at least one letter and one number");
            setAlert(true);
        }
        else{
            fetch(`${ApiUrl}signup`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input),
            })
            .then(res =>{
                if(res.status ===200){
                    console.log("success")
                    navigate('/login')
                }
                else if (res.status === 300){
                    console.log("not success")
                    setAlertLevel("error")
                    setAlertContent("Username is taken");
                    setAlert(true);
                }
            })
        }
        e.preventDefault()
    }

    return (
        <Container maxWidth="lg" className="post-page" sx={{ height:"100%", background:"#E9F3EB" }}>
            {alert ? <Alert severity={alertLevel}>{alertContent}</Alert> : <></> }
            
            <form onSubmit={handleSubmit}>
                <Box m={2} pt={3}>
                <Grid container spacing={3} direction="column" alignItems="center" justifyContent="space-evenly">
                        <Box m={2} pt={3}><Typography>Welcome! If you aren't a current user we'd love you to join the community!</Typography></Box>
                        <Box m={1}><TextField label = 'First Name' name = "firstname" value = {input.firstname} onChange = {handleChange} required="required"/></Box>
                        <Box m={1}><TextField label = 'Last Name' name = "lastname" value = {input.lastname} onChange = {handleChange} required="required"/></Box>
                        <Box m={1}><TextField label = 'Username' name = "username" value = {input.username} onChange = {handleChange} required="required"/></Box>
                        <Box m={1}><TextField label = 'Password' type="password" name = "password" value = {input.password} onChange = {handleChange} required="required"/></Box>
                        <Box m={2} pt={3}><Button className = 'submitButton' variant="contained" type="submit" value="Submit">Submit</Button></Box>
                </Grid>
                </Box>
            </form>
            Already signed up?<br/> 
            <Button onClick={()=>{navigate('/login')}}>Login Here</Button>
        </Container>
    )
}

export default SignUp