import BlogContext from "./BlogContext";
import { useContext, useState } from "react";
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


const Login = () => {

    let {setUserId} = useContext(BlogContext)
    let [input, setInput] = useState({username:"", password:""})

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
                console.log("not success")
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
            <form onSubmit={handleSubmit}>
                <ul>
                    <li className = 'list-element'>
                        <label>
                          Email: 
                          <input type="text" name = "username" value = {input.username} onChange = {handleChange} required="required"/>
                        </label>
                    </li>
                    <li className = 'list-element'>
                        <label>
                          Password:
                          <input type="text" name = "password" value = {input.password} onChange = {handleChange} required="required"/>
                        </label>
                    </li>
                </ul>
                <button className = 'submitButton' type="submit" value="Submit">Submit</button>
            </form>
        </>
    )
}

export default Login