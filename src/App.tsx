import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");
function App() {
  const [message, setMessage] = useState("");
  const [messageR, setMessageR] = useState<any>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado ao servidor.");
    });
  }, []);

  useEffect(() => {
    socket.on("message", (data) => {
      console.log("server: "+ data);
      setMessageR((messageR: any) => [...messageR, data]);
      /* return () => {
        socket.disconnect();
      }; */
    });
  }, []);

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };
  const handleSendMessage = () => {
    socket.emit("message", message);
    console.log(message);
  };

  socket.on("message", (data) => {
    setMessageR((messageR: any) => [...messageR, data]);
    console.log(messageR);
  })
  
  const handleDisconnect = () => {
    console.log("dc");
    socket.disconnect();
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => handleMessageChange(e)}
        />
        <button onClick={() => handleSendMessage()}>Enviar</button>
      </div>
      <button onClick={() => handleDisconnect()}>DC</button>
      <ul>
        {messageR.map((msg: String, index: any) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
