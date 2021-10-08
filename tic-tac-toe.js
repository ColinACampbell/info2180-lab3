window.onload = () => {

    const userOMoves = [];
    const userXMoves = [];
    let userXTurn = true; // Used to toggle between user x and user o

    const isValidMove = (square) => {
        if (userOMoves.includes(square) || userXMoves.includes(square))
            return false;
        else
            return true;
    }

    const checkIfWin = (userMoves) => {


        let moves = [...userMoves]
        moves = moves.sort((a, b) => a - b);
        //console.log(moves)
        let horizontalScore = 0;
        let verticalScore = 0;
        let diagLeftScore = 0;
        let diagRightScore = 0;
        let previousMove = -1;


        moves.forEach((move) => {
            if (previousMove == - 1)
                previousMove = move;
            else {
                const steps = move - previousMove
                if (steps == 2) { diagLeftScore++ }
                if (steps == 4) { diagRightScore++ }
                if (steps == 1) { horizontalScore++ }
                if (steps === 3) { verticalScore++ }

                previousMove = move;
            }
        })

        //console.log({ horizantalScore, verticalScore, diagRightScore, diagLeftScore })
        return [horizontalScore, verticalScore, diagRightScore, diagLeftScore]
    }

    const board = document.getElementById("board");

    // Add the class attribute to each square in the board
    for (let i = 0; i < board.children.length; i++) {
        board.children[i].setAttribute("class", "square")
        board.children[i].addEventListener("click", () => {
            console.clear();
            if (userXTurn) {
                if (isValidMove(i + 1)) {
                    userXMoves.push(i + 1);

                    board.children[i].innerHTML = "X";
                    userXTurn = !userXTurn;
                }

            } else {
                if (isValidMove(i + 1)) {
                    userOMoves.push(i + 1);
                    userXTurn = !userXTurn;
                    board.children[i].innerHTML = "O";

                }
            }

            //console.log("User X", checkIfWin(userXMoves))
            //console.log("User O", checkIfWin(userOMoves));

            const userXScores = checkIfWin(userXMoves);
            const userOScores = checkIfWin(userOMoves);

            // Now check if win
            for (let i = 0; i < userOScores.length; i++) {
                console.log(userXScores[i], userOScores[i],(userXScores[i] > userOScores[i]) && userXScores[i] >= 2)
                if ((userXScores[i] > userOScores[i]) && userXScores[i] >= 2) {
                    console.log("User X Won");
                    break;
                }
                else if ((userOScores[i] > userXScores[i]) && userOScores[i] >= 2)
                {
                    console.log("User O Won");
                    break;
                }
            }

            // Check if they can place move
            // Check if user won
        })
    }
}