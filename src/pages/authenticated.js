import React from "react";
import nookies from "nookies";
import { verifyIdToken } from "../firebaseAdmin";
import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Button } from "react-bootstrap";

function Authenticated({ session }) {
  firebaseClient();
  if (session) {
    return (
      <Flex>
        <Box w={500} p={4} my={12} mx="auto">
          <Heading as="h2" textAlign="center">
            Lista de tareas
          </Heading>
        </Box>
        <Box w={500} p={4} my={12} mx="auto">
          <Button
            variant="Danger"
            width="100%"
            onClick={async () => {
              await firebase.auth().signOut();
              window.location.href = "/";
            }}
          >
            Cerrar sesion
          </Button>
        </Box>
      </Flex>
    );
  } else {
    return (
      <Box w={500} p={4} my={12} mx="auto">
        <h1>Loading...</h1>
      </Box>
    );
  }
}

export async function getServerSidePorps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      props: {
        session: `Tu correo electronico es: ${email} y tu UID es ${uid}`,
      },
    };
  } catch (err) {
    context.res.writeHead(302, { location: "/login" });
    context.res.end();
    return { props: [] };
  }
}
//export default Authenticated;
