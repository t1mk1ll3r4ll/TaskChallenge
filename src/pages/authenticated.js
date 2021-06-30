import React from "react";
import firebase from "firebase/app";
import { Heading } from "@chakra-ui/react";
import { Button } from "react-bootstrap";

export default function Authenticated() {
  return (
    <div>
      <Heading as="h2" textAlign="center">
        Lista de tareas
      </Heading>

      <Button
        variant="danger"
        onClick={async () => {
          await firebase.auth().signOut();
          window.location.href = "/";
        }}
      >
        Cerrar sesion
      </Button>
    </div>
  );
}
