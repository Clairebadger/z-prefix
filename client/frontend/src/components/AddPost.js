import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import config from '../config'
import BlogContext from "./BlogContext";
import TextField from "@mui/material/TextField";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const AddPost = ({action, postid}) => {
    let {userId} = useContext(BlogContext)
    let [input, setInput] = useState({userid:userId, title: "", content:"",})
    let [errorMsg, setErrorMsg] = useState('')
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
        //do some things to make it work for both PATCH and POST
        let request = 'POST' 
        let body = input
        let url = `${ApiUrl}post` 

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
        <>  
            <div>{errorMsg}</div>
            {`Add Blog Post`}
            <form onSubmit={handleSubmit}>
                <ul>
                <li className = 'list-element'>
                        <label>
                          Title: 
                        <TextField placeholder="Title" name = "title" value = {input.title} onChange = {handleChange} required="required"/>    
                        </label>
                    </li>
                    <li className = 'list-element'>
                        <label>
                          Content: 
                            <TextField placeholder="Content" multiline rows={4} maxRows={6}  name = "content" value = {input.content} onChange = {handleChange} required="required"/> 
                        </label>
                    </li>
                </ul>
                <button className = 'submitButton' type="submit" value="Submit">Submit</button>
            </form>
        </>
    )
}

export default AddPost