import React from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Button } from "react-bootstrap";
import "./App.css";

function App() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      date: "",
      priority: "Basse",
      isCompleted: false,
    },
  });

  const onSubmit = (data) => {
    console.log("Données du formulaire :", data);
    reset();
  };

  return (
    <Container className="my-4">
      <h2>Formulaire</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom"
            {...register("name", { required: "Le nom est obligatoire" })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </Form.Group>

        <Form.Group controlId="date" className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            {...register("date", { required: "Le Date est obligatoire" })}
          />
          {errors.date && <p>{errors.date.message}</p>}
        </Form.Group>

        <Form.Group controlId="priority" className="mb-3">
          <Form.Label>Priorité</Form.Label>
          <Form.Select {...register("priority")}>
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Elevée">Elevée</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="completed" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Complétée"
            {...register("isCompleted")}
          />
        </Form.Group>

        <Button type="submit">Envoyer</Button>
      </Form>
    </Container>
  );
}

export default App;
