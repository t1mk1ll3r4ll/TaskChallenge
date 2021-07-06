import React from "react";
import { useForm } from "react-hook-form";
import firebaseclient from "firebaseClient";
import firebase from "firebase";
import { Button } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Index = () => {
  firebaseclient();
  const db = firebase.firestore();
  const yesterday = new Date(Date.now() - 86400000);
  yesterday.toISOString();
  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    start: yup
      .date()
      .min(yesterday, "start cant be before today")
      .max(yup.ref("expire"), "start date cant be after end date"),
    expire: yup
      .date()
      .min(yup.ref("start"), "end date cant be before start date"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) =>
    db
      .collection("Tarea")
      .add({ name: data.name })
      .then((docRef) => {
        updateDoc({ ...data, uid: docRef.id });
        window.location.reload();
      });

  const updateDoc = (params: any) => {
    const db = firebase.firestore();
    console.log(params);
    db.collection("Tarea")
      .doc(params.uid)
      .update(params)
      .then((docRef) => {
        window.alert("La tarea se creado con exito");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            {...register("name", { required: true })}
            placeholder="Nombre de la tarea"
          />
          <input
            {...register("description", { required: true })}
            placeholder="Descripcion de la tarea"
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="datetime-local"
            {...register("start", { required: true })}
          />
          <input
            type="datetime-local"
            {...register("expire", { required: true })}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <select {...register("status", { required: true })} id="status">
            <option value="Pendiente">pendiente</option>
            <option value="En progreso"> en progreso</option>
            <option value="Finalizada"> finalizada</option>
          </select>
          <Button variant="success" type="submit" size="sm">
            {" "}
            subir nueva tarea{" "}
          </Button>
        </div>
      </form>
      <div style={{ color: "red", padding: "10px" }}>
        <p>{errors.name?.message}</p>
        <p>{errors.description?.message}</p>
        <p>{errors.start?.message}</p>
        <p>{errors.expire?.message}</p>
      </div>
    </div>
  );
};

export default Index;
