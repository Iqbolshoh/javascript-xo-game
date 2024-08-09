document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("game-board");
    const gameOverMessage = document.getElementById("game-over-message");
    const restartButton = document.getElementById("restart-button");
    let currentPlayer = "X";
    let gameOver = false;

    function createCell() {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", handleCellClick);
        return cell;
    }

    function handleCellClick(event) {
        if (gameOver || event.target.textContent !== "") {
            return;
        }

        event.target.textContent = currentPlayer;
        if (checkWinner()) {
            gameOverMessage.textContent = `${currentPlayer} wins!`;
            gameOverMessage.style.display = "block";
            gameOver = true;
            animateWinner();
            restartButton.style.display = "block";
            return;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }

        if (checkDraw()) {
            gameOverMessage.textContent = "It's a draw!";
            gameOverMessage.style.display = "block";
            gameOver = true;
            restartButton.style.display = "block";
        }
    }

    function checkWinner() {
        const cells = document.querySelectorAll(".cell");

        const winCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winCombinations) {
            const [a, b, c] = combo;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent) {
                highlightWinner(cells[a], cells[b], cells[c]);
                return true;
            }
        }

        return false;
    }

    function highlightWinner(cellA, cellB, cellC) {
        cellA.style.backgroundColor = "#8bc34a";
        cellB.style.backgroundColor = "#8bc34a";
        cellC.style.backgroundColor = "#8bc34a";
    }

    function animateWinner() {
        const winningCells = document.querySelectorAll(".cell[style='background-color: #8bc34a;']");

        winningCells.forEach(cell => {
            cell.style.transition = "transform 0.5s ease-in-out";
            cell.style.transform = "scale(1.2)";
        });
    }

    function checkDraw() {
        const cells = document.querySelectorAll(".cell");
        for (const cell of cells) {
            if (cell.textContent === "") {
                return false;
            }
        }
        return true;
    }

    restartButton.addEventListener("click", function () {
        location.reload();
    });
    for (let i = 0; i < 9; i++) {
        board.appendChild(createCell());
    }
});