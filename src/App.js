import logo from './images/logo.png';
import './App.css';
import React from 'react';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Accueil from './components/Accueil';
import Apropos from './components/Apropos';
import Contact from './components/Contact';
import VilleList from './components/VilleList';
import ZoneList from './components/ZoneList';
import Login from './components/LoginForm';
import PharmacyFinder from './components/PharmacyFinder';
import Signup from './components/Signup';

import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import AddPharmacy from './components/ManagePharmacies';


function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
        <img src={logo} alt="logo" className="navbar-brand" style={{ width: '250px' }} />


          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            .
          </Typography>

          <Button color="inherit" component={Link} to="/">
            Accueil
          </Button>

     
          <Button color="inherit" component={Link} to="/villes">
            Villes
          </Button>
          <Button color="inherit" component={Link} to="/zones">
            Zones
          </Button>
          <Button color="inherit" component={Link} to="/pharmacies">
            Pharmacies
          </Button>
          <Button color="inherit" component={Link} to="/manage">
            Manage your Pharmacies
          </Button>
         
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Sign up
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
        <Routes>
          <Route path="/" element={<Accueil />} />
         
          
          <Route path="/villes" element={<VilleList />} />
          <Route path="/zones" element={<ZoneList />} />
          <Route path="/pharmacies" element={<PharmacyFinder />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/signup" element={<Signup />} />
          <Route path="/manage" element={<AddPharmacy/> } />
        </Routes>
      </Container>
      

      {/* <FooterComponent/> */}
    </Router>
  );
}

export default App;
