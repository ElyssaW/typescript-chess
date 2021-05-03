var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// Set board to initial state
function setStartingBoard() {
    // Function set pawns
    function setPawns() {
        return;
    }
    // Function to set other pieces
    var board = createBoard();
    board.forEach(function (row, index) {
        if (index === 0) {
        }
    });
}
// Initialize pieces
var Piece = /** @class */ (function () {
    function Piece(name, color, pos) {
        this.name = name;
        this.color = color;
        this.pos = pos;
        this.alive = true;
    }
    Piece.prototype.move = function () {
        // How the piece moves
    };
    return Piece;
}());
// Pawn
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Pawn;
}(Piece));
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
