
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


        return this.deck;
    }
}

let deck = new Deck();
deck.createDeck();
console.log('deck :>> ', deck);
