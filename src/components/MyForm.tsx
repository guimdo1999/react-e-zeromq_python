import React, { useState } from "react";
import {socket} from "../socket";
import { Grid, TextField, Button } from "@mui/material";

export function MyForm() {
  const [value, setValue] = useState<Number>();
  const [coordX, setCoordX] = useState<Number>();
  const [coordY, setCoordY] = useState<Number>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    socket
      .timeout(500)
      .emit("message", value, () => {
        setIsLoading(false);
      });
  };

  const onFoo = () => {

    socket
      .timeout(500)
      .emit("foo1", () => {
        setIsLoading(false);
      });
  };

  const onCoord = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    socket
      .timeout(500)
      .emit("coord", coordX, coordY, () => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        component="form"
        onSubmit={onSubmit}
        noValidate
        autoComplete="off"
      >
        <Grid item>
          <TextField
            required
            id="message-text"
            label="Mensagem"
            type="number"
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </Grid>
        <Grid item mt={1}>
          <Button variant="contained" type="submit" disabled={isLoading}>
            Enviar
          </Button>
        </Grid>

        <Grid item mt={1}>
          <Button
            variant="contained"
            onClick={() => onFoo()}
            disabled={isLoading}
          >
            Gráfico
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        mt={1}
        spacing={1}
        component="form"
        onSubmit={onCoord}
        noValidate
        autoComplete="off"
      >
        <Grid item>
          <TextField
            required
            id="coordx"
            label="Coordenada X"
            type="number"
            onChange={(e) => setCoordX(Number(e.target.value))}
          />
          <TextField
            required
            id="coordy"
            label="Coordenada Y"
            type="number"
            onChange={(e) => setCoordY(Number(e.target.value))}
          />
        </Grid>
        <Grid item mt={1}>
          <Button variant="contained" type="submit" disabled={isLoading}>
            Enviar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
