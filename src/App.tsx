import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado ao servidor.");
    });
    socket.on('message', (data) => {
      console.log(data);
    })
  }, []);

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };
  const handleSendMessage = () => {
    socket.emit("message", message);
  };

  return (
    <div>
      <div>
        <input type="text" value={message} onChange={(e) => handleMessageChange(e)} />
        <button onClick={() => handleSendMessage()}>Enviar</button>
      </div>
    </div>
  );
}

export default App;
