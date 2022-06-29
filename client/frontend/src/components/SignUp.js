import { useState } from "react";
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const SignUp = () => {

    let [input, setInput] = useState({firstname: "", lastname:"", username:"", password:""})

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
            }
            else{
                console.log("not success")
            }
        })
        e.preventDefault()
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <ul>
                <li className = 'list-element'>
                        <label>
                          First Name: 
                          <input type="text" name = "firstname" value = {input.firstname} onChange = {handleChange} required="required"/>
                        </label>
                    </li>
                    <li className = 'list-element'>
                        <label>
                          Last Name: 
                          <input type="text" name = "lastname" value = {input.lastname} onChange = {handleChange} required="required"/>
                        </label>
                    </li>
                    <li className = 'list-element'>
                        <label>
                          Username:
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

export default SignUp