const questions = [
    {
        question: "What color is the sky?",
        answers: [
            { text: "Blue", correct: true },
            { text: "Red", correct: false },
            { text: "Green", correct: false },
            { text: "Yellow", correct: false }
        ]
    },
    {
        question: "How many legs does a dog have?",
        answers: [
            { text: "Two", correct: false },
            { text: "Four", correct: true },
            { text: "Six", correct: false },
            { text: "Eight", correct: false }
        ]
    },
    {
        question: "Which animal says 'meow'?",
        answers: [
            { text: "Dog", correct: false },
            { text: "Cat", correct: true },
            { text: "Cow", correct: false },
            { text: "Bird", correct: false }
        ]
    },
    {
        question: "What is the opposite of 'big'?",
        answers: [
            { text: "Tall", correct: false },
            { text: "Short", correct: false },
            { text: "Small", correct: true },
            { text: "Thin", correct: false }
        ]
    },
    {
        question: "What do you use to write?",
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

let currentQuestionIndex = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    nextButton.innerText = "Next";
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
    });

    if (correct) {
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("wrong");
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
    questionElement.innerText = "Quiz finished! Well done!";
    nextButton.innerText = "Play Again";
    nextButton.style.display = "block";
    nextButton.onclick = startQuiz;
}

startQuiz();
