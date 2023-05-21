// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Modal, Button, Table } from 'react-bootstrap';
// import FooterComponent from './FooterComponent';
// const ZoneList = () => {
//   const [zones, setZones] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newZoneName, setNewZoneName] = useState('');
//   const [selectedZone, setSelectedZone] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);

//   // Fetch zones data from the API
//   useEffect(() => {
//     fetchZones();
//   }, []);

//   const fetchZones = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/zones');
//       setZones(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAddModalShow = () => {
//     setShowAddModal(true);
//   };

//   const handleAddModalClose = () => {
//     setShowAddModal(false);
//     setNewZoneName('');
//   };

//   const handleAddZone = async () => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/zones/save', { name: newZoneName });
//       const newZone = response.data;
//       setZones([...zones, newZone]);
//       handleAddModalClose();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleEditModalShow = (zone) => {
//     setSelectedZone(zone);
//     setShowEditModal(true);
//   };

//   const handleEditModalClose = () => {
//     setShowEditModal(false);
//     setSelectedZone(null);
//   };

//   const handleEditZone = async () => {
//     try {
//       const response = await axios.put(`http://localhost:8080/api/zones/${selectedZone.id}`, {
//         name: selectedZone.name,
//         city: { id: selectedZone.city.id, name: selectedZone.city.name },
//       });
//       const updatedZone = response.data;
//       const updatedZones = zones.map((zone) => (zone.id === updatedZone.id ? updatedZone : zone));
//       setZones(updatedZones);
//       handleEditModalClose();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDeleteZone = async (zone) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/zones/deleteZone/id=${zone.id}`);
//       const updatedZones = zones.filter((z) => z.id !== zone.id);
//       setZones(updatedZones);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//   <div style={{ width: "100%" }}>
//     <div>
//       <h1>Liste des zones</h1>
//       <Button variant="primary" onClick={handleAddModalShow}>Ajouter</Button>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nom</th>
//             <th>Ville</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {zones.map((zone) => (
//             <tr key={zone.id}>
//               <td>{zone.id}</td>
//               <td>{zone.name}</td>
//               <td>{zone.city.name}</td>
//               <td>
//                 <Button variant="primary" onClick={() => handleEditModalShow(zone)}>Modifier</Button>{' '}
//                 <Button variant="danger" onClick={() => handleDeleteZone(zone)}>Supprimer</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Add Zone Modal */}
//       <Modal show={showAddModal} onHide={handleAddModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Ajouter une zone</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form>
//             <div className="form-group">
//               <label htmlFor="zoneName">Nom de la zone</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="zoneName"
//                 value={newZoneName}
//                 onChange={(e) => setNewZoneName(e.target.value)}
//               />
//             </div>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleAddModalClose}>Fermer</Button>
//           <Button variant="primary" onClick={handleAddZone}>Ajouter</Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Edit Zone Modal */}
//       <Modal show={showEditModal} onHide={handleEditModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modifier une zone</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form>
//             <div className="form-group">
//               <label htmlFor="editZoneName">Nom de la zone</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="editZoneName"
//                 value={selectedZone ? selectedZone.name : ''}
//                 onChange={(e) => setSelectedZone({ ...selectedZone, name: e.target.value })}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="editZoneCityId">Ville</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="editZoneCityId"
//                 value={selectedZone && selectedZone.city ? selectedZone.city.name : ''}
//                 onChange={(e) => setSelectedZone({ ...selectedZone, city: { id: selectedZone.city.id, name: e.target.value } })}
//               />
//             </div>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleEditModalClose}>Fermer</Button>
//           <Button variant="primary" onClick={handleEditZone}>Enregistrer</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//       <div style={{ width: "100%" }}>
//           <FooterComponent />
//         </div>

//       </div>
//   );
// };

// export default ZoneList;

