import React from "react";
import { Flex } from "@chakra-ui/react";

export default function Container(props: any) {
  return (
    <div>
      <Flex as="main" justifyContent="center" flexDirection="column" px={8}>
        {props.children}
      </Flex>
    </div>
  );
}
