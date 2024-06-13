import WebSocket from 'ws';
import http from 'http';
import { GameState } from './types';

let wss: WebSocket.Server;

export function initializeWebSocket(server: http.Server) {
  wss = new WebSocket.Server({ server });

  wss.on('connection', (ws: WebSocket) => {
    console.log('A client connected');

    ws.on('message', (message: string) => {
      console.log(`Received message: ${message}`);
    });

    ws.on('close', () => {
      console.log('A client disconnected');
    });
  });
}

export function broadcastGameState(gameState: GameState) {
  wss.clients.forEach((client: WebSocket) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ event: 'gameState', data: gameState }));
    }
  });
}
