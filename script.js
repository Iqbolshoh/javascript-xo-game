document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("game-board");
    const gameOverMessage = document.getElementById("game-over-message");
    const restartButton = document.getElementById("restart-button");
    let currentPlayer = "X";  // Boshlanishi uchun foydalanuvchi "X" o'ynaydi
    let gameOver = false;

    function createCell() {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", handleCellClick);
        return cell;
    }

    function handleCellClick(event) {
        if (gameOver || event.target.textContent !== "" || currentPlayer !== "X") {
            return;
        }

        // Foydalanuvchi o'z harakatini qiladi
        event.target.textContent = currentPlayer;

        if (checkWinner()) {
            gameOverMessage.textContent = `${currentPlayer} wins!`;
            gameOverMessage.style.display = "block";
            gameOver = true;
            animateWinner();
            restartButton.style.display = "block";
            return;
        } else {
            currentPlayer = "O";  // Kompyuterning navbati
        }

        if (checkDraw()) {
            gameOverMessage.textContent = "It's a draw!";
            gameOverMessage.style.display = "block";
            gameOver = true;
            restartButton.style.display = "block";
        } else if (!gameOver) {
            setTimeout(computerMove, 500);  // Kompyuterga biroz vaqt berish
        }
    }

    function computerMove() {
        const cells = document.querySelectorAll(".cell");
        let availableCells = [];

        cells.forEach((cell, index) => {
            if (cell.textContent === "") {
                availableCells.push(cell);
            }
        });

        if (availableCells.length > 0) {
            const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
            randomCell.textContent = "O";  // Kompyuterning harakati

            if (checkWinner()) {
                gameOverMessage.textContent = "O wins!";
                gameOverMessage.style.display = "block";
                gameOver = true;
                animateWinner();
                restartButton.style.display = "block";
            } else {
                currentPlayer = "X";  // Foydalanuvchiga navbat
            }

            if (checkDraw() && !gameOver) {
                gameOverMessage.textContent = "It's a draw!";
                gameOverMessage.style.display = "block";
                gameOver = true;
                restartButton.style.display = "block";
            }
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
