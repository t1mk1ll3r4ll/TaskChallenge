import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import format from "date-fns/format";
import firebase from "firebase";
import { Box, Input, Stack, FormControl, FormLabel } from "@chakra-ui/react";

export default function Filltable(props: any) {
  const [show, setShow] = useState(false);

  const [edit, setEdit] = useState({
    name: "",
    description: "",
    start: "",
    expire: "",
    uid: "",
  });
  const handleClose = () => {
    update();
    setShow(false);
  };

  const handleShow = (params: any) => {
    console.log(params);
    setEdit(params);
    setShow(true);
  };
  let { data } = props;

  const eliminar = (params: any) => {
    const db = firebase.firestore();
    db.collection("Tarea")
      .doc(params)
      .delete()
      .then((docRef) => {
        window.alert("tarea eliminada");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const update = () => {
    const db = firebase.firestore();
    db.collection("Tarea")
      .doc(edit.uid)
      .update(edit)
      .then((docRef) => {
        window.alert("tarea actualizada");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  const cambio = (e: any, param2: any) => {
    e.preventDefault();
    console.log(e.target.value);
    const db = firebase.firestore();
    db.collection("Tarea")
      .doc(param2.uid)
      .update({ status: e.target.value })
      .then((docRef) => {
        window.alert("tarea actualizada");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <div key={data.lenght}>
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
          {props?.data?.map((row: any, index: any) => (
            <tr key={index}>
              <th>{row?.name}</th>
              <th>{row?.description}</th>
              <th>{format(new Date(row?.start), "dd/mm/yyyy hh:mm")}</th>
              <th>{format(new Date(row?.expire), "dd/mm/yyyy hh:mm")}</th>
              <th>
                <Form.Group>
                  <Form.Control
                    as="select"
                    onChange={(e) => cambio(e, row)}
                    defaultValue={row?.status}
                  >
                    <option>Pendiente</option>
                    <option>En progreso</option>
                    <option>Finalizada</option>
                  </Form.Control>
                </Form.Group>
              </th>
              <th>
                <Button variant="danger" onClick={() => eliminar(row?.uid)}>
                  Eliminar
                </Button>
                <Button variant="info" onClick={() => handleShow(row)}>
                  {" "}
                  Editar
                </Button>
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box w={150} my={5} mx="auto">
            <Stack>
              <FormControl isRequired>
                <FormLabel htmlFor="text">Nombre</FormLabel>
                <Input
                  onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                  type="text"
                  defaultValue={edit.name}
                  aria-describedby="taskName-helper-text"
                ></Input>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="text">Descripcion</FormLabel>
                <Input
                  onChange={(e) =>
                    setEdit({ ...edit, description: e.target.value })
                  }
                  type="text"
                  defaultValue={edit.description}
                  aria-describedby="taskDesc-helper-text"
                ></Input>
              </FormControl>
            </Stack>
          </Box>
          <Box w={300} my={5} mx="auto">
            <Stack>
              <FormControl isRequired>
                <FormLabel htmlFor="text">Fecha de inicio</FormLabel>
                <Input
                  onChange={(e) => setEdit({ ...edit, start: e.target.value })}
                  type="datetime-local"
                  defaultValue={edit.start}
                  aria-describedby="taskstart-helper-text"
                ></Input>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="text">Fecha limite</FormLabel>
                <Input
                  onChange={(e) => setEdit({ ...edit, expire: e.target.value })}
                  type="datetime-local"
                  defaultValue={edit.expire}
                  aria-describedby="taskExpire-helper-text"
                ></Input>
              </FormControl>
            </Stack>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Salir
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
