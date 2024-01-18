document.addEventListener("DOMContentLoaded", function() {
    const pairs = [
        { number: 12, image: "imagenes/12.jpg" },
        { number: 8, image: "imagenes/8.jpg" },
        { number: 6, image: "imagenes/6.jpg" },
        { number: 29, image: "imagenes/29.jpg" },
        { number: 57, image: "imagenes/57.jpg" },
        { number: 5, image: "imagenes/5.jpg" },
        { number: 3, image: "imagenes/3.jpg" },
        { number: 15, image: "imagenes/15.jpg" },
        { number: 74, image: "imagenes/74.jpg" },
        { number: 2, image: "imagenes/2.jpg" },
        { number: 5, image: "imagenes/5.jpg" },
        { number: 73, image: "imagenes/73.jpg" }
    ];
    let shuffledPairs = shuffleArray(pairs);
    const imageContainer = document.getElementById("imageContainer");
    const userNumbersContainer = document.getElementById("userNumbers");
    const keyboard = document.getElementById("keyboard");
    const checkButton = document.getElementById("checkButton");
    const clearButton = document.getElementById("clearButton");
    const noSeeButton = document.getElementById("noSeeButton");
    const messageContainer = document.getElementById("messageContainer");

    let currentIndex = 0;
    let userNumbers = [];

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function displayNextImage() {
        const pair = shuffledPairs[currentIndex];
        const image = document.createElement("img");
        image.src = pair.image;

        imageContainer.innerHTML = '';
        imageContainer.appendChild(image);

        currentIndex++;
    }

    function displayKeyboard() {
        for (let i = 0; i <= 9; i++) {
            const key = document.createElement("button");
            key.textContent = i;
            key.addEventListener("click", function () {
                addNumberToUserInput(parseInt(this.textContent));
            });
            keyboard.appendChild(key);
        }
    }

    function addNumberToUserInput(number) {
        userNumbers.push(number);
        updateUserNumbersDisplay();
    }

    function updateUserNumbersDisplay() {
        userNumbersContainer.innerHTML = '';
        userNumbers.forEach(num => {
            const numberDiv = document.createElement("div");
            numberDiv.textContent = num;
            userNumbersContainer.appendChild(numberDiv);
        });
    }

    function checkAnswer() {
        const currentNumber = shuffledPairs[currentIndex - 1].number;

        const isCorrect = arraysEqual(userNumbers, currentNumber.toString().split('').map(Number));

        if (isCorrect) {
            showMessage("¡Correcto!", "correct");
        } else {
            showMessage("Incorrecto. Inténtalo de nuevo.", "incorrect");
        }

        if (currentIndex < shuffledPairs.length) {
            userNumbers = [];
            updateUserNumbersDisplay();
            displayNextImage();
        } else {
            showMessage("¡Juego completado!", "correct");
            resetGame();
        }
    }

    function resetGame() {
        currentIndex = 0;
        userNumbers = [];
        updateUserNumbersDisplay();
        shuffledPairs = shuffleArray(pairs);
        displayNextImage();
        clearMessage();

        // Evaluamos las respuestas al finalizar el juego
        evaluarRespuestasYMostrarMensaje();
    }

    function evaluarRespuestasYMostrarMensaje() {
        const clasificacionUsuario = evaluarRespuestas(userNumbers, [
            [12, 8, 6, 29, 57, 5, 3, 15, 74, 2, 6, 97, 5, 7, 16, 73, 26, 42, 35, 96],
            [12, 3, 5, 70, 35, 2, 5, 17, 21, "X", "X", "X", "X", "X", "X", "X", "X"],
            [6, 2, 5, 6],
            [2, 4, 3, 9],
        ]);

        showMessage("Test completado. " + clasificacionUsuario, "result");
    }

    function arraysEqual(arr1, arr2) {
        return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
    }

    function showMessage(message, className) {
        messageContainer.innerHTML = `<div class="${className}">${message}</div>`;
    }

    function clearMessage() {
        messageContainer.innerHTML = '';
    }

    function clearUserInput() {
        userNumbers = [];
        updateUserNumbersDisplay();
    }

    function noSeeButtonClick() {
        userNumbers = [];
        updateUserNumbersDisplay();
        displayNextImage();
    }

    checkButton.addEventListener("click", checkAnswer);
    clearButton.addEventListener("click", clearUserInput);
    noSeeButton.addEventListener("click", noSeeButtonClick);

    displayNextImage();
    displayKeyboard();
});