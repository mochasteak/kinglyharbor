let deck;

// Create the deck factory
function createCard(name, type, coins, swords, color, points, requirements) {
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


  // Create all the cards
  let card01 = createCard('Frigate', 'ship', 1, 1, 'red', 0 );

  console.log('card01 :>> ', card01);