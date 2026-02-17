
const questions = [
    {
        question: "Which language is used for web styling?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Python", correct: false },
            { text: "Java", correct: false }
        ]
    },
    {
        question: "Which is not a JavaScript framework?",
        answers: [
            { text: "React", correct: false },
            { text: "Angular", correct: false },
            { text: "Django", correct: true },
            { text: "Vue", correct: false }
        ]
    },
    {
        question: "Which company developed Java?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Sun Microsystems", correct: true },
            { text: "Google", correct: false },
            { text: "Apple", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultDiv = document.getElementById("result");
const scoreSpan = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultDiv.classList.add("hide");
    document.getElementById("quiz").classList.remove("hide");
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
        if (answer.correct) button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === "true";

    if (correct) score++;

    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
    });

    nextButton.style.display = "block";
}

function setStatusClass(element, correct) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
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
    document.getElementById("quiz").classList.add("hide");
    resultDiv.classList.remove("hide");
    scoreSpan.innerText = score + " / " + questions.length;
}

function restartQuiz() {
    startQuiz();
}

startQuiz();
