let turnCount = 0

let settings = {
    white: '#FCD7AD',
    black: '#F6C28B',
    yellow: '#FF934F',
    red: '#EE6055',
    green: '#77BFA3',
    purple: '#F61067',
    gameWon: false
}

// Initialize board
function createBoard() {
    let newBoard = []

    // 2D array of rows/columns
    for (let i = 0; i < 8; i++) {
        // Holding objects, currently set to empty, but will contain pieces as they move around
        newBoard.push([])
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

    // Team of the piece
    team: string

    // Color of the piece
    color: string

    // Which player they belong to
    player: Player

    // How many spaces the piece can move at once
    pace: number

    // Whether the piece is alive or dead
    alive = true

    // Check whether the piece has moved or if it's still in its initial starting position
    hasMoved = false

    // What spaces can the piece move to
    availableMoves = []

    constructor(id: number, player: Player, team:string, name: string, color: string, pos: {x: number, y: number}, pace: number) {
        this.id = id
        this.player = player
        this.team = team
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
    constructor (id: number, player: Player, team: string, color: string, pos: {x: number, y: number}) {
        
        super(id, player, team, 'Pawn', color, pos, color  == settings.white ? 1 : -1)

        this.generateMoves = () => {

            if (!this.hasMoved) {
                if (checkBoundary(this.pos.x, this.pos.y + (this.pace*2)) && checkSquare(this.pos.x, this.pos.y + (this.pace*2)) == false) {
                    this.availableMoves.push({
                        x: this.pos.x,
                        y: this.pos.y + (this.pace*2)
                    })
                }
            }

            if (checkBoundary(this.pos.x, this.pos.y + this.pace) || (checkSquare(this.pos.x + this.pace, this.pos.y + this.pace) && this.color != checkSquare(this.pos.x + this.pace, this.pos.y + this.pace).color)) {
                this.availableMoves.push({
                    x: this.pos.x,
                    y: this.pos.y + this.pace
                })
            }

            if (checkBoundary(this.pos.x + 1, this.pos.y + this.pace) && checkSquare(this.pos.x + 1, this.pos.y + this.pace) && this.color != checkSquare(this.pos.x + 1, this.pos.y + this.pace).color) {
                this.availableMoves.push({
                    x: this.pos.x + 1,
                    y: this.pos.y + this.pace
                })
            }

            if (checkBoundary(this.pos.x - 1, this.pos.y + this.pace) && checkSquare(this.pos.x - 1, this.pos.y + this.pace) && this.color != checkSquare(this.pos.x - 1, this.pos.y + this.pace).color) {
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
    constructor (id: number, player: Player, team: string, color: string, pos: {x: number, y: number}) {
        super(id, player, team, 'Rook', color, pos, board.length)

        this.generateMoves = () => {
            this.availableMoves = this.availableMoves.concat(checkCol(this))
            this.availableMoves = this.availableMoves.concat(checkRow(this))
        }

    }
}

// Knight
class Knight extends Piece {
    constructor (id: number, player: Player, team: string, color: string, pos: {x: number, y: number}) {
        super(id, player, team, 'Knight', color, pos, 3)

        this.generateMoves = () => {
            if (checkBoundary(this.pos.x+1,this.pos.y+2) && this.color != checkSquare(this.pos.x+1, this.pos.y+2).color) {
                this.availableMoves.push({x: this.pos.x+1, y: this.pos.y+2})
            }

            if (checkBoundary(this.pos.x+2,this.pos.y+1) && this.color != checkSquare(this.pos.x+2, this.pos.y+1).color) {
                this.availableMoves.push({x: this.pos.x+2, y: this.pos.y+1})
            }

            //===============
            if (checkBoundary(this.pos.x-1,this.pos.y+2) && this.color != checkSquare(this.pos.x-1, this.pos.y+2).color) {
                this.availableMoves.push({x: this.pos.x-1, y: this.pos.y+2})
            }

            if (checkBoundary(this.pos.x-2,this.pos.y+1) && this.color != checkSquare(this.pos.x-2, this.pos.y+1).color) {
                this.availableMoves.push({x: this.pos.x-2, y: this.pos.y+1})
            }

            //===============
            if (checkBoundary(this.pos.x+1,this.pos.y-2) && this.color != checkSquare(this.pos.x+1, this.pos.y-2).color) {
                this.availableMoves.push({x: this.pos.x+1, y: this.pos.y-2})
            }
            
            if (checkBoundary(this.pos.x+2,this.pos.y-1) && this.color != checkSquare(this.pos.x+2, this.pos.y-1).color) {
                this.availableMoves.push({x: this.pos.x+2, y: this.pos.y-1})
            }

            //================
            if (checkBoundary(this.pos.x-1,this.pos.y-2) && this.color != checkSquare(this.pos.x-1, this.pos.y-2).color) {
                this.availableMoves.push({x: this.pos.x-1, y: this.pos.y-2})
            }

            if (checkBoundary(this.pos.x-2,this.pos.y-1) && this.color != checkSquare(this.pos.x-2, this.pos.y-1).color) {
                this.availableMoves.push({x: this.pos.x-2, y: this.pos.y-1})
            }
        }
    }
}

// Bishop
class Bishop extends Piece {
    constructor (id: number, player: Player, team: string, color: string, pos: {x: number, y: number}) {
        super(id, player, team, 'Bishop', color, pos, board.length)

        this.generateMoves = () => {
            this.availableMoves = this.availableMoves.concat(checkDiagonal(this))
        }
    }
}

// Queen
class Queen extends Piece {
    constructor (id: number, player: Player, team: string, color: string, pos: {x: number, y: number}) {
        super(id, player, team, 'Queen', color, pos, board.length)

        this.generateMoves = () => {
            this.availableMoves = this.availableMoves.concat(checkDiagonal(this))
            this.availableMoves = this.availableMoves.concat(checkCol(this))
            this.availableMoves = this.availableMoves.concat(checkRow(this))
        }
    }
}

// King
class King extends Piece {
    constructor (id: number, player: Player, team: string, color: string, pos: {x: number, y: number}) {
        super(id, player, team, 'King', color, pos, 2)

        this.generateMoves = () => {
            this.availableMoves = this.availableMoves.concat(checkDiagonal(this))
            this.availableMoves = this.availableMoves.concat(checkCol(this))
            this.availableMoves = this.availableMoves.concat(checkRow(this))
        }
    }
}

// Player class
class Player {
    name: string
    color: string
    team: string
    pieces = []
    capturedPieces = []
    selected: number
    inCheck = false

    constructor(team: string, name: string, color: string) {
        this.name = name
        this.team = team
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

    capturePiece(piece: Piece) {
        this.capturedPieces.push(piece)

        let captured = document.getElementById(`${this.team}captured`)
        let newCapture = document.createElement('span')
        newCapture.className = `square captured ${piece.team}${piece.name.toLowerCase()}`

        captured.appendChild(newCapture)

        if (piece.name === 'King') {
            victory(piece.player, this)
        }
    }

    createPieces (backRow:number, frontRow:number) {
        // Create Pawns
        this.pieces.push(
            new Pawn(0, this, this.team, this.color, {x:0, y:frontRow})
        )
        this.pieces.push(
            new Pawn(1, this, this.team, this.color, {x:1, y:frontRow})
        )
        this.pieces.push(
            new Pawn(2, this, this.team, this.color, {x:2, y:frontRow})
        )
        this.pieces.push(
            new Pawn(3, this, this.team, this.color, {x:3, y:frontRow})
        )
        this.pieces.push(
            new Pawn(4, this, this.team, this.color, {x:4, y:frontRow})
        )
        this.pieces.push(
            new Pawn(5, this, this.team, this.color, {x:5, y:frontRow})
        )
        this.pieces.push(
            new Pawn(6, this, this.team, this.color, {x:6, y:frontRow})
        )
        this.pieces.push(
            new Pawn(7, this, this.team, this.color, {x:7, y:frontRow})
        )

        // Create other pieces
        // Rooks
        this.pieces.push(
            new Rook(8, this, this.team, this.color, {x:0, y:backRow})
        )
        this.pieces.push(
            new Rook(9, this, this.team, this.color, {x:7, y:backRow})
        )

        //Knights
        this.pieces.push(
            new Knight(10, this, this.team, this.color, {x:1, y:backRow})
        )
        this.pieces.push(
            new Knight(11, this, this.team, this.color, {x:6, y:backRow})
        )

        // Bishops
        this.pieces.push(
            new Bishop(12, this, this.team, this.color, {x:2, y:backRow})
        )
        this.pieces.push(
            new Bishop(13, this, this.team, this.color, {x:5, y:backRow})
        )

        // Queen
        this.pieces.push(
            new Queen(14, this, this.team, this.color, {x:3, y:backRow})
        )

        // King
        this.pieces.push(
            new King(15, this, this.team, this.color, {x:4, y:backRow})
        )
    }
}

let playerOne = new Player('white', 'Host', settings.white)
playerOne.createPieces(0, 1)
let playerTwo = new Player('black', 'Guest', settings.black)
playerTwo.createPieces(7, 6)

function drawLineBetweenSquares (p1: {x:number, y: number}, p2: {x: number, y: number}) {
    let lineStart = {x: 0, y: 0}
    let lineEnd = {x: 0, y: 0}

    if (p1.x < p2.x) {
        lineStart.x = p1.x
        lineEnd.x = p2.x
    } else {
        lineStart.x = p2.x
        lineEnd.x = p1.x
    }

    if (p1.y < p2.y) {
        lineStart.y = p1.y
        lineEnd.y = p2.y
    } else {
        lineStart.y = p2.y
        lineEnd.y = p1.y
    }

    while (lineStart.x <= lineEnd.x && lineStart.y <= lineEnd.y) {
        let square = document.getElementById(`${lineStart.x}${lineStart.y}`)
        square.style.backgroundColor = settings.purple

        if (lineStart.x <= lineEnd.x) {
            lineStart.x++
        }

        if (lineStart.y <= lineEnd.y) {
            lineStart.y++
        }
    }
}

// Check position
function putInCheck(player: Player, kingPos: {x: number, y: number}, enemyPos: {x: number, y: number}) {
    document.getElementById(`${player.team}checkbanner`).innerText = 'In Check!'
    document.getElementById(`${kingPos.x}${kingPos.y}`).style.backgroundColor = settings.purple
    document.getElementById(`${enemyPos.x}${enemyPos.y}`).style.backgroundColor = settings.purple
}

function removeFromCheck(player: Player) {
    document.getElementById(`${player.team}checkbanner`).innerText = ''
}

function lookForCheck(player: Player, opponent: Player) {

    let kingPos = player.pieces[15].pos
    player.inCheck = false

    opponent.pieces.forEach(piece => {
        if (piece.alive) {
            piece.availableMoves.forEach(move => {
                if (move.x == kingPos.x && move.y == kingPos.y) {
                    player.inCheck = true
                    putInCheck(player, kingPos, { x: piece.pos.x, y: piece.pos.y})
                }
            })
        }
    })

    if (!player.inCheck) {
        removeFromCheck(player)   
    }
}

function generateAllAvailableMoves () {

    function generatePlayerMoves(player: Player) {
        player.pieces.forEach(piece => {
            piece.availableMoves = []
            piece.generateMoves()
        })
    }

    generatePlayerMoves(playerOne)
    generatePlayerMoves(playerTwo)
}

function drawBoard() {

    function clearBoard() {

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let square = document.getElementById(`${i}${j}`)
                square.style.backgroundImage = 'none'

                if (i % 2 == 0 && j % 2 == 1 || i % 2 == 1 && j % 2 == 0) {
                    square.style.backgroundColor = settings.white
                } else {
                    square.style.backgroundColor = settings.black
                }
            }
        }

        board = createBoard()
    }

    function drawPlayerPieces(player: Player) {
        player.pieces.forEach(piece => {
            if (piece.alive) {
                let square = document.getElementById(`${piece.pos.x}${piece.pos.y}`)
                square.style.backgroundImage = `url('images/${piece.team}${piece.name.toLowerCase()}.png')`
                board[piece.pos.x][piece.pos.y] = piece
            }
        })
    }

    clearBoard()

    drawPlayerPieces(playerOne)
    drawPlayerPieces(playerTwo)
}

function handleTurn (e, square:{x:number, y:number}, player: Player, opponent: Player) {

    // Check if the square clicked on contains a piece
    let clickedPiece: Piece
    if (board[square.x][square.y]) {
        clickedPiece = board[square.x][square.y]
    }
    
    // Check if the player currently has a piece selected
    if (player.selected || player.selected === 0) {

        // Filter to find if clicked square is in available moves
        let move = player.pieces[player.selected].availableMoves.filter(move => {
            return move.x === square.x && move.y === square.y
        })

        // Check if clicked square is among available moves
        if (move[0]) {

            // Check if the square the player is moving to is occupied, and if so, if the occupant is an enemy piece
            if (clickedPiece && clickedPiece.color != player.color) {
                // Capture the enemy piece
                opponent.pieces[clickedPiece.id].alive = false
                player.capturePiece(opponent.pieces[clickedPiece.id])
            }

            // Set the position of the player's piece to the clicked square
            player.pieces[player.selected].pos = square
            // Clear out the selected piece's available moves
            player.pieces[player.selected].availableMoves = []
            // Set the piece's hasMoved to ture
            player.pieces[player.selected].hasMoved = true
            // Clear the player's selection
            player.selected = null
            // Redraw the board
            drawBoard()

            // Return true, to signify the turn is successfully completed
            return true
        }

    // If the player does not have a piece selected
    } else {

        // If the clicked square contains one of the player's pieces
        if (clickedPiece && clickedPiece.color === player.color) {

            // If no moves are available, disallow player from selecting the piece
            if (clickedPiece.availableMoves.length) {

                // Set the space of the selected piece to yellow
                e.style.backgroundColor = settings.yellow
        
                // Highlight each possible space
                clickedPiece.availableMoves.forEach((move) => {
                    let availableSquare = document.getElementById(`${move.x}${move.y}`)
        
                    // If the possible space contains an enemy, highlight in red
                    if (board[move.x][move.y]) {
                        availableSquare.style.backgroundColor = settings.red

                    // If it is empty, highlight in green
                    } else {
                        availableSquare.style.backgroundColor = settings.green
                    }
                });
        
                // Set the player's selection to the clicked piece
                player.selected = clickedPiece.id
                player.pieces[player.selected].availableMoves = clickedPiece.availableMoves
            }
        }
    }
}

function changeTurn (player: Player) {
    let turnheader = document.getElementById(`${player.team}turn`)
    turnheader.className = `turnheader ${player.team}current`
    turnheader.innerText = 'Your Turn'
}

function clearTurn (player: Player) {
    let turnheader = document.getElementById(`${player.team}turn`)
    turnheader.className = `turnheader`
    turnheader.innerText = 'Opponent\'s Turn'
}

function pieceClicked (e, square:{x:number, y:number}) {
    if (!settings.gameWon) {
        let turnHandled: boolean

        if (turnCount % 2 === 0) {
            turnHandled = handleTurn(e, square, playerOne, playerTwo)
        } else {
            turnHandled = handleTurn(e, square, playerTwo, playerOne)
        }
    
        if (turnHandled && !settings.gameWon) {
            turnCount++
            generateAllAvailableMoves()
    
            if (turnCount % 2 == 0) {
                lookForCheck(playerOne, playerTwo)
                lookForCheck(playerTwo, playerOne)
                changeTurn(playerOne)
                clearTurn(playerTwo)
            } else {
                lookForCheck(playerOne, playerTwo)
                lookForCheck(playerTwo, playerOne)
                changeTurn(playerTwo)
                clearTurn(playerOne)
            }
        }
    }
}

function victory(loser: Player, victor: Player) {
    settings.gameWon = true

    let loserheader = document.getElementById(`${loser.team}turn`)
    loserheader.className = `turnheader ${loser.team}current`
    loserheader.innerText = 'You lost!'

    let victorheader = document.getElementById(`${victor.team}turn`)
    victorheader.className = `turnheader ${victor.team}current`
    victorheader.innerText = 'You won!'

    let counter = 0
    const flashBoard = setInterval(() => {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let square = document.getElementById(`${i}${j}`)

                if (counter % 2 === 0) {
                    if ((i % 2 === 0 && j % 2 === 1) || (i % 2 === 1 && j % 2 === 0)) {
                        square.style.backgroundColor = settings.white
                        square.style.transform = 'rotate(5deg)'
                    } else {
                        square.style.backgroundColor = settings.black
                        square.style.transform = 'rotate(-5deg)'
                    }
                } else {
                    if ((i % 2 === 0 && j % 2 === 1) || (i % 2 === 1 && j % 2 === 0)) {
                        square.style.backgroundColor = settings.black
                        square.style.transform = 'rotate(-5deg)'
                    } else {
                        square.style.backgroundColor = settings.white
                        square.style.transform = 'rotate(5deg)'
                    }
                }
            }
        }
        
        counter++
    }, 500)
}

drawBoard()
generateAllAvailableMoves()