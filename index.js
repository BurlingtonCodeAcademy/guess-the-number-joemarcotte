//------------------ Use lowercase for gameplay functions-----------------------------------// 

//------------------------ReadAble Stream Data Boiler PLate-----------------------------------------//
const readline = require("readline");

{
	const rl = readline.createInterface(process.stdin, process.stdout);

	function ask(questionText) {
		return new Promise((resolve, reject) => {
			rl.question(questionText, resolve);
		});
	}
//---------------------------------Random Number Generator------------------------------------------//
	function randomNum(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}


	//-----------------------------------------------Start and GamePlay Functions----------------------//
	start();
	async function start() {
		console.log(
			"Let's play a game where you (Human) make up a number and I (DellPc) try to guess it."
		);

		let secretNum = await ask(
			"What is your secret number?\nI won't peek, I promise..If you try and cheat prepare to meet your DOOOOOOM!!!!!\n"
		);
		let min = 0; //min
		let max = 100; //max
		let dellGuess = randomNum(min, max); //computers guess

		let answer = await ask(`Is the answer ${dellGuess}, "yes" or "no"?`);
		// Now try and complete the program.
		if (answer === "yes") {
			console.log(`Congrats you won!`);
			process.exit();
		} else {
			while (answer !== "yes") {
				var highLow = await ask(`Is it higher or lower ?`);

				if (highLow === "higher" ) {
					min = dellGuess + 1;
					dellGuess = randomNum(min, max);
				} else if (highLow === "lower") {
					max = dellGuess - 1;

					dellGuess = randomNum(min, max);
				} else {
					console.log("Input not recognized please try again!");
				} //catch all
				answer = await ask(`Is the answer ${dellGuess}, "yes" or "no"?`);

				//-----------------------Cheat Function---------------------------------//
				if (max <= Math.ceil((min + max) / 2)) {
					console.log(
						"'YOU CHEATED FEED HIM TO THE GATORS!!!!" +
							"\n" +
							"GOODBYE FOREVER YOU FILTHY ANIMAL!'"
					);
					process.exit();
				}

				//----------------------Win and  Sign out Runs after more than 1 guess is made------------------//
				if (answer === "yes") {
					console.log("Victory is Yours!!! Now get lost and leave me alone");
					process.exit();
				}
			}
		}
	}
}
