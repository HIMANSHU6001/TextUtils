import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from 'react';



export default function Navbar(props) {
  const [homeActive, setHomeActive] = useState("active");
const [aboutActive, setAboutActive] = useState("");

const setFocus = (element) => {
  if (element === "Home"){
    setHomeActive("active");
    setAboutActive("");
  }
  else if (element === "About"){
    setAboutActive("active");
    setHomeActive("");
  }
}
  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" onClick={() => {setFocus("Home")}} to="/">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${homeActive}`} onClick={()=>{setFocus("Home")}} aria-current="page" to="/">{props.headLink}</Link>
            </li>
            <li className="nav-item">
               <Link className={`nav-link ${aboutActive}`} onClick={()=>{setFocus("About")}} to="/About">About</Link> 
            </li>
          </ul>
          <div className="d-flex">
            <div className="rounded mx-2 bg-primary" onClick={()=>{props.toggleMode('primary')}} style={{height:'30px', width:'30px', cursor:'pointer'}}></div>
            <div className="rounded mx-2 bg-danger" onClick={()=>{props.toggleMode('danger')}} style={{height:'30px', width:'30px', cursor:'pointer'}}></div>
            <div className="rounded mx-2 bg-success" onClick={()=>{props.toggleMode('success')}} style={{height:'30px', width:'30px', cursor:'pointer'}}></div>
            <div className="rounded mx-2 bg-warning" onClick={()=>{props.toggleMode('warning')}} style={{height:'30px', width:'30px', cursor:'pointer'}}></div>

          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" onClick={()=>{props.toggleMode(null)}} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            <label className={`form-check-label text-${props.mode === 'light' ? 'dark' : 'light'}`} htmlFor="flexSwitchCheckDefault">Dark Mode</label>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  headLink: PropTypes.string
};
Navbar.defaultProps = {
  title: "TextUtiles",
  headLink: "HeadLink"
};