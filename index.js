// Set up variables
let getBoard = document.getElementById('board');
let deck = [];
let discardPile = [];
let board = [];
let getCardsRemaining = document.getElementById('cards-remaining');
let getDiscardCount = document.getElementById('discard');

// Factory function for cards
function Card(name, type, coins, swords, color, points, requirements) {
    return {
        name,
        type,
        coins,
        swords,
        color,
        points,
        requirements
    };
}

// Add all game cards into deck
function createDeck() {
    deck.push(new Card('Frigate', 'ship', 1, 1, 'red', 0));
    deck.push(new Card('Frigate', 'ship', 1, 1, 'red', 0));
    deck.push(new Card('Frigate', 'ship', 1, 1, 'red', 0));
    deck.push(new Card('Frigate', 'ship', 2, 3, 'red', 0));
    deck.push(new Card('Frigate', 'ship', 2, 3, 'red', 0));
    deck.push(new Card('Frigate', 'ship', 2, 3, 'red', 0));
    deck.push(new Card('Frigate', 'ship', 3, 6, 'red', 0));
    deck.push(new Card('Frigate', 'ship', 3, 6, 'red', 0));
    deck.push(new Card('Frigate', 'ship', 4, 99, 'red', 0));
    deck.push(new Card('Frigate', 'ship', 4, 99, 'red', 0));
    deck.push(new Card('Galleon', 'ship', 1, 2, 'black', 0));
    deck.push(new Card('Galleon', 'ship', 1, 2, 'black', 0));
    deck.push(new Card('Galleon', 'ship', 1, 2, 'black', 0));
    deck.push(new Card('Galleon', 'ship', 2, 4, 'black', 0));
    deck.push(new Card('Galleon', 'ship', 2, 4, 'black', 0));
    deck.push(new Card('Galleon', 'ship', 2, 4, 'black', 0));
    deck.push(new Card('Galleon', 'ship', 3, 7, 'black', 0));
    deck.push(new Card('Galleon', 'ship', 3, 7, 'black', 0));
    deck.push(new Card('Galleon', 'ship', 4, 99, 'black', 0));
    deck.push(new Card('Galleon', 'ship', 4, 99, 'black', 0));
    deck.push(new Card('Skiff', 'ship', 1, 1, 'green', 0));
    deck.push(new Card('Skiff', 'ship', 1, 1, 'green', 0));
    deck.push(new Card('Skiff', 'ship', 1, 1, 'green', 0));
    deck.push(new Card('Skiff', 'ship', 1, 1, 'green', 0));
    deck.push(new Card('Skiff', 'ship', 2, 3, 'green', 0));
    deck.push(new Card('Skiff', 'ship', 2, 3, 'green', 0));
    deck.push(new Card('Skiff', 'ship', 2, 3, 'green', 0));
    deck.push(new Card('Skiff', 'ship', 3, 5, 'green', 0));
    deck.push(new Card('Skiff', 'ship', 3, 5, 'green', 0));
    deck.push(new Card('Skiff', 'ship', 3, 5, 'green', 0));
    deck.push(new Card('Flute', 'ship', 1, 1, 'blue', 0));
    deck.push(new Card('Flute', 'ship', 1, 1, 'blue', 0));
    deck.push(new Card('Flute', 'ship', 1, 1, 'blue', 0));
    deck.push(new Card('Flute', 'ship', 1, 1, 'blue', 0));
    deck.push(new Card('Flute', 'ship', 2, 2, 'blue', 0));
    deck.push(new Card('Flute', 'ship', 2, 2, 'blue', 0));
    deck.push(new Card('Flute', 'ship', 2, 2, 'blue', 0));
    deck.push(new Card('Flute', 'ship', 3, 5, 'blue', 0));
    deck.push(new Card('Flute', 'ship', 3, 5, 'blue', 0));
    deck.push(new Card('Flute', 'ship', 3, 5, 'blue', 0));
    deck.push(new Card('Pinnace', 'ship', 1, 1, 'yellow', 0));
    deck.push(new Card('Pinnace', 'ship', 1, 1, 'yellow', 0));
    deck.push(new Card('Pinnace', 'ship', 1, 1, 'yellow', 0));
    deck.push(new Card('Pinnace', 'ship', 1, 1, 'yellow', 0));
    deck.push(new Card('Pinnace', 'ship', 2, 2, 'yellow', 0));
    deck.push(new Card('Pinnace', 'ship', 2, 2, 'yellow', 0));
    deck.push(new Card('Pinnace', 'ship', 2, 2, 'yellow', 0));
    deck.push(new Card('Pinnace', 'ship', 3, 4, 'yellow', 0));
    deck.push(new Card('Pinnace', 'ship', 3, 4, 'yellow', 0));
    deck.push(new Card('Pinnace', 'ship', 3, 4, 'yellow', 0));
    deck.push(new Card('Tax increase', 'tax', 1, 0, null, 0, 'min points'));
    deck.push(new Card('Tax increase', 'tax', 1, 0, null, 0, 'min points'));
    deck.push(new Card('Tax increase', 'tax', 1, 0, null, 0, 'max swords'));
    deck.push(new Card('Tax increase', 'tax', 1, 0, null, 0, 'max swords'));
    deck.push(new Card('Sailor', 'sailor', 3, 1, null, 1));
    deck.push(new Card('Sailor', 'sailor', 3, 1, null, 1));
    deck.push(new Card('Sailor', 'sailor', 3, 1, null, 1));
    deck.push(new Card('Sailor', 'sailor', 3, 1, null, 1));
    deck.push(new Card('Sailor', 'sailor', 3, 1, null, 1));
    deck.push(new Card('Sailor', 'sailor', 3, 1, null, 1));
    deck.push(new Card('Sailor', 'sailor', 3, 1, null, 1));
    deck.push(new Card('Sailor', 'sailor', 5, 1, null, 2));
    deck.push(new Card('Sailor', 'sailor', 7, 1, null, 3));
    deck.push(new Card('Pirate', 'sailor', 5, 2, null, 1));
    deck.push(new Card('Pirate', 'sailor', 7, 2, null, 2));
    deck.push(new Card('Pirate', 'sailor', 9, 2, null, 3));
    deck.push(new Card('Trader', 'person', 3, 0, 'yellow', 1));
    deck.push(new Card('Trader', 'person', 5, 0, 'yellow', 2));
    deck.push(new Card('Trader', 'person', 3, 0, 'blue', 1));
    deck.push(new Card('Trader', 'person', 5, 0, 'blue', 2));
    deck.push(new Card('Trader', 'person', 3, 0, 'green', 1));
    deck.push(new Card('Trader', 'person', 3, 0, 'green', 1));
    deck.push(new Card('Trader', 'person', 3, 0, 'red', 1));
    deck.push(new Card('Trader', 'person', 3, 0, 'red', 1));
    deck.push(new Card('Trader', 'person', 3, 0, 'black', 1));
    deck.push(new Card('Trader', 'person', 3, 0, 'black', 1));
    deck.push(new Card('Expedition', 'expedition', 2, 0, null, 4, ['cross', 'cross']));
    deck.push(new Card('Expedition', 'expedition', 2, 0, null, 4, ['anchor', 'anchor']));
    deck.push(new Card('Expedition', 'expedition', 2, 0, null, 4, ['house', 'house']));
    deck.push(new Card('Expedition', 'expedition', 3, 0, null, 6, ['cross', 'cross', 'house']));
    deck.push(new Card('Expedition', 'expedition', 3, 0, null, 6, ['anchor', 'anchor', 'house']));

    console.log('Just created deck: ', deck);

}

// Shuffle the deck
function shuffleCards(deck) {
    let counter = deck.length, temp, i;

    while(counter) {
        i = Math.floor(Math.random() * counter--);
        temp = deck[counter];
        deck[counter] = deck[i];
        deck[i] = temp;
    }
    return deck;
}

// Render the cards on the board
function displayBoard() {
    getBoard.innerHTML = '';
    board.map( card => {
        getBoard.innerHTML += composeCard(card);
    }); 
}

// Compose each card according to its type
function composeCard(card) {
    return `
        <div class="card border-${card.color}">
            <h3>${card.name}</h3>
            <p><i class="fas fa-${card.type} lead-icon"></i></p>
            <p><img src="./img/coin.png" width="20px"> ${card.coins}</p>
            <p><img src="./img/shield.png" width="20px"> ${card.points}</p>
            <p><img src="./img/swords.png" width="20px"> ${card.swords}</p>

        </div>`;

}


// Deal a card onto the board
function dealCard() {
    // If there are no more cards in the deck...
    if(deck.length <= 0) {
        shuffleCards(discardPile); // Shuffle the discard pile
        deck.push(...discardPile); // Copy discard pile cards into deck
        discardPile = []; // Clear discard pile
        getDiscardCount.innerHTML = discardPile.length; // Update the discard pile count
    }

    // ...otherwise/then:
    board.push(deck.pop());
    displayBoard();
    updateCardsRemaining();
    checkBoard();
}

function checkBoard() {
    // Check to see if there are two ships of the same color
    // If there are, set a prompt, then clear the board
}

function updateCardsRemaining() {
    getCardsRemaining.innerHTML = deck.length;
}

// End a turn
// Move the cards from the board to the discard pile
function endTurn() {
    discardPile.push(...board);
    getDiscardCount.innerHTML = discardPile.length;
    board = [];
    displayBoard();
}


// Game flow

// Start the game by creating, shuffling a deck
createDeck();
shuffleCards(deck);
updateCardsRemaining();

