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

function checkCol(x: number, y: number, pace:number) {
    let moves = []

    for (let i = 0; i < pace; i++) {
        if (checkBoundary(x, y+i)) {
            moves.push({x: x, y: y+i})

            if (checkSquare(x, y+i)) {
                break;
            }
        }
    }

    for (let i = 0; i < pace; i++) {
        if (checkBoundary(x, y-i)) {
            moves.push({x: x, y: y-i})

            if (checkSquare(x, y-i)) {
                break;
            }
        }
    }

    return moves
}

function checkRow (x: number, y: number, pace:number) {
    let moves = []

    for (let i = 0; i < pace; i++) {
        if (checkBoundary(x+i, y)) {
            moves.push({x: x+i, y: y})

            if (checkSquare(x+i, y)) {
                break;
            }
        }
    }

    for (let i = 0; i < 8; i++) {
        if (checkBoundary(x-i, y)) {
            moves.push({x: x-i, y: y})

            if (checkSquare(x-i, y)) {
                break;
            }
        }
    }

    return moves
}

function checkDiagonal (x: number, y: number, pace:number) {
    let moves = []

    for (let i = 0; i < pace; i++) {
        if (checkBoundary(x-i, y+i)) {
            moves.push({x: x-i, y: y+i})

            if (checkSquare(x-i, y+i)) {
                break;
            }
        }
    }

    for (let i = 0; i < pace; i++) {
        if (checkBoundary(x+i, y-i)) {
            moves.push({x: x+i, y: y-i})

            if (checkSquare(x+i, y-i)) {
                break;
            }
        }
    }

    for (let i = 0; i < pace; i++) {
        if (checkBoundary(x-i, y-i)) {
            moves.push({x: x-i, y: y-i})

            if (checkSquare(x-i, y-i)) {
                break;
            }
        }
    }

    for (let i = 0; i < pace; i++) {
        if (checkBoundary(x-i, y-i)) {
            moves.push({x: x-i, y: y-i})

            if (checkSquare(x-i, y-i)) {
                break;
            }
        }
    }

    return moves
}

// Initialize pieces
class Piece {
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

    constructor(name: string, color: string, pos: {x: number, y: number}, pace: number) {
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
    constructor (color: string, pos: {x: number, y: number}, pace:number) {
        super('Pawn', color, pos, pace)

        this.generateMoves = () => {
            if (this.color === 'white') {

                if (checkBoundary(this.pos.x, this.pos.y++) && !checkSquare(this.pos.x, this.pos.y++)) {
                    this.availableMoves.push({
                        x: this.pos.x,
                        y: this.pos.y++
                    })
                }

                if (checkBoundary(this.pos.x++, this.pos.y++) && checkSquare(this.pos.x++, this.pos.y++)) {
                    this.availableMoves.push({
                        x: this.pos.x++,
                        y: this.pos.y++
                    })
                }

                if (checkBoundary(this.pos.x--, this.pos.y++) && checkSquare(this.pos.x--, this.pos.y++)) {
                    this.availableMoves.push({
                        x: this.pos.x--,
                        y: this.pos.y++
                    })
                }

            } else {

                if (checkBoundary(this.pos.x, this.pos.y--) && !checkSquare(this.pos.x, this.pos.y--)) {
                    this.availableMoves.push({
                        x: this.pos.x,
                        y: this.pos.y--
                    })
                }

                if (checkBoundary(this.pos.x++, this.pos.y--) && checkSquare(this.pos.x++, this.pos.y--)) {
                    this.availableMoves.push({
                        x: this.pos.x++,
                        y: this.pos.y--
                    })
                }

                if (checkBoundary(this.pos.x--, this.pos.y--) && checkSquare(this.pos.x--, this.pos.y--)) {
                    this.availableMoves.push({
                        x: this.pos.x--,
                        y: this.pos.y--
                    })
                }

            }
        }
    }
}

// Rook
class Rook extends Piece {
    constructor (color: string, pos: {x: number, y: number}, pace:number) {
        super('Rook', color, pos, pace)

        this.generateMoves = () => {
            this.availableMoves = this.availableMoves.concat(checkCol(this.pos.x,this.pos.y, this.pace))
            this.availableMoves = this.availableMoves.concat(checkRow(this.pos.x,this.pos.y, this.pace))
        }

    }
}

// Knight
class Knight extends Piece {
    constructor (color: string, pos: {x: number, y: number}, pace:number) {
        super('Knight', color, pos, pace)

        this.generateMoves = () => {
            if (checkBoundary(this.pos.x+1,this.pos.y+2) && checkSquare(this.pos.x+1,this.pos.y+2)) {
                this.availableMoves.push({x: this.pos.x+1, y: this.pos.y+2})
            }

            if (checkBoundary(this.pos.x+2,this.pos.y+1) && checkSquare(this.pos.x+2,this.pos.y+1)) {
                this.availableMoves.push({x: this.pos.x+2, y: this.pos.y+1})
            }

            //===============
            if (checkBoundary(this.pos.x-1,this.pos.y+2) && checkSquare(this.pos.x-1,this.pos.y+2)) {
                this.availableMoves.push({x: this.pos.x-1, y: this.pos.y+2})
            }

            if (checkBoundary(this.pos.x-2,this.pos.y+1) && checkSquare(this.pos.x-2,this.pos.y+1)) {
                this.availableMoves.push({x: this.pos.x-2, y: this.pos.y+1})
            }

            //===============
            if (checkBoundary(this.pos.x+1,this.pos.y-2) && checkSquare(this.pos.x+1,this.pos.y-2)) {
                this.availableMoves.push({x: this.pos.x+1, y: this.pos.y-2})
            }
            
            if (checkBoundary(this.pos.x+2,this.pos.y-1) && checkSquare(this.pos.x+2,this.pos.y-1)) {
                this.availableMoves.push({x: this.pos.x+2, y: this.pos.y-1})
            }

            //================
            if (checkBoundary(this.pos.x-1,this.pos.y-2) && checkSquare(this.pos.x-1,this.pos.y-2)) {
                this.availableMoves.push({x: this.pos.x-1, y: this.pos.y-2})
            }

            if (checkBoundary(this.pos.x-2,this.pos.y-1) && checkSquare(this.pos.x-2,this.pos.y-1)) {
                this.availableMoves.push({x: this.pos.x-2, y: this.pos.y-1})
            }
        }
    }
}

// Bishop
class Bishop extends Piece {
    constructor (color: string, pos: {x: number, y: number}, pace:number) {
        super('Bishop', color, pos, pace)

        this.generateMoves = () => {
            this.availableMoves = this.availableMoves.concat(checkDiagonal(this.pos.x,this.pos.y, this.pace))
        }
    }
}

// Queen
class Queen extends Piece {
    constructor (color: string, pos: {x: number, y: number}, pace:number) {
        super('Queen', color, pos, pace)

        this.generateMoves = () => {
            this.availableMoves = this.availableMoves.concat(checkDiagonal(this.pos.x,this.pos.y, this.pace))
            this.availableMoves = this.availableMoves.concat(checkCol(this.pos.x,this.pos.y, this.pace))
            this.availableMoves = this.availableMoves.concat(checkRow(this.pos.x,this.pos.y, this.pace))
        }
    }
}

// King
class King extends Piece {
    constructor (color: string, pos: {x: number, y: number}, pace:number) {
        super('King', color, pos, pace)

        this.generateMoves = () => {
            this.availableMoves = this.availableMoves.concat(checkDiagonal(this.pos.x,this.pos.y, this.pace))
            this.availableMoves = this.availableMoves.concat(checkCol(this.pos.x,this.pos.y, this.pace))
            this.availableMoves = this.availableMoves.concat(checkRow(this.pos.x,this.pos.y, this.pace))
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

    constructor(name: string, color: string) {
        this.name = name
        this.color = color
    }

    createPieces (backRow:number, frontRow:number) {
        // Create Pawns
        this.pieces.push(
            new Pawn(this.color, {x:0, y:frontRow}, 1)
        )
        this.pieces.push(
            new Pawn(this.color, {x:1, y:frontRow}, 1)
        )
        this.pieces.push(
            new Pawn(this.color, {x:2, y:frontRow}, 1)
        )
        this.pieces.push(
            new Pawn(this.color, {x:3, y:frontRow}, 1)
        )
        this.pieces.push(
            new Pawn(this.color, {x:4, y:frontRow}, 1)
        )
        this.pieces.push(
            new Pawn(this.color, {x:5, y:frontRow}, 1)
        )
        this.pieces.push(
            new Pawn(this.color, {x:6, y:frontRow}, 1)
        )
        this.pieces.push(
            new Pawn(this.color, {x:7, y:frontRow}, 1)
        )

        // Create other pieces
        // Rooks
        this.pieces.push(
            new Rook(this.color, {x:0, y:backRow}, board.length)
        )
        this.pieces.push(
            new Rook(this.color, {x:7, y:backRow}, board.length)
        )

        //Knights
        this.pieces.push(
            new Knight(this.color, {x:1, y:backRow}, board.length)
        )
        this.pieces.push(
            new Knight(this.color, {x:6, y:backRow}, board.length)
        )

        // Bishops
        this.pieces.push(
            new Bishop(this.color, {x:2, y:backRow}, board.length)
        )
        this.pieces.push(
            new Bishop(this.color, {x:5, y:backRow}, board.length)
        )

        // Queen
        this.pieces.push(
            new Queen(this.color, {x:4, y:backRow}, board.length)
        )

        // King
        this.pieces.push(
            new King(this.color, {x:3, y:backRow}, 1)
        )
    }
}

let playerOne = new Player('Elyssa', 'white')
playerOne.createPieces(0, 1)
let playerTwo = new Player('Guest', 'black')
playerTwo.createPieces(7, 6)

function drawBoard() {

    function drawPlayerPieces(player) {
        player.pieces.forEach(piece => {
            if (piece.alive) {
                let square = document.getElementById(`${piece.pos.x}${piece.pos.y}`)
                square.style.backgroundImage = `url('images/${piece.color}${piece.name.toLowerCase()}.png')`
            }
        });
    }

    drawPlayerPieces(playerOne)
    drawPlayerPieces(playerTwo)
}

drawBoard()