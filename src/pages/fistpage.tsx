import React from "react";
import { Button } from "react-bootstrap";

const fistpage = () => {
  const sayHi = () => {
    console.log("flechipolla");
  };

  return (
    <div>
      <div>
        <Button onClick={sayHi}>Botoncito</Button>
      </div>
    </div>
  );
};

export default fistpage;
