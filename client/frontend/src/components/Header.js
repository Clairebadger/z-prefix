import { Link } from "react-router-dom";
import "./styles/Header.css";


const Header = () => {
    return (
        <div className='header'>
            <div  className="navButtons">    
            <Link to="/posts">
                <div className='clickButton'>
                    <button> My Posts </button>
                </div>
            </Link>
            <Link to="/all">
                <div className='clickButton'>
                    <button> All Posts </button>
                </div>
            </Link>
            </div>
        </div>
    )
}

export default Header