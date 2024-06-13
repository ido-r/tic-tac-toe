# Tic-Tac-Toe Game API

This project implements a simple Tic-Tac-Toe game API using TypeScript and Express, organized with routing-controllers for managing endpoints.

## Features

- **Initialize Game**: Start a new game of Tic-Tac-Toe.
- **Get Game State**:  Retrieve the current state of the ongoing game.
- **Make Move**:  Make a move on the Tic-Tac-Toe board.

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
