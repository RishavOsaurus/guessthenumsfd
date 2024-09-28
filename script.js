let number = Math.floor(Math.random() * 100) + 1;
let chances = 5; 
let hintsGiven = 0;

function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function isDivisible(num, divisor) {
    return num % divisor === 0;
}

function isSquare(num) {
    return Number.isInteger(Math.sqrt(num));
}

function getHints() {
    let hints = [];

    // Define 5 hints
    hints.push(number % 2 === 0 ? 'The number is even.' : 'The number is odd.');
    hints.push(isPrime(number) ? 'The number is a prime number.' : 'The number is not a prime number.');
    hints.push(isDivisible(number, 5) ? 'The number is divisible by 5.' : 'The number is not divisible by 5.');
    hints.push(number > 25 ? 'The number is greater than 25.' : 'The number is 25 or less.');
    hints.push('The sum of the digits is ' + (Math.floor(number / 10) + number % 10) + '.');

    return hints;
}

function makeGuess() {
    const guessInput = document.getElementById('guessInput');
    const guess = guessInput.value.trim();
    const messageElement = document.getElementById('message');
    const hintElement = document.getElementById('hint');
    const chancesElement = document.getElementById('chances');
    const historyContElement = document.getElementById('history-container');
    const historyElement = document.getElementById('history');

    // Validate the input
    const guessNumber = parseInt(guess, 10);
    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
        messageElement.textContent = 'Please enter a valid number between 1 and 100.';
        return;
    }

    if (guessNumber === number) {
        messageElement.textContent = 'Congratulations! You guessed it right!';
        messageElement.style = "color: #218838;"
        hintElement.innerHTML = ''; // Clear hints if correct
        historyContElement.hidden = true
        while (historyElement.firstChild) {
            historyElement.removeChild(historyElement.lastChild)
        }
        return;
    } else if (guessNumber > number) {
        messageElement.textContent = 'Lower!';
    } else {
        messageElement.textContent = 'Higher!';
    }

    historyContElement.hidden = false
    let newHistory = document.createElement("span")
    newHistory.textContent = `${guessNumber}`
    historyElement.appendChild(newHistory)

    if (chances > 1) {
        chances--;
        chancesElement.textContent = `Chances Remaining: ${chances}.`;
        if (chances > 2){
            chancesElement.style = "color: #218838;"
        } else{
            chancesElement.style = "color: #ff0000;"
        }

        let hints = getHints();
        if (hintsGiven < hints.length) {
            // Randomize the hints for each missed attempt
            let randomHints = [...hints];
            if (hintsGiven > 0) {
                randomHints = randomHints.sort(() => Math.random() - 0.5);
            }

            // Display hints with numbering
            hintElement.innerHTML = randomHints.slice(0, hintsGiven + 1)
                .map((hint, index) => `<div class="hint-item"><span class="hint-number">${index + 1}.</span>${hint}</div>`)
                .join('');
                
            hintsGiven++;
        }
    } else {
        messageElement.textContent = `Sorry, you're out of chances! The number was ${number}.`;
        historyContElement.hidden = true
        while(historyElement.firstChild){
            historyElement.removeChild(historyElement.lastChild)
        }
        hintElement.innerHTML = '';
        chancesElement.textContent = '';
    }

    // Clear the input field after each guess
    guessInput.value = '';
}

const inputField = document.getElementById("guessInput")
inputField.addEventListener("keypress", (e)=>{
    if(e.key == "Enter"){
        document.getElementById("submitButton").click()
        inputField.innerHTML = ""
    }
})