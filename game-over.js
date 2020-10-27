const scores = JSON.parse(window.localStorage.getItem('finalScores'));
const getScoresTable = document.getElementById('scores-table');

console.log('scores :>> ', scores);
let rank = 1;

for (let score of scores) {

    getScoresTable.innerHTML += `
    <tr>
    <th scope="row">${rank}</th>
    <td>${score[0]}</td>
    <td>${score[1]}</td>
    <td>${score[2]}</td>
    </tr>
    `;
    rank++;
}



