const questions = [
    {
        question: "Which McLaren model was the first to be developed under the company's new road car division?",
        answers: ["McLaren P1", "McLaren 720S", "McLaren MP4-12C", "McLaren Senna"],
        correct: "McLaren MP4-12C"
    },
    {
        question: "What is the top speed of the McLaren Speedtail?",
        answers: ["250 mph", "243 mph", "220 mph", "212 mph"],
        correct: "250 mph"
    },
    {
        question: "Which McLaren model features a hybrid powertrain combining a twin-turbo V8 engine with an electric motor?",
        answers: ["McLaren GT", "McLaren 570S", "McLaren P1", "McLaren 600LT"],
        correct: "McLaren P1"
    },
    {
        question: "In which year did McLaren first win the Formula 1 Constructors' Championship?",
        answers: ["1974", "1984", "1994", "2004"],
        correct: "1974"
    },
    {
        question: "What is the power output of the McLaren 720S's 4.0-liter twin-turbo V8 engine?",
        answers: ["710 hp", "720 hp", "690 hp", "750 hp"],
        correct: "710 hp"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const submitButton = document.getElementById('submit-btn');
const feedbackContainer = document.getElementById('feedback-container');
const finalScoreContainer = document.getElementById('final-score-container');
const scoreIcon = document.getElementById('score-icon');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    updateScore();
    finalScoreContainer.style.display = 'none';
    submitButton.textContent = 'Next';
    submitButton.removeEventListener('click', startQuiz);
    submitButton.addEventListener('click', handleNextButtonClick);
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.textContent = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('btn');
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    feedbackContainer.textContent = '';
    submitButton.disabled = true;
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correctAnswer = questions[currentQuestionIndex].correct;

    // Change button border color based on correctness
    if (selectedButton.textContent === correctAnswer) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
        // Change correct answer button border to green
        Array.from(answerButtons.children).forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            }
        });
    }

    // Disable all buttons to prevent further clicks
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });

    updateScore();
    submitButton.disabled = false;
}

function updateScore() {
    scoreIcon.textContent = ` ${score}`;
}

function handleNextButtonClick() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
    } else {
        finalScoreContainer.textContent = ` Your final score is ${score}.`;
        finalScoreContainer.style.display = 'block';
        submitButton.textContent = 'Restart';
        submitButton.removeEventListener('click', handleNextButtonClick);
        submitButton.addEventListener('click', startQuiz);
    }
}

submitButton.addEventListener('click', handleNextButtonClick);

startQuiz();
