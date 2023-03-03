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

function displayNewGame(board) {
    const gameBoardDiv = document.querySelector('#gameBoard');

    for (let i = 0; i < board.length; i++) {
        const spaceDiv = document.createElement('div');
        spaceDiv.classList.add('square');
        spaceDiv.setAttribute('id', `${i}`);
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

displayNewGame(Gameboard.board) 