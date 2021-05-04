console.log('Hello')

// Initialize board
function createBoard() {
    let newBoard = []

    // 2D array of rows/columns
    for (let i = 0; i < 8; i++) {
        // Holding objects, currently set to empty, but will contain pieces as they move around
        newBoard.push(new Array([ {}, {}, {}, {}, {}, {}, {}, {} ]))
    }

    return newBoard
}

let board = createBoard()

function checkBoundary(x: number, y: number) {
    if (x >= 0 && x < 8) {
        if (y >=0 && y < 8) {
            return true
        }
    }

    return false
}

function checkSquare(x: number, y: number) {
    if (board[x][y]) {
        return board[x][y]
    } else {
        return false
    }
}

function checkCol(piece: Piece) {
    let moves = []

    for (let i = 1; i < piece.pace; i++) {
        if (checkBoundary(piece.pos.x, piece.pos.y+i)) {

            if (checkSquare(piece.pos.x, piece.pos.y+i)) {
                if (piece.color != checkSquare(piece.pos.x, piece.pos.y+i).color) {
                    moves.push({x: piece.pos.x, y: piece.pos.y+i})
                }
                break;
            }

            moves.push({x: piece.pos.x, y: piece.pos.y+i})
        }
    }

    for (let i = 1; i < piece.pace; i++) {
        if (checkBoundary(piece.pos.x, piece.pos.y-i)) {

            if (checkSquare(piece.pos.x, piece.pos.y-i)) {
                if (piece.color != checkSquare(piece.pos.x, piece.pos.y-i).color) {
                    moves.push({x: piece.pos.x, y: piece.pos.y-i})
                }
                break;
            }

            moves.push({x: piece.pos.x, y: piece.pos.y-i})
        }
    }

    return moves
}

function checkRow (piece: Piece) {
    let moves = []

    for (let i = 1; i < piece.pace; i++) {
        if (checkBoundary(piece.pos.x+i, piece.pos.y)) {

            if (checkSquare(piece.pos.x+i, piece.pos.y)) {
                if (piece.color != checkSquare(piece.pos.x+i, piece.pos.y).color) {
                    moves.push({x: piece.pos.x+i, y: piece.pos.y})
                }
                break;
            }
    
            moves.push({x: piece.pos.x+i, y: piece.pos.y})
        }
    }

    for (let i = 1; i < piece.pace; i++) {
        if (checkBoundary(piece.pos.x-i, piece.pos.y)) {
            
            if (checkSquare(piece.pos.x-i, piece.pos.y)) {
                if (piece.color != checkSquare(piece.pos.x-i, piece.pos.y).color) {
                    moves.push({x: piece.pos.x-i, y: piece.pos.y})
                }
                break;
            }
    
            moves.push({x: piece.pos.x-i, y: piece.pos.y})
        }
    }

    return moves
}

function checkDiagonal (piece: Piece) {
    let moves = []

    for (let i = 1; i < piece.pace; i++) {
        if (checkBoundary(piece.pos.x-i, piece.pos.y+i)) {

            if (checkSquare(piece.pos.x-i, piece.pos.y+i)) {
                if (piece.color != checkSquare(piece.pos.x-i, piece.pos.y+i).color) {
                    moves.push({x: piece.pos.x-i, y: piece.pos.y+i})
                }
                break;
            }

            moves.push({x: piece.pos.x-i, y: piece.pos.y+i})
        }
    }

    for (let i = 1; i < piece.pace; i++) {
        if (checkBoundary(piece.pos.x+i, piece.pos.y-i)) {
            if (checkSquare(piece.pos.x+i, piece.pos.y-i)) {
                if (piece.color != checkSquare(piece.pos.x+i, piece.pos.y-i).color) {
                    moves.push({x: piece.pos.x+i, y: piece.pos.y-i})
                }
                break;
            }

            moves.push({x: piece.pos.x+i, y: piece.pos.y-i})
        }
    }

    for (let i = 1; i < piece.pace; i++) {
        if (checkBoundary(piece.pos.x+i, piece.pos.y+i)) {
            if (checkSquare(piece.pos.x+i, piece.pos.y+i)) {
                if (piece.color != checkSquare(piece.pos.x+i, piece.pos.y+i).color) {
                    moves.push({x: piece.pos.x+i, y: piece.pos.y+i})
                }
                break;
            }

            moves.push({x: piece.pos.x+i, y: piece.pos.y+i})
        }
    }

    for (let i = 1; i < piece.pace; i++) {
        if (checkBoundary(piece.pos.x-i, piece.pos.y-i)) {
            if (checkSquare(piece.pos.x-i, piece.pos.y-i)) {
                if (piece.color != checkSquare(piece.pos.x-i, piece.pos.y-i).color) {
                    moves.push({x: piece.pos.x-i, y: piece.pos.y-i})
                }
                break;
            }

            moves.push({x: piece.pos.x-i, y: piece.pos.y-i})
        }
    }

    return moves
}

// Initialize pieces
class Piece {
    // ID of piece
    id: number

    // Name of the piece
    name: string
    
    // X/Y Position of the piece
    pos: {
        x: number
        y: number
    }

    // Color or "team" of the piece
    color: string

    // How many spaces the piece can move at once
    pace: number

    // Whether the piece is alive or dead
    alive = true

    // What spaces can the piece move to
    availableMoves = []

    constructor(id: number, name: string, color: string, pos: {x: number, y: number}, pace: number) {
        this.id = id
        this.name = name
        this.color = color
        this.pos = pos
        this.pace = pace
    }

    generateMoves() {
        // How the piece moves
    }
}

// Pawn
class Pawn extends Piece {
    constructor (id: number, color: string, pos: {x: number, y: number}) {
        
        super(id, 'Pawn', color, pos, color  == 'white' ? 1 : -1)

        this.generateMoves = () => {

            if (checkBoundary(this.pos.x, this.pos.y + this.pace)) {
                this.availableMoves.push({
                    x: this.pos.x,
                    y: this.pos.y + this.pace
                })
            }

            if (checkBoundary(this.pos.x + 1, this.pos.y + this.pace) && checkSquare(this.pos.x + 1, this.pos.y + this.pace)) {
                this.availableMoves.push({
                    x: this.pos.x + 1,
                    y: this.pos.y + this.pace
                })
            }

            if (checkBoundary(this.pos.x - 1, this.pos.y + this.pace) && checkSquare(this.pos.x - 1, this.pos.y + this.pace)) {
                this.availableMoves.push({
                    x: this.pos.x - 1,
                    y: this.pos.y + this.pace
                })
            }
        }
    }
}

// Rook
class Rook extends Piece {
    constructor (id: number, color: string, pos: {x: number, y: number}) {
        super(id, 'Rook', color, pos, board.length)

        this.generateMoves = () => {
            this.availableMoves = this.availableMoves.concat(checkCol(this))
            this.availableMoves = this.availableMoves.concat(checkRow(this))
        }

    }
}

// Knight
class Knight extends Piece {
    constructor (id: number, color: string, pos: {x: number, y: number}) {
        super(id, 'Knight', color, pos, 3)

        this.generateMoves = () => {
            if (checkBoundary(this.pos.x+1,this.pos.y+2)) {
                this.availableMoves.push({x: this.pos.x+1, y: this.pos.y+2})
            }

            if (checkBoundary(this.pos.x+2,this.pos.y+1)) {
                this.availableMoves.push({x: this.pos.x+2, y: this.pos.y+1})
            }

            //===============
            if (checkBoundary(this.pos.x-1,this.pos.y+2)) {
                this.availableMoves.push({x: this.pos.x-1, y: this.pos.y+2})
            }

            if (checkBoundary(this.pos.x-2,this.pos.y+1)) {
                this.availableMoves.push({x: this.pos.x-2, y: this.pos.y+1})
            }

            //===============
            if (checkBoundary(this.pos.x+1,this.pos.y-2)) {
                this.availableMoves.push({x: this.pos.x+1, y: this.pos.y-2})
            }
            
            if (checkBoundary(this.pos.x+2,this.pos.y-1)) {
                this.availableMoves.push({x: this.pos.x+2, y: this.pos.y-1})
            }

            //================
            if (checkBoundary(this.pos.x-1,this.pos.y-2)) {
                this.availableMoves.push({x: this.pos.x-1, y: this.pos.y-2})
            }

            if (checkBoundary(this.pos.x-2,this.pos.y-1)) {
                this.availableMoves.push({x: this.pos.x-2, y: this.pos.y-1})
            }
        }
    }
}

// Bishop
class Bishop extends Piece {
    constructor (id: number, color: string, pos: {x: number, y: number}) {
        super(id, 'Bishop', color, pos, board.length)

        this.generateMoves = () => {
            this.availableMoves = this.availableMoves.concat(checkDiagonal(this))
        }
    }
}

// Queen
class Queen extends Piece {
    constructor (id: number, color: string, pos: {x: number, y: number}) {
        super(id, 'Queen', color, pos, board.length)

        this.generateMoves = () => {
            this.availableMoves = this.availableMoves.concat(checkDiagonal(this))
            this.availableMoves = this.availableMoves.concat(checkCol(this))
            this.availableMoves = this.availableMoves.concat(checkRow(this))
        }
    }
}

// King
class King extends Piece {
    constructor (id: number, color: string, pos: {x: number, y: number}) {
        super(id, 'King', color, pos, 2)

        this.generateMoves = () => {
            this.availableMoves = this.availableMoves.concat(checkDiagonal(this))
            this.availableMoves = this.availableMoves.concat(checkCol(this))
            this.availableMoves = this.availableMoves.concat(checkRow(this))
        }
    }
}

// Check position
    // Checkmate position

// Turn counter

// Player class
class Player {
    name: string
    color: string
    pieces = []
    capturedPieces = []
    selected: number

    constructor(name: string, color: string) {
        this.name = name
        this.color = color
    }

    selectPiece (piece: Piece) {
        piece.generateMoves()
        this.selected = piece.id
    }

    movePiece (pos: {x:number, y: number}) {
        this.pieces[this.selected].pos = pos
        this.selected = null
    }

    createPieces (backRow:number, frontRow:number) {
        // Create Pawns
        this.pieces.push(
            new Pawn(0, this.color, {x:0, y:frontRow})
        )
        this.pieces.push(
            new Pawn(1, this.color, {x:1, y:frontRow})
        )
        this.pieces.push(
            new Pawn(2, this.color, {x:2, y:frontRow})
        )
        this.pieces.push(
            new Pawn(3, this.color, {x:3, y:frontRow})
        )
        this.pieces.push(
            new Pawn(4, this.color, {x:4, y:frontRow})
        )
        this.pieces.push(
            new Pawn(5, this.color, {x:5, y:frontRow})
        )
        this.pieces.push(
            new Pawn(6, this.color, {x:6, y:frontRow})
        )
        this.pieces.push(
            new Pawn(7, this.color, {x:7, y:frontRow})
        )

        // Create other pieces
        // Rooks
        this.pieces.push(
            new Rook(8, this.color, {x:0, y:backRow})
        )
        this.pieces.push(
            new Rook(9, this.color, {x:7, y:backRow})
        )

        //Knights
        this.pieces.push(
            new Knight(10, this.color, {x:1, y:backRow})
        )
        this.pieces.push(
            new Knight(11, this.color, {x:6, y:backRow})
        )

        // Bishops
        this.pieces.push(
            new Bishop(12, this.color, {x:2, y:backRow})
        )
        this.pieces.push(
            new Bishop(13, this.color, {x:5, y:backRow})
        )

        // Queen
        this.pieces.push(
            new Queen(14, this.color, {x:4, y:backRow})
        )

        // King
        this.pieces.push(
            new King(15, this.color, {x:3, y:backRow})
        )
    }
}

let playerOne = new Player('Elyssa', 'white')
playerOne.createPieces(0, 1)
let playerTwo = new Player('Guest', 'black')
playerTwo.createPieces(7, 6)

function drawBoard() {

    function clearBoard() {

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let square = document.getElementById(`${i}${j}`)
                square.style.backgroundImage = 'none'

                if (i % 2 == 0 && j % 2 == 1 || i % 2 == 1 && j % 2 == 0) {
                    square.style.backgroundColor = 'white'
                } else {
                    square.style.backgroundColor = 'black'
                }
            }
        }

        board = createBoard()
    }

    function drawPlayerPieces(player: Player) {
        player.pieces.forEach(piece => {
            if (piece.alive) {
                let square = document.getElementById(`${piece.pos.x}${piece.pos.y}`)
                square.style.backgroundImage = `url('images/${piece.color}${piece.name.toLowerCase()}.png')`
                board[piece.pos.x][piece.pos.y] = piece
            }
        });
    }

    clearBoard()
    drawPlayerPieces(playerOne)
    drawPlayerPieces(playerTwo)
}

function pieceClicked (e, square:{x:number, y:number}) {
    console.log('clicked')
    console.log(square)

    // Check if the square clicked on contains a piece
    let clickedPiece: Piece
    if (board[square.x][square.y]) {
        clickedPiece = board[square.x][square.y]
    }
    
    // Check if the player currently has a piece selected
    if (playerOne.selected || playerOne.selected === 0) {

        console.log(playerOne.pieces[playerOne.selected].availableMoves[0])

        // Filter to find if clicked square is in available moves
        let move = playerOne.pieces[playerOne.selected].availableMoves.filter(move => {
            return move.x === square.x && move.y === square.y
        })

        console.log(move)

        // Check if clicked square is among available moves
        if (move[0]) {

            // Check if the square the player is moving to is occupied, and if so, if the occupant is an enemy piece
            if (clickedPiece && clickedPiece.color != playerOne.color) {
                // Capture the enemy piece
                playerTwo.pieces[clickedPiece.id].alive = false
            }

            // Set the position of the player's piece to the clicked square
            playerOne.pieces[playerOne.selected].pos = square
            // Clear out the selected piece's available moves
            playerOne.pieces[playerOne.selected].availableMoves = []
            // Clear the player's selection
            playerOne.selected = null
            // Redraw the board
            drawBoard()
        }

    // If the player does not have a piece selected
    } else {
        // If the clicked square contains one of the player's pieces
        if (clickedPiece && clickedPiece.color === playerOne.color) {
            
            // Set the space of the selected piece to yellow
            e.style.backgroundColor = 'yellow'

            // See what spaces this piece can move to
            clickedPiece.generateMoves()
    
            // Highlight each possible space
            clickedPiece.availableMoves.forEach((move) => {
                let availableSquare = document.getElementById(`${move.x}${move.y}`)
    
                // If the possible space contains an enemy, highlight in red
                if (board[move.x][move.y]) {
                    availableSquare.style.backgroundColor = 'red'

                // If it is empty, highlight in green
                } else {
                    availableSquare.style.backgroundColor = 'green'
                }
            });
    
            // Set the player's selection to the clicked piece
            playerOne.selected = clickedPiece.id
            playerOne.pieces[playerOne.selected].availableMoves = clickedPiece.availableMoves
        }
    }
}

drawBoard()