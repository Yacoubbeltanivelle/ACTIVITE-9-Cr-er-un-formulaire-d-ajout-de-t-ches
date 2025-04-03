import React from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Button } from "react-bootstrap";
import "./App.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

const schema = yup.object().shape({
  name: yup
    .string()
    .min(8, "Le nom doit contenir au moins 8 caractères")
    .max(15, "Le nom ne peut pas dépasser 15 caractères")
    .required("Le nom est obligatoire"),

  date: yup
    .string()
    .matches(dateRegex, "Le format de la date doit être jj/mm/aaaa")
    .required("Le Date est obligatoire")
    .test(
      "test-date",
      "La date ne peut pas être antérieure à aujourd’hui",
      (value) => {
        if (!value) return false;

        const [day, month, year] = value.split("/").map(Number);
        const dateData = new Date(year, month - 1, day);
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        return dateData >= now;
      }
    ),

  priority: yup
    .string()
    .oneOf(
      ["Basse", "Moyenne", "Elevée"],
      "La priorité doit être Basse, Moyenne ou Elevée"
    )
    .required("La priorité est obligatoire"),

  isCompleted: yup.boolean().required("Le statut est obligatoire"),
});

function App() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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
          <Form.Control type="text" placeholder="Nom" {...register("name")} />
          <p className="err">{errors.name?.message}</p>
        </Form.Group>

        <Form.Group controlId="date" className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="Format: jj/mm/aaaa"
            {...register("date")}
          />

          <p className="err">{errors.date?.message}</p>
        </Form.Group>

        <Form.Group controlId="priority" className="mb-3">
          <Form.Label>Priorité</Form.Label>
          <Form.Select {...register("priority")}>
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Elevée">Elevée</option>
          </Form.Select>
          <p className="err">{errors.priority?.message}</p>
        </Form.Group>

        <Form.Group controlId="completed" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Complétée"
            {...register("isCompleted")}
          />
          <p className="err">{errors.isCompleted?.message}</p>
        </Form.Group>

        <Button type="submit">Envoyer</Button>
      </Form>
    </Container>
  );
}

export default App;
