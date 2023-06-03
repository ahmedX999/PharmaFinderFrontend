import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from "leaflet/src/layer/marker";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ReactModal from 'react-modal';
import FooterComponent from './FooterComponent';

const PharmacyFinder = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedGarde, setSelectedGarde] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      error => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    axios.get('https://lacking-mask-production.up.railway.app/api/cities')
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (selectedCity) {
      axios.get(`https://lacking-mask-production.up.railway.app/api/zones/city/${selectedCity}`)
        .then(response => {
          setZones(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedCity && selectedZone && selectedGarde) {
      axios.get(`https://lacking-mask-production.up.railway.app/api/pharmacies/zone/${selectedZone}/garde/${selectedGarde}`)
        .then(response => {
          setPharmacies(response.data);
          setMapCenter({ lat: response.data[0].altitude, lng: response.data[0].longitude });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [selectedCity, selectedZone, selectedGarde]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setSelectedZone(null);
    setSelectedGarde(null);
    setPharmacies([]);
    setMapCenter(null);
  };

  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
    setSelectedGarde(null);
    setPharmacies([]);
    setMapCenter(null);
  };

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2055/2055176.png",
    iconSize: [38, 38],
  });

  const customIcon2 = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/10/10522.png",
    iconSize: [38, 38],
  });

  const handleGardeChange = (event) => {
    setSelectedGarde(event.target.value);
    setPharmacies([]);
    setMapCenter(null);
  };

  return (
    <div style={{ width: "100%" }}>
    <div>
      <h1 className="mt-4 mb-4 text-center">Search your Pharmacie </h1>
      <hr />

      <div>
        <label htmlFor="city-select">Ville:</label>
        <select id="city-select" value={selectedCity} onChange={handleCityChange}>
          <option value="">-- Choose a city --</option>
          {cities.map(city => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
      </div>

      {selectedCity && (
        <div>
          <br />
        
          <div>
            <label htmlFor="zone-select">Zone:</label>
            <select id="zone-select" value={selectedZone} onChange={handleZoneChange}>
              <option value="">-- select your zone --</option>
              {zones.map(zone => (
                <option key={zone.id} value={zone.id}>{zone.name}</option>
              ))}
            </select>
          </div>

          {selectedZone && (
            <div>
              <br />

              <div>
                <label htmlFor="garde-select">Type of guard:</label>
                <select id="garde-select" value={selectedGarde} onChange={handleGardeChange}>
                  <option value="">-- Select the type of custody --</option>
                  <option value="1">Day</option>
                  <option value="2">Night</option>
                </select>
              </div>

              {selectedGarde && (
                <div>
                  <br />

                  <h2>List of duty pharmacies</h2>
                  {pharmacies.length > 0 ? (
                    <div>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: "20px" }}>
                        {pharmacies.map(pharmacy => (
                          <Card key={pharmacy.id} sx={{ maxWidth: 345 }}>
                            <CardMedia
                              component="img"
                              alt={pharmacy.name}
                              height="300px"
                              image={pharmacy.photo}
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                {pharmacy.name}
                              </Typography>
                              <Typography variant="body1" color="text.secondary">
                                Pharmacie
                              </Typography>
                              <hr />
                              <br />
                              <Typography variant="body2" color="text.secondary">
                                Address : {pharmacy.address}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button onClick={() => setModalIsOpen(true)} size="small" style={{ backgroundColor: "blue", color: "white" }}>
                                Consult
                              </Button>
                              
                              <a target="_blank" href={`https://www.google.com/maps?q=${pharmacy.altitude},${pharmacy.longitude}`}>
      <Button size="small" style={{ backgroundColor: "red", color: "white" }} >
        Maps
      </Button>
    </a>
                              <ReactModal isOpen={modalIsOpen}>
                                <h2>Details of {pharmacy.name}</h2>
                                <p>Insert your content here</p>
                                <button onClick={() => setModalIsOpen(false)}>close</button>
                              </ReactModal>
                            </CardActions>
                          </Card>
                        ))}
                      </Box>
                    </div>
                  ) : (
                    <p>No pharmacy found .</p>
                  )}

                  <br />

                  <div style={{ height: '500px', width: '100%' }}>
                    {mapCenter && (
                      <MapContainer center={mapCenter} zoom={15} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution="Map data © <a href='https://openstreetmap.org'>OpenStreetMap</a> contributors"
                        />
                        {currentPosition && pharmacies.map(pharmacy => (
                          <Marker icon={customIcon} key={pharmacy.id} position={[pharmacy.altitude, pharmacy.longitude]}>
                            <Popup>{pharmacy.name}</Popup>
                          </Marker>
                        ))}
                        {currentPosition && pharmacies.map(pharmacy => (
                          <>
                            <Marker icon={customIcon2} position={[currentPosition.lat, currentPosition.lng]}>
                              <Popup>My Current position</Popup>
                            </Marker>
                            
                          </>
                        ))}
                      </MapContainer>
                    )}
                  </div>
                  
                  </div>
                
              )}
            </div>
          )}
        </div>
      )}
    
    </div>
    {/* <div style={{ width: "100%" }}>
    <FooterComponent />
  </div> */}

</div>
  );
};

export default PharmacyFinder;
