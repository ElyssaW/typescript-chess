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
            this.availableMoves = this.availableMoves.concat(checkCol(this.pos.x,this.pos.y, this.pace))
            this.availableMoves = this.availableMoves.concat(checkRow(this.pos.x,this.pos.y, this.pace))
        }

    }
}

// Knight
class Knight extends Piece {
    constructor (id: number, color: string, pos: {x: number, y: number}) {
        super(id, 'Knight', color, pos, 3)

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
    constructor (id: number, color: string, pos: {x: number, y: number}) {
        super(id, 'Bishop', color, pos, board.length)

        this.generateMoves = () => {
            this.availableMoves = this.availableMoves.concat(checkDiagonal(this.pos.x,this.pos.y, this.pace))
        }
    }
}

// Queen
class Queen extends Piece {
    constructor (id: number, color: string, pos: {x: number, y: number}) {
        super(id, 'Queen', color, pos, board.length)

        this.generateMoves = () => {
            this.availableMoves = this.availableMoves.concat(checkDiagonal(this.pos.x,this.pos.y, this.pace))
            this.availableMoves = this.availableMoves.concat(checkCol(this.pos.x,this.pos.y, this.pace))
            this.availableMoves = this.availableMoves.concat(checkRow(this.pos.x,this.pos.y, this.pace))
        }
    }
}

// King
class King extends Piece {
    constructor (id: number, color: string, pos: {x: number, y: number}) {
        super(id, 'King', color, pos, 1)

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
        board.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                let square = document.getElementById(`${rowIndex}${colIndex}`)
                square.style.backgroundImage = 'none'

                if(rowIndex % 2 == 0 && colIndex % 2 == 1 || rowIndex % 2 == 1 && colIndex % 2 == 0) {
                    square.style.backgroundColor = 'white'
                } else {
                    square.style.backgroundColor = 'black'
                }
            })
        })

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
    
    if (playerOne.selected) {
        if (board[square.x][square.y] && board[square.x][square.y].color != playerOne.color) {
            playerTwo.pieces[board[square.x][square.y].id].alive = false
            playerOne.capturedPieces.push(playerTwo.pieces[board[square.x][square.y].id])
        }
        playerOne.pieces[playerOne.selected].pos = square
        playerOne.pieces[playerOne.selected].availableMoves = []
        playerOne.selected = null
        drawBoard()

    } else {
        if (board[square.x][square.y] && board[square.x][square.y].color === playerOne.color) {
            let selectedPiece = board[square.x][square.y]
            selectedPiece.generateMoves()
            console.log(selectedPiece.availableMoves)
    
            selectedPiece.availableMoves.forEach((move) => {
                let availableSquare = document.getElementById(`${move.x}${move.y}`)
    
                if (board[move.x][move.y]) {
                    availableSquare.style.backgroundColor = 'red'
                } else {
                    availableSquare.style.backgroundColor = 'green'
                }
            });
    
            e.style.backgroundColor = 'yellow'
    
            playerOne.selected = selectedPiece.id
            selectedPiece.availableMoves = []
        }
    }
}

drawBoard()