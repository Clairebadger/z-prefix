import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const SignUp = () => {

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
        console.log(JSON.stringify(input))
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
        e.preventDefault()
    }

    return (
        <>
            {alert ? <Alert severity={alertLevel}>{alertContent}</Alert> : <></> }
            <div>Welcome! If you aren't a current user we'd love you to join the community!</div>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li className = 'list-element'>
                        <TextField label = 'First Name' name = "firstname" value = {input.firstname} onChange = {handleChange} required="required"/>
                    </li>
                    <li className = 'list-element'>
                        <TextField label = 'Last Name' name = "lastname" value = {input.lastname} onChange = {handleChange} required="required"/>
                    </li>
                    <li className = 'list-element'>
                        <TextField label = 'Username' name = "username" value = {input.username} onChange = {handleChange} required="required"/>
                    </li>
                    <li className = 'list-element'>
                        <TextField label = 'Password' type="password" name = "password" value = {input.password} onChange = {handleChange} required="required"/>
                    </li>
                </ul>
                <Button className = 'submitButton' variant="contained" type="submit" value="Submit">Submit</Button>
            </form>
            Already signed up?<br/> 
            <Link to="/login">
                Login Here
            </Link>
        </>
    )
}

export default SignUp