
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

    }

    drawCard() {
        // Should move the card at the front of the list to the board

    }
}



// Create the deck for the game
let deck = new Deck();
deck.createDeck();
console.log('deck :>> ', deck);

// Create the board and discard pile
let pile = new DiscardPile();
let board = new Board();