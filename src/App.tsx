import React, { useState, useEffect } from 'react';
import  {Grid } from "@mui/material";

import  getSocket  from './socket';
import { ConnectionManager } from './components/ConnectionManager';
import { MyForm } from './components/MyForm';
import { Events } from './components/Events';

export default function App() {
  const [isConnected, setIsConnected] = useState(getSocket().connected);
  const [fooEvents, setFooEvents] = useState<any>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value:any) {
      setFooEvents((previous: any) => [...previous, value]);
      console.log(value)
    }

    getSocket().on('connect', onConnect);
    getSocket().on('disconnect', onDisconnect);
    getSocket().on('message', onFooEvent);

    return () => {
      getSocket().off('connect', onConnect);
      getSocket().off('disconnect', onDisconnect);
      getSocket().off('message', onFooEvent);
    };
  }, []);

  return (
    <Grid container ml={2} mt={2} direction='column' className="App">
      <ConnectionManager isConnected={ isConnected } />
      <Events events={ fooEvents } />
      <MyForm />
    </Grid>
  );
}