import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Boton from "@/components/Boton";
const Fistpage = () => {
  const [firstState, setFirstState] = useState(15);

  useEffect(() => {
    document.title = `Tu puta madre ${firstState}`;
  }, [firstState]);

  return (
    <div>
      <div>
        <Button onClick={() => setFirstState(firstState + 1)}>
          {firstState}
        </Button>
        <Boton message={firstState} />
      </div>
    </div>
  );
};

export default Fistpage;
