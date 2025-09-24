const questions = [
    {
        question: "Qual a cor do céu?",
        answers: [
            { text: "Blue", correct: true },
            { text: "Red", correct: false },
            { text: "Green", correct: false },
            { text: "Yellow", correct: false }
        ]
    },
    {
        question: "Quantas pernas tem um cachorro?",
        answers: [
            { text: "Two", correct: false },
            { text: "Four", correct: true },
            { text: "Six", correct: false },
            { text: "Eight", correct: false }
        ]
    },
    {
        question: "Qual animal faz 'meow'?",
        answers: [
            { text: "Dog", correct: false },
            { text: "Cat", correct: true },
            { text: "Cow", correct: false },
            { text: "Bird", correct: false }
        ]
    },
    {
        question: "Qual o contrário de 'big'?",
        answers: [
            { text: "Tall", correct: false },
            { text: "Short", correct: false },
            { text: "Small", correct: true },
            { text: "Thin", correct: false }
        ]
    },
    {
        question: "O que você usa para escrever?",
        answers: [
            { text: "Fork", correct: false },
            { text: "Pencil", correct: true },
            { text: "Spoon", correct: false },
            { text: "Cup", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.style.display = "none";
    nextButton.innerText = "Próxima";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
        button.disabled = true;
    });

    if (correct) {
        score++;
    }

    nextButton.style.display = "block";
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerText = "Quiz finalizado! Parabéns!";
    scoreText.innerText = `Você acertou ${score} de ${questions.length} pergun