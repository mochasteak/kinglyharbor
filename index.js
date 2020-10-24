const playerNamesForm = document.querySelector('form');
const getNumPlayers = document.getElementById('choose-players');
const getPlayerNames = document.getElementById('name-players')
const getPlayersList = document.getElementById('name-players-form');

playerNamesForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('e :>> ', e);
    const value = playerNamesForm.querySelector('input[type="text"]').value;
    console.log('value :>> ', value);
});

function playersChosen(num) {
    getNumPlayers.classList.add('hidden');
    getPlayerNames.classList.remove('hidden');
    console.log('playersChosen = ' + num);

    // Add an input field for each player
    for (let i = 0; i < num; i++) {
        getPlayersList.innerHTML += `
        <div class="form-group">
            <input type="text" maxlength="12" class="form-control mx-auto" id="player-name-${i+1}" name="player-${i+1}" 
            placeholder="Player ${i+1} name" required>
        </div>
        `;
    }

    getPlayersList.innerHTML += `
        <button type="submit" class="btn btn-primary my-4">Start game</button>
    `;

}

