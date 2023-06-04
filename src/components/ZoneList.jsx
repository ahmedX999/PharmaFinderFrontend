import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Table } from 'react-bootstrap';

const ZoneList = () => {
  const [zones, setZones] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newZoneName, setNewZoneName] = useState('');
  const [newCityId, setNewCityId] = useState('');
  const [selectedZone, setSelectedZone] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchCities();
    fetchZones();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get('https://lacking-mask-production.up.railway.app/api/cities');
      setCities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchZones = async () => {
    try {
      const response = await axios.get('https://lacking-mask-production.up.railway.app/api/zones/all');
      setZones(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddModalShow = () => {
    setShowAddModal(true);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
    setNewZoneName('');
    setNewCityId('');
  };

  const handleAddZone = async () => {
    try {
      const response = await axios.post('https://lacking-mask-production.up.railway.app/api/zones/save', null, {
        params: {
          name: newZoneName,
          cityId: newCityId,
        },
      });
      const newZone = response.data;
      setZones([...zones, newZone]);
      handleAddModalClose();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Bad request: ', error.response.data);
        // Display an error message to the user
      } else {
        console.error('Error:', error.message);
        // Handle other errors
      }
    }
  };
  
  

  const handleEditModalShow = (zone) => {
    setSelectedZone(zone);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedZone(null);
  };

  const handleEditZone = async () => {
    try {
      const response = await axios.put(`https://lacking-mask-production.up.railway.app/api/zones/${selectedZone.id}`, {
        name: selectedZone.name,
        cityId: selectedZone.cityId,
      });
      const updatedZone = response.data;
      const updatedZones = zones.map((zone) => (zone.id === updatedZone.id ? updatedZone : zone));
      setZones(updatedZones);
      handleEditModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteZone = async (zone) => {
    try {
      await axios.delete(`https://lacking-mask-production.up.railway.app/api/zones/deleteZone/id=${zone.id}`);
      const updatedZones = zones.filter((z) => z.id !== zone.id);
      setZones(updatedZones);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div>
        <h1>Manage your zones</h1>
        <Button variant="primary" onClick={handleAddModalShow}>
          Add
        </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Ville</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {zones.map((zone) => (
              <tr key={zone.id}>
                <td>{zone.id}</td>
                <td>{zone.name}</td>
                <td>{zone.city.name}</td>
                <td>
                  <Button variant="primary" onClick={() => handleEditModalShow(zone)}>
                    Modify
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleDeleteZone(zone)}>
                    delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Add Zone Modal */}
        <Modal show={showAddModal} onHide={handleAddModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add zone</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
  <div className="form-group">
    <label htmlFor="zoneName">Zone name</label>
    <input
      type="text"
      className="form-control"
      id="zoneName"
      value={newZoneName}
      onChange={(e) => setNewZoneName(e.target.value)}
    />
  </div>
  <div className="form-group">
    <label htmlFor="cityId">City</label>
    <select
      className="form-control"
      value={newCityId}
      onChange={(e) => setNewCityId(e.target.value)}
    >
      <option value="">Select city</option>
      {cities.map((city) => (
        <option key={city.id} value={city.id}>
          {city.name}
        </option>
      ))}
    </select>
  </div>
</form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAddModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddZone}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Zone Modal */}
        <Modal show={showEditModal} onHide={handleEditModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modify zone</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label htmlFor="editZoneName">Zone name</label>
                <input
                  type="text"
                  className="form-control"
                  id="editZoneName"
                  value={selectedZone ? selectedZone.name : ''}
                  onChange={(e) => setSelectedZone({ ...selectedZone, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editZoneCityId">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="editZoneCityId"
                  value={selectedZone && selectedZone.city ? selectedZone.city.name : ''}
                  onChange={(e) =>
                    setSelectedZone({ ...selectedZone, city: { id: selectedZone.city.id, name: e.target.value } })
                  }
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditZone}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div style={{ width: '100%' }}>{/* Additional content */}</div>
    </div>
  );
};

export default ZoneList;
