import React, { useState } from "react";
import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
import { Button } from "react-bootstrap";
import {
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Heading,
  useToast,
} from "@chakra-ui/react";

export default function Login() {
  firebaseClient();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <Flex>
      <Box w={500} p={4} my={12} mx="auto">
        <Heading as="h2" textAlign="center">
          Firebase Login
        </Heading>
        <Stack justify="center" isInline>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Correo Electronico</FormLabel>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="EmmailAddress"
              value={email}
              aria-describedby="email-helper-text"
            ></Input>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <Input
              onChange={(e) => setPass(e.target.value)}
              type="password"
              id="pass"
              value={pass}
              aria-describedby="password-helper-text"
            ></Input>
          </FormControl>
        </Stack>

        <Stack justify="center" mt={6} isInline spacing={10}>
          <Button
            minWitdh="40%"
            variant="dark"
            disabled={email === "" || pass === ""}
            onClick={async () => {
              await firebase
                .auth()
                .createUserWithEmailAndPassword(email, pass)
                .then(function () {
                  window.location.href = "/";
                })
                .catch(function (error) {
                  const message = error.message;
                  toast({
                    title: "Oh Oh! ocurrio un error",
                    description: message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                });
            }}
          >
            ¡Crear cuenta!
          </Button>

          <Button
            minWitdh="40%"
            variant="success"
            disabled={email === "" || pass === ""}
            onClick={async () => {
              await firebase
                .auth()
                .signInWithEmailAndPassword(email, pass)
                .then(function () {
                  window.location.href = "/";
                })
                .catch(function (error) {
                  const message = error.message;
                  toast({
                    title: "Oh Oh! ocurrio un error",
                    description: message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                });
            }}
          >
            ¡iniciar sesion!
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}
