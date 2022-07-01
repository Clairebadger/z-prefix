import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BlogContext from "./BlogContext";
import Box from '@mui/material/Box'
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
                    
                <div  className="navButtons">    
                    <Box m={2} pt={3}><Button variant="contained" onClick={handleLogout}> logout </Button></Box>  
                    <Box m={2} pt={3}><Button variant="contained" onClick = {()=>handleClick('/posts')}> My Posts </Button></Box>
                    <Box m={2} pt={3}><Button variant="contained" onClick = {()=>handleClick('/all')}> All Posts </Button></Box>
                </div>
            </div>
            :
            <div className='header'>
                 <div  className="navButtons">
                    <Box m={2} pt={3}><Button variant="contained" onClick = {()=>handleClick('/login')}> Login </Button></Box>
                    <Box m={2} pt={3}><Button variant="contained" onClick = {()=>handleClick('/')}> Sign Up </Button></Box>
                    <Box m={2} pt={3}><Button variant="contained" onClick = {()=>handleClick('/posts')}> View Posts </Button></Box>
                </div>
            </div>
        }
        </>
        
    )
}

export default Header