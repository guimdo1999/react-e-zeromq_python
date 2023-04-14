import getSocket from "../socket";
import { Grid, Button } from "@mui/material";
import "./ConnectionManager.css"

interface ConnectionStateProps {
  isConnected: boolean;
}

export function ConnectionManager({ isConnected }: ConnectionStateProps) {
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
      <Grid item mt={2} ml={1} className={isConnected ? "dotG" : "dotR"}></Grid>
    </Grid>
  );
}
