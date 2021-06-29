import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";

const Boton = (props: any) => {
  const { message } = props;
  const [firstState, setFirstState] = useState(message);
  console.log(message);
  const diAlgo = () => {
    window.alert("alerta!");
  };
  return (
    <div>
      <Button onClick={() => setFirstState(firstState + 1)}>
        {firstState}
      </Button>
    </div>
  );
};

export default Boton;
