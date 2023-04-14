import React, { useState } from "react";
import getSocket from "../socket";
import { Grid, TextField, Button } from "@mui/material";

export function MyForm() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    getSocket()
      .timeout(500)
      .emit("message", value, () => {
        setIsLoading(false);
      });
  }

  return (
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
          onChange={(e) => setValue(e.target.value)}
        />
      </Grid>
      <Grid item mt={1}>
        <Button variant="contained" type="submit" disabled={isLoading}>
          Enviar
        </Button>
      </Grid>
    </Grid>
  );
}
