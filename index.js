console.log('Hello');
// Initialize board
function createBoard() {
    var board = [];
    // 2D array of rows/columns
    for (var i = 0; i < 8; i++) {
        // Holding objects, currently set to empty, but will contain pieces as they move around
        board.push(new Array([{}, {}, {}, {}, {}, {}, {}, {}]));
    }
    return board;
}
var board = createBoard();
// Initialize pieces
// Pawn
// Rook
// Knight
// Bishop
// Queen
// King
// Check position
// Checkmate position
// Player class
// Color
// Pieces
// Turn counter
