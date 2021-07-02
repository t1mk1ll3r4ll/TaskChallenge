import React from "react";
import { useAuth } from "../auth";
import Container from "@/components/container";
import { Flex, Box, Heading, Stack } from "@chakra-ui/react";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import firebase from "firebase/app";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <Container>
      <Flex>
        <Box w={500} p={4} my={12} mx="auto">
          <Heading as="h2" textAlign="center">
            Bienvendio a la pagina principal.
          </Heading>
          <div style={{ textAlign: "center" }}>
            {`Usuario conectado: ${
              user ? user.email : "No existe un usuario con sesion activa"
            }`}
          </div>

          <Stack
            mt={8}
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            <Button
              variant="primary"
              onClick={() => router.push("/authenticated")}
              disabled={!user}
              width="100%"
            >
              <a> Ir a la lista de tareas. </a>
            </Button>

            <Button
              variant="success"
              width="100%"
              onClick={() => router.push("/login")}
              disabled={user}
            >
              <a> ¡Iniciar sesion! </a>
            </Button>

            <Button
              variant="danger"
              width="100%"
              disabled={!user}
              onClick={async () => {
                await firebase.auth().signOut();
                window.location.href = "/";
              }}
            >
              Cerrar sesion
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
}
