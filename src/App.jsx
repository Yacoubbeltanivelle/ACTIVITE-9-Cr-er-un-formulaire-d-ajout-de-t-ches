import React from "react";
import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    priority: "Basse",
    isCompleted: false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Données du formulaire :", formData);
  }

  return (
    <Container className="my-4">
      <h2>Formulaire</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer le nom"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDueDate" className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPriority" className="mb-3">
          <Form.Label>Priorité</Form.Label>
          <Form.Select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Elevée">Elevée</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formIsCompleted" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Complétée"
            name="isCompleted"
            checked={formData.isCompleted}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit">Envoyer</Button>
      </Form>
    </Container>
  );
}

export default App;
