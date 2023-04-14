import getSocket from "../socket";
import { Grid, Button } from "@mui/material";

export function ConnectionManager() {
  function connect() {
    getSocket().connect();
  }

  function disconnect() {
    getSocket().disconnect();
  }

  return (
    <Grid container mb={2} spacing={2}>
      <Grid item>
        <Button variant="contained" onClick={connect}>
          Conectar
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={disconnect}>
          Desconectar
        </Button>
      </Grid>
    </Grid>
  );
}
