# Typescript Chess

Just a little implementation of Chess in Typescript. I'm starting with a basic implementation of the rules, then progressing onto more finicky edge cases like "The pawn can go double on it's first move" and "Switch the king with the castle."

Live deployment here: https://elyssaw.github.io/typescript-chess/

## Rules

The game follows all the typical rules of Chess, with some exceptions. They are as follows:

- Highly conditional moves, such as castling or capturing pawns en passant are not supported
- The game only looks for Check, not Checkmate. If Checkmate is achieved, the losing player can concede the game.
- It's possible for a player to make a move that puts them in Check. In normal Chess, this would be illegal, but this game only informs players when they are in Check. It doesn't constrict their behavior beyond that, so it's possible to ignore the Check and leave your King in danger while you move another piece, or remove a piece that was protecting your King from falling into Check.

## To-Do

- [x] Initialize board
- [x] Create classes for each piece
- [x] Set starting board state
- [x] Set turn system
- [x] Set "selected piece" mechanic, so players can move their pieces
- [x] Create function to look for Check state
- [ ] Create function to look for Checkmate state 

## Port-Mortem

I started this project to brush up on Typescript, and spent about three days on it in total. While it's not necessarily in its most complete state, it fulfilled the purpose I started it for (Getting me back into Typescript) and it's about as playable as a traditional tabletop chess game would be (Minus some of the more conditionally legal moves), so I'm putting it on the shelf for now and turning my attention to other things.

But I would like to return to it one day and polish it up a little. Maybe rebuild it in Angular to get some experience with that framework, and get the flexibility of a framework in general. Below is a list of features that I would like to add:

- Checkmate condition
- Improved UI/animation
- Capturing pawns en passant and castling

Additionally, this was an attempt for me to build Chess without referencing outside material. Since building it, I've researched into Chess Programming and discovered a mess of patterns and tricks that would've improved the structure of this program. I'd like to implement them someday as well.