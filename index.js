// Constants
const PLAYER_DEFAULT_MOVES = 1;

// Set up variables
let getBoard = document.getElementById('board');
let getPlayerBoard = document.getElementById('player-cards');
let deck = [];
let discardPile = [];
let board = [];
let expeditions = [];
let getCardsRemaining = document.getElementById('cards-remaining');
let getDiscardCount = document.getElementById('discard');
let isDeckDisabled = false;
let colorsAlreadySeen = [];
let getMessage = document.getElementById('message');
let getExpeditions = document.getElementById('expeditions');
let playerBank = [];
let playerBoard = [];
let playerCoins = [];
let getPlayerCoins = document.getElementById('player-coins');
let playerMoves = PLAYER_DEFAULT_MOVES;
let playerSwords = 0;
let getPlayerCoinImage = document.getElementById('player-coin-image');
let getPlayerMoves = document.getElementById('player-moves');



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

    deck.push(new Card('Governor', 'person', 8, 0, null, 0));
    deck.push(new Card('Governor', 'person', 8, 0, null, 0));
    deck.push(new Card('Governor', 'person', 8, 0, null, 0));
    deck.push(new Card('Governor', 'person', 8, 0, null, 0));

    deck.push(new Card('Admiral', 'person', 5, 0, null, 1));
    deck.push(new Card('Admiral', 'person', 7, 0, null, 2));
    deck.push(new Card('Admiral', 'person', 7, 0, null, 2));
    deck.push(new Card('Admiral', 'person', 7, 0, null, 2));
    deck.push(new Card('Admiral', 'person', 9, 0, null, 3));
    deck.push(new Card('Admiral', 'person', 9, 0, null, 3));

    deck.push(new Card('Madamoiselle', 'person', 9, 0, null, 3));
    deck.push(new Card('Madamoiselle', 'person', 9, 0, null, 3));
    deck.push(new Card('Madamoiselle', 'person', 7, 0, null, 2));
    deck.push(new Card('Madamoiselle', 'person', 7, 0, null, 2));

    deck.push(new Card('Jack of all Trades', 'person', 4, 0, null, 1));
    deck.push(new Card('Jack of all Trades', 'person', 4, 0, null, 1));
    deck.push(new Card('Jack of all Trades', 'person', 4, 0, null, 1));

    deck.push(new Card('Priest', 'person', 4, 0, null, 1));
    deck.push(new Card('Priest', 'person', 4, 0, null, 1));
    deck.push(new Card('Priest', 'person', 4, 0, null, 1));
    deck.push(new Card('Priest', 'person', 4, 0, null, 1));
    deck.push(new Card('Priest', 'person', 4, 0, null, 1));

    deck.push(new Card('Captain', 'person', 4, 0, null, 1));
    deck.push(new Card('Captain', 'person', 4, 0, null, 1));
    deck.push(new Card('Captain', 'person', 4, 0, null, 1));
    deck.push(new Card('Captain', 'person', 4, 0, null, 1));
    deck.push(new Card('Captain', 'person', 4, 0, null, 1));

    deck.push(new Card('Settler', 'person', 4, 0, null, 1));
    deck.push(new Card('Settler', 'person', 4, 0, null, 1));
    deck.push(new Card('Settler', 'person', 4, 0, null, 1));
    deck.push(new Card('Settler', 'person', 4, 0, null, 1));
    deck.push(new Card('Settler', 'person', 4, 0, null, 1));

    deck.push(new Card('Jester', 'person', 5, 0, null, 1));
    deck.push(new Card('Jester', 'person', 7, 0, null, 2));
    deck.push(new Card('Jester', 'person', 7, 0, null, 2));
    deck.push(new Card('Jester', 'person', 7, 0, null, 2));
    deck.push(new Card('Jester', 'person', 9, 0, null, 3));

    deck.push(new Card('Expedition', 'expedition', 2, 0, null, 4, ['Priest', 'Priest']));
    deck.push(new Card('Expedition', 'expedition', 2, 0, null, 4, ['Captain', 'Captain']));
    deck.push(new Card('Expedition', 'expedition', 2, 0, null, 4, ['Settler', 'Settler']));
    deck.push(new Card('Expedition', 'expedition', 3, 0, null, 6, ['Priest', 'Priest', 'Settler']));
    deck.push(new Card('Expedition', 'expedition', 3, 0, null, 6, ['Captain', 'Captain', 'Settler']));
    deck.push(new Card('Expedition', 'expedition', 3, 0, null, 5, ['Captain', 'Priest', 'Settler']));

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

function displayBoards() {
    displayGameBoard();
    displayPlayerBoard();
    displayExpeditions();
}

// Render the cards on the game board
function displayGameBoard() {
    getBoard.innerHTML = '';
    board.map(card => {
        getBoard.innerHTML += composeCard(card);
    });
    getPlayerMoves.innerHTML = playerMoves;
    // console.log('playerMoves :>> ', playerMoves);
}

function displayExpeditions() {
    getExpeditions.innerHTML = '';
    expeditions.map(card => {
        getExpeditions.innerHTML += composeExpeditionCard(card);
    });
}

// Display the player's board
function displayPlayerBoard() {
    getPlayerCoins.innerHTML = playerCoins.length;
    // console.log('playerCoins length: >>', playerCoins.length);

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

// Helper to provide correct icon, given a card name
function getIcons(text) {
    switch (text) {
        case 'Frigate':
        case 'Galleon':
        case 'Skiff':
        case 'Pinnace':
        case 'Flute':
            return 'fas fa-ship';
        case 'Tax increase':
            return 'fas fa-balance-scale';
        case 'Expedition':
            return 'fas fa-map-signs';
        case 'Trader':
            return 'fas fa-exchange-alt';
        case 'Governor':
            return 'fas fa-landmark';
        case 'Jester':
            return 'far fa-smile-wink';
        case 'Admiral':
            return 'fas fa-boat';
        case 'Sailor':
        case 'Pirate':
            return 'fas fa-skull-crossbones';
        case 'Priest':
            return 'fas fa-cross';
        case 'Captain':
            return 'fas fa-anchor';
        case 'Settler':
            return 'fas fa-home';
        case 'Madameoiselle':
            return 'fas fa-female';
        case 'Jack of all Trades':
            return 'fas fa-asterisk';
    }
}

// Compose each card according to its type
function composeCard(card) {
    return `
        <div class="board-card border-${card.color}">
            <h3>${card.name}</h3>
            <p><i class="${getIcons(card.name)} lead-icon"></i></p>
            <p><img src="./img/coin.png" width="20px"> ${card.coins}</p>
            <p><img src="./img/shield.png" width="20px"> ${card.points}</p>
            <p><img src="./img/swords.png" width="20px"> ${card.swords}</p>
            <button class="btn btn-primary btn-small m-2" onclick="purchaseCard(${card.id})"  ${checkIfAffordable(card) ? '' : 'disabled'}>${(card.type == 'ship') ? 'Take coins' : 'Purchase' }</button>
        </div>`;

}

function composeExpeditionCard(card) {
    return `
    <div class="card">
    <div class="card-body">
        <div class="card-text">
            <div class="row">
                <div class="col expedition-points">
                    <p>${card.points}</p>
                </div>
                <div class="col expedition-coins">
                    <p>${card.coins}</p>
                </div>
            </div>
            <p class="text-left expedition-label">Requires:</p>
            <div class="expedition-items mt-2">
                <i class="${getIcons(card.requirements[0])} fa-lg"></i><i class="${getIcons(card.requirements[1])} fa-lg"></i><i class="${getIcons(card.requirements[2]) || ''} fa-lg"></i>
            </div>
        </div>
    </div>
    <div class="card-footer">
        <button class="btn btn-sm btn-primary">Purchase</button>
    </div>
</div>
    `;
}

// Check if the purchase button should be displayed
// Should happen every time a card is dealt
function checkIfAffordable(card) {

    if (isDeckDisabled) {
        return;
    }
    //console.log('Checking affordability of: ', card);
    if (card.type === ('tax' || 'expedition')) {
        //console.log('Affordable: false');
        return false;
    } else if (card.type === 'ship' && !isDeckDisabled) {
        //console.log('Affordable: true');
        return true;
    } else {
        if (card.coins <= playerCoins.length) {
            //console.log('Affordable: true');
            return true;
        }
        //console.log('Affordable: true');
        return false;
    }
}

// Move a specified card into player's board
function purchaseCard(cardId) {
    console.log('Purchase button clicked');

    let purchasedCard = board.splice(board.findIndex(card => card.id === cardId), 1);
    console.log('purchasedCard :>> ', purchasedCard);

    // Get the number of coins for the card with this cardId
    let cardCoins = purchasedCard[0].coins;
    // console.log('cardCoins :>> ', cardCoins);

    // If card is a ship...
    if (purchasedCard[0].type === 'ship') {

        // ...add the right number of cards to playerCoins
        for (let index = 0; index < cardCoins; index++) {
            playerCoins.push(deck.pop());
            console.log('adding a card to playerCoins');
        }
        // Move the card to the discard pile
        discardPile.push(purchasedCard[0]);

    } else {

        // Remove the card cost from playerCoins
        for (let i = 0; i < cardCoins; i++) {
            discardPile.push(playerCoins.pop());
            console.log('Moving a card from playerCoins to discardPile');
        }
        // Add card to discard pile
        playerBoard.push(purchasedCard[0]);

    }
    
    playerMoves--;
    calcPlayerMoves();
    console.log('Reducing player moves by one to: ' + playerMoves);
    checkOutOfMoves();
    calcPlayerSwords();
    displayBoards();
    calcAbilities();
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
            // console.log('discardPile :>> ', discardPile);
            // console.log('deck :>> ', deck);
            getDiscardCount.innerHTML = discardPile.length; // Update the discard pile count
        }

        // ...otherwise/then:
        console.log('Dealing a card');
        board.push(deck.pop());

        calcPlayerSwords();
        calcAbilities();
        updateCardsRemaining();
        displayBoards();

        let dealtCard = board[board.length-1];

        if (dealtCard.type === 'expedition') {
            // Move it to expedition array
            console.log('Moving expedition to array');
            expeditions.push(board.pop());
            // Trigger expedition modal
            $('#expedition-modal').modal();
            displayBoards();

        }

        if (dealtCard.type === 'ship') {
            console.log('dealCard: breaking out. checkIfDefeatable');
            checkIfDefeatable(board[board.length - 1]);
            return;
        }

        checkForDuplicates(board);
        calcPlayerMoves();
        
    }
}

function checkOutOfMoves() {
    console.log('checkOutOfMoves invoked');

    if (playerMoves <= 0) {
        isDeckDisabled = true;
        // Set all the buttons to disabled
        let cardButtons = document.querySelectorAll('.board .card button');
        // console.log('cardButtons :>> ', cardButtons);
        for (let button in cardButtons) {
            button.disabled = true;
           // console.log('Setting button to hidden');
        }
    }
}

// Check to see if there are two ships of the same color
function checkForDuplicates(board) {

    console.log('checkForDuplicates invoked');

    colorsAlreadySeen = [];

    for (let i = 0; i < board.length; i++) {
        let color = board[i].color;
        let cardType = board[i].type;
        // console.log('color :>> ', color);
        // console.log('cardType :>> ', cardType);

        if (cardType === 'ship' && colorsAlreadySeen.indexOf(color) !== -1) {
            isDeckDisabled = true;
            // console.log('discardPile :>> ', discardPile);
            $('#two-ships-modal').modal();
        } else if (cardType == 'ship') {
            colorsAlreadySeen.push(color);
        }
    }
    console.log('colorsAlreadySeen :>> ', colorsAlreadySeen);

    return false;
}

function checkIfDefeatable(card) {
    console.log('checkIfDefeatable: card :>> ', card);

    // If player has enough swords, trigger modal
    if (playerSwords >= card.swords) {
        console.log('Triggering defeat-ship modal');
        $('#defeat-ship-modal').modal(); // Trigger modal
        return;
    }
    checkForDuplicates(board);
    calcPlayerMoves();
}

function defeatShip(card) {
    discardPile.push(board.pop());
    getDiscardCount.innerHTML = discardPile.length;
    displayGameBoard();
}

function declineDefeatOption() {
    checkForDuplicates(board);
    calcPlayerMoves();
}

function updateCardsRemaining() {
    getCardsRemaining.innerHTML = deck.length;
}

function calcPlayerSwords() {
    console.log('caclPlayerSwords invoked');
    playerSwords = 0;
    // loop through cards in player's board, count num swords
    for (let entry of Object.entries(playerBoard)) {
        console.log('entry :>> ', entry);
        playerSwords += entry[1].swords;
        console.log('playerSwords :>> ', playerSwords);
    }
    // Don't forget to invoke
}

function calcAbilities() {
    console.log('calculateAbilities invoked');
    // TO DO: For each card in the playerBoard, check if...

    // Create an array of player card types
    const playerCardTypes = Object.values(playerBoard);
    console.log('playerCardTypes :>> ', playerCardTypes);
    console.log(Object.values(playerBoard));

    // TO DO: It's a Governor: add one extra turn (move this from other function)

    // TO DO: It's a Madamoiselle: discount all prices by one

    // TO DO: It's a Jester: give a coin if two ships are found

    // TO DO: It's an Admiral: Give two coins if there are five cards on the board when it's your turn

    // TO DO: It's a trader: Give an additional coin for ships of that color

    // TO DO: Don't forget to invoke
}

function calcPlayerMoves() {

    console.log('calcPlayerMoves invoked');

    // If 4 or 5 different colored ships on the board, increase moves
    switch (colorsAlreadySeen.length) {
        case 4:
            playerMoves++;
            console.log('incrementing playerMoves to: ' + playerMoves);
            break;
        case 5:
            playerMoves += 2;
            console.log('incrementing playerMoves to: ' + playerMoves);
            break;
    }

    // If playerBoard contains Governor card, moves+1
    for (i = 0; i < playerBoard.length; i++) {
        console.log('Checking if card is a Governor: ', playerBoard[i]);
        if (playerBoard[i].name === 'Governor') {
            playerMoves++;
            console.log('Found a Governor, incrementing playerMoves to: ' + playerMoves);
            alert('The Governor you just bought has given you an additional move this turn!');
        }
    }
    getPlayerMoves.innerHTML = playerMoves;
    console.log('playerMoves :>> ', playerMoves);
}

function clearMoves() {
    playerMoves = 0;
    endTurn();
}

// End a turn - Move the cards from the board to the discard pile
function endTurn() {

    // If there are moves left, trigger warning
    if (playerMoves > 0 && !isDeckDisabled) {
        $('#moves-left-modal').modal();
        return;
    }

    // End turn
    discardPile.push(...board);
    getDiscardCount.innerHTML = discardPile.length;
    board.length = 0;
    playerMoves = PLAYER_DEFAULT_MOVES;
    playerSwords = 0;
    isDeckDisabled = false;
    displayBoards();
}


// Game flow

// Start the game by creating, shuffling a deck
createDeck();
shuffleCards(deck);
updateCardsRemaining();
displayBoards();