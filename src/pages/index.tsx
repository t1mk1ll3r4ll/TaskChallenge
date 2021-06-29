import React from "react";
import { useAuth } from "../auth";
import Container from "@/components/container";
import { Flex, Box, Button, Text, Heading, Stack } from "@chakra-ui/react";

export default function Home() {
  // const {user} = useAuth();
  // console.log(useAuth);
  return (
    <Container>
      <Flex>
        <Box w={500} p={4} my={12} mx="auto">
          <Heading as="h2" textAlign="center">
            Bienvendio a la pagina principal.
          </Heading>
          <Text
            mt={8}
            textAlign="center"
            // {...`User ID: ${
            //   user ? user.uid : "No existe un usuario con sesion activa"
            // }`}
          ></Text>
          <Stack
            mt={8}
            alignItems="center"
            justifyContent="center"
            isInline
            width="100%"
          >
            <Button variant="solid" variantColor="blue" width="100%">
              <a> ir a la pagina principal. </a>
            </Button>

            <Button
              variant="solid"
              variantColor="green"
              width="100%"
              //isDisabled={user}
            >
              <a> iniciar sesion </a>
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
}
