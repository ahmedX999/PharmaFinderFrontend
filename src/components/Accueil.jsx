import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

import { Icon } from 'react-icons-kit';
import { medkit } from 'react-icons-kit/fa/medkit';
import { building } from 'react-icons-kit/fa/building';
import { mapMarker } from 'react-icons-kit/fa/mapMarker';
import FooterComponent from './FooterComponent';





const Accueil = () => {
  const [pharmaciesCount, setPharmaciesCount] = useState(0);
  const [pharmaciesGardeCount, setPharmaciesGardeCount] = useState(0);
  const [villesCount, setVillesCount] = useState(0);
  const [zonesCount, setZonesCount] = useState(0);

  useEffect(() => {
    fetchPharmaciesCount();
    fetchPharmaciesGardeCount();
    fetchVillesCount();
    fetchZonesCount();
  }, []);

  const fetchPharmaciesCount = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/pharmacies/all');
      setPharmaciesCount(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVillesCount = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cities');
      setVillesCount(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchZonesCount = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/zones');
      setZonesCount(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  
  const fetchPharmaciesGardeCount = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/pharmacies/garde/all');
      setPharmaciesGardeCount(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: "100%" }}>
    <div className="container">
      <h1 className="mt-4 mb-4 text-center">Welcome to PharmaFinder</h1>
      <hr/>
      <br></br>
      <br />
      <div className="row">
        <div className="col-sm-4">
          <Card className="mb-3 bg-success shadow"> 
            <Card.Body>
              <div className="d-flex align-items-center">
                <Icon icon={medkit} className="me-3" size={24} />
                <div>
                  <Card.Title>Nombre de pharmacies</Card.Title>
                  <Card.Text>{pharmaciesCount}</Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
         <div className="col-sm-4">
          <Card className="mb-3 bg-success shadow"> 
            <Card.Body>
              <div className="d-flex align-items-center">
                <Icon icon={medkit} className="me-3" size={24} />
                <div>
                  <Card.Title>Nombre de pharmacies de garde</Card.Title>
                  <Card.Text>{pharmaciesGardeCount}</Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-sm-4">
          <Card className="mb-3 bg-success shadow"> 
            <Card.Body>
              <div className="d-flex align-items-center">
                <Icon icon={building} className="me-3" size={24} />
                <div>
                  <Card.Title>Nombre de villes</Card.Title>
                  <Card.Text>{villesCount}</Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-sm-4">
          <Card className="mb-3 bg-success shadow"> 
            <Card.Body>
              <div className="d-flex align-items-center">
                <Icon icon={mapMarker} className="me-3" size={24} />
                <div>
                  <Card.Title>Nombre de zones</Card.Title>
                  <Card.Text>{zonesCount}</Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>

      </div>
     
    </div>
    <div style={{ width: "100%" }}>
        <FooterComponent />
      </div>

    </div>
  );
};

export default Accueil;

