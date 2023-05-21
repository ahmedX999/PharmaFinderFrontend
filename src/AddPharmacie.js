import React, { useState } from 'react';

const AddPharmacy = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [altitude, setAltitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the API
    const data = {
      name: name,
      address: address,
      altitude: parseFloat(altitude),
      longitude: parseFloat(longitude)
    };

    // Send the data to the API endpoint
    fetch('http://localhost:8080/api/v1/pharmacies/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        // Handle the response from the API
        console.log(result);
        // Clear the form fields
        setName('');
        setAddress('');
        setAltitude('');
        setLongitude('');
      })
      .catch(error => {
        // Handle any errors that occur during the API call
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Add Pharmacy</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength="250"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            maxLength="250"
          />
        </div>
        <div className="form-group">
          <label htmlFor="altitude">Altitude:</label>
          <input
            type="number"
            className="form-control"
            id="altitude"
            value={altitude}
            onChange={(e) => setAltitude(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="longitude">Longitude:</label>
          <input
            type="number"
            className="form-control"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddPharmacy;
