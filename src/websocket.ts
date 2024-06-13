import WebSocket from 'ws';

let wss: WebSocket.Server;

export function initializeWebSocket(server: any) {
  wss = new WebSocket.Server({ server });

  wss.on('connection', (ws: WebSocket) => {
    console.log('A client connected');

    ws.on('message', (message: string) => {
      console.log(`Received message: ${message}`);
      // Handle incoming messages here if needed
    });

    ws.on('close', () => {
      console.log('A client disconnected');
    });
  });
}

export function broadcastGameState(gameState: any) {
  wss.clients.forEach((client: WebSocket) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ event: 'gameState', data: gameState }));
    }
  });
}
