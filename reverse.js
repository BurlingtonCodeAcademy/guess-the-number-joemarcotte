// -----------------Boiler Plate Code----------------//
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
	return new Promise((resolve, reject) => {
		rl.question(questionText, resolve);
	});
}
// --------------------Random Num Generator------------////
function randomInt(min, max) {
	let range = max - min + 1;
	return min + Math.floor(Math.random() * range);
}
//--------------------Sanitize functions-----------////////
function saniUp(string) {
	return string.trim().toUpperCase();
}
// ------------------GamePlay Start
start();

async function start() {
	console.log(
		"Let's play a game where I (computer) make up a number between 1 and 100,\nand you (human) try to guess it."
	);
	let playGame = await ask("Would you like to play? (Y or N) ");
	playGame = saniUp(playGame);
	if (playGame === "Y","yes","YES","y") {
		let secretNum = randomInt(1, 100);
		let guess = "";
		let guessVault = [];  //Stores guesses by push to an Array//

		console.log(
			"Ok! I've thought of a number between 1 and 100. \nIf at any time you want to see all your previous guesses, just enter the command, 'guesses'. \nOk, let's play! What's your first guess? "
		);
		while (guess != secretNum) {
			guess = await ask("\n>_");
			if (guess < 1 || guess > 100) {
				console.log(
					`${guess} is not a number between 1 and 100! Please guess again.`
				);
			} else if (guess > secretNum) {
				guessVault.push(guess);
				console.log("Wrong- My number is LOWER than your guess! Guess again!");
			} else if (guess < secretNum) {
				guessVault.push(guess);
				console.log("Wrong- My number is HIGHER than your guess! Guess again!");
			} else if (guess == secretNum) {
				console.log("Congrats! Victory is yours!");
				process.exit();
			} else if (guess == "guesses") {
				console.log(`You have guessed: ${guessVault}`);
			} else {
				console.log("'" + guess + "'" + " is not a recognizable command.");
			}
		}
		// -------------If "NO" selected logout-----------//
	} else {
		console.log("Ok! Maybe next time! Goodbye!");
		process.exit();
	}
}
