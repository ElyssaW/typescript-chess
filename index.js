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
var turnCount = 0;
var settings = {
    white: '#FCD7AD',
    black: '#F6C28B',
    yellow: '#FF934F',
    red: '#EE6055',
    green: '#77BFA3',
    purple: '#F61067',
    gameWon: false
};
// Initialize board
function createBoard() {
    var newBoard = [];
    // 2D array of rows/columns
    for (var i = 0; i < 8; i++) {
        // Holding objects, currently set to empty, but will contain pieces as they move around
        newBoard.push([]);
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
function checkCol(piece) {
    var moves = [];
    for (var i = 1; i < piece.pace; i++) {
        if (checkBoundary(piece.pos.x, piece.pos.y + i)) {
            if (checkSquare(piece.pos.x, piece.pos.y + i)) {
                if (piece.color != checkSquare(piece.pos.x, piece.pos.y + i).color) {
                    moves.push({ x: piece.pos.x, y: piece.pos.y + i });
                }
                break;
            }
            moves.push({ x: piece.pos.x, y: piece.pos.y + i });
        }
    }
    for (var i = 1; i < piece.pace; i++) {
        if (checkBoundary(piece.pos.x, piece.pos.y - i)) {
            if (checkSquare(piece.pos.x, piece.pos.y - i)) {
                if (piece.color != checkSquare(piece.pos.x, piece.pos.y - i).color) {
                    moves.push({ x: piece.pos.x, y: piece.pos.y - i });
                }
                break;
            }
            moves.push({ x: piece.pos.x, y: piece.pos.y - i });
        }
    }
    return moves;
}
function checkRow(piece) {
    var moves = [];
    for (var i = 1; i < piece.pace; i++) {
        if (checkBoundary(piece.pos.x + i, piece.pos.y)) {
            if (checkSquare(piece.pos.x + i, piece.pos.y)) {
                if (piece.color != checkSquare(piece.pos.x + i, piece.pos.y).color) {
                    moves.push({ x: piece.pos.x + i, y: piece.pos.y });
                }
                break;
            }
            moves.push({ x: piece.pos.x + i, y: piece.pos.y });
        }
    }
    for (var i = 1; i < piece.pace; i++) {
        if (checkBoundary(piece.pos.x - i, piece.pos.y)) {
            if (checkSquare(piece.pos.x - i, piece.pos.y)) {
                if (piece.color != checkSquare(piece.pos.x - i, piece.pos.y).color) {
                    moves.push({ x: piece.pos.x - i, y: piece.pos.y });
                }
                break;
            }
            moves.push({ x: piece.pos.x - i, y: piece.pos.y });
        }
    }
    return moves;
}
function checkDiagonal(piece) {
    var moves = [];
    for (var i = 1; i < piece.pace; i++) {
        if (checkBoundary(piece.pos.x - i, piece.pos.y + i)) {
            if (checkSquare(piece.pos.x - i, piece.pos.y + i)) {
                if (piece.color != checkSquare(piece.pos.x - i, piece.pos.y + i).color) {
                    moves.push({ x: piece.pos.x - i, y: piece.pos.y + i });
                }
                break;
            }
            moves.push({ x: piece.pos.x - i, y: piece.pos.y + i });
        }
    }
    for (var i = 1; i < piece.pace; i++) {
        if (checkBoundary(piece.pos.x + i, piece.pos.y - i)) {
            if (checkSquare(piece.pos.x + i, piece.pos.y - i)) {
                if (piece.color != checkSquare(piece.pos.x + i, piece.pos.y - i).color) {
                    moves.push({ x: piece.pos.x + i, y: piece.pos.y - i });
                }
                break;
            }
            moves.push({ x: piece.pos.x + i, y: piece.pos.y - i });
        }
    }
    for (var i = 1; i < piece.pace; i++) {
        if (checkBoundary(piece.pos.x + i, piece.pos.y + i)) {
            if (checkSquare(piece.pos.x + i, piece.pos.y + i)) {
                if (piece.color != checkSquare(piece.pos.x + i, piece.pos.y + i).color) {
                    moves.push({ x: piece.pos.x + i, y: piece.pos.y + i });
                }
                break;
            }
            moves.push({ x: piece.pos.x + i, y: piece.pos.y + i });
        }
    }
    for (var i = 1; i < piece.pace; i++) {
        if (checkBoundary(piece.pos.x - i, piece.pos.y - i)) {
            if (checkSquare(piece.pos.x - i, piece.pos.y - i)) {
                if (piece.color != checkSquare(piece.pos.x - i, piece.pos.y - i).color) {
                    moves.push({ x: piece.pos.x - i, y: piece.pos.y - i });
                }
                break;
            }
            moves.push({ x: piece.pos.x - i, y: piece.pos.y - i });
        }
    }
    return moves;
}
// Initialize pieces
var Piece = /** @class */ (function () {
    function Piece(id, player, team, name, color, pos, pace) {
        // Whether the piece is alive or dead
        this.alive = true;
        // Check whether the piece has moved or if it's still in its initial starting position
        this.hasMoved = false;
        // What spaces can the piece move to
        this.availableMoves = [];
        this.id = id;
        this.player = player;
        this.team = team;
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
    function Pawn(id, player, team, color, pos) {
        var _this = _super.call(this, id, player, team, 'Pawn', color, pos, color == settings.white ? 1 : -1) || this;
        _this.generateMoves = function () {
            if (!_this.hasMoved) {
                if (checkBoundary(_this.pos.x, _this.pos.y + (_this.pace * 2)) && checkSquare(_this.pos.x, _this.pos.y + (_this.pace * 2)) == false) {
                    _this.availableMoves.push({
                        x: _this.pos.x,
                        y: _this.pos.y + (_this.pace * 2)
                    });
                }
            }
            if (checkBoundary(_this.pos.x, _this.pos.y + _this.pace) || (checkSquare(_this.pos.x + _this.pace, _this.pos.y + _this.pace) && _this.color != checkSquare(_this.pos.x + _this.pace, _this.pos.y + _this.pace).color)) {
                _this.availableMoves.push({
                    x: _this.pos.x,
                    y: _this.pos.y + _this.pace
                });
            }
            if (checkBoundary(_this.pos.x + 1, _this.pos.y + _this.pace) && checkSquare(_this.pos.x + 1, _this.pos.y + _this.pace) && _this.color != checkSquare(_this.pos.x + 1, _this.pos.y + _this.pace).color) {
                _this.availableMoves.push({
                    x: _this.pos.x + 1,
                    y: _this.pos.y + _this.pace
                });
            }
            if (checkBoundary(_this.pos.x - 1, _this.pos.y + _this.pace) && checkSquare(_this.pos.x - 1, _this.pos.y + _this.pace) && _this.color != checkSquare(_this.pos.x - 1, _this.pos.y + _this.pace).color) {
                _this.availableMoves.push({
                    x: _this.pos.x - 1,
                    y: _this.pos.y + _this.pace
                });
            }
        };
        return _this;
    }
    return Pawn;
}(Piece));
// Rook
var Rook = /** @class */ (function (_super) {
    __extends(Rook, _super);
    function Rook(id, player, team, color, pos) {
        var _this = _super.call(this, id, player, team, 'Rook', color, pos, board.length) || this;
        _this.generateMoves = function () {
            _this.availableMoves = _this.availableMoves.concat(checkCol(_this));
            _this.availableMoves = _this.availableMoves.concat(checkRow(_this));
        };
        return _this;
    }
    return Rook;
}(Piece));
// Knight
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    function Knight(id, player, team, color, pos) {
        var _this = _super.call(this, id, player, team, 'Knight', color, pos, 3) || this;
        _this.generateMoves = function () {
            if (checkBoundary(_this.pos.x + 1, _this.pos.y + 2) && _this.color != checkSquare(_this.pos.x + 1, _this.pos.y + 2).color) {
                _this.availableMoves.push({ x: _this.pos.x + 1, y: _this.pos.y + 2 });
            }
            if (checkBoundary(_this.pos.x + 2, _this.pos.y + 1) && _this.color != checkSquare(_this.pos.x + 2, _this.pos.y + 1).color) {
                _this.availableMoves.push({ x: _this.pos.x + 2, y: _this.pos.y + 1 });
            }
            //===============
            if (checkBoundary(_this.pos.x - 1, _this.pos.y + 2) && _this.color != checkSquare(_this.pos.x - 1, _this.pos.y + 2).color) {
                _this.availableMoves.push({ x: _this.pos.x - 1, y: _this.pos.y + 2 });
            }
            if (checkBoundary(_this.pos.x - 2, _this.pos.y + 1) && _this.color != checkSquare(_this.pos.x - 2, _this.pos.y + 1).color) {
                _this.availableMoves.push({ x: _this.pos.x - 2, y: _this.pos.y + 1 });
            }
            //===============
            if (checkBoundary(_this.pos.x + 1, _this.pos.y - 2) && _this.color != checkSquare(_this.pos.x + 1, _this.pos.y - 2).color) {
                _this.availableMoves.push({ x: _this.pos.x + 1, y: _this.pos.y - 2 });
            }
            if (checkBoundary(_this.pos.x + 2, _this.pos.y - 1) && _this.color != checkSquare(_this.pos.x + 2, _this.pos.y - 1).color) {
                _this.availableMoves.push({ x: _this.pos.x + 2, y: _this.pos.y - 1 });
            }
            //================
            if (checkBoundary(_this.pos.x - 1, _this.pos.y - 2) && _this.color != checkSquare(_this.pos.x - 1, _this.pos.y - 2).color) {
                _this.availableMoves.push({ x: _this.pos.x - 1, y: _this.pos.y - 2 });
            }
            if (checkBoundary(_this.pos.x - 2, _this.pos.y - 1) && _this.color != checkSquare(_this.pos.x - 2, _this.pos.y - 1).color) {
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
    function Bishop(id, player, team, color, pos) {
        var _this = _super.call(this, id, player, team, 'Bishop', color, pos, board.length) || this;
        _this.generateMoves = function () {
            _this.availableMoves = _this.availableMoves.concat(checkDiagonal(_this));
        };
        return _this;
    }
    return Bishop;
}(Piece));
// Queen
var Queen = /** @class */ (function (_super) {
    __extends(Queen, _super);
    function Queen(id, player, team, color, pos) {
        var _this = _super.call(this, id, player, team, 'Queen', color, pos, board.length) || this;
        _this.generateMoves = function () {
            _this.availableMoves = _this.availableMoves.concat(checkDiagonal(_this));
            _this.availableMoves = _this.availableMoves.concat(checkCol(_this));
            _this.availableMoves = _this.availableMoves.concat(checkRow(_this));
        };
        return _this;
    }
    return Queen;
}(Piece));
// King
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King(id, player, team, color, pos) {
        var _this = _super.call(this, id, player, team, 'King', color, pos, 2) || this;
        _this.generateMoves = function () {
            _this.availableMoves = _this.availableMoves.concat(checkDiagonal(_this));
            _this.availableMoves = _this.availableMoves.concat(checkCol(_this));
            _this.availableMoves = _this.availableMoves.concat(checkRow(_this));
        };
        return _this;
    }
    return King;
}(Piece));
// Player class
var Player = /** @class */ (function () {
    function Player(team, name, color) {
        this.pieces = [];
        this.capturedPieces = [];
        this.inCheck = false;
        this.name = name;
        this.team = team;
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
    Player.prototype.capturePiece = function (piece) {
        this.capturedPieces.push(piece);
        var captured = document.getElementById(this.team + "captured");
        var newCapture = document.createElement('span');
        newCapture.className = "square captured " + piece.team + piece.name.toLowerCase();
        captured.appendChild(newCapture);
        if (piece.name === 'King') {
            victory(piece.player, this);
        }
    };
    Player.prototype.createPieces = function (backRow, frontRow) {
        // Create Pawns
        this.pieces.push(new Pawn(0, this, this.team, this.color, { x: 0, y: frontRow }));
        this.pieces.push(new Pawn(1, this, this.team, this.color, { x: 1, y: frontRow }));
        this.pieces.push(new Pawn(2, this, this.team, this.color, { x: 2, y: frontRow }));
        this.pieces.push(new Pawn(3, this, this.team, this.color, { x: 3, y: frontRow }));
        this.pieces.push(new Pawn(4, this, this.team, this.color, { x: 4, y: frontRow }));
        this.pieces.push(new Pawn(5, this, this.team, this.color, { x: 5, y: frontRow }));
        this.pieces.push(new Pawn(6, this, this.team, this.color, { x: 6, y: frontRow }));
        this.pieces.push(new Pawn(7, this, this.team, this.color, { x: 7, y: frontRow }));
        // Create other pieces
        // Rooks
        this.pieces.push(new Rook(8, this, this.team, this.color, { x: 0, y: backRow }));
        this.pieces.push(new Rook(9, this, this.team, this.color, { x: 7, y: backRow }));
        //Knights
        this.pieces.push(new Knight(10, this, this.team, this.color, { x: 1, y: backRow }));
        this.pieces.push(new Knight(11, this, this.team, this.color, { x: 6, y: backRow }));
        // Bishops
        this.pieces.push(new Bishop(12, this, this.team, this.color, { x: 2, y: backRow }));
        this.pieces.push(new Bishop(13, this, this.team, this.color, { x: 5, y: backRow }));
        // Queen
        this.pieces.push(new Queen(14, this, this.team, this.color, { x: 3, y: backRow }));
        // King
        this.pieces.push(new King(15, this, this.team, this.color, { x: 4, y: backRow }));
    };
    return Player;
}());
var playerOne = new Player('white', 'Host', settings.white);
playerOne.createPieces(0, 1);
var playerTwo = new Player('black', 'Guest', settings.black);
playerTwo.createPieces(7, 6);
function drawLineBetweenSquares(p1, p2) {
    var lineStart = { x: 0, y: 0 };
    var lineEnd = { x: 0, y: 0 };
    if (p1.x < p2.x) {
        lineStart.x = p1.x;
        lineEnd.x = p2.x;
    }
    else {
        lineStart.x = p2.x;
        lineEnd.x = p1.x;
    }
    if (p1.y < p2.y) {
        lineStart.y = p1.y;
        lineEnd.y = p2.y;
    }
    else {
        lineStart.y = p2.y;
        lineEnd.y = p1.y;
    }
    while (lineStart.x <= lineEnd.x && lineStart.y <= lineEnd.y) {
        var square = document.getElementById("" + lineStart.x + lineStart.y);
        square.style.backgroundColor = settings.purple;
        if (lineStart.x <= lineEnd.x) {
            lineStart.x++;
        }
        if (lineStart.y <= lineEnd.y) {
            lineStart.y++;
        }
    }
}
// Check position
function putInCheck(player, kingPos, enemyPos) {
    document.getElementById(player.team + "checkbanner").innerText = 'In Check!';
    document.getElementById("" + kingPos.x + kingPos.y).style.backgroundColor = settings.purple;
    document.getElementById("" + enemyPos.x + enemyPos.y).style.backgroundColor = settings.purple;
}
function removeFromCheck(player) {
    document.getElementById(player.team + "checkbanner").innerText = '';
}
function lookForCheck(player, opponent) {
    var kingPos = player.pieces[15].pos;
    player.inCheck = false;
    opponent.pieces.forEach(function (piece) {
        if (piece.alive) {
            piece.availableMoves.forEach(function (move) {
                if (move.x == kingPos.x && move.y == kingPos.y) {
                    player.inCheck = true;
                    putInCheck(player, kingPos, { x: piece.pos.x, y: piece.pos.y });
                }
            });
        }
    });
    if (!player.inCheck) {
        removeFromCheck(player);
    }
}
function generateAllAvailableMoves() {
    function generatePlayerMoves(player) {
        player.pieces.forEach(function (piece) {
            piece.availableMoves = [];
            piece.generateMoves();
        });
    }
    generatePlayerMoves(playerOne);
    generatePlayerMoves(playerTwo);
}
function drawBoard() {
    function clearBoard() {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                var square = document.getElementById("" + i + j);
                square.style.backgroundImage = 'none';
                if (i % 2 == 0 && j % 2 == 1 || i % 2 == 1 && j % 2 == 0) {
                    square.style.backgroundColor = settings.white;
                }
                else {
                    square.style.backgroundColor = settings.black;
                }
            }
        }
        board = createBoard();
    }
    function drawPlayerPieces(player) {
        player.pieces.forEach(function (piece) {
            if (piece.alive) {
                var square = document.getElementById("" + piece.pos.x + piece.pos.y);
                square.style.backgroundImage = "url('images/" + piece.team + piece.name.toLowerCase() + ".png')";
                board[piece.pos.x][piece.pos.y] = piece;
            }
        });
    }
    clearBoard();
    drawPlayerPieces(playerOne);
    drawPlayerPieces(playerTwo);
}
function handleTurn(e, square, player, opponent) {
    // Check if the square clicked on contains a piece
    var clickedPiece;
    if (board[square.x][square.y]) {
        clickedPiece = board[square.x][square.y];
    }
    // Check if the player currently has a piece selected
    if (player.selected || player.selected === 0) {
        // Filter to find if clicked square is in available moves
        var move = player.pieces[player.selected].availableMoves.filter(function (move) {
            return move.x === square.x && move.y === square.y;
        });
        // Check if clicked square is among available moves
        if (move[0]) {
            // Check if the square the player is moving to is occupied, and if so, if the occupant is an enemy piece
            if (clickedPiece && clickedPiece.color != player.color) {
                // Capture the enemy piece
                opponent.pieces[clickedPiece.id].alive = false;
                player.capturePiece(opponent.pieces[clickedPiece.id]);
            }
            // Set the position of the player's piece to the clicked square
            player.pieces[player.selected].pos = square;
            // Clear out the selected piece's available moves
            player.pieces[player.selected].availableMoves = [];
            // Set the piece's hasMoved to ture
            player.pieces[player.selected].hasMoved = true;
            // Clear the player's selection
            player.selected = null;
            // Redraw the board
            drawBoard();
            // Return true, to signify the turn is successfully completed
            return true;
        }
        // If the player does not have a piece selected
    }
    else {
        // If the clicked square contains one of the player's pieces
        if (clickedPiece && clickedPiece.color === player.color) {
            // If no moves are available, disallow player from selecting the piece
            if (clickedPiece.availableMoves.length) {
                // Set the space of the selected piece to yellow
                e.style.backgroundColor = settings.yellow;
                // Highlight each possible space
                clickedPiece.availableMoves.forEach(function (move) {
                    var availableSquare = document.getElementById("" + move.x + move.y);
                    // If the possible space contains an enemy, highlight in red
                    if (board[move.x][move.y]) {
                        availableSquare.style.backgroundColor = settings.red;
                        // If it is empty, highlight in green
                    }
                    else {
                        availableSquare.style.backgroundColor = settings.green;
                    }
                });
                // Set the player's selection to the clicked piece
                player.selected = clickedPiece.id;
                player.pieces[player.selected].availableMoves = clickedPiece.availableMoves;
            }
        }
    }
}
function changeTurn(player) {
    var turnheader = document.getElementById(player.team + "turn");
    turnheader.className = "turnheader " + player.team + "current";
    turnheader.innerText = 'Your Turn';
}
function clearTurn(player) {
    var turnheader = document.getElementById(player.team + "turn");
    turnheader.className = "turnheader";
    turnheader.innerText = 'Opponent\'s Turn';
}
function pieceClicked(e, square) {
    if (!settings.gameWon) {
        var turnHandled = void 0;
        if (turnCount % 2 === 0) {
            turnHandled = handleTurn(e, square, playerOne, playerTwo);
        }
        else {
            turnHandled = handleTurn(e, square, playerTwo, playerOne);
        }
        if (turnHandled && !settings.gameWon) {
            turnCount++;
            generateAllAvailableMoves();
            if (turnCount % 2 == 0) {
                lookForCheck(playerOne, playerTwo);
                lookForCheck(playerTwo, playerOne);
                changeTurn(playerOne);
                clearTurn(playerTwo);
            }
            else {
                lookForCheck(playerOne, playerTwo);
                lookForCheck(playerTwo, playerOne);
                changeTurn(playerTwo);
                clearTurn(playerOne);
            }
        }
    }
}
function victory(loser, victor) {
    settings.gameWon = true;
    var loserheader = document.getElementById(loser.team + "turn");
    loserheader.className = "turnheader " + loser.team + "current";
    loserheader.innerText = 'You lost!';
    var victorheader = document.getElementById(victor.team + "turn");
    victorheader.className = "turnheader " + victor.team + "current";
    victorheader.innerText = 'You won!';
    var counter = 0;
    var flashBoard = setInterval(function () {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                var square = document.getElementById("" + i + j);
                if (counter % 2 === 0) {
                    if ((i % 2 === 0 && j % 2 === 1) || (i % 2 === 1 && j % 2 === 0)) {
                        square.style.backgroundColor = settings.white;
                        square.style.transform = 'rotate(5deg)';
                    }
                    else {
                        square.style.backgroundColor = settings.black;
                        square.style.transform = 'rotate(-5deg)';
                    }
                }
                else {
                    if ((i % 2 === 0 && j % 2 === 1) || (i % 2 === 1 && j % 2 === 0)) {
                        square.style.backgroundColor = settings.black;
                        square.style.transform = 'rotate(-5deg)';
                    }
                    else {
                        square.style.backgroundColor = settings.white;
                        square.style.transform = 'rotate(5deg)';
                    }
                }
            }
        }
        counter++;
    }, 500);
}
drawBoard();
generateAllAvailableMoves();
