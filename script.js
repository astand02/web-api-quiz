var timeH = document.querySelector('p');
let timeSecond = 75;

displayTime(timeSecond)

var countDown = setInterval(() => {
    timeSecond--;
    displayTime(timeSecond);
    if (timeSecond <= 0 || timeSecond < 1) {
        endTime()
        clearInterval(countDown);
    }
}, 1000)

function displayTime(seconds) {
    var min = Math.floor(seconds / 60);
    var sec = Math.floor(seconds % 60);
    timeH.innerHTML = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`
}

function endTime() {
    timeH.innerHTML = 'TIME OUT'
}

var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            { text: "Strings", correct: false },
            { text: "Booleans", correct: false },
            { text: "Alerts", correct: true },
            { text: "Numbers", correct: false },
        ]
    },
    {
        question: "The condition in an if/else statement is enclosed within _____.",
        answers: [
            { text: "Quotes", correct: false },
            { text: "Curly brackets", correct: true },
            { text: "Parenthases", correct: false },
            { text: "Square brackets", correct: false },
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        answers: [
            { text: "Numbers and Strings", correct: false },
            { text: "Other Arrays", correct: false },
            { text: "Booleans", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        answers: [
            { text: "Commas", correct: false },
            { text: "Curly brackets", correct: false },
            { text: "Quotes", correct: true },
            { text: "Parenthases", correct: false },
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            { text: "JavaScript", correct: true },
            { text: "Terminal/Bash", correct: false },
            { text: "For Loops", correct: false },
            { text: "Console.log", correct: false },
        ]
    },
];
var startBtn = document.getElementById("start-btn");
var questionEl = document.getElementById("question");
var answerButtons = document.getElementById("answer-buttons");
var nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0
let score = 0

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionEl.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    var selectedBtn = e.target;
    var isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
    }else{
       selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
            score++;
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionEl.innerHTML = `Your final score is ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
})
startQuiz();