
// Array of quiz questions and their possible answers
const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      {
        text: "Shark",
        correct: false,
      },
      {
        text: "Blue Whale",
        correct: true,
      },
      { text: "Giraffe", correct: false },
      { text: "Elephant", correct: false },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      {
        text: "Asia",
        correct: false,
      },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      {
        text: "Vatican City",
        correct: true,
      },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Shri Lanka", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      {
        text: "Kalahari",
        correct: false,
      },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antarctica", correct: true },
    ],
  },
];

// Get DOM elements
const questionElement = document.getElementById("question");
const answerButtons = document.querySelector(".answer-buttons");
const nextButton = document.getElementById("next-btn");

// Initialize quiz state variables
let currentQuestionIndex = 0;
let score = 0;

/**
 * Starts or restarts the quiz
 * Resets score and question index, updates UI
 */
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next";
  showQuestion();
}

/**
 * Resets the quiz interface state
 * Hides next button and removes all answer buttons
 */
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

/**
 * Displays the current question and its answer options
 * Creates button elements for each answer option
 */
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", selectAnswer);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

/**
 * Handles answer selection
 * Updates UI to show correct/incorrect answers
 * @param {Event} e - Click event object
 */
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

/**
 * Resets the quiz interface state
 * Hides next button and removes all answer buttons
 */
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

/**
 * Handles the next button click
 * Moves to next question or shows final score
 */
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

/**
 * Displays the final score
 * Updates UI to show score and reset option
 */
function showScore() {
  resetState();
  questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
  nextButton.textContent = "Play Again";
  nextButton.style.display = "block";
}

// Event listener for next/play again button
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

// Initialize the quiz
startQuiz();
