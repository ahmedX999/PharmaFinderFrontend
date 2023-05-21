import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    };

    axios.post('http://localhost:8080/users/register', user)
      .then(response => {
        // Gérer la réponse après l'inscription réussie
        console.log(response.data);
      })
      .catch(error => {
        // Gérer les erreurs d'inscription
        console.log(error);
      });
  };

  return (
    <Container>
      <h1>Inscription</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Mot de passe:</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Label>Prénom:</Form.Label>
          <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Nom:</Form.Label>
          <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">S'inscrire</Button>
      </Form>
    </Container>
  );
};

export default Signup;
