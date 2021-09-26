import React from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PublishIcon from '@mui/icons-material/Publish';
import '../CSS/Navbar.css';

const Navbar = () =>
{
    return (
        <div className="nav">
            <div className="icon" >
                <img style={{ width: "100px" }} src="image/SM.png" alt="SM"></img>
            </div>


            <div className="home" >
                <Link style={{ textDecoration: 'none' }} to="/home"  ><HomeRoundedIcon fontSize="large" /></Link>
            </div>
            <div className="account" >
                {/* <Link to="uploadpost"><PublishIcon fontSize="large" /></Link> */}
                <Link style={{ textDecoration: 'none' }} to="/profile" ><AccountCircleIcon fontSize="large" /></Link>
                <Link style={{ textDecoration: 'none' }} to="/sign-in" onClick={() => { localStorage.removeItem('jwtoken') }} ><ExitToAppIcon fontSize="large" style={{ marginLeft: "20px" }} />Logout</Link>
            </div>
        </div >
    )
}

export default Navbar
