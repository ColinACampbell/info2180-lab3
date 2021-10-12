const isConsecutiveBy = (arr, n) => {
    // if the array has consective increases of n three times then return true
    let prevNum = -1;
    let consectiveCount = 0;

    for (let i = 0; i < arr.length; i++) {
        if (prevNum == -1)
            prevNum = arr[i];
        else {
            const diff = arr[i] - prevNum;
            if (diff == n)
                consectiveCount++
            else
                consectiveCount = 0
            prevNum = arr[i];

            if (consectiveCount == 2)
                break;
        }
    }

    return consectiveCount >= 2
}

window.onload = () => {

    let userOMoves = [];
    let userXMoves = [];
    let userXTurn = true; // Used to toggle between user x and user o

    const isValidMove = (square) => {
        if (userOMoves.includes(square) || userXMoves.includes(square))
            return false;
        else
            return true;
    }

    const checkIfWin = (userMoves) => {

        console.clear()
        let moves = [...userMoves]
        moves = moves.sort((a, b) => a - b);

        let won = false;

        if (isConsecutiveBy(moves, 1) || isConsecutiveBy(moves, 2) ||
            isConsecutiveBy(moves, 3) || isConsecutiveBy(moves, 4))
            won = true;

        return won;
    }

    const board = document.getElementById("board");

    // Add the class attribute to each square in the board
    for (let i = 0; i < board.children.length; i++) {

        board.children[i].setAttribute("class", "square")

        board.children[i].addEventListener("mouseenter", () => {
            board.children[i].classList.add("hover")//setAttribute("class", "square hover")
        })

        board.children[i].addEventListener("mouseleave", () => {
            board.children[i].classList.remove("hover")
        })

        board.children[i].addEventListener("click", () => {
            console.clear();
            if (userXTurn) {
                if (isValidMove(i + 1)) {
                    userXMoves.push(i + 1);

                    board.children[i].innerHTML = "X";
                    board.children[i].classList.add("X")
                    userXTurn = !userXTurn;
                }

            } else {
                if (isValidMove(i + 1)) {
                    userOMoves.push(i + 1);
                    userXTurn = !userXTurn;
                    board.children[i].innerHTML = "O";
                    board.children[i].classList.add("O")
                }
            }

            const status = document.getElementById("status")
            let didSomeoneWin = false; // Not to repeat setAtribute()
            if (checkIfWin(userXMoves)) {
                status.innerHTML = "Congratulations! X is the Winner!"
                didSomeoneWin = true;
            } else if (checkIfWin(userOMoves)) {
                status.innerHTML = "Congratulations! O is the Winner!"
                didSomeoneWin = true;
            }

            if (didSomeoneWin)
                status.setAttribute("class", "status you-won")

            // Clear the game
            const btns = document.getElementsByClassName("btn")
            btns[0].addEventListener("click", () => {
                board.children[i].innerHTML = ""
                userOMoves = [];
                userXMoves = [];
                status.setAttribute("class","status")
                status.innerHTML = "Move your mouse over a square and click to play an X or an O."
            })
        })
    }
}