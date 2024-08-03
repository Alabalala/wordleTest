let listofWords = [
    ["C", "O", "M", "E", "R"],
    ["P", "L", "A", "T", "A"],
    ["Z", "U", "E", "C", "O"],
    ["G", "R", "I", "T", "O"],
    ["B", "R", "U", "J", "A"],
    ["H", "U", "M", "O", "R"],
    ["C", "R", "I", "A", "R"],
    ["L", "L", "A", "M", "A"],
    ["T", "R", "A", "E", "R"],
    ["C", "A", "L", "V", "A"],
    ["T", "E", "J", "E", "R"],
    ["A", "N", "G", "E", "L"],
    ["A", "S", "A", "D", "O"],
    ["A", "D", "I", "O", "S"]
]
const wordofDay = listofWords[Math.floor(Math.random() * listofWords.length)];
console.log(wordofDay);
const realWord = wordofDay.join('')

let button1 = document.querySelector(".button1");
const letterField = document.querySelectorAll("letter-field");
const rows = document.querySelector(".row-parent")
const columns = document.querySelector(".columns")
let rowCount = 1;
let currentRow = document.querySelector(".row" + rowCount);
let letter1 = document.getElementById("firstLetter");
let letter2 = document.getElementById("secondLetter");
let letter3 = document.getElementById("thirdLetter");
let letter4 = document.getElementById("fourthLetter");
let letter5 = document.getElementById("fifthLetter");


currentRow.addEventListener("input", testLetters);

function testLetters() {
    let letter1 = document.getElementById("firstLetter");
    let letter2 = document.getElementById("secondLetter");
    let letter3 = document.getElementById("thirdLetter");
    let letter4 = document.getElementById("fourthLetter");
    let letter5 = document.getElementById("fifthLetter");
    let button1 = document.querySelector(".button1");
    const letters = [letter1.value, letter2.value, letter3.value, letter4.value, letter5.value]
    console.log(letters)

    let allLettersValid = true;

    for (i = 0; i < letters.length; i++) {
        if (!/^[a-zA-Z]$/.test(letters[i]) && letters[i] !== '') {
            alert("¡Usa solo letras!");
            button1.setAttribute("disabled", "true");
            allLettersValid = false;
            break;
        } else if (letters[i] === '') {
            button1.setAttribute("disabled", "true");
            allLettersValid = false;
            break;
        }
    }

    if (allLettersValid) {
        button1.removeAttribute("disabled");
        button1.addEventListener("click", checkLetters);
    }

};

function checkLetters() {
    let letter1 = document.getElementById("firstLetter");
    let letter2 = document.getElementById("secondLetter");
    let letter3 = document.getElementById("thirdLetter");
    let letter4 = document.getElementById("fourthLetter");
    let letter5 = document.getElementById("fifthLetter");
    let button1 = document.querySelector(".button1");
    const letterSelect = [letter1, letter2, letter3, letter4, letter5];
    const letters = [letter1.value, letter2.value, letter3.value, letter4.value, letter5.value];
    const upperCaseLetters = letters.map((lett) => lett.toUpperCase());
    let correctWords = 0;

    for (i = 0 ; i < upperCaseLetters.length ; i++) {
        if (upperCaseLetters[i] === wordofDay[i]) {
            console.log(letters[i] + " es correcto");
            letterSelect[i].style.backgroundColor = "green";
            correctWords += 1;
        } else if (upperCaseLetters[i] !== wordofDay[i] && !wordofDay.includes(upperCaseLetters[i])) {
            letterSelect[i].style.backgroundColor = "red";
        } else if (wordofDay.includes(upperCaseLetters[i])) {
            letterSelect[i].style.backgroundColor = "yellow";
        }
    }

      // Disable all input fields
      for (let i = 0; i < letterSelect.length; i++) {
        letterSelect[i].setAttribute("disabled", "true");
        letterSelect[i].removeAttribute('id');
    }

    // remove the button
    button1.remove();

    //add up count of rows
    rowCount +=1;
    console.log(rowCount);

        if (correctWords === 5) {
            const messageParent = document.querySelector(".gameMessage");
            messageDiv = document.createElement('div');
            messageDiv.innerHTML = `
            <p class="winMessage"> ¡Ha ganado! Bien hecho :D</p>
            <button onClick=window.location.reload() class="newBtn">Jugar otra vez</button>
            `
            messageParent.appendChild(messageDiv);


            return
        } else if (rowCount >= 6) {
            const messageParent = document.querySelector(".gameMessage");
            messageDiv = document.createElement('div');
            messageDiv.innerHTML = `
            <p class="loseMessage"> Game over: no quedan más oportunidades. </p>
            <p class="loseMessage"> La palabra era "${realWord}" </p>
            <button onClick=window.location.reload() class="newBtn">Intentarlo de nuevo</button>
            `
            messageParent.appendChild(messageDiv);
            return
        } else {
            const newRow = document.createElement('div')
            newRow.classList.add("row-parent");
            newRow.innerHTML =
            `
                <div class="row row${rowCount}">
                        <input class="letter-field" id="firstLetter" type="text" maxlength="1" autocapitalize="characters">
                        <input class="letter-field" id="secondLetter" type="text" maxlength="1" autocapitalize="characters">
                        <input class="letter-field" id="thirdLetter" type="text" maxlength="1" autocapitalize="characters">
                        <input class="letter-field" id="fourthLetter" type="text" maxlength="1" autocapitalize="characters">
                        <input class="letter-field" id="fifthLetter" type="text" maxlength="1" autocapitalize="characters">
                    </div>
    
                    <div class="buttons">
                        <button class="button1" disabled="disabled">Jugar</button>
                    </div>`
    
        columns.appendChild(newRow);
        newRow.addEventListener("input", testLetters)
        }
    }
