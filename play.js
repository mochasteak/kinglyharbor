
let players = [];
let deck = [];

let playerNames = ['Brian', 'Sydney', 'Cayden', 'Lindsay'];

function Player(name) {
    return {
        name,
        cards: [],
        coins: [],
    };
}

for (let name of playerNames) {
    players.push(new Player(name));
    console.log('Adding ' + name + ' to players');
}

console.log('players: ', players);

function Card(name, type) {
    return {
        name,
        type,
    };
}

deck.push(new Card('Admiral', 'person'));
deck.push(new Card('Jester', 'person'));
deck.push(new Card('Frigate', 'ship'));
deck.push(new Card('Pinnace', 'ship'));
deck.push(new Card('Tax', 'tax'));
deck.push(new Card('Madamoiselle', 'person'));

console.log('deck', deck);

for (let player of players) {
    player.coins.push(deck.pop());
}

console.log('Players: ', players);
console.log('deck', deck);
console.log('Player[0] coins: ', players[0].coins);

for (let player of players) {
    console.log('player.coins: ', player.coins);
    for (let coin of player.coins) {
        console.log(`Player ${player.name}  has: ${coin.name}`);
    }
}



