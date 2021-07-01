import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import firebaseclient from "../../firebaseClient";
import firebase from "firebase";

export default function Filltable() {
  const [tablefilled, setTableFilled] = useState([]);

  useEffect(() => {
    getAllData();
  });

  const getAllData = () => {
    firebaseclient();
    const db = firebase.firestore();
    let listT: any = [];
    db.collection("Tarea")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.data());
          listT.push(doc.data());
          setTableFilled(listT);
          //console.log(tablefilled);
        });
      });
  };

  return (
    <div>
      <Button variant="warning" size="sm">
        cargar lista
      </Button>

      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Inicio</th>
            <th>Finalizacion</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tablefilled &&
            tablefilled.map((row: any, index) => (
              <tr key={index}>
                <th>{row.name}</th>
                <th>{row.description}</th>
                <th>{row.start}</th>
                <th>{row.expire}</th>
                <th>{row.status}</th>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
