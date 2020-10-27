let requirements = {Anchor: 1, Priest: 1, Captain: 1 };
let playerItems = {Priest: 1, Captain: 1, Anchor: 1 };


console.log('Lodash:>> ', _.isEqual(requirements, playerItems));

console.log('regular', requirements === playerItems);
