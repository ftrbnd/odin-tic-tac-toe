const Gameboard = (function () {
    const board = [
        '_', '_', '_',
        '_', '_', '_',
        '_', '_', '_',
    ];

    const setSquare = (id, marker) => {
        board[id] = marker;
    };
    
    return {
        board,
        setSquare
    };
})();

const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;

    return {
        getName,
        getMarker
    };
};

const DisplayController = (function () {
    const playerOne = Player('Player 1', 'X');
    const playerTwo = Player('Player 2', 'O');
    let playerOneTurn = true;

    const playGame = () => {
        displayNewGame(Gameboard.board);
        attachSquareListeners(playerOne, playerTwo);
    }

    return {
        playGame,
        playerOneTurn
    };
})();

function displayNewGame(board) {
    const gameBoardDiv = document.querySelector('#gameBoard');

    for (let i = 0; i < board.length; i++) {
        const spaceDiv = document.createElement('div');
        spaceDiv.classList.add('square');
        spaceDiv.setAttribute('id', `${i}`);
        board[i] = '_';
        spaceDiv.innerText = board[i];

        if (i % 2 == 0) {
            spaceDiv.style.backgroundColor = 'var(--olivia-black)';
            spaceDiv.style.color = 'var(--olivia-pink)';
        } else {
            spaceDiv.style.backgroundColor = 'var(--olivia-white)';
            spaceDiv.style.color = 'var(--olivia-black)';
        }

        switch (i) {
            case 0:
                spaceDiv.style.borderTopLeftRadius = '15px';
                break;
            case 2:
                spaceDiv.style.borderTopRightRadius = '15px';
                break;
            case 6:
                spaceDiv.style.borderBottomLeftRadius = '15px';
                break;
            case 8:
                spaceDiv.style.borderBottomRightRadius = '15px';
                break;
        }

        gameBoardDiv.appendChild(spaceDiv);
    }
}

function attachSquareListeners(playerOne, playerTwo) {
    const squares = document.querySelectorAll('div.square');
    
    for (const square of squares) {
        square.addEventListener('click', () => {
            if (DisplayController.playerOneTurn) {
                square.innerText = playerOne.getMarker();
                Gameboard.board[square.id] = playerOne.getMarker();
                DisplayController.playerOneTurn = false;
            } else {
                square.innerText = playerTwo.getMarker();
                Gameboard.board[square.id] = playerTwo.getMarker();
                DisplayController.playerOneTurn = true;
            }
            console.log(Gameboard.board);
        });
    }
}

DisplayController.playGame();