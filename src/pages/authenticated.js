import React, { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";
import { Button } from "react-bootstrap";
import firebaseclient from "../firebaseClient";
import firebase from "firebase";
import Tablefill from "../components/Table";
import {
  Flex,
  Box,
  Input,
  Stack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
firebaseclient();
export default function Authenticated() {
  const db = firebase.firestore();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [start, setStart] = useState("");
  const [expire, setExpire] = useState("");
  const [status, setStatus] = useState("");

  const updateDoc = (params) => {
    const db = firebase.firestore();
    console.log(params);
    db.collection("Tarea")
      .doc(params.uid)
      .update(params)
      .then((docRef) => {
        getAllData();
        window.alert("tarea actualizada");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const subirdatos = (name, desc, start, expire) => {
    const db = firebase.firestore();
    const data = {
      name: name,
      description: desc,
      start: start,
      expire: expire,
      status: "Pendiente",
    };
    db.collection("Tarea")
      .add({ name: data.name })
      .then((docRef) => {
        updateDoc({ ...data, uid: docRef.id });
      })
      .catch((error) => {
        alert("ocurrio un error al guardar la tarea " + error);
      });
  };
  const [tablefilled, setTableFilled] = useState([]);
  console.log(tablefilled);
  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    firebaseclient();
    const db = firebase.firestore();
    let listT = [];
    await db
      .collection("Tarea")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.data());
          listT.push(doc.data());
          //console.log(tablefilled);
        });
      });
    setTableFilled(listT);
  };

  return (
    <div>
      <Heading as="h2" textAlign=" center" mx="auto">
        Lista de tareas
      </Heading>

      <Flex align="center">
        <Box w={300} my={5} mx="auto">
          <Stack justify="center" isInline>
            <Button
              variant="danger"
              onClick={async () => {
                await firebase.auth().signOut();
                window.location.href = "/";
              }}
            >
              Cerrar sesion
            </Button>
            <Button
              disabled={
                name === "" || desc === "" || start === "" || expire === ""
              }
              onClick={() => {
                subirdatos(name, desc, start, expire, status);
              }}
            >
              Subir tarea
            </Button>
          </Stack>
        </Box>

        <Box w={150} my={5} mx="auto">
          <Stack>
            <FormControl isRequired>
              <FormLabel htmlFor="text">Nombre</FormLabel>
              <Input
                onChange={(e) => setName(e.target.value)}
                type="text"
                value={name}
                aria-describedby="taskName-helper-text"
              ></Input>
            </FormControl>

            <FormControl isRequired insetInline>
              <FormLabel htmlFor="text">Descripcion</FormLabel>
              <Input
                onChange={(e) => setDesc(e.target.value)}
                type="text"
                value={desc}
                aria-describedby="taskDesc-helper-text"
              ></Input>
            </FormControl>
          </Stack>
        </Box>
        <Box w={300} my={5} mx="auto">
          <Stack>
            <FormControl isRequired insetInline>
              <FormLabel htmlFor="text">Fecha de inicio</FormLabel>
              <Input
                onChange={(e) => setStart(e.target.value)}
                type="datetime-local"
                value={start}
                aria-describedby="taskstart-helper-text"
              ></Input>
            </FormControl>

            <FormControl isRequired insetInline>
              <FormLabel htmlFor="text">Fecha limite</FormLabel>
              <Input
                onChange={(e) => setExpire(e.target.value)}
                type="datetime-local"
                value={expire}
                aria-describedby="taskExpire-helper-text"
              ></Input>
            </FormControl>
          </Stack>
        </Box>
      </Flex>

      {tablefilled.length > 0 && <Tablefill data={tablefilled}></Tablefill>}
    </div>
  );
}
