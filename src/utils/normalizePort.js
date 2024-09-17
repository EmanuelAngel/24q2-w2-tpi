export default function normalizePort(port) {
  const portNumber = parseInt(port, 10);

  if (isNaN(portNumber)) {
    return false;
  }

  if (portNumber >= 0 && portNumber <= 65535) {
    return portNumber;
  }

  return false;
}
