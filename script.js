const beginnerFlashcards = [
    { word: "flower", translations: ["квітка"] },
    { word: "boy", translations: ["хлопчик", "хлопець"] },
    { word: "house", translations: ["будинок", "дім"] },
    { word: "mouse", translations: ["миша", "мишка"] },
    { word: "paper", translations: ["папір", "бумага"] },
];

const intermediateFlashcards = [
    { word: "cemetery", translations: ["кладовище"] },
    { word: "vacuum cleaner", translations: ["пилосос"] },
    { word: "desert", translations: ["пустеля"] },
    { word: "minced chicken", translations: ["курячий фарш", "фарш курячий"] },
    { word: "carburettor", translations: ["карбюратор"] },
];

const advancedFlashcards = [
    { word: "mortgage", translations: ["іпотека"] },
    { word: "artificial respiration apparatus", translations: ["апарат штучного дихання", "ІВЛ"] },
    { word: "dung beetle", translations: ["жук навозник", "навозний жук"] },
    { word: "pollution", translations: ["забруднення"] },
    { word: "pentacles", translations: ["пентаклі"] },
];

let flashcards = beginnerFlashcards; // Початковий рівень
let currentIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

const questionElement = document.getElementById("question");
const progressElement = document.getElementById("progress");
const correctCountElement = document.getElementById("correct-count");
const incorrectCountElement = document.getElementById("incorrect-count");
const answerInput = document.getElementById("answer-input");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const flashcardContainer = document.querySelector(".card");
const messageElement = document.getElementById("message");
const levelSelect = document.getElementById("level-select");

function updateCard() {
    questionElement.textContent = flashcards[currentIndex].word;
    progressElement.textContent = `${currentIndex + 1}/${flashcards.length}`;
    answerInput.value = "";
    messageElement.textContent = "";
    flashcardContainer.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
}

answerInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const userAnswer = answerInput.value.trim().toLowerCase();
        const correctAnswers = flashcards[currentIndex].translations.map((t) => t.toLowerCase());

        if (correctAnswers.includes(userAnswer)) {
            correctCount++;
            flashcardContainer.style.boxShadow = "0 4px 20px rgba(0, 255, 0, 0.8)";
            messageElement.textContent = "Правильно!";
            messageElement.style.color = "green";
            correctCountElement.textContent = correctCount;

            setTimeout(() => {
                if (currentIndex < flashcards.length - 1) {
                    currentIndex++;
                    updateCard();
                } else {
                    messageElement.textContent = "Ви завершили всі картки!";
                }
            }, 1000);
        } else {
            incorrectCount++;
            flashcardContainer.style.boxShadow = "0 4px 20px rgba(255, 0, 0, 0.8)";
            messageElement.textContent = `Неправильно! Правильна відповідь: ${correctAnswers.join(", ")}`;
            messageElement.style.color = "red";
            incorrectCountElement.textContent = incorrectCount;
        }
    }
});

prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCard();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < flashcards.length - 1) {
        currentIndex++;
        updateCard();
    }
});

levelSelect.addEventListener("change", () => {
    switch (levelSelect.value) {
        case "beginner":
            flashcards = beginnerFlashcards;
            break;
        case "intermediate":
            flashcards = intermediateFlashcards;
            break;
        case "advanced":
            flashcards = advancedFlashcards;
            break;
    }
    currentIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    correctCountElement.textContent = correctCount;
    incorrectCountElement.textContent = incorrectCount;
    updateCard();
});

updateCard();
