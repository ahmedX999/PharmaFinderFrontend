import React, { useState } from 'react';
import axios from 'axios';

const ZoneForm = () => {
  const [zone, setZone] = useState({ name: '', cityId: '' });

  const handleChange = (e) => {
    setZone({ ...zone, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/zones', zone)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Zone Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={zone.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="cityId">City ID:</label>
        <input
          type="text"
          id="cityId"
          name="cityId"
          value={zone.cityId}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Zone</button>
    </form>
  );
};

export default ZoneForm;
