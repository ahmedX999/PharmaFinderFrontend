import logo from './images/logo.jpg';
import './App.css';
import React from 'react'
import HeaderComponent from './components/HeaderComponent';
// import FooterComponent from './components/FooterComponent';


import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Accueil from './components/Accueil';
import Apropos from './components/Apropos';
import Contact from './components/Contact';
import VilleList from './components/VilleList';
// import ZoneList from './components/ZoneList';
import Login from './components/LoginForm';
import PharmacyFinder from './components/PharmacyFinder';

import Signup from './components/Signup';

function App() {
  return (

    <BrowserRouter>
    <div> 
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <img src={logo} alt="logo" className="navbar-brand" />

    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/accueil" className="nav-link">
            Accueil
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/apropos" className="nav-link">
            A propos
          </Link>
        </li>
        
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/villes" className="nav-link">
            Villes
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/zones" className="nav-link">
            Zones
          </Link>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
          <Link to="/pharmacies" className="nav-link">
            Pharmacies
          </Link>
        </li>
      

      <li className="nav-item">
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </li>
        </ul>
        <ul className="navbar-nav ml-auto ">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/signup" className="nav-link">
            Sign up
          </Link>
        </li>
        </ul>

    </div>
  </div>
</nav>


    <Routes> 
    <Route path="/accueil" element={<Accueil />}></Route>
    <Route path="/apropos" element={<Apropos />}></Route>
    <Route path="/contact" element={<Contact />}></Route>
    <Route path="/villes" element={<VilleList />}></Route>
    {/* <Route path="/zones" element={<ZoneList />}></Route> */}
    <Route path="/pharmacies" element={<PharmacyFinder />}></Route>
     <Route path="/login" element={<Login />}></Route> 
     <Route path="/signup" element={<Signup />}></Route> 
    </Routes>
    
    </div>
    <div>
    {/* <FooterComponent/> */}
    </div>
</BrowserRouter>



  );
}

export default App;
