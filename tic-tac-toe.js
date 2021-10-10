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

        board.children[i].addEventListener("mouseenter",()=>{
            board.children[i].setAttribute("class","square hover")
        })

        board.children[i].addEventListener("mouseleave",()=>{
            board.children[i].setAttribute("class","square")
        })

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


            if (checkIfWin(userXMoves))
            {
                // User X Won!!
            } else if (checkIfWin(userOMoves))
            {
                
                //
            }

        })
    }
}