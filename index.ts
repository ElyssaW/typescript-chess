console.log('Hello')

// Initialize board
function createBoard() {
    let board = []

    // 2D array of rows/columns
    for (let i = 0; i < 8; i++) {
        // Holding objects, currently set to empty, but will contain pieces as they move around
        board.push(new Array([ {}, {}, {}, {}, {}, {}, {}, {} ]))
    }

    return board
}

// Set board to initial state
function setStartingBoard() {

    // Function set pawns
    function setPawns () {
        return 
    }

    // Function to set other pieces
    let board = createBoard()

    board.forEach((row, index) => {
        if (index === 0) {

        }
    })
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

    // Whether the piece is alive or dead
    alive: boolean

    // What spaces can the piece move to
    availableMoves: [{x: number, y: number}]

    constructor(name: string, color: string, pos: {x: number, y: number}) {
        this.name = name
        this.color = color
        this.pos = pos
        this.alive = true
    }

    move() {
        // How the piece moves
    }
}

// Pawn
class Pawn extends Piece {
    name: 'Pawn'
}

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