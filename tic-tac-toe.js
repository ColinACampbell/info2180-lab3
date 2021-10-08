window.onload = (event) =>{
    const board = document.getElementById("board");
    
    // Add the class attribute to each square in the board
    for (let i = 0; i < board.children.length; i++)
    {
        board.children[i].setAttribute("class","square")
    }
}