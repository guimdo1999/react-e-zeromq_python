import { useState, useEffect } from "react";
import { Grid } from "@mui/material";

import { socket } from "./socket";
import { ConnectionManager } from "./components/ConnectionManager";
import { MyForm } from "./components/MyForm";
import { Events } from "./components/Events";
import { Messages } from "./components/Messages";

interface Event {
  foo?: number,
  x?: number, 
  y?: number, 
}


export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<Event[]>([{}]);
  const [messages, setMessages] = useState([""]);

  
  useEffect(() => {
    function onFooEvent(value: Event) {
      setFooEvents((prev:any) => [...prev, value])
    }
    
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessage(value: any) {
      setMessages((previous: any) => [...previous, value]);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);
    socket.on("foo1", onFooEvent);
    socket.on("coord", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
      socket.off("foo1", onFooEvent);
      socket.off("coord", onFooEvent);
    };
  }, []);


  return (
    <Grid container ml={2} mt={2} direction="column" className="App">
      <ConnectionManager isConnected={isConnected} />
      <Events evento={fooEvents} />
      <Messages messages={messages} />
      <MyForm />
    </Grid>
  );
}
