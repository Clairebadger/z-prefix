import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BlogContext from "./BlogContext";
import "./styles/Header.css";
import Button from '@mui/material/Button';


const Header = () => {

    let {userId, setUserId} = useContext(BlogContext)
    let navigate = useNavigate()

    const handleLogout = () => {
        setUserId(null)
        navigate('/')
    }

    const handleClick = (location) => {
        navigate(location)
    }

    return (
        <>
        {
            userId !== null ?
                <div className='header'>
                    <div className="logout">
                        <Button onClick={handleLogout}> logout </Button>    
                    </div>
                <div  className="navButtons">    
                    <Button onClick = {()=>handleClick('/posts')}> My Posts </Button>
                    <Button onClick = {()=>handleClick('/all')}> All Posts </Button>
                </div>
            </div>
            :
            <div className='header'>
                <div  className="navButtons">    
                    <Button onClick = {()=>handleClick('/login')}> Login </Button>
                    <Button onClick = {()=>handleClick('/')}> Sign Up </Button>
                    <Button onClick = {()=>handleClick('/posts')}> View Posts </Button>
                </div>
        </div>
        }
        </>
        
    )
}

export default Header