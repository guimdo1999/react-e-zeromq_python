interface ConnectionStateProps {
  isConnected: boolean;
}

export function ConnectionState({ isConnected }: ConnectionStateProps) {
  return <p>Está conectado? {isConnected ? "Sim" : "Não"}</p>;
}
