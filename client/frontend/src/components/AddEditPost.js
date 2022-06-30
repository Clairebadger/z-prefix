import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import config from '../config'
import BlogContext from "./BlogContext";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const AddEditPost = ({action, postid}) => {
    let {userId} = useContext(BlogContext)
    let [input, setInput] = useState({userid:userId, title: "", content:"",})
    let navigate = useNavigate()

    let formatPatchReq = () =>{
        let body = {}
        Object.keys(input).forEach((x) => {
            if (input[x] !== '' && input[x] !== null){
                body[x] = input[x]
            }
        })
        return body
}

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
        let request 
        let body
        let url
        action === 'add' ? request = 'POST' : request = 'PATCH'
        action === 'add' ? body = input : body = formatPatchReq() 
        action === 'add' ? url = `${ApiUrl}post` : url = `${ApiUrl}post/${postid}`

        fetch(url, {
            method: request,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        .then(res => {
            console.log(res)
            if(res.status ===200){
                console.log("success")
            }
            else{
                console.log("not success")
            }
            action === 'add' ? navigate('/posts') : navigate(`/posts/details/${postid}`)
        })
        e.preventDefault()
        
    }

    return (
        <>  
            {`${action} Blog Post`}
            <form onSubmit={handleSubmit}>
                <ul>
                <li className = 'list-element'>
                        <label>
                          Title: 
                          {action === 'add' ? 
                            <input type="text" name = "title" value = {input.title} onChange = {handleChange} required="required"/> 
                            : 
                            <input type="text" name = "title" value = {input.title} onChange = {handleChange}/>
                        }
                        </label>
                    </li>
                    <li className = 'list-element'>
                        <label>
                          Content: 
                          {
                            action === 'add' ?
                            <input type="textarea" name = "content" value = {input.content} onChange = {handleChange} required="required"/> 
                            :
                            <input type="textarea" name = "content" value = {input.content} onChange = {handleChange}/>
                          }
                          
                        </label>
                    </li>
                </ul>
                <button className = 'submitButton' type="submit" value="Submit">Submit</button>
            </form>
        </>
    )
}

export default AddEditPost