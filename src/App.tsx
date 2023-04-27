import  { useState, useEffect } from "react";
import { Grid } from "@mui/material";

import getSocket from "./socket";
import { ConnectionManager } from "./components/ConnectionManager";
import { MyForm } from "./components/MyForm";
import { Events } from "./components/Events";
import { Messages } from "./components/Messages";

export interface event {
  foo: number;
  time: number;
}
export default function App() {
  const [isConnected, setIsConnected] = useState(getSocket().connected);
  const [fooEvents, setFooEvents] = useState<event[]>([]);
  const [messages, setMessages] = useState(['']);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: any) {
      setFooEvents((previous: any) => [...previous, value])
    }

    function onMessage(value: any) {
      setMessages((previous:any) => [...previous, value])
    }

    getSocket().on("connect", onConnect);
    getSocket().on("disconnect", onDisconnect);
    getSocket().on("message", onMessage);
    getSocket().on("foo1", onFooEvent);

    return () => {
      getSocket().off("connect", onConnect);
      getSocket().off("disconnect", onDisconnect);
      getSocket().off("message", onMessage);
      getSocket().off("foo1", onFooEvent);
    };
  }, []);

  return (
    <Grid container ml={2} mt={2} direction="column" className="App">
      <ConnectionManager isConnected={isConnected} />
      <Events events={fooEvents} />
      <Messages messages={ messages} />
      <MyForm />
    </Grid>
  );
}
