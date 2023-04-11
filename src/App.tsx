import React, { useState, useEffect } from 'react';
import  getSocket  from './socket';
import { ConnectionState } from './components/ConnectionState';
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
    <div className="App">
      <ConnectionState isConnected={ isConnected } />
      <Events events={ fooEvents } />
      <ConnectionManager />
      <MyForm />
    </div>
  );
}