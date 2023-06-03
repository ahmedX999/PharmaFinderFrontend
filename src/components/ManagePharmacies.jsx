import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Icon } from "leaflet/src/layer/marker";
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const AddPharmacy = () => {

    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/2055/2055176.png",
        iconSize: [38, 38],
      });
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [altitude, setAltitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation here

    // Create a new pharmacy object
    const newPharmacy = {
      name,
      address,
      altitude: parseFloat(altitude),
      longitude: parseFloat(longitude),
    };

    try {
      // Perform API call to save the new pharmacy
      await axios.post('http://localhost:8080/api/pharmacies/save', newPharmacy);

      // Clear form inputs
      setName('');
      setAddress('');
      setAltitude('');
      setLongitude('');
    } catch (error) {
      console.error('Error saving pharmacy:', error);
      // Handle error
    }
  };

  const MapMarker = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setAltitude(lat.toFixed(6));
        setLongitude(lng.toFixed(6));
      },
    });

    return <Marker icon={customIcon} position={[altitude, longitude]} />;
  };

  return (
    <><h1 className="mt-4 mb-4 text-center">Add new Pharmacie </h1><hr /><Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required />
          </Form.Group>

          <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required />
          </Form.Group>

          <Form.Group controlId="altitude">
              <Form.Label>Altitude</Form.Label>
              <Form.Control
                  type="number"
                  value={altitude}
                  onChange={(e) => setAltitude(e.target.value)}
                  required
                  disabled />
          </Form.Group>

          <Form.Group controlId="longitude">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                  type="number"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  required
                  disabled />
          </Form.Group>

          <MapContainer center={[altitude, longitude]} zoom={9} style={{ height: '500px' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapMarker />
          </MapContainer>

          <Button variant="primary" type="submit">
              Add Pharmacy
          </Button>
      </Form></>
  );
};

export default AddPharmacy;