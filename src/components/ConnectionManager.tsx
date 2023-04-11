import  getSocket  from "../socket";

export function ConnectionManager() {
  function connect() {
    getSocket().connect();
  }

  function disconnect() {
    getSocket().disconnect();
  }

  return (
    <>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </>
  );
}
