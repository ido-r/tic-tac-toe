# Tic-Tac-Toe Game API

This project implements a simple Tic-Tac-Toe game API using TypeScript and Express, organized with routing-controllers for managing endpoints.

## Features

- **Initialize Game**: Start a new game of Tic-Tac-Toe.
- **Get Game State**:  Retrieve the current state of the ongoing game.
- **Make Move**:  Make a move on the Tic-Tac-Toe board.

## Game Structure and Flow

## Entities Used
The game is structured around the following entities:
1. Game Board: Represented as an array of cells (board), where each cell can be null, 'X', or 'O'.
2. Current Player: Tracks whose turn it is (currentPlayer), alternating between 'X' and 'O'.
3. Game Over Status: Indicates if the game has ended (gameOver).
4. Winner: Stores the winner of the game (winner), which can be 'X', 'O', 'Draw', or null if there's no winner yet.

## Basic Flow
1. Initialization
When a new game is initialized (POST /tic-tac-toe), the board is reset, and the currentPlayer is set to 'X'.

2. Making Moves
    * Players can make moves (PUT /tic-tac-toe) by specifying an index (1-9) where they want to place their mark ('X' or 'O').
    * The server checks if the move is valid (index is within range and cell is empty).
    * After each move, the server updates the board, switches the currentPlayer, and checks for a win condition.

3. Win Condition
    * After each move, the server checks if there's a winning combination on the board (horizontal, vertical, or diagonal).
    * If a winning condition is met, the gameOver flag is set to true, and the winner is identified ('X' or 'O').
    * If all cells are filled without a winner, the game ends in a draw.

## Installation

1. Clone the repository:
```sh
   git clone https://github.com/ido-r/tic-tac-toe
```

2. Navigate to repository:
```sh
   cd tic-tac-toe
```

3. Install the dependencies:
```sh
    npm install
```

4. Start the server:
```sh
    npm start
```

## API Endpoints

## Initialize Game

Endpoint: POST /tic-tac-toe
Description: Initializes a new game of Tic-Tac-Toe.
Response: Returns the initial game state.

Example:
```sh 
curl --location --request POST 'http://localhost:3000/tic-tac-toe'
```

Returns:
```sh 
{
    "board": [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ],
    "currentPlayer": "X",
    "gameOver": false,
    "winner": null
}
```

## Get Game State

Endpoint: GET /tic-tac-toe
Description: Retrieves the current state of the Tic-Tac-Toe game.
Response: Returns the current game state, including board status, current player, game over status, and winner (if any).

Example:
```sh 
curl --location 'http://localhost:3000/tic-tac-toe'
```

Returns:
```sh 
{
    "board": [
        null,
        null,
        null,
        "X",
        null,
        null,
        null,
        null,
        null
    ],
    "currentPlayer": "O",
    "gameOver": false,
    "winner": null
}
```

## Make Move

Endpoint: PUT /tic-tac-toe
Description: Makes a move on the Tic-Tac-Toe board.
Request Body: { index: number } - Specifies the index (1-9) where the move is to be made.
Response: Returns the updated game state after the move.

Example:
```sh 
curl --location --request PUT 'http://localhost:3000/tic-tac-toe' \
--header 'Content-Type: application/json' \
--data '{
    "index": 8
}'
```

Returns:
```sh 
{
    "board": [
        null,
        null,
        null,
        "O",
        null,
        null,
        null,
        "X",
        null
    ],
    "currentPlayer": "X",
    "gameOver": false,
    "winner": null
}
```

## Error Handling

Proper error handling is implemented for various scenarios:
    * Invalid API requests - If the index in the make move is not a proper index (integer between 1-9), then an error is returned:
    ```
    {
        "error": "Invalid index provided"
    }
    ```
    * Attempts to make a move without initializing the game - If an attempt to make a move, or to get a game board, when it was not initialied, then an error is returned:
    ```
    {
        "error": "Game board does not exist. Initialize a new game first."
    }
    ```
    * Attempting to make a move on an already occupied spot - When trying to play on an index that is already full, then an error is returned:
    ```
    {
        "error": "Spot is already taken"
    }
    ```
    * Game over scenarios - When trying to play, after a game is already finished, then an error is returned:
    ```
    {
        "error": "Game is already over!"
    }
    ```

## WebSocket Integration
WebSocket is used to provide real-time updates on the game state to clients. Clients can connect to the WebSocket server to receive immediate notifications when a player makes a move.

WebSocket Server URL: 
```
ws://localhost:3000
```

Event: gameState
The WebSocket server emits a gameState event whenever there is a change in the game state (e.g., after a player makes a move).

```
const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
  console.log('Connected to WebSocket server');
};

ws.onmessage = (event) => {
  const gameState = JSON.parse(event.data);
  console.log('Received updated game state:', gameState);
  // Update UI with new game state
};

ws.onclose = () => {
  console.log('Disconnected from WebSocket server');
};
```
