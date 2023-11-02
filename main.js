// Loading
window.onload = () => {
	setTimeout(() => {
		document.querySelector(".loading").remove();
	}, 3000);
};

function showUsers() {
	users.forEach((e) => {
		let s = document.createElement("p");
		s.innerHTML = e;
		document.body.appendChild(s);
	});
}
// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";
const lettersArray = Array.from(letters);

// select Letters countainer
let container = document.querySelector(".letters");

//generate Letters
lettersArray.forEach((letter) => {
	let span = document.createElement("span");
	let text = document.createTextNode(letter);

	span.className = "char";

	span.appendChild(text);
	container.appendChild(span);
});

// Object of words + categories

// get data from json file
let getDate = async function () {
	let s = await fetch("words.json");
	let n = await s.json();

	building(n);
};
getDate();

// the stracture function

let building = function (word) {
	const words = word;

	// get random property
	let allKeys = Object.keys(words);

	let randomNum = Math.floor(Math.random() * allKeys.length);
	// category
	let randomName = allKeys[randomNum];
	// category words
	let randomValues = words[randomName];

	let randomNumValues = Math.floor(Math.random() * randomValues.length);
	// category word
	let randomNameValues = randomValues[randomNumValues];

	// Set category info

	document.querySelector(".category span").textContent = randomName;

	// select letters guessing element

	let letterGuess = document.querySelector(".letters-guess");

	// covert the word to array
	let theWord = Array.from(randomNameValues);
	console.log(randomNameValues);

	theWord.forEach((letter) => {
		// create span to the char
		let span = document.createElement("span");

		// add class to spaces
		if (letter === " ") {
			span.className = "with-space";
		}

		letterGuess.appendChild(span);
	});

	// handle clicked

	// Set The Status

	let spans = document.querySelectorAll(".letters-guess span");

	// Set Wrong Attemps
	let wrongAttemps = 0;
	let theDraw = document.querySelector(".hangman-draw");

	//

	function pro() {
		document.addEventListener("click", (e) => {
			let status = false;
			if (e.target.className === "char") {
				e.target.classList.add("clicked");

				// get the clicked letter
				let clickedLetter = e.target.textContent.toLowerCase();
				// the choosen word
				let theChoosen = Array.from(randomNameValues.toLowerCase());
				// compare the clicked letter with the choosen word chars
				theChoosen.forEach((theChar, WordIndex) => {
					if (theChar === clickedLetter) {
						// loop on the span to appear char
						spans.forEach((span, spanIndex) => {
							if (WordIndex == spanIndex) {
								status = true;
								span.textContent = String(theChar).toUpperCase();
							}
						});
					}
				});
				// console.log(wrongAttemps);
				if (status !== true) {
					wrongAttemps++;

					theDraw.classList.add(`wrong-${wrongAttemps}`);

					if (wrongAttemps == 7) {
						endGame();

						container.classList.add("finished");

						// appear the correct word

						theChoosen.forEach((theChar, WordIndex) => {
							// loop on the span to appear char
							spans.forEach((span, spanIndex) => {
								if (WordIndex == spanIndex) {
									status = true;
									span.textContent = String(theChar).toUpperCase();
								}
							});
						});
					}
					// play sound
					document.getElementById("fail").play();
				} else {
					checkWiner();
					document.getElementById("success").play();
				}
			}
		});
	}
	pro();
	// handle clicked

	// customize wineer and loser
	window.addEventListener("load", pro);
	function checkWiner() {
		let count = 0;
		let winer = false;
		spans.forEach((span, spanIndex) => {
			if (span.textContent != "") {
				count++;
			}
		});
		if (count === spans.length) {
			winer = true;
		}
		if (winer) {
			document.querySelector(".popup").style =
				"transform: translate(-50%, 43%);";
		}
		function grade() {
			let grade = document.querySelector(".popup p span");
			let gradeValue = "";
			if (wrongAttemps <= 2) {
				gradeValue = "Excellent";
			} else if (wrongAttemps <= 4) {
				gradeValue = "Good";
			} else if (wrongAttemps <= 7) {
				gradeValue = "Try Again";
			}
			grade.textContent = gradeValue;
		}
		grade();
	}
	function endGame() {
		let popup = document.querySelector(".popup");
		let pOne = document.querySelector(".popup p:first-child");
		let pTwo = document.querySelector(".popup p:nth-child(2)");
		let btn = document.querySelector(".popup button");

		popup.style = "transform: translate(-50%, 43%);";
		pOne.textContent = "Try again *_*";
		pTwo.style = "display:none";
	}

	// console.log(spans.length);

	// popup

	function resetGame() {
		// Reset game-related variables
		// wrongAttemps = 0;
		// theDraw.className = "hangman-draw";
		// container.classList.remove("finished");

		// Clear the word display
		// spans.forEach((span) => {
		// 	span.textContent = "";
		// });

		// // Clear the "clicked" class from all letters
		// document.querySelectorAll(".char.clicked").forEach((letter) => {
		// 	letter.classList.remove("clicked");
		// });

		// Select a new random category and word
		// randomNum = Math.floor(Math.random() * allKeys.length);
		// randomName = allKeys[randomNum];
		// randomValues = words[randomName];
		// randomNumValues = Math.floor(Math.random() * randomValues.length);
		// randomNameValues = randomValues[randomNumValues];

		// Update the displayed category
		// document.querySelector(".category span").textContent = randomName;

		// Convert the new word to an array
		// theWord = Array.from(randomNameValues);

		// Clear and re-create the spans for the new word
		// letterGuess.innerHTML = "";
		// theWord.forEach((letter) => {
		// 	let span = document.createElement("span");
		// 	if (letter === " ") {
		// 		span.className = "with-space";
		// 	}
		// 	letterGuess.appendChild(span);
		// });
		// document.querySelector(".popup").style =
		// 	"transform: translate(-50%, 400%);";
		// console.log(randomNameValues);
		window.location.reload();
	}

	document.querySelector(".popup button").onclick = () => {
		resetGame();
	};
};
