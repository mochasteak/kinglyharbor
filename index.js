const playerNamesForm = document.forms['name-players-form'];
const getNumPlayers = document.getElementById('choose-players');
const getPlayerNames = document.getElementById('name-players')
const getPlayersList = document.getElementById('name-players-form');


function playersChosen(num) {
    getNumPlayers.classList.add('hidden');
    getPlayerNames.classList.remove('hidden');
    console.log('playersChosen = ' + num);

    // Add an input field for each player
    for (let i = 0; i < num; i++) {
        getPlayersList.innerHTML += `
        <div class="form-group">
            <input type="text" maxlength="12" class="form-control mx-auto" id="player-name-${i+1}" name="player-${i+1}" tabindex="${i+1}" 
            placeholder="Player ${i+1} name" required>
        </div>
        `;
    }

    getPlayersList.innerHTML += `
        <button type="submit" class="btn btn-primary my-4">Start game</button>
    `;
}


playerNamesForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const players = playerNamesForm.querySelectorAll('input[type="text"]');
    const playerNames = [];

    console.log('e :>> ', e);
    console.log('playerNamesForm :>> ', playerNamesForm);
    console.log('players :>> ', players);

    for (let player of players){
        playerNames.push(player.value)
    }
    console.log('playerNames :>> ', playerNames);

    localStorage.setItem("playerNames", JSON.stringify(playerNames));

    //redirect to game page
    setTimeout(function(){console.log('Waiting 5 seconds to redirect');}, 5000);
    window.location.href = "./game.html";

});

