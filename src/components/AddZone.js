import React, { useState } from 'react';
import axios from 'axios';

const AddZoneForm = () => {
  const [name, setName] = useState('');
  const [cityId, setCityId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/zones/save2', {
        name: name,
        cityId: parseInt(cityId)
      });
      console.log(response.data); // Zone data returned from the API
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        City ID:
        <input
          type="number"
          value={cityId}
          onChange={(e) => setCityId(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddZoneForm;
