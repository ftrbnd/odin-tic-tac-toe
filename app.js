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

    while (gameBoardDiv.firstChild) {
        gameBoardDiv.removeChild(gameBoardDiv.firstChild);
    }

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
            if (square.innerText == '_') {
                if (DisplayController.playerOneTurn) {
                    square.innerText = playerOne.getMarker();
                    Gameboard.board[square.id] = playerOne.getMarker();
                    DisplayController.playerOneTurn = false;
                    checkForWinner(playerOne, square);
                } else {
                    square.innerText = playerTwo.getMarker();
                    Gameboard.board[square.id] = playerTwo.getMarker();
                    DisplayController.playerOneTurn = true;
                    checkForWinner(playerTwo, square);
                }

                console.log(Gameboard.board);
            }
        });
    }
}

function checkForWinner(player, squareDiv) {
    if (squareDiv.innerText != '_' && findLine(squareDiv.id)) {
        alert(`${player.getName()} (${player.getMarker()}) wins!`);
        DisplayController.playGame();
    }
}

function findLine(index) {
    function horizontal() {
        if (0 <= index && index <= 2) {
            if (Gameboard.board[0] == Gameboard.board[1] && Gameboard.board[1] == Gameboard.board[2])
                return true;
        } else if (3 <= index && index <= 5) {
            if (Gameboard.board[3] == Gameboard.board[4] && Gameboard.board[4] == Gameboard.board[5])
                return true;
        } else { // 6 - 8
            if (Gameboard.board[6] == Gameboard.board[7] && Gameboard.board[7] == Gameboard.board[8])
                return true;
        }
        return false;
    }

    function vertical() {
        if (index == 0 || index == 3 || index == 6) {
            if (Gameboard.board[0] == Gameboard.board[3] && Gameboard.board[3] == Gameboard.board[6])
                return true;
        } else if (index == 1 || index == 4 || index == 7) {
            if (Gameboard.board[1] == Gameboard.board[4] && Gameboard.board[4] == Gameboard.board[7])
                return true;
        } else { // 2, 5, 8
            if (Gameboard.board[2] == Gameboard.board[5] && Gameboard.board[5] == Gameboard.board[8])
                return true;
        }
        return false;
    }

    function diagonal() {
        if (index == 0 || index == 4 || index == 8) {
            if (Gameboard.board[0] == Gameboard.board[4] && Gameboard.board[4] == Gameboard.board[8])
                return true;
        } else if (index == 2 || index == 4 || index == 6) {
            if (Gameboard.board[2] == Gameboard.board[4] && Gameboard.board[4] == Gameboard.board[6])
                return true;
        }
        return false;
    }

    return horizontal() || vertical() || diagonal();
}

DisplayController.playGame();