import BlogContext from "./BlogContext";
import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
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
        <>
             {alert ? <Alert severity={alertLevel}>{alertContent}</Alert> : <></> }
            <form onSubmit={handleSubmit}>
                <ul>
                    <li className = 'list-element'>
                        <label>
                          Username: 
                          <TextField placeholder = 'username' name = "username" value = {input.username} onChange = {handleChange} required="required"/>
                        </label>
                    </li>
                    <li className = 'list-element'>
                        <label>
                          Password:
                          <TextField type="password" placeholder = 'password' name = "password" value = {input.password} onChange = {handleChange} required="required"/>
                        </label>
                    </li>
                </ul>
                <button className = 'submitButton' type="submit" value="Submit">Submit</button>
            </form>
        </>
    )
}

export default Login