let para = document.querySelector("#para");
let leftguess = document.querySelector("#guess")
let gameStatus = document.querySelector("#status")
let restartbtn=document.querySelector("#restartbtn")
let showName=document.querySelector("#showName")
let statusdiv=document.querySelector(".result")



const hungman = function (word, leftGuess) {
    this.word = word.toLowerCase().split('');
    this.leftGuess = leftGuess;
    this.guessedLetter = []
}
hungman.prototype.getPuzzle = function () {
    let puzzle = '';
    this.word.forEach(letter => {
        if (this.guessedLetter.includes(letter) || letter === ' ') {
            puzzle += letter

        }
        else {
            puzzle += '__ '
        }

    });
    // return puzzle;
    if (puzzle === this.word.join("") && this.leftGuess>0) {
        gameStatus.textContent = `You Won :)`
        statusdiv.style.display="block"
        return puzzle
    }
     else if(this.leftGuess>0) {
        return puzzle
    }
    else{
        gameStatus.textContent =  "You Loose Please Restart The Game :("
        statusdiv.style.display="block"




    }


}

hungman.prototype.makeGuess = function (guess) {
    guess = guess.toLowerCase();
    const isUnique = !this.guessedLetter.includes(guess);
    const badGuess = !this.word.includes(guess);

    if (isUnique) {
        this.guessedLetter.push(guess)
    }
    if (isUnique && badGuess) {
        this.leftGuess--;

    }
}






// api integration for random word









let countryName = (randomC) => {
    
const game1 = new hungman(randomC, 4);
para.textContent = game1.getPuzzle();
leftguess.textContent = `You Have ${game1.leftGuess} Guesses Left.`

window.addEventListener('keypress', function (e) {
    const alphabet = String.fromCharCode(e.charCode);
    game1.makeGuess(alphabet)
    leftguess.textContent = `You Have ${game1.leftGuess} Guesses Left.`

    para.textContent = game1.getPuzzle();
})

showName.addEventListener('click',()=>{
    showName.textContent=randomC
})

}



function apiCall(countryName) {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://restcountries.com/v3.1/all')
    request.send()

    request.addEventListener('readystatechange', (e) => {
        if (e.target.readyState === 4 && e.target.status === 200) {
            const data = JSON.parse(e.target.responseText);
            const randomName = data[Math.floor(Math.random() * data.length)].name.common;
            // console.log(randomName)
            countryName(randomName);




        }

    })
}
apiCall(countryName)







