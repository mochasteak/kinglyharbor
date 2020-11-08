// Check if there playerNames, if not, redirect with error message
if (localStorage.getItem('playerNames') === null) {
    alert('Player names not set. Redirecting to home screen');
    localStorage.setItem('error', 'You must select players first');
    window.location.href = './index.html';
}

// Constants
const PLAYER_DEFAULT_MOVES = 1;
const COINS_TO_START = 3;
const playerNames = JSON.parse(localStorage.getItem("playerNames"));
const VICTORY = 12;
const TAX_THRESHOLD = 12;

// Set up variables
let actingPlayer, turnOf, startingPlayer;
actingPlayer = turnOf = startingPlayer = Math.floor(Math.random() * playerNames.length);
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
let governorBonusGiven = false;
let alreadyTakenTurn = true;
let finalRound = false;
let victoryMessageShown = false;
let oneCardDrawn = false;
let cardPurchased = false;
let missingItems = 0;

// Getters
const getBoard = document.getElementById('board');
const getPlayerBoard = document.getElementById('player-cards');
const getPlayers = document.getElementById('players');
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
const getPlayerTurn = document.getElementsByClassName('player-turn');
const getFinalPlayer = document.getElementById('final-player');
const getFinalPlayerPoints = document.getElementById('final-points');
const getFinalRound = document.getElementById('final-round');
const getDrawCardButton = document.getElementById('draw-card-button');
const getModal = document.getElementById('modal');

// Add event listeners to modals
const modalButtons = document.querySelectorAll('.modal');

for (let i = 0; i < modalButtons.length; i++) {
    modalButtons[i].addEventListener('keypress', function(e) {

        if(e.keyCode === 13) {

            let buttonToPress = document.querySelector(`#${e.path[0].id} .btn-primary`);

            buttonToPress.click();

        } else {

        }
    });
}



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
            let points = 0;
            if (this.cards.length > 0) {
                for (let item of this.cards) {
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
            return swords;
        },
        getCards(cardName) {
            let result = 0;
            if (this.cards.length > 0) {
                for (let item of this.cards) {
                    if (item.name === cardName) {
                        result++;
                    }
                }
            }
            return result;
        }
    };
}

function createPlayers(array) {
    for (let name of array) {
        players.push(new Player(name));
    }
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


// Render all the parts of the game
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

    getPlayers.innerHTML = '';

    let playerIndex = 0;

    players.map(player => {

        getPlayers.innerHTML += `
        <div class="player" id="player-${playerIndex}">

            <div class="col-12" id="player-name">
                <p>${player.name} <span class="${(playerIndex === turnOf) ? 'dot' : ''}"></span></p>
            </div>
            
            <div class="player-stats">
            
                <div class="col player-col player-coins text-center">
                    <span id="player-${playerIndex}-coins">${player.coins.length}</span>
                </div>

                <div class="col player-col player-points text-center">
                    <span>${player.getPoints()}</span>
                </div>
            </div>
            
        </div>`;

        playerIndex++;

    });

    highlightActingPlayer();

    // Write the name of the player whose turn it is into the modal
    for (let span of getPlayerTurn) {
        span.innerText = players[turnOf].name;
    }

    // Disable the button if deck is disabled or if a card has been drawn
    if(isDeckDisabled || cardPurchased) {
        getDrawCardButton.setAttribute('disabled', true);
    } else {
        getDrawCardButton.removeAttribute('disabled');
    }
}


function displayExpeditions() {
    getExpeditions.innerHTML = '';
    expeditions.map(card => {
        getExpeditions.innerHTML += composeExpeditionCard(card);
    });
}


// Display the player's board
function displayPlayerBoard() {

    getActingPlayer.innerText = players[actingPlayer].name;
    getPlayerCoins.innerHTML = players[actingPlayer].coins.length;

    // Show/hide coin image depending on num of coins
    if (players[actingPlayer].coins.length <= 0) {
        getPlayerCoinImage.style.backgroundImage = 'none';
    } else {
        getPlayerCoinImage.style.backgroundImage = "url('./img/coin.jpg')";
    }

    // Render each card in playerBoard using composeCard
    getPlayerBoard.innerHTML = '';
    players[actingPlayer].cards.map(card => {
        getPlayerBoard.innerHTML += composeCard(card);
    });

    // Hide the purchase buttons on the player cards
    let getPlayerCardButtons = document.querySelectorAll('.player-cards button');

    if (getPlayerCardButtons.length > 0) {
        for (let button of getPlayerCardButtons) {
            button.classList.add('hidden');
        }
    }

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
            return 'fas fa-binoculars';
        case 'Sailor':
        case 'Pirate':
            return 'fas fa-skull-crossbones';
        case 'Priest':
            return 'fas fa-cross';
        case 'Captain':
            return 'fas fa-anchor';
        case 'Settler':
            return 'fas fa-home';
        case 'Madamoiselle':
            return 'fas fa-percent';
        case 'Jack of all Trades':
            return 'fas fa-asterisk';
    }
}


// Function to calculate what the Madamoiselle discount for any given card should be
const madamoiselleDiscount = (card) => {

    let discount = 0;

    if (card.type === 'person' && 'Madamoiselle' in getPlayerCards()) {

        // Check the number of Madamoiselle cards
        for (let i = 0; i < players[actingPlayer].cards.length; i++) {
            if (players[actingPlayer].cards[i].name === 'Madamoiselle') {
                discount++;
            }
        }
    }
    return discount;
};

// Helper function to determine if an extra fee 
// should be paid for acting on someone else's board
function turnFee() {
    if (actingPlayer === turnOf) {
        return 0;
    } else {
        return 1;
    }
}

// Create and trigger a modal
function showModal(type) {
    // Depending on the type, render the modal

    // Set up variables
    let modalTitle = '';
    let modalBody = '';
    let modalButtons = '';
    let modalButtonText = 'Got it';
    let modalOnclick = false;

    // Possible modal types:

    switch (type) {
        case 'tax':
            modalTitle = 'Taxes!';
            modalBody = `You've hit a tax. All players with 12 cards or more will lose half their cards. The player(s)
            with <em><span id="tax-description"></span></em> get an additional coin.`;
            break;

        case 'new turn':
            modalTitle = `<span class="player-turn"></span>'s Turn`;
            modalBody = `Heads up: the turn is changing. It is now <em><span class="player-turn"></span>'s</em> turn.
            Anyone who takes from their board will have to pay <span class="player-turn"></span> a one coin
            tax.`;
            break;

        case 'final round':
            modalTitle = `The end is nigh!`;
            modalBody = `<span id="final-player"></span> has <span id="final-points"></span> points, which has triggered the final round. Play will continue until it is <span id="final-round"></span>'s turn.</p>
            <p>Reminder: The person with the most points wins, if there's a tie, the person with the most coins
            left wins.`;
            break;

        case 'expedition':
            modalTitle = `A new expedition`;
            modalBody = `You've found a new expedition. This will be added to the expeditions board and can be purchased on your turn if you have the correct resources.`;
            break;

        case 'additional move':
            modalTitle = `You gained a move!`;
            modalBody = `You've earned an additional move for being a risk-taker and having <span id="ship-colors"></span>
            different colored ships on the board!`;
            break;

        case 'must draw':
            modalTitle = `Must draw at least one card`;
            modalBody = `Sorry. Them's the rules. You have to draw at least one card before you can end your turn. Take it up
            with Alexander Pfister.`;
            break;

        case 'governor purchased':
            modalTitle = `You gained a move`;
            modalBody = `The Governor you just purchased has given you an additional move`;
            break;
        
        case 'admiral bonus':
            modalTitle = `You got some coins`; 
            modalBody = `You've earned <span id="admiral-bonus"></span> additional coins from the Admirals in your crew.
            Hoo-arrh!`;
            break;
        
        case 'phase two':
            modalTitle = `Can't draw any more`;
            modalBody = `Once you have taken a card from the board, you can't draw any more cards from the deck. RTFM.`;
            break;

        case 'deck disabled':
            modalTitle = `Deck is disabled`;
            modalBody = `You can't make any more moves. Time to pass the turn to someone else Greedy McGreedyPants.`;
            modalOnclick = `onclick="endTurn()"`;
            break;
        
        case 'not your turn':
            modalTitle = `Deck is disabled`;
            modalBody = `You can only draw cards when it's your turn. (The blue dot next to a player's name indicates whose turn it is.)`;
            break;

        case 'two ships':
            modalTitle = `Oh no!`;
            modalBody = `You pushed your luck too far. There are two ships of the same color on the board! Sadly, this is the end of this turn.`;
            modalOnclick = `onclick="twoShips()"`;
            modalButtonText = 'End turn';
            break;

        case 'defeat ship':
            modalTitle = `Defeat this ship?`;
            modalBody = `Looks like you've got enough firepower to defeat this ship, would you like to blast it into the deep, or keep it on the board?`;
            modalOnclick = `onclick="defeatShip()"`;
            modalButtonText = `Defeat it!`;
            break;

        case 'moves left':
            modalTitle = `Still have moves left`;
            modalBody = `Hey what's the rush, there are still moves you can take. Are you sure you want to end your turn?`;
            modalOnclick = `onclick="clearMoves()"`;
            modalButtonText = 'End my turn';
            break;
    
        default:
            break;
    }

    modalHtml = `
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${modalTitle}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" ${type === 'tax' ? `id="tax-modal-body"` : ''}>
                        <div id="defeat-ship" class="d-flex justify-content-center">
                        <div id="tax-card" class="d-flex justify-content-center"></div>
                        <p>${modalBody}</p>
                    </div>
                    <div class="modal-footer">
                        ${type === 'defeat ship' ? `<button type="button" class="btn btn-secondary" data-dismiss="modal"
                        onclick="declineDefeatOption()">Keep it</button>` : ''}
                        ${type === 'moves left' ? `<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>` : ''}
                        <button type="button" class="btn btn-primary" ${modalOnclick ? modalOnclick : ''} data-dismiss="modal">${modalButtonText}</button>
                    </div>
                </div>
            </div>
    `;

    getModal.innerHTML = modalHtml;  // render the HTML
    $('#modal').modal();  // trigger the modal
    
}

// Compose each card according to its type
function composeCard(card, board = 'game') {

    let cardHtml = '';

    if (card.type === 'ship') {

        let coinHtml = '<img src="./img/coin.png" width="32px" class="ship-coin-image">';
        let totalCoinHtml = coinHtml.repeat(card.coins);

        cardHtml = `
        <div class="board-card border-${card.color}" id="board-card-${card.id}">
            <h3>${card.name}</h3>
            <div class="ship-card-coins justify-content-center">
                ${totalCoinHtml}
            </div>
                <p><i class="${getIcons(card.name)} lead-icon"></i></p>
                <p><img src="./img/swords.png" width="26px"> ${card.swords}</p>
                ${board === 'game' ? `<button class="btn btn-primary btn-small m-2 card-button" onclick="purchaseCard(${card.id})"  ${checkIfAffordable(card) ? '' : 'disabled'}>${(card.type == 'ship') ? 'Take coins' : 'Purchase' }</button>` : ''}
            </div>
        `;
        return cardHtml;
    }

    if (card.type !== 'tax') {

        cardHtml = `
            <div class="board-card border-${card.color}" id="board-card-${card.id}">
                <h3>${card.name}</h3>
                <p><i class="${getIcons(card.name)} lead-icon"></i></p>
                <p><img src="./img/coin.png" width="20px"> ${(card.coins - madamoiselleDiscount(card) >= 0) ? card.coins - madamoiselleDiscount(card) : 0 }</p>
                <p><img src="./img/shield.png" width="20px"> ${card.points}</p>
                <p><img src="./img/swords.png" width="20px"> ${card.swords}</p>
                ${board === 'game' ? `<button class="btn btn-primary btn-small m-2 card-button" onclick="purchaseCard(${card.id})"  ${checkIfAffordable(card) ? '' : 'disabled'}>${(card.type == 'ship') ? 'Take coins' : 'Purchase' }</button>` : ''}
            </div>`;

    } else if (card.type === 'tax') {

        if (card.requirements === 'min points') {
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
    <div class="expedition-card border-null" id="board-card-${card.id}">
        <div class="flex-row-expedition mb-3">
            <div class="player-points half">${card.points}</div>
            <div class="player-coins half">${card.coins}</div>
        </div>
        <h3>Requirements: </h3>
        <p>
        <i class="${getIcons(card.requirements[0])} fa-lg"></i><i class="${getIcons(card.requirements[1])} fa-lg"></i><i class="${getIcons(card.requirements[2]) || ''} fa-lg"></i>
        </p>
        <button class="btn btn-primary btn-small m-2 card-button" onclick="purchaseCard(${card.id},true)"  ${checkIfAffordable(card) ? '' : 'disabled'}>Redeem</button>
    </div>
    `;
}

// Check if the purchase button should be displayed
function checkIfAffordable(card) {

    if (card.type === 'expedition') {

        // Set up variables
        missingItems = 0;
        let hasAllItems = false;
        let requirements = countOccurrences(card.requirements);

        // See if player has enough of each item needed
        for (let property in requirements) {

            if (requirements[property] > players[actingPlayer].getCards(property)) {
                hasAllItems = false;
                missingItems += requirements[property] - players[actingPlayer].getCards(property);
                // console.log(`hasAllItems:>> ${hasAllItems} missingItems:>> ${missingItems}`);
            } else {
                hasAllItems = true;
            }
        }

        // See if player has enough Jack of all Trades to make up the difference
        if (missingItems <= players[actingPlayer].getCards('Jack of all Trades')) {
            hasAllItems = true;
        }

        return (hasAllItems && (missingItems <= players[actingPlayer].getCards('Jack of all Trades')));

    }

    if (playerMoves == 0) {
        return;
    }

    // Taxes  cannot be bought
    if (card.type === 'tax') {
        return false;
    }

    // Ships are always 'purchaseable'
    if (card.type === 'ship') {
        if (actingPlayer !== turnOf || !isDeckDisabled) {
            return true;
        }

    // For all 'person' cards, calculate affordability (incl discounts)
    } else {
        if (card.coins - madamoiselleDiscount(card) + turnFee() <= players[actingPlayer].coins.length) {
            return true;
        }
        return false;
    }
}

// Buying a card
function purchaseCard(cardId, expedition = false) {

    cardPurchased = true;

    if (expedition) {

        // Move the card from expeditions 
        let purchasedExpedition =
            expeditions
            .splice(expeditions
                .findIndex(card => card.id === cardId), 1);

        let expeditionCoinBonus = purchasedExpedition[0].coins;

        // Remove the required items from player's cards
        for (let item of purchasedExpedition[0].requirements) {

            // Check if the item exists, if so, remove it, if not, remove a wild
            if (players[actingPlayer].getCards(item) > 0) {
                discardPile
                    .push(players[actingPlayer].cards
                        .splice(players[actingPlayer].cards
                            .findIndex(obj => obj.name === item), 1));
            } else {
                discardPile
                    .push(players[actingPlayer].cards
                        .splice(players[actingPlayer].cards
                            .findIndex(obj => obj.name === 'Jack of all Trades'), 1));
            }
        }

        // Give the player the number of coins
        for (let index = 0; index < expeditionCoinBonus; index++) {
            players[actingPlayer].coins.push(deck.pop());
            // console.log('Triggering animation');
            // animateCoins(actingPlayer);
        }

        // Move the card to the player
        players[actingPlayer].cards.push(purchasedExpedition[0]);

        // Re-render boards
        displayBoards();
        checkVictoryThreshold();

        return;
    }

    // Move the card out of the game board
    let purchasedCard = board.splice(board.findIndex(card => card.id === cardId), 1);
    
    // Decrement the player's moves
    playerMoves--;

    // Get the number of coins for this card
    let cardCoins = purchasedCard[0].coins;

    // If card is a ship...
    if (purchasedCard[0].type === 'ship') {

        let traderBonus = 0;

        // Check if there is a trader with the same color as the ship in player's board
        if ('Trader' in getPlayerCards()) {

            // If there is, set up variable to store bonus 
            let shipColor = purchasedCard[0].color;

            // Check the number and color of Trader cards
            for (let i = 0; i < players[actingPlayer].cards.length; i++) {
                if (players[actingPlayer].cards[i].name === 'Trader' && players[actingPlayer].cards[i].color === shipColor) {
                    traderBonus++;
                }
            }
        }

        // ...add the right number of cards to players[actingPlayer].coins
        for (let index = 0; index < cardCoins + traderBonus - turnFee(); index++) {
            players[actingPlayer].coins.push(deck.pop());
            console.log('Triggering animation');
            animateCoins(actingPlayer);
        }

        // If it's not this player's turn, give one card to the player whose turn it is
        if (turnFee() == 1) {
            players[turnOf].coins.push(deck.pop());
            animateCoins(turnOf);

        }

        // Move the card to the discard pile
        discardPile.push(purchasedCard[0]);

    } else {

        // Remove the card cost from playerCoins
        for (let i = 0; i < cardCoins; i++) {
            discardPile.push(players[actingPlayer].coins.pop());
        }
        // Give the player whose turn it is an extra coin
        if (actingPlayer !== turnOf) {
            players[turnOf].coins.push(players[actingPlayer].coins.pop());
            animateCoins(turnOf);
        }

        // Apply the move bonus if it is a Governor
        if (purchasedCard[0].name === 'Governor') {
            playerMoves++;
            governorBonusGiven = true;
            isNewTurn = false;
            showModal('governor purchased');
        }

        // Add card to player's cards
        players[actingPlayer].cards.push(purchasedCard[0]);

    }

    checkForAdmiralBonus();
    checkVictoryThreshold();
    calcMovesBonus();
    calcPlayerSwords();
    displayBoards();
    checkOutOfMoves();

    // Animate the coins
    let coinTimeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 250
    });

    coinTimeline
        .add({
            targets: `#player-${actingPlayer}-coins`,
            scale: 2,
            opacity: 0
        })
        .add({
            targets: `#player-${actingPlayer}-coins`,
            scale: 2,
            opacity: 0
        })
        .add({
            targets: `#player-${actingPlayer}-coins`,
            scale: 2,
            opacity: 0
        })
        .add({
            targets: `#player-${actingPlayer}-coins`,
            scale: 2,
            opacity: 0
        });
}

// Deal a card onto the board
function dealCard() {

    // If the deck is disabled, warn users
    if (isDeckDisabled || cardPurchased) {

        if (actingPlayer !== turnOf) {
            showModal('not your turn');
            return;

        } else {

            if (cardPurchased) {
                showModal('phase two');
                return;
            } else {
                showModal('deck disabled');
                return;
            }
        }

    } else {

        // If there are no more cards in the deck...
        if (deck.length <= 0) {
            shuffleCards(discardPile); // Shuffle the discard pile
            deck.push(...discardPile); // Copy discard pile cards into deck
            discardPile.length = 0; // Clear discard pile
            getDiscardCount.innerHTML = discardPile.length; // Update the discard pile count
        }

        // ...if there ARE cards in the deck:

        board.push(deck.pop());

        let dealtCard = board[board.length - 1];

        // Render and animate the added card
        getBoard.innerHTML += composeCard(dealtCard);

        anime({
            targets: `#board-card-${dealtCard.id}`,
            translateX: -100,
            direction: 'reverse',
            opacity: 0,
            duration: 500,
            easing: 'easeInQuad'
        });

        // displayBoards(); // So players can see the dealt card
        
        oneCardDrawn = true;
        isNewTurn = false;
        calcPlayerSwords();
        updateCardsRemaining();



        if (dealtCard.type === 'expedition') {
            // Move it to expedition array
            expeditions.push(board.pop());
            displayBoards();
        }

        if (dealtCard.type === 'tax') {
            collectTaxes(dealtCard);
            discardPile.push(board.pop());
            displayBoards();
            showModal('tax');
            getTaxModal.innerHTML = composeCard(dealtCard, 'modal');
        }

        if (dealtCard.type === 'ship') {
            checkIfDefeatable(board[board.length - 1]);
            return;
        }

        checkForAdmiralBonus();
        displayBoards();
        checkForDuplicates(board);
        calcMovesBonus();
    }
}

function checkVictoryThreshold() {

    for (let player of players) {
        if (player.getPoints() >= VICTORY) {
            finalRound = true;
            if (!victoryMessageShown) {
                getFinalPlayer.innerText = players[actingPlayer].name;
                getFinalPlayerPoints.innerText = players[actingPlayer].getPoints();
                getFinalRound.innerText = players[startingPlayer].name;
                victoryMessageShown = true;
                showModal('final round');
            }
        }
    }
}

function checkGameOver() {

    // If final round is true, and actingPlayer and turnOf are the same
    if (finalRound && (turnOf === startingPlayer)) {
        isDeckDisabled = true;
        playerMoves = 0;
        calcWinner();
        window.location.href = './game-over.html';
    }
}

function calcWinner() {

    // Write everyone's points into a 2D array (with their index)
    let finalScores = [];

    for (let player of players) {
        finalScores.push([player.name, player.getPoints(), player.coins.length]);
    }

    // Sort by points
    finalScores.sort((a, b) => {
        let aPoints = a[1];
        let bPoints = b[1];
        let aCoins = a[2];
        let bCoins = b[2];

        if (aPoints == bPoints) {
            return (aCoins > bCoins) ? -1 : (aCoins < bCoins) ? 1 : 0;
        } else {
            return (aPoints > bPoints) ? -1 : 1;
        }
    });

    localStorage.setItem('finalScores', JSON.stringify(finalScores));
}

function collectTaxes(card) {

    // First, take away half the coins for any player with 12 or more
    for (let player of players) {
        if (player.coins.length >= TAX_THRESHOLD) {
            console.log(`Tax threshold hit: ${player.name} has ${player.coins.length} coins`);
            for (let i = -2; i <= Math.floor(player.coins.length / 2); i++) {
                // console.log('Removing 1 coin from ' + player.name);
                discardPile.push(player.coins.pop());
            }
        }
    }
    // Second, apply the minPoints or maxSwords bonus

    // Apply min points bonus
    if (card.requirements === 'min points') {

        // Calculate all the points for all the players
        let playerPoints = [];

        for (let player of players) {
            playerPoints.push([player, player.getPoints()]);
        }

        // Sort the array of player points
        playerPoints.sort((a, b) => {
            let aPoints = a[1];
            let bPoints = b[1];
            if (aPoints < bPoints) {
                return -1;
            } else if (aPoints > bPoints) {
                return 1;
            }
            return 0;
        });

        // Add one coin to the one with the least points
        for (let player of players) {
            if (player.getPoints() === playerPoints[0][1]) {
                player.coins.push(deck.pop());
                animateCoins(actingPlayer);
            }
        }

    } else {

        if (card.requirements === 'max swords') {

            // Calculate all the swords for all the players
            let playerSwords = [];

            for (let player of players) {
                playerSwords.push([player, player.getSwords()]);
            }

            // Sort the array of player points
            playerSwords.sort((a, b) => {
                let aSwords = a[1];
                let bSwords = b[1];
                if (aSwords > bSwords) {
                    return -1;
                } else if (aSwords < bSwords) {
                    return 1;
                }
                return 0;
            });

            // Add one coin to the one with the most swords
            for (let player of players) {
                if (player.getSwords() === playerSwords[0][1]) {
                    player.coins.push(deck.pop());
                    animateCoins(players.indexOf(player));
                }
            }
        }
    }
    displayBoards();
}

function animateCoins(player) {
    console.log(`#player-${player}-coins`);

    anime({
        targets: `#player-${player}-coins`,
        keyframes: [
            {scale: 2, opacity: 0, duration: 200},
            {scale: 1, opacity: 1, duration: 0}
        ],
        easing: 'easeOutExpo'
    });
}


function checkOutOfMoves() {

    if (playerMoves <= 0) {

        isDeckDisabled = true;

        // Set all the buttons to disabled
        let cardButtons = document.querySelectorAll('.board .card button');

        for (let button in cardButtons) {
            button.disabled = true;
        }
    }
}

function twoShips() {
    
    // Give players with a Jester a coin
    for (let player of players) {

        if (player.getCards('Jester')) {
            let jesterBonus = player.getCards('Jester');

            for (let i = 0; i < jesterBonus; i++) {
                player.coins.push(deck.pop());
            }
        }
    }

    // move the TURN to the next player (without cycling actingPlayer)
    cycleTurn();
    oneCardDrawn = true;
    endTurn(false);
}

// Check to see if there are two ships of the same color
function checkForDuplicates(board) {

    colorsAlreadySeen = [];

    for (let i = 0; i < board.length; i++) {
        let color = board[i].color;
        let cardType = board[i].type;

        // If there ARE two ships of the same color, trigger the modal
        if (cardType === 'ship' && colorsAlreadySeen.indexOf(color) !== -1) {
            isDeckDisabled = true;
            playerMoves = 0;
            displayBoards();
            showModal('two ships');

            // If there ARE NOT two ships of the same color, add the color to the list
        } else if (cardType == 'ship') {
            colorsAlreadySeen.push(color);
        }
    }
    return;
}


// Give two coins for each Admiral, if there are five cards on the board
function checkForAdmiralBonus() {

    if (board.length >= 5) {

        if('Admiral' in getPlayerCards()) {

            if (playerMoves > 0 && !admiralBonusGiven) {
    
                let admiralBonus = getPlayerCards().Admiral * 2;
            
                for (let i = 0; i < admiralBonus; i++) {
                    players[actingPlayer].coins.push(deck.pop());
                }
                displayBoards();
                admiralBonusGiven = true;
                showModal('admiral bonus');
                getAdmiralBonus.innerText = admiralBonus;
            }
        }
    } 
}

function checkIfDefeatable(card) {

    // If player has enough swords, trigger modal
    if (players[actingPlayer].getSwords() >= card.swords) {
        getDefeatShip.innerHTML = composeCard(card, 'modal');
        showModal('defeat ship'); // Trigger modal
        return;
    }

    checkForDuplicates(board);
    calcMovesBonus();
    checkForAdmiralBonus();
}

function defeatShip(card) {
    discardPile.push(board.pop());
    getDiscardCount.innerHTML = discardPile.length;
    displayGameBoard();
}

function declineDefeatOption() {
    checkForDuplicates(board);
    calcMovesBonus();
}

function updateCardsRemaining() {
    getCardsRemaining.innerHTML = deck.length;
}

function calcPlayerSwords() {
    playerSwords = 0;
    // loop through cards in player's board, count num swords
    for (let entry of Object.entries(players[actingPlayer].cards)) {
        playerSwords += entry[1].swords;
    }
}


// Helper function to create an array of items and their frequency
const countOccurrences = arr => arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});


// Returns an array of player cards and number of them
const getPlayerCards = () => {

    let playerCardTypes = [];

    for (let card of players[actingPlayer].cards) {
        playerCardTypes.push(card.name);
    }

    return countOccurrences(playerCardTypes);
};

function calcMovesBonus() {

    // If there is a Governor in player cards, and the governor bonus hasn't been given, add a turn to playerMoves and set flag to 'true'
    if ('Governor' in getPlayerCards() && !governorBonusGiven) {
        playerMoves++;
        governorBonusGiven = true;
    }

    // If 4 or 5 different colored ships on the board, increase moves
    switch (colorsAlreadySeen.length) {
        case 5:
            if (!fiveColorBonusUsed) {
                playerMoves++;
                fiveColorBonusUsed = true;
                getShipColors.innerHTML = '<em>5</em>';
                showModal('additional move');
                break;
            } else {
                break;
            }
            break;

        case 4:
            if (!fourColorBonusUsed) {
                playerMoves++;
                fourColorBonusUsed = true;
                getShipColors.innerHTML = '<em>4</em>';
                showModal('additional move');
                break;
            } else {
                break;
            }
    }

    getPlayerMoves.innerHTML = playerMoves;
}

function clearMoves() {
    playerMoves = 0;
    displayBoards();
    endTurn();
}

function cycleActingPlayer() {

    isNewTurn = true;
    missingItems = 0;
    playerMoves = 1;
    admiralBonusGiven = false;
    governorBonusGiven = false;
    isDeckDisabled = false;
    cardPurchased = false;

    // Move the acting player
    if (actingPlayer === players.length - 1) {
        actingPlayer = 0;

    } else {

        actingPlayer++;
    }

    if (actingPlayer !== turnOf) {

        isDeckDisabled = true;
    }
    checkTurn();
    calcMovesBonus();
    checkForAdmiralBonus();
}

// Check if the TURN needs to move
function checkTurn() {

    if (actingPlayer === turnOf && alreadyTakenTurn === true) {
        cycleTurn();
    } else if (actingPlayer === turnOf && alreadyTakenTurn === false) {
        alreadyTakenTurn = true;
    }
}

// Move the turn to the next player
function cycleTurn() {

    if (turnOf === players.length - 1) {

        turnOf = 0;

    } else {

        turnOf++;
    }

    alreadyTakenTurn = false;
    isDeckDisabled = false;
    discardPile.push(...board);
    board.length = 0;
    cycleActingPlayer();
    checkGameOver();
    oneCardDrawn = false;
    getDiscardCount.innerHTML = discardPile.length;
    showModal('new turn');

}

function highlightActingPlayer() {

    // Get all the HTML elements with class "player"
    const getPlayerIds = document.getElementsByClassName('player');

    for (let i = 0; i < getPlayerIds.length; i++) {
        if (getPlayerIds[i].id === 'player-' + actingPlayer) {
            getPlayerIds[i].classList.add('border');
        } else {
            getPlayerIds[i].classList.remove('border');
        }
    }
}

// End a turn - Move the cards from the board to the discard pile
function endTurn(cycle = true) {

    const getButtons = document.getElementsByClassName('card-button');

    // If the actingPlayer is the starting player AND no card has been drawn, trigger modal
    if (players[actingPlayer] === players[turnOf] &&
        !oneCardDrawn) {
        showModal('must draw');
        return;
    }

    // If there are cards on the board, and there are moves left, show the modal AND the cards can be bought...
    if (playerMoves > 0 && board.length > 0) {

        let hasPurchaseableCard = false;

        // Is there at least one button that is NOT disabled?
        for (const button of getButtons) {
            if (!button.attributes.hasOwnProperty('disabled')) {
                hasPurchaseableCard = true;
            }
        }

        if (hasPurchaseableCard) {
            showModal('moves left');
            return;
        }
    }

    // Things we always do regardless of actingPlayer end or turnOf end
    fourColorBonusUsed = false;
    fiveColorBonusUsed = false;
    colorsAlreadySeen = [];
    admiralBonusGiven = false;
    governorBonusGiven = false;
    isNewTurn = true;
    playerSwords = 0;
    playerMoves = PLAYER_DEFAULT_MOVES;

    if (cycle) {
        cycleActingPlayer();
    }

    displayBoards();
}

// Deal each player the starting amount of cards
function dealToStart() {
    for (let person of players) {
        for (let i = 0; i < COINS_TO_START; i++) {
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