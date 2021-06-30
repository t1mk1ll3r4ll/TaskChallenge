import React from "react";
import { Table, Button } from "react-bootstrap";
import firebaseclient from "../../firebaseClient";
import firebase from "firebase";
import { Box } from "@chakra-ui/react";

export default function filltable() {
  return (
    <div>
      <Button variant="warning" size="sm" onClick={() => getAllData()}>
        cargar lista
      </Button>

      <Table striped bordered hover responsive size="sm" id="table1">
        <tr>
          <thead>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Inicio</th>
            <th>Finalizacion</th>
            <th>Status</th>
            <th>Acciones</th>
          </thead>
          <tbody id="tbody1"></tbody>
        </tr>
      </Table>
    </div>
  );
}
function getAllData() {
  firebaseclient();
  const db = firebase.firestore();

  db.collection("Tarea")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        let table = document.getElementById("table1");
        let newrow = ``;
        if (!table) {
          console.log("error");
        } else {
          table.innerHTML += newrow;
        }
        let row = `<tr>
                    <td>${data.name}</td>
                    <td>${data.description}</td>
                    <td>${data.start}</td>
                    <td>${data.expire}</td>
                    <td>${data.status}</td>
                    </tr>`;
        if (!table) {
          console.log("error");
        } else {
          table.innerHTML += row;
        }
      });
    });
}
