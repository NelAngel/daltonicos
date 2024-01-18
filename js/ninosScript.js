document.addEventListener("DOMContentLoaded", function () {

    const images = [
        { number: 12, image: "imagenes/12.jpg" },
        { number: 8, image: "imagenes/8.jpg" },
        { number: 6, image: "imagenes/6.jpg" },
        { number: 29, image: "imagenes/29.jpg" },
        { number: 57, image: "imagenes/57.jpg" },
        { number: 5, image: "imagenes/5.jpg" },
        { number: 3, image: "imagenes/3.jpg" },
        { number: 15, image: "imagenes/15.jpg" },
        { number: 74, image: "imagenes/74.jpg" }
    ];
    let imagesCopy = [...images]

    let numbers = []
    let currentNumber = 0

    let correctCount = 0
    let incorrectCount = 0
    let incorrectImages = []

    getCard();


    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function getCard() {
        if (imagesCopy.length === 0) {
            result = "Felicitaciones, has completado el test de daltonismo. Basándonos en tus resultados, parece que tienes una visión normal del color. Has respondido correctamente a la mayoría de las preguntas, lo que sugiere que puedes distinguir entre los colores de manera similar a como lo haría alguien con visión normal del color.";

            incorrectAnswers = ""

            if (correctCount < incorrectCount) {
                result = "Has completado el test de daltonismo. Basándonos en tus resultados, parece que podrías tener dificultades para distinguir entre ciertos colores. Has respondido incorrectamente a la mayoría de las preguntas, lo que sugiere que podrías tener alguna forma de daltonismo.Te recomendamos que consultes a un profesional de la salud visual para obtener un diagnóstico preciso."
            }
            if (incorrectCount !== 0) {
                incorrectAnswers = `<details>
                                        <summary>Ver Respuestas incorrectas</summary>
                                    <div class="containerIncorrectAnswers">`
                incorrectImages.forEach(image => {
                    incorrectAnswers += `<div class="incorrectAnswer">
                                            <img src="${image.image}" alt="${image.number}">
                                            <p>Respuesta: ${image.number}</p>
                                        </div>`
                })

                incorrectAnswers += `</div></details>`
            }

            const container = document.getElementById("container");
            container.innerHTML = `<div class="containerResult">
                                    <h2>Resultados:</h2>
                                    <p>Respuestas correctas: ${correctCount}</p>
                                    <p>Respuestas incorrectas: ${incorrectCount}</p>
                                    <p>${result}</p>
                                    ${incorrectAnswers}
                                    <a href="test-ninos.html" class="btnResult">Volver a jugar</a>
                                    </div>`;
            return;
        }

        // Número al azar
        let index = Math.floor(Math.random() * imagesCopy.length);
        const randomImage = imagesCopy.splice(index, 1)[0];

        // Mostrar la imagen al azar sin tarjeta
        const randomImageElement = document.getElementById("randomImage");
        randomImageElement.src = randomImage.image;

        // Nuemro de la tarjeta
        currentNumber = randomImage.number;

        // Crear tarjetas con los números correspondientes
        const numberCards = document.getElementById("numberCards");
        numberCards.innerHTML = "";

        // Filtra y mezcla el array
        const shuffledImages = shuffleArray(images.filter(item => item.number !== currentNumber));

        // Obtiene los primeros dos números
        const otherNumbers = shuffledImages.slice(0, 2).map(item => item.number);

        // Inserta randomImageNumber en una posición aleatoria
        const insertAt = Math.floor(Math.random() * 3);

        numbers = [...otherNumbers.slice(0, insertAt), currentNumber, ...otherNumbers.slice(insertAt)];

        numbers.forEach(number => {
            const card = document.createElement("div");
            card.className = "card";
            card.textContent = number;
            card.draggable = true;
            numberCards.appendChild(card);
        });

        // Configurar la capacidad de arrastrar los elementos
        numberCards.addEventListener("dragstart", function (event) {
            const draggedNumber = event.target.textContent;
            event.dataTransfer.setData("text/plain", draggedNumber);
        });

    }

    // Configurar el área de soltar
    const dropArea = document.getElementById("drop-area");

    dropArea.addEventListener("dragover", function (event) {
        event.preventDefault();
        dropArea.classList.add("dragover");
    });

    dropArea.addEventListener("dragleave", function () {
        dropArea.classList.remove("dragover");
    });

    dropArea.addEventListener("drop", function (event) {
        event.preventDefault();
        dropArea.classList.remove("dragover");

        // Obtener el número soltado
        const draggedNumber = event.dataTransfer.getData("text/plain");

        if (currentNumber === parseInt(draggedNumber)) {
            correctCount++
        } else {
            incorrectCount++
            incorrectImages.push(images.find(image => image.number === currentNumber))
        }
        getCard()
    });
});
