let getBoard = document.getElementById('board');

// Create the card class
class Card {
    constructor(name, type, coins, swords, color, points, requirements) {
      this.name = name;
      this.type = type;
      this.coins = coins;
      this.swords = swords;
      this.color = color;
      this.points = points;
      this.requirements = requirements;
  }
}

class Board {
    constructor() {
        this.board = [];
    }
    // TO DO: Function to move cards from board to discard pile

    // Display the items on the board
    display() {
        for(let card of board) {
            getBoard.innerHTML += `<div class="board-card">${card.name}</div>`;
        }
    }
} 


class DiscardPile {
    constructor(){
        this.pile = [];
    }
    // TO DO: FUnction to move all cards in pile back into the deck
}

// Create the deck class
class Deck {
    constructor() {
        this.deck = [];
    }

    //Make all the cards and push them into the deck
    createDeck() {
        this.deck.push(new Card('Frigate', 'ship', 1, 1, 'red', 0));
        this.deck.push(new Card('Frigate', 'ship', 1, 1, 'red', 0));
        this.deck.push(new Card('Frigate', 'ship', 1, 1, 'red', 0));
        this.deck.push(new Card('Frigate', 'ship', 2, 3, 'red', 0));
        this.deck.push(new Card('Frigate', 'ship', 2, 3, 'red', 0));
        this.deck.push(new Card('Frigate', 'ship', 2, 3, 'red', 0));
        this.deck.push(new Card('Frigate', 'ship', 3, 6, 'red', 0));
        this.deck.push(new Card('Frigate', 'ship', 3, 6, 'red', 0));
        this.deck.push(new Card('Frigate', 'ship', 4, 99, 'red', 0));
        this.deck.push(new Card('Frigate', 'ship', 4, 99, 'red', 0));
        this.deck.push(new Card('Galleon', 'ship', 1, 2, 'black', 0));
        this.deck.push(new Card('Galleon', 'ship', 1, 2, 'black', 0));
        this.deck.push(new Card('Galleon', 'ship', 1, 2, 'black', 0));
        this.deck.push(new Card('Galleon', 'ship', 2, 4, 'black', 0));
        this.deck.push(new Card('Galleon', 'ship', 2, 4, 'black', 0));
        this.deck.push(new Card('Galleon', 'ship', 2, 4, 'black', 0));
        this.deck.push(new Card('Galleon', 'ship', 3, 7, 'black', 0));
        this.deck.push(new Card('Galleon', 'ship', 3, 7, 'black', 0));
        this.deck.push(new Card('Galleon', 'ship', 4, 99, 'black', 0));
        this.deck.push(new Card('Galleon', 'ship', 4, 99,'black', 0));
        this.deck.push(new Card('Skiff', 'ship', 1, 1, 'green', 0));
        this.deck.push(new Card('Skiff', 'ship', 1, 1, 'green', 0));
        this.deck.push(new Card('Skiff', 'ship', 1, 1, 'green', 0));
        this.deck.push(new Card('Skiff', 'ship', 1, 1, 'green', 0));
        this.deck.push(new Card('Skiff', 'ship', 2, 3, 'green', 0));
        this.deck.push(new Card('Skiff', 'ship', 2, 3, 'green', 0));
        this.deck.push(new Card('Skiff', 'ship', 2, 3, 'green', 0));
        this.deck.push(new Card('Skiff', 'ship', 3, 5, 'green', 0));
        this.deck.push(new Card('Skiff', 'ship', 3, 5, 'green', 0));
        this.deck.push(new Card('Skiff', 'ship', 3, 5, 'green', 0));
        this.deck.push(new Card('Flute', 'ship', 1, 1, 'blue', 0));
        this.deck.push(new Card('Flute', 'ship', 1, 1, 'blue', 0));
        this.deck.push(new Card('Flute', 'ship', 1, 1, 'blue', 0));
        this.deck.push(new Card('Flute', 'ship', 1, 1, 'blue', 0));
        this.deck.push(new Card('Flute', 'ship', 2, 2, 'blue', 0));
        this.deck.push(new Card('Flute', 'ship', 2, 2, 'blue', 0));
        this.deck.push(new Card('Flute', 'ship', 2, 2, 'blue', 0));
        this.deck.push(new Card('Flute', 'ship', 3, 5, 'blue', 0));
        this.deck.push(new Card('Flute', 'ship', 3, 5, 'blue', 0));
        this.deck.push(new Card('Flute', 'ship', 3, 5, 'blue', 0));
        this.deck.push(new Card('Pinnace', 'ship', 1, 1, 'yellow', 0));
        this.deck.push(new Card('Pinnace', 'ship', 1, 1, 'yellow', 0));
        this.deck.push(new Card('Pinnace', 'ship', 1, 1, 'yellow', 0));
        this.deck.push(new Card('Pinnace', 'ship', 1, 1, 'yellow', 0));
        this.deck.push(new Card('Pinnace', 'ship', 2, 2, 'yellow', 0));
        this.deck.push(new Card('Pinnace', 'ship', 2, 2, 'yellow', 0));
        this.deck.push(new Card('Pinnace', 'ship', 2, 2, 'yellow', 0));
        this.deck.push(new Card('Pinnace', 'ship', 3, 4, 'yellow', 0));
        this.deck.push(new Card('Pinnace', 'ship', 3, 4, 'yellow', 0));
        this.deck.push(new Card('Pinnace', 'ship', 3, 4, 'yellow', 0));
        this.deck.push(new Card('Tax increase', 'tax', 1, 0, null, 0, 'min points'));
        this.deck.push(new Card('Tax increase', 'tax', 1, 0, null, 0, 'min points'));
        this.deck.push(new Card('Tax increase', 'tax', 1, 0, null, 0, 'max swords'));
        this.deck.push(new Card('Tax increase', 'tax', 1, 0, null, 0, 'max swords'));
        this.deck.push(new Card('Sailor', 'sailor', 3, 1, null, 1));
        this.deck.push(new Card('Sailor', 'sailor', 3, 1, null, 1));
        this.deck.push(new Card('Sailor', 'sailor', 3, 1, null, 1));
        this.deck.push(new Card('Sailor', 'sailor', 3, 1, null, 1));
        this.deck.push(new Card('Sailor', 'sailor', 3, 1, null, 1));
        this.deck.push(new Card('Sailor', 'sailor', 3, 1, null, 1));
        this.deck.push(new Card('Sailor', 'sailor', 3, 1, null, 1));
        this.deck.push(new Card('Sailor', 'sailor', 5, 1, null, 2));
        this.deck.push(new Card('Sailor', 'sailor', 7, 1, null, 3));
        this.deck.push(new Card('Pirate', 'sailor', 5, 2, null, 1));
        this.deck.push(new Card('Pirate', 'sailor', 7, 2, null, 2));
        this.deck.push(new Card('Pirate', 'sailor', 9, 2, null, 3));
        this.deck.push(new Card('Trader', 'person', 3, 0, 'yellow', 1));
        this.deck.push(new Card('Trader', 'person', 5, 0, 'yellow', 2));
        this.deck.push(new Card('Trader', 'person', 3, 0, 'blue', 1));
        this.deck.push(new Card('Trader', 'person', 5, 0, 'blue', 2));
        this.deck.push(new Card('Trader', 'person', 3, 0, 'green', 1));
        this.deck.push(new Card('Trader', 'person', 3, 0, 'green', 1));
        this.deck.push(new Card('Trader', 'person', 3, 0, 'red', 1));
        this.deck.push(new Card('Trader', 'person', 3, 0, 'red', 1));
        this.deck.push(new Card('Trader', 'person', 3, 0, 'black', 1));
        this.deck.push(new Card('Trader', 'person', 3, 0, 'black', 1));
        this.deck.push(new Card('Expedition', 'expedition', 2, 0, null, 4, ['cross', 'cross']));
        this.deck.push(new Card('Expedition', 'expedition', 2, 0, null, 4, ['anchor', 'anchor']));
        this.deck.push(new Card('Expedition', 'expedition', 2, 0, null, 4, ['house', 'house']));
        this.deck.push(new Card('Expedition', 'expedition', 3, 0, null, 6, ['cross', 'cross', 'house']));
        this.deck.push(new Card('Expedition', 'expedition', 3, 0, null, 6, ['anchor', 'anchor', 'house']));

        return this.deck;
    }

    shuffle() {
        // Should randomize the order of the items in the list
        let counter = this.deck.length, temp, i;

        while(counter) {
            i = Math.floor(Math.random() * counter--);
            temp = this.deck[counter];
            this.deck[counter] = this.deck[i];
            this.deck[i] = temp;
        }
        return this.deck;
    }

    drawCard() {
        // Remove one card from the deck
        let hand = [];
        hand.push(this.deck.pop());
        return hand;
    }
}


// Create and shuffle the deck for the game
let deck = new Deck();
console.log('deck :>> ', deck);

deck.createDeck();
console.log('Original deck :>> ', deck);

deck.shuffle();
console.log('Shuffled deck :>> ', deck);

// Create the board and discard pile
let pile = new DiscardPile();
let board = new Board();

console.log('hand :>> ', deck.drawCard());
console.log('deck :>> ', deck);

// Draw a card into the board
board.push(deck.drawCard());
console.log('board :>> ', board);

// Display cards in the board
board.display();