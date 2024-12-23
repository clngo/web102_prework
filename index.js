/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)
// console.log(GAMES_JSON); // Should display an array of game objects
// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Loop over each item in the games array
for (let game of games) {
    // Create a new div element for the game card
    const gameCard = document.createElement("div");
    
    // Add the class game-card to the div
    gameCard.classList.add("game-card");
    
    // Set the inner HTML using a template literal
    gameCard.innerHTML = `
        <img src="${game.img}" alt="${game.name}" class="game-img" />
        <h2>${game.name}</h2>
        <p>${game.description}</p>
        <p>Amount pledged: $${game.pledged.toLocaleString()}</p>
        <p>Goal: $${game.goal.toLocaleString()}</p>
        <p>Backers: ${game.backers.toLocaleString()}</p>
    `;
    
    // Append the game card to the games container
    const gamesContainer = document.getElementById("games-container"); // Ensure you have this element in your HTML
    gamesContainer.appendChild(gameCard);
}

}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// use reduce() to calculate the total amount of money pledged
const totalPledged = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalPledged.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// Calculate the total number of games
const totalGames = GAMES_JSON.length;

// Set the inner HTML of the card using a template literal
gamesCard.innerHTML = `${totalGames.toLocaleString()}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // console.log(unfundedGames.length)

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // console.log(fundedGames);
    // use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);
}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // Add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}


// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
const unfundedCount = GAMES_JSON.reduce((count, game) => {
    return game.pledged < game.goal ? count + 1 : count;
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
const descriptionText = `
    A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. 
    ${unfundedCount === 0 ? 
        "All games are fully funded!" : 
        `There ${unfundedCount === 1 ? "is 1 game" : `are ${unfundedCount} games`} that remain unfunded.`}
`;

// create a new DOM element containing the template string and append it to the description container
const descriptionElement = document.createElement("p");
descriptionElement.innerHTML = descriptionText;
descriptionContainer.appendChild(descriptionElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.innerHTML = `Top Funded Game: ${firstGame.name}`; // Set the name of the first game

// do the same for the runner up item
const secondGameElement = document.createElement("p");
secondGameElement.innerHTML = `Second Funded Game: ${secondGame.name}`; // Set the name of the second game

firstGameContainer.appendChild(firstGameElement);
secondGameContainer.appendChild(secondGameElement);