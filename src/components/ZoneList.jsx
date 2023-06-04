import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Table } from 'react-bootstrap';



const ZoneList = () => {
  const [zones, setZones] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newZoneName, setNewZoneName] = useState('');
  const [newCityName, setNewCityName] = useState('');
  const [selectedZone, setSelectedZone] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [villes, setVilles] = useState([]);

  useEffect(() => {
    fetchVilles();
    fetchZones();
  }, []);

  const fetchVilles = async () => {
    try {
      const response = await axios.get('https://lacking-mask-production.up.railway.app/api/cities');
      setVilles(response.data);
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
    setNewCityName('');
  };

  const handleAddZone = async () => {
    try {
      const response = await axios.post('https://lacking-mask-production.up.railway.app/api/zones/save', {
        name: newZoneName,
        cityId: newCityName,
      });
      const newZone = response.data;
      setZones([...zones, newZone]);
      handleAddModalClose();
    } catch (error) {
      console.error(error);
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
        city: { id: selectedZone.city.id, name: selectedZone.city.name },
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
                <label htmlFor="zoneName">zone name</label>
                <input
                  type="text"
                  className="form-control"
                  id="zoneName"
                  value={newZoneName}
                  onChange={(e) => setNewZoneName(e.target.value)}
                />
                <label htmlFor="cityName">City name</label>
                <select
                  className="form-control"
                  value={newCityName}
                  onChange={(e) => setNewCityName(e.target.value)}
                >
                  <option value="">Select city</option>
                  {villes.map((ville) => (
                    <option key={ville.id} value={ville.id}>
                      {ville.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAddModalClose}>
              Fermer
            </Button>
            <Button variant="primary" onClick={handleAddZone}>
              Ajouter
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
                <label htmlFor="editZoneCityId">Ville</label>
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

      <div style={{ width: '100%' }}>
       
      </div>
    </div>
  );
};

export default ZoneList;
