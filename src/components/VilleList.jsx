
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Table } from 'react-bootstrap';
import FooterComponent from './FooterComponent';
const VilleList = () => {
  const [villes, setVilles] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newVille, setNewVille] = useState({ nom: '' });
  const [editVille, setEditVille] = useState({ id: null, nom: '' });

  useEffect(() => {
    fetchVilles();
  }, []);

  const fetchVilles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cities');
      setVilles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddVille = async () => {
    try {
      await axios.post('http://localhost:8080/api/cities/save', newVille);
      setNewVille({ nom: '' });
      setShowAddModal(false);
      fetchVilles();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteVille = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/cities/deleteVille/id=${id}`);
      fetchVilles();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditVille = async () => {
    try {
      await axios.put(`http://localhost:8080/api/cities/${editVille.id}`, editVille);
      setShowEditModal(false);
      fetchVilles();
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = (ville) => {
    setEditVille(ville);
    setShowEditModal(true);
  };

  return (
    <div style={{ width: "100%" }}>
    <div className="container">
      <h1 className="mt-4 mb-4 text-center">Liste des Villes</h1>
      <button className="btn btn-primary mb-3" onClick={() => setShowAddModal(true)}>Ajouter</button>

      {/* Modal d'ajout de ville */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une ville</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Nom</label>
            <input
              type="text"
              className="form-control"
              value={newVille.name}
              onChange={(e) => setNewVille({ ...newVille, name: e.target.value })}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Fermer</Button>
          <Button variant="primary" onClick={handleAddVille}>Ajouter</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de modification de ville */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier une ville</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Nom</label>
            <input
              type="text"
              className="form-control"
              value={editVille.name}
              onChange={(e) => setEditVille({ ...editVille, name: e.target.value })}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Fermer</Button>
          <Button variant="primary" onClick={handleEditVille}>Modifier</Button>
        </Modal.Footer>
      </Modal>

      {/* Tableau des villes */}
      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {villes.map((ville) => (
            <tr key={ville.id}>
              <td>{ville.id}</td>
              <td>{ville.name}</td>
              <td>
                <button className="btn btn-primary me-2" onClick={() => openEditModal(ville)}>Modifier</button>
                <button className="btn btn-danger" onClick={() => handleDeleteVille(ville.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    <div style={{ width: "100%" }}>
    <FooterComponent />
  </div>

</div>
    
  );
};

export default VilleList;
