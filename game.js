// Check if there playerNames, if not, redirect with error message
if(localStorage.getItem('playerNames') === null) {
    alert('Player names not set. Redirecting to home screen');
    localStorage.setItem('error', 'You must select players first');
    window.location.href = './index.html';
}

// Constants
const PLAYER_DEFAULT_MOVES = 1;
const CARDS_TO_START = 8;
const playerNames = JSON.parse(localStorage.getItem("playerNames"));
// console.log('playerNames :>> ', playerNames);

// Set up variables
let turnOf = Math.floor(Math.random() * playerNames.length);
let actingPlayer = turnOf;
let deck = [];
let discardPile = [];
let board = [];
let expeditions = [];
let colorsAlreadySeen = [];
let players = [];
let playerMoves = PLAYER_DEFAULT_MOVES;
let playerSwords = 0;
let isDeckDisabled = false;
let fourColorBonusUsed = false;
let fiveColorBonusUsed = false;
let isNewTurn = true;
let admiralBonusGiven = false;
let alreadyTakenTurn = false;

// Getters
const getBoard = document.getElementById('board');
const getPlayerBoard = document.getElementById('player-cards');
const getPlayers = document.getElementById('players');
// console.log(getPlayers);
const getCardsRemaining = document.getElementById('cards-remaining');
const getDiscardCount = document.getElementById('discard');
const getMessage = document.getElementById('message');
const getExpeditions = document.getElementById('expeditions');
const getPlayerCoins = document.getElementById('player-coins');
const getPlayerCoinImage = document.getElementById('player-coin-image');
const getPlayerMoves = document.getElementById('player-moves');
const getShipColors = document.getElementById('ship-colors');
const getAdmiralBonus = document.getElementById('admiral-bonus');
const getDefeatShip = document.getElementById('defeat-ship');
const getTaxModal = document.getElementById('tax-card');
const getTaxDescription = document.getElementById('tax-description');
const getActingPlayer = document.getElementById('acting-player');


// Factory functions
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

function Player(name) {

    return {
        name,
        cards: [],
        coins: [],
        getPoints() {
            // console.log('getPoints invoked');
            let points = 0;
            // console.log('this.cards :>> ', this.cards);
            // console.log('this.cards.length :>> ', this.cards.length);
            if (this.cards.length > 0) {
                for (let item of this.cards) {
                    // console.log('item :>> ', item);
                    // console.log(`Adding ${item.points} to player's score`);
                    points += item.points;
                }
            }
            return points;
        },
        getSwords() {

            let swords = 0;

            if (this.cards.length > 0) {
                for (let item of this.cards) {
                    swords += item.swords;
                }
            }
            console.log(`${this.name} has ${swords} swords`);
            return swords;
        }
    };
}

function createPlayers(array) {
    // console.log('array :>> ', array);
    for (let name of array) {
        players.push(new Player(name));
    }
    // console.log('players :>> ', players);

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
/*
    deck.push(new Card('Sailor', 'person', 3, 1, null, 1));
    deck.push(new Card('Sailor', 'person', 3, 1, null, 1));
    deck.push(new Card('Sailor', 'person', 3, 1, null, 1));
    deck.push(new Card('Sailor', 'person', 3, 1, null, 1));
    deck.push(new Card('Sailor', 'person', 3, 1, null, 1));
    deck.push(new Card('Sailor', 'person', 3, 1, null, 1));
    deck.push(new Card('Sailor', 'person', 3, 1, null, 1));
    deck.push(new Card('Sailor', 'person', 5, 1, null, 2));
    deck.push(new Card('Sailor', 'person', 5, 1, null, 2));
    deck.push(new Card('Sailor', 'person', 7, 1, null, 3));

    deck.push(new Card('Pirate', 'person', 5, 2, null, 1));
    deck.push(new Card('Pirate', 'person', 7, 2, null, 2));
    deck.push(new Card('Pirate', 'person', 9, 2, null, 3));

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
*/

    // console.log('Just created deck: ', deck);

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
    // console.log('displayGameBoard invoked');
    getBoard.innerHTML = '';
    board.map(card => {
        getBoard.innerHTML += composeCard(card);
    });
    getPlayerMoves.innerHTML = playerMoves;
    
    getPlayers.innerHTML = '';

    let playerIndex = 0;

    players.map(player => {

        getPlayers.innerHTML += `
        <div class="player" id="player-${playerIndex}">
            <div class="row">
                <div class="col text-center">
                    <p>${player.name}</p>
                <div class="col player-col player-coins text-center"><span id="coins">${player.coins.length}</span></div>
                <div class="col player-col player-points text-center"><span id="player1-score">${player.getPoints()}</span></div>
                </div>
            </div>
        </div>`;

        playerIndex++;

    });

    highlightActingPlayer();
}

function displayExpeditions() {
    getExpeditions.innerHTML = '';
    expeditions.map(card => {
        getExpeditions.innerHTML += composeExpeditionCard(card);
    });
}

// Display the player's board
function displayPlayerBoard() {

    // console.log('displayBoard: playerCoins :>> ', players[actingPlayer].coins);

    getActingPlayer.innerText = players[actingPlayer].name;
    getPlayerCoins.innerHTML = players[actingPlayer].coins.length;

    // Show/hide coin image depending on num of coins
    if ( players[actingPlayer].coins.length <= 0) {
        getPlayerCoinImage.classList.add('hidden');
    } else {
        getPlayerCoinImage.classList.remove('hidden');
    }

    // Render each card in playerBoard using composeCard
    getPlayerBoard.innerHTML = '';
     players[actingPlayer].cards.map(card => {
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

const madamoiselleDiscount = (card) => {

    let discount = 0;

    if (card.type === 'person' && 'Madamoiselle' in getPlayerCards()) {
        // console.log('Card is a person AND found a Madame in playerBoard');

        // Check the number of Madamoiselle cards
        for(let i = 0; i <  players[actingPlayer].cards.length; i++) {
            if( players[actingPlayer].cards[i].name === 'Madamoiselle') {
                discount++;
            }
        }
    }
    // console.log('Madamoiselle discount :>> ', discount);
    return discount;
};

// Compose each card according to its type
function composeCard(card, board = 'game') {

    let cardHtml = '';

    if(card.type !== 'tax') {

        cardHtml = `
            <div class="board-card border-${card.color}">
                <h3>${card.name}</h3>
                <p><i class="${getIcons(card.name)} lead-icon"></i></p>
                <p><img src="./img/coin.png" width="20px"> ${(card.coins - madamoiselleDiscount(card) >= 0) ? card.coins - madamoiselleDiscount(card) : 0 }</p>
                <p><img src="./img/shield.png" width="20px"> ${card.points}</p>
                <p><img src="./img/swords.png" width="20px"> ${card.swords}</p>
                ${board === 'game' ? `<button class="btn btn-primary btn-small m-2" onclick="purchaseCard(${card.id})"  ${checkIfAffordable(card) ? '' : 'disabled'}>${(card.type == 'ship') ? 'Take coins' : 'Purchase' }</button>` : ''}
            </div>`;

    } else if (card.type === 'tax') {

        if(card.requirements === 'min points') {
            getTaxDescription.innerText = 'the least points';
        } else {
            getTaxDescription.innerText = 'the most swords';
        }

        cardHtml = `
            <div class="board-card border-${card.color}">
                <h3>${card.name}</h3>
                <p><i class="${getIcons(card.name)} lead-icon"></i></p>
                <p><img src="./img/${card.requirements === 'min points' ? 'shield' : 'swords'}.png" width="40px"></p>
                <p>${card.requirements}</p>
            </div>`;
    }

    return cardHtml;

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
function checkIfAffordable(card) {

    if (isDeckDisabled) {
        return;
    }
    // Taxes and expeditions cannot be bought
    if (card.type === ('tax' || 'expedition')) {
        return false;

    // Ships are always 'purchaseable'
    } else if (card.type === 'ship' && !isDeckDisabled) {
        return true;

    // For all 'person' cards, calculate affordability (incl discounts)
    } else {
        if (card.coins - madamoiselleDiscount(card) <= players[actingPlayer].coins.length) {
            return true;
        }
        return false;
    }
}

// Buying a card
function purchaseCard(cardId) {
    // console.log('Purchase button clicked');

    // Move the card out of the game board
    let purchasedCard = board.splice(board.findIndex(card => card.id === cardId), 1);
    // console.log('purchasedCard :>> ', purchasedCard);

    // Get the number of coins for the card with this cardId
    let cardCoins = purchasedCard[0].coins;
    // console.log('cardCoins :>> ', cardCoins);

    // If card is a ship...
    if (purchasedCard[0].type === 'ship') {

        let traderBonus = 0;

        // Check if there is a trader with the same color as the ship in player's board
        if ('Trader' in getPlayerCards()) {
            // console.log('Found a Trader in playerBoard');

            // If there is, set up variable to store bonus 
            let shipColor = purchasedCard[0].color;
            // console.log('shipColor :>> ', shipColor);
            // console.log('numTraders :>> ', getPlayerCards().Trader);

            // Check the number and color of Trader cards
            for(let i = 0; i <  players[actingPlayer].cards.length; i++) {
                if( players[actingPlayer].cards[i].name === 'Trader' &&  players[actingPlayer].cards[i].color === shipColor) {
                    // console.log(`Found a ${shipColor} trader!`);
                    traderBonus++;
                    // console.log(`Adding 1 to traderBonus`);
                    // console.log('traderBonus :>> ', traderBonus);
                }
            }
        }

        // ...add the right number of cards to players[actingPlayer].coins
        for (let index = 0; index < cardCoins + traderBonus; index++) {
            players[actingPlayer].coins.push(deck.pop());
            // console.log('adding a card to playerCoins');
        }
        // Move the card to the discard pile
        discardPile.push(purchasedCard[0]);

    } else {

        // Remove the card cost from playerCoins
        for (let i = 0; i < cardCoins; i++) {
            discardPile.push(players[actingPlayer].coins.pop());
            // console.log('Moving a card from playerCoins to discardPile');
        }

        // Apply the move bonus if it is a Governor
        if (purchasedCard[0].name === 'Governor') {
            playerMoves++;
            isNewTurn = false;
            $('#governor-purchased-modal').modal();
        }

        // Add card to discard pile
         players[actingPlayer].cards.push(purchasedCard[0]);

    }

    playerMoves--;
    // console.log('Reducing player moves by one to: ' + playerMoves);
    calcPlayerMoves();
    calcPlayerSwords();
    displayBoards();
    calcAbilities();
    checkOutOfMoves();
}

// Deal a card onto the board
function dealCard() {
    // If the deck is not disabled...
    if (isDeckDisabled) {

        $('#deck-disabled-modal').modal();
        return;

    } else {

        // If there are no more cards in the deck...
        if (deck.length <= 0) {
            // console.log('Pre-shuffle discardPile :>> ', discardPile);
            shuffleCards(discardPile); // Shuffle the discard pile
            // console.log('Post-shuffle discardPile :>> ', discardPile);
            deck.push(...discardPile); // Copy discard pile cards into deck
            discardPile.length = 0; // Clear discard pile
            // console.log('discardPile :>> ', discardPile);
            // console.log('deck :>> ', deck);
            getDiscardCount.innerHTML = discardPile.length; // Update the discard pile count
        }

        // ...if there ARE cards in the deck:
        // console.log('Dealing a card');
        board.push(deck.pop());

        calcPlayerSwords();
        calcAbilities();
        updateCardsRemaining();
        isNewTurn = false;
        displayBoards();

        let dealtCard = board[board.length - 1];

        if (dealtCard.type === 'expedition') {
            // Move it to expedition array
            // console.log('Moving expedition to array');
            expeditions.push(board.pop());
            // Trigger expedition modal
            $('#expedition-modal').modal();
            displayBoards();

        }

        if (dealtCard.type === 'tax') {
            // console.log('Found a tax');
            // console.log('dealtCard :>> ', dealtCard);
            collectTaxes(dealtCard);
            discardPile.push(board.pop());
            displayBoards();
            getTaxModal.innerHTML = composeCard(dealtCard, 'modal');
            $('#tax-modal').modal();
        }

        if (dealtCard.type === 'ship') {
            // console.log('dealCard: breaking out. checkIfDefeatable');
            checkIfDefeatable(board[board.length - 1]);
            return;
        }

        checkForDuplicates(board);
        calcPlayerMoves();

    }
}

function collectTaxes(card) {
    // console.log('collectTaxes invoked');

    // First, take away half the coins for any player with 12 or more
    for (let player of players) {
        // console.log(`${player.name} has player.coins.length :>> ', ${player.coins.length}`);
        // console.log('Math.floor of half :>> ', Math.floor(player.coins.length / 2));
        
        if(player.coins.length >= 12) {
            // console.log('Tax threshold exceeded by ' + player.name);
            for (let i = -2; i <= Math.floor(player.coins.length / 2); i++) {
                // console.log('Removing 1 coin from ' + player.name);
                discardPile.push(player.coins.pop());
            }
        }
    }
    // Second, apply the minPoints or maxSwords bonus
    console.log('card.requirements :>> ', card.requirements);
    if (card.requirements === 'min points') {
        
        // Calculate all the points for all the players
        let playerPoints = [];

        for (let player of players) {
            playerPoints.push(player.getPoints());
        }
        // Add one coin to the one with the least points 
        
    } else {
        // Calculate all the swords for all the players
        // Add one coin to the one with teh most swords
    }



    
    displayBoards();
    // TO DO: Give a bonus depending on what type of tax it is
}

function checkOutOfMoves() {
    // console.log('checkOutOfMoves invoked');

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

function twoShips() {
    // Give any player with a Jester two coins for each Jester
    if (getPlayerCards().Jester) {

        let jesterBonus = getPlayerCards().Jester * 2;

        for (let i = 0; i < jesterBonus; i++) {
            players[actingPlayer].coins.push(deck.pop());
            // console.log('Adding a coin to player due to Jester bonus. Iteration: ' + i);
        }
    }
    endTurn();
}

// Check to see if there are two ships of the same color
function checkForDuplicates(board) {

    // console.log('checkForDuplicates invoked');

    colorsAlreadySeen = [];

    for (let i = 0; i < board.length; i++) {
        let color = board[i].color;
        let cardType = board[i].type;
        // console.log('color :>> ', color);
        // console.log('cardType :>> ', cardType);

        // If there ARE two ships of the same color, trigger the modal
        if (cardType === 'ship' && colorsAlreadySeen.indexOf(color) !== -1) {
            isDeckDisabled = true;
            playerMoves = 0;
            displayBoards();
            $('#two-ships-modal').modal({
                keyboard: false
            });

            // If there ARE NOT two ships of the same color, add the color to the list
        } else if (cardType == 'ship') {
            colorsAlreadySeen.push(color);
        }
    }
    // console.log('colorsAlreadySeen :>> ', colorsAlreadySeen);

    return false;
}

function checkIfDefeatable(card) {
    // console.log('checkIfDefeatable: card :>> ', card);

    // If player has enough swords, trigger modal
    if (playerSwords >= card.swords) {
        getDefeatShip.innerHTML = composeCard(card, 'modal');
        // console.log('Triggering defeat-ship modal');
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
    // console.log('caclPlayerSwords invoked');
    playerSwords = 0;
    // loop through cards in player's board, count num swords
    for (let entry of Object.entries( players[actingPlayer].cards)) {
        // console.log('entry :>> ', entry);
        playerSwords += entry[1].swords;
        // console.log('playerSwords :>> ', playerSwords);
    }
}


// Helper function to create an array of items and their frequency
const countOccurrences = arr => arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});


// Returns an array of player cards and number of them
const getPlayerCards = () => {
    // console.log('getPlayerCards invoked');

    let playerCardTypes = [];

    for (let card of  players[actingPlayer].cards) {
        playerCardTypes.push(card.name);
    }
    // console.log('playerCardTypes :>> ', playerCardTypes);

    // console.log('output of getPlayerCards', countOccurrences(playerCardTypes));
    return countOccurrences(playerCardTypes);
};


// Apply the special bonuses depending on card types
function calcAbilities() {
    // console.log(' === calcAbilities invoked ===');


    if ('Admiral' in getPlayerCards()) {
        //console.log('Found ' + getPlayerCards().Admiral + ' Admiral cards');
        //console.log('Cards on board: ', board.length);
        //console.log('admiralBonusGiven :>> ', !admiralBonusGiven);
        // Give two coins if there are five cards on the board when it's your turn
        if (!admiralBonusGiven && board.length >= 5 && playerMoves > 0) {
            //console.log('Admiral bonus function invoked');

            let admiralBonus = getPlayerCards().Admiral * 2;

            //console.log('admiralBonus :>> ', admiralBonus);

            for (let i = 0; i < admiralBonus; i++) {
                players[actingPlayer].coins.push(deck.pop());
                // console.log('Adding a coin to player due to Admiral bonus. Iteration: ' + i);
            }
            admiralBonusGiven = true;
            getAdmiralBonus.innerText = admiralBonus;
            $('#admiral-bonus-modal').modal();
        }
        displayBoards();
    }

    if ('Governor' in getPlayerCards()) {
        // console.log('calcAbilities: Adding ' + getPlayerCards().Governor + ' to playerMoves');
        if (isNewTurn) {
            playerMoves += getPlayerCards().Governor;
            calcPlayerMoves();
        }
    }
}

function calcPlayerMoves() {

    // console.log('calcPlayerMoves invoked');

    /*
    if(isDeckDisabled) {
        return;
    } */

    // If 4 or 5 different colored ships on the board, increase moves
    switch (colorsAlreadySeen.length) {
        case 5:
            if(!fiveColorBonusUsed) {
                playerMoves++;
                // console.log('incrementing playerMoves to: ' + playerMoves);
                fiveColorBonusUsed = true;
                getShipColors.innerHTML = '<em>5</em>';
                $('#additional-move-modal').modal();
                break;
            } else {
                break;
            }
            break;

        case 4:
            if (!fourColorBonusUsed) {
                playerMoves++;
                // console.log('Adding 1 to playerMoves: >>', playerMoves);
                fourColorBonusUsed = true;
                getShipColors.innerHTML = '<em>4</em>';
                $('#additional-move-modal').modal();
                break;
            } else {
                break;
            }
    }

    getPlayerMoves.innerHTML = playerMoves;
    // console.log('playerMoves :>> ', playerMoves);
}

function clearMoves() {
    playerMoves = 0;
    displayBoards();
    endTurn();
}

function cycleActingPlayer() {
    // console.log('actingPlayer :>> ', actingPlayer);
    // console.log('players.length :>> ', players.length);
    if (actingPlayer === players.length - 1) {
        actingPlayer = 0;
    } else {
        actingPlayer++;
    }
    // console.log(`The acting player has changed to ${players[actingPlayer].name}`);
}

function highlightActingPlayer() {
    // console.log('highlighActingPlayer invoked');
    // Get all the HTML elements with class "player"
    const getPlayerIds = document.getElementsByClassName('player');
    // console.log('getPlayerIds :>> ', getPlayerIds);

    for (let i = 0; i < getPlayerIds.length; i++) {
        if (getPlayerIds[i].id === 'player-' + actingPlayer) {
            // console.log(getPlayerIds[i] + 'This is the acting player');
            getPlayerIds[i].classList.add('border');
        } else {
            // console.log(getPlayerIds[i] + 'This is not the acting player');
            getPlayerIds[i].classList.remove('border');
        }
        
    }

    // Remove the .border class from all
    // Whatever the acting player is, find the div.id for that player
    // Add the .border class to it
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
    cycleActingPlayer();
    fourColorBonusUsed = false;
    fiveColorBonusUsed = false;
    admiralBonusGiven = false;
    isDeckDisabled = false;
    isNewTurn = true;
    displayBoards();
}

// Deal each player the starting amount of cards
function dealToStart() {
    for (let person of players) {
        for (let i = 0; i < CARDS_TO_START; i++) {
            person.coins.push(deck.pop());
        }
    }
}


// Start the game
createDeck();
createPlayers(playerNames);
shuffleCards(deck);
dealToStart();
updateCardsRemaining();
displayBoards();