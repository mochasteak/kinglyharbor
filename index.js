// Set up variables
let getBoard = document.getElementById('board');
let getPlayerBoard = document.getElementById('player-cards');
let deck = [];
let discardPile = [];
let board = [];
let getCardsRemaining = document.getElementById('cards-remaining');
let getDiscardCount = document.getElementById('discard');
let isDeckDisabled = false;
let getMessage = document.getElementById('message');
let playerBank = [];
let playerBoard = [];
let playerCoins = [1,2];
let getPlayerCoins = document.getElementById('player-coins');
let playerMoves = 1;
let getPlayerCoinImage = document.getElementById('player-coin-image');

// Factory function for cards
let currentCardId = 0;

function Card(name, type, coins, swords, color, points, requirements) {

    return {
        id: currentCardId++,
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
    let counter = deck.length,
        temp, i;

    while (counter) {
        i = Math.floor(Math.random() * counter--);
        temp = deck[counter];
        deck[counter] = deck[i];
        deck[i] = temp;
    }
    return deck;
}

// Render the cards on the game board
function displayGameBoard() {
    getBoard.innerHTML = '';
    board.map(card => {
        getBoard.innerHTML += composeCard(card);
    });
}

// Display the player's board
function displayPlayerBoard() {
    getPlayerCoins.innerHTML = playerCoins.length;
    console.log('playerCoins length: >>', playerCoins.length);

    // Show/hide coin image depending on num of coins
    if (playerCoins.length <= 0) {
        getPlayerCoinImage.classList.add('hidden');
    } else {
        getPlayerCoinImage.classList.remove('hidden');
    }

    // Render each card in playerBoard using composeCard
    getPlayerBoard.innerHTML = '';
    playerBoard.map(card => {
        getPlayerBoard.innerHTML += composeCard(card);
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
            <button class="btn btn-primary btn-small m-2" onclick="purchaseCard(${card.id})"  ${checkIfAffordable(card) ? '' : 'disabled'}>Purchase</button>
        </div>`;

}

// Check if the purchase button should be displayed
// Should happen every time a card is dealt
function checkIfAffordable(card) {
    console.log(card);
    if (card.type == ('tax' || 'expedition')) {
        console.log('Affordable: false');
        return false;
    } else if (card.type == 'ship') {
        console.log('Affordable: true');
        return true;
    } else {
        if (card.coins <= playerCoins.length) {
            console.log('Affordable: true');
            return true;
        }
        return false;
    }
}

// Move a specified card into player's board
function purchaseCard(cardId) {
    // TO DO: Subtract the right number of cards from player bank into discard pile
    purchasedCard = board.splice(board.findIndex(card => card.id === cardId), 1);
    playerBoard.push(purchasedCard[0]);
    console.log('playerBoard :>> ', playerBoard);
    console.log('board :>> ', board);
    displayGameBoard();
    displayPlayerBoard();

}

// Deal a card onto the board
function dealCard() {
    // If the deck is not disabled...
    if (isDeckDisabled) {

        alert('The deck is disabled');
        return;

    } else {

        // If there are no more cards in the deck...
        if (deck.length <= 0) {
            console.log('Pre-shuffle discardPile :>> ', discardPile);
            shuffleCards(discardPile); // Shuffle the discard pile
            console.log('Post-shuffle discardPile :>> ', discardPile);
            deck.push(...discardPile); // Copy discard pile cards into deck
            discardPile.length = 0; // Clear discard pile
            console.log('discardPile :>> ', discardPile);
            console.log('deck :>> ', deck);
            getDiscardCount.innerHTML = discardPile.length; // Update the discard pile count
        }

        // ...otherwise/then:
        board.push(deck.pop());
        displayGameBoard();
        displayPlayerBoard();
        updateCardsRemaining();
        checkIfDefeatable(board[board.length - 1]);
        checkForDuplicates(board);
    }
}

// Check to see if there are two ships of the same color
function checkForDuplicates(board) {

    let colorsAlreadySeen = [];

    for (let i = 0; i < board.length; i++) {
        let color = board[i].color;
        console.log('color :>> ', color);
        if (colorsAlreadySeen.indexOf(color) !== -1) {
            isDeckDisabled = true;
            console.log('discardPile :>> ', discardPile);
            $('#two-ships-modal').modal();
        }
        if (color !== null) {
            colorsAlreadySeen.push(color);
        }

        console.log('colorsAlreadySeen :>> ', colorsAlreadySeen);
    }
    return false;
}

function checkIfDefeatable(card) {

    console.log('checkIfDefeatable: card :>> ', card);
    return true;
}

function updateCardsRemaining() {

    getCardsRemaining.innerHTML = deck.length;
}

// End a turn
// Move the cards from the board to the discard pile
function endTurn() {
    discardPile.push(...board);
    getDiscardCount.innerHTML = discardPile.length;
    board.length = 0;
    isDeckDisabled = false;
    displayGameBoard();
}


// Game flow

// Start the game by creating, shuffling a deck
createDeck();
shuffleCards(deck);
updateCardsRemaining();
displayPlayerBoard();