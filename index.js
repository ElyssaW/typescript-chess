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
    var newBoard = [];
    // 2D array of rows/columns
    for (var i = 0; i < 8; i++) {
        // Holding objects, currently set to empty, but will contain pieces as they move around
        newBoard.push(new Array([{}, {}, {}, {}, {}, {}, {}, {}]));
    }
    return newBoard;
}
var board = createBoard();
function checkBoundary(x, y) {
    if (x >= 0 && x < 8) {
        if (y >= 0 && y < 8) {
            return true;
        }
    }
    return false;
}
function checkSquare(x, y) {
    if (board[x][y]) {
        return board[x][y];
    }
    else {
        return false;
    }
}
function checkCol(x, y, pace) {
    var moves = [];
    for (var i = 0; i < pace; i++) {
        if (checkBoundary(x, y + i)) {
            moves.push({ x: x, y: y + i });
            if (checkSquare(x, y + i)) {
                break;
            }
        }
    }
    for (var i = 0; i < pace; i++) {
        if (checkBoundary(x, y - i)) {
            moves.push({ x: x, y: y - i });
            if (checkSquare(x, y - i)) {
                break;
            }
        }
    }
    return moves;
}
function checkRow(x, y, pace) {
    var moves = [];
    for (var i = 0; i < pace; i++) {
        if (checkBoundary(x + i, y)) {
            moves.push({ x: x + i, y: y });
            if (checkSquare(x + i, y)) {
                break;
            }
        }
    }
    for (var i = 0; i < 8; i++) {
        if (checkBoundary(x - i, y)) {
            moves.push({ x: x - i, y: y });
            if (checkSquare(x - i, y)) {
                break;
            }
        }
    }
    return moves;
}
function checkDiagonal(x, y, pace) {
    var moves = [];
    for (var i = 0; i < pace; i++) {
        if (checkBoundary(x - i, y + i)) {
            moves.push({ x: x - i, y: y + i });
            if (checkSquare(x - i, y + i)) {
                break;
            }
        }
    }
    for (var i = 0; i < pace; i++) {
        if (checkBoundary(x + i, y - i)) {
            moves.push({ x: x + i, y: y - i });
            if (checkSquare(x + i, y - i)) {
                break;
            }
        }
    }
    for (var i = 0; i < pace; i++) {
        if (checkBoundary(x - i, y - i)) {
            moves.push({ x: x - i, y: y - i });
            if (checkSquare(x - i, y - i)) {
                break;
            }
        }
    }
    for (var i = 0; i < pace; i++) {
        if (checkBoundary(x - i, y - i)) {
            moves.push({ x: x - i, y: y - i });
            if (checkSquare(x - i, y - i)) {
                break;
            }
        }
    }
    return moves;
}
// Initialize pieces
var Piece = /** @class */ (function () {
    function Piece(id, name, color, pos, pace) {
        // Whether the piece is alive or dead
        this.alive = true;
        // What spaces can the piece move to
        this.availableMoves = [];
        this.id = id;
        this.name = name;
        this.color = color;
        this.pos = pos;
        this.pace = pace;
    }
    Piece.prototype.generateMoves = function () {
        // How the piece moves
    };
    return Piece;
}());
// Pawn
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn(id, color, pos) {
        var _this = _super.call(this, id, 'Pawn', color, pos, 1) || this;
        _this.generateMoves = function () {
            if (_this.color === 'white') {
                if (checkBoundary(_this.pos.x, _this.pos.y++) && !checkSquare(_this.pos.x, _this.pos.y++)) {
                    _this.availableMoves.push({
                        x: _this.pos.x,
                        y: _this.pos.y++
                    });
                }
                if (checkBoundary(_this.pos.x++, _this.pos.y++) && checkSquare(_this.pos.x++, _this.pos.y++)) {
                    _this.availableMoves.push({
                        x: _this.pos.x++,
                        y: _this.pos.y++
                    });
                }
                if (checkBoundary(_this.pos.x--, _this.pos.y++) && checkSquare(_this.pos.x--, _this.pos.y++)) {
                    _this.availableMoves.push({
                        x: _this.pos.x--,
                        y: _this.pos.y++
                    });
                }
            }
            else {
                if (checkBoundary(_this.pos.x, _this.pos.y--) && !checkSquare(_this.pos.x, _this.pos.y--)) {
                    _this.availableMoves.push({
                        x: _this.pos.x,
                        y: _this.pos.y--
                    });
                }
                if (checkBoundary(_this.pos.x++, _this.pos.y--) && checkSquare(_this.pos.x++, _this.pos.y--)) {
                    _this.availableMoves.push({
                        x: _this.pos.x++,
                        y: _this.pos.y--
                    });
                }
                if (checkBoundary(_this.pos.x--, _this.pos.y--) && checkSquare(_this.pos.x--, _this.pos.y--)) {
                    _this.availableMoves.push({
                        x: _this.pos.x--,
                        y: _this.pos.y--
                    });
                }
            }
        };
        return _this;
    }
    return Pawn;
}(Piece));
// Rook
var Rook = /** @class */ (function (_super) {
    __extends(Rook, _super);
    function Rook(id, color, pos) {
        var _this = _super.call(this, id, 'Rook', color, pos, board.length) || this;
        _this.generateMoves = function () {
            _this.availableMoves = _this.availableMoves.concat(checkCol(_this.pos.x, _this.pos.y, _this.pace));
            _this.availableMoves = _this.availableMoves.concat(checkRow(_this.pos.x, _this.pos.y, _this.pace));
        };
        return _this;
    }
    return Rook;
}(Piece));
// Knight
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    function Knight(id, color, pos) {
        var _this = _super.call(this, id, 'Knight', color, pos, 3) || this;
        _this.generateMoves = function () {
            if (checkBoundary(_this.pos.x + 1, _this.pos.y + 2) && checkSquare(_this.pos.x + 1, _this.pos.y + 2)) {
                _this.availableMoves.push({ x: _this.pos.x + 1, y: _this.pos.y + 2 });
            }
            if (checkBoundary(_this.pos.x + 2, _this.pos.y + 1) && checkSquare(_this.pos.x + 2, _this.pos.y + 1)) {
                _this.availableMoves.push({ x: _this.pos.x + 2, y: _this.pos.y + 1 });
            }
            //===============
            if (checkBoundary(_this.pos.x - 1, _this.pos.y + 2) && checkSquare(_this.pos.x - 1, _this.pos.y + 2)) {
                _this.availableMoves.push({ x: _this.pos.x - 1, y: _this.pos.y + 2 });
            }
            if (checkBoundary(_this.pos.x - 2, _this.pos.y + 1) && checkSquare(_this.pos.x - 2, _this.pos.y + 1)) {
                _this.availableMoves.push({ x: _this.pos.x - 2, y: _this.pos.y + 1 });
            }
            //===============
            if (checkBoundary(_this.pos.x + 1, _this.pos.y - 2) && checkSquare(_this.pos.x + 1, _this.pos.y - 2)) {
                _this.availableMoves.push({ x: _this.pos.x + 1, y: _this.pos.y - 2 });
            }
            if (checkBoundary(_this.pos.x + 2, _this.pos.y - 1) && checkSquare(_this.pos.x + 2, _this.pos.y - 1)) {
                _this.availableMoves.push({ x: _this.pos.x + 2, y: _this.pos.y - 1 });
            }
            //================
            if (checkBoundary(_this.pos.x - 1, _this.pos.y - 2) && checkSquare(_this.pos.x - 1, _this.pos.y - 2)) {
                _this.availableMoves.push({ x: _this.pos.x - 1, y: _this.pos.y - 2 });
            }
            if (checkBoundary(_this.pos.x - 2, _this.pos.y - 1) && checkSquare(_this.pos.x - 2, _this.pos.y - 1)) {
                _this.availableMoves.push({ x: _this.pos.x - 2, y: _this.pos.y - 1 });
            }
        };
        return _this;
    }
    return Knight;
}(Piece));
// Bishop
var Bishop = /** @class */ (function (_super) {
    __extends(Bishop, _super);
    function Bishop(id, color, pos) {
        var _this = _super.call(this, id, 'Bishop', color, pos, board.length) || this;
        _this.generateMoves = function () {
            _this.availableMoves = _this.availableMoves.concat(checkDiagonal(_this.pos.x, _this.pos.y, _this.pace));
        };
        return _this;
    }
    return Bishop;
}(Piece));
// Queen
var Queen = /** @class */ (function (_super) {
    __extends(Queen, _super);
    function Queen(id, color, pos) {
        var _this = _super.call(this, id, 'Queen', color, pos, board.length) || this;
        _this.generateMoves = function () {
            _this.availableMoves = _this.availableMoves.concat(checkDiagonal(_this.pos.x, _this.pos.y, _this.pace));
            _this.availableMoves = _this.availableMoves.concat(checkCol(_this.pos.x, _this.pos.y, _this.pace));
            _this.availableMoves = _this.availableMoves.concat(checkRow(_this.pos.x, _this.pos.y, _this.pace));
        };
        return _this;
    }
    return Queen;
}(Piece));
// King
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King(id, color, pos) {
        var _this = _super.call(this, id, 'King', color, pos, 1) || this;
        _this.generateMoves = function () {
            _this.availableMoves = _this.availableMoves.concat(checkDiagonal(_this.pos.x, _this.pos.y, _this.pace));
            _this.availableMoves = _this.availableMoves.concat(checkCol(_this.pos.x, _this.pos.y, _this.pace));
            _this.availableMoves = _this.availableMoves.concat(checkRow(_this.pos.x, _this.pos.y, _this.pace));
        };
        return _this;
    }
    return King;
}(Piece));
// Check position
// Checkmate position
// Turn counter
// Player class
var Player = /** @class */ (function () {
    function Player(name, color) {
        this.pieces = [];
        this.capturedPieces = [];
        this.name = name;
        this.color = color;
    }
    Player.prototype.selectPiece = function (piece) {
        piece.generateMoves();
        this.selected = piece.id;
    };
    Player.prototype.movePiece = function (pos) {
        this.pieces[this.selected].pos = pos;
        this.selected = null;
    };
    Player.prototype.createPieces = function (backRow, frontRow) {
        // Create Pawns
        this.pieces.push(new Pawn(0, this.color, { x: 0, y: frontRow }));
        this.pieces.push(new Pawn(1, this.color, { x: 1, y: frontRow }));
        this.pieces.push(new Pawn(2, this.color, { x: 2, y: frontRow }));
        this.pieces.push(new Pawn(3, this.color, { x: 3, y: frontRow }));
        this.pieces.push(new Pawn(4, this.color, { x: 4, y: frontRow }));
        this.pieces.push(new Pawn(5, this.color, { x: 5, y: frontRow }));
        this.pieces.push(new Pawn(6, this.color, { x: 6, y: frontRow }));
        this.pieces.push(new Pawn(7, this.color, { x: 7, y: frontRow }));
        // Create other pieces
        // Rooks
        this.pieces.push(new Rook(8, this.color, { x: 0, y: backRow }));
        this.pieces.push(new Rook(9, this.color, { x: 7, y: backRow }));
        //Knights
        this.pieces.push(new Knight(10, this.color, { x: 1, y: backRow }));
        this.pieces.push(new Knight(11, this.color, { x: 6, y: backRow }));
        // Bishops
        this.pieces.push(new Bishop(12, this.color, { x: 2, y: backRow }));
        this.pieces.push(new Bishop(13, this.color, { x: 5, y: backRow }));
        // Queen
        this.pieces.push(new Queen(14, this.color, { x: 4, y: backRow }));
        // King
        this.pieces.push(new King(15, this.color, { x: 3, y: backRow }));
    };
    return Player;
}());
var playerOne = new Player('Elyssa', 'white');
playerOne.createPieces(0, 1);
var playerTwo = new Player('Guest', 'black');
playerTwo.createPieces(7, 6);
function drawBoard() {
    function clearBoard() {
        board.forEach(function (row, rowIndex) {
            row.forEach(function (col, colIndex) {
                var square = document.getElementById("" + rowIndex + colIndex);
                square.style.backgroundImage = 'none';
                board[rowIndex][colIndex] = {};
            });
        });
    }
    function drawPlayerPieces(player) {
        player.pieces.forEach(function (piece) {
            if (piece.alive) {
                var square = document.getElementById("" + piece.pos.x + piece.pos.y);
                square.style.backgroundImage = "url('images/" + piece.color + piece.name.toLowerCase() + ".png')";
                board[piece.pos.x][piece.pos.y] = piece;
            }
        });
    }
    clearBoard();
    drawPlayerPieces(playerOne);
    drawPlayerPieces(playerTwo);
}
function pieceClicked(square) {
    console.log('clicked');
    console.log(square);
}
drawBoard();
