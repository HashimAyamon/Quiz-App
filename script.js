const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreElement = document.createElement("div"); // To display score

let shuffledQuestions, currentQuestionIndex;
let score = 0; // Initialize score

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  score = 0; // Reset score
  updateScoreDisplay();
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";

  // Increment score if the answer is correct
  if (correct) score++;
  updateScoreDisplay();

  // Add emoji to the selected button
  selectedButton.innerText += correct ? " ✅" : " ❌";

  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct === "true");
    if (button !== selectedButton) {
      button.disabled = true; // Disable other buttons after selection
    }
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    questionElement.innerText = `Quiz Completed! Your Score: ${score}/${shuffledQuestions.length}`;
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    nextButton.classList.add("hide");
  }
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

// Display score
function updateScoreDisplay() {
  scoreElement.innerText = `Score: ${score}`;
  scoreElement.style.marginTop = "10px";
  scoreElement.style.fontSize = "1.2rem";
  scoreElement.style.fontWeight = "bold";
  questionContainerElement.appendChild(scoreElement); // Append score element to the container
}


// questions
const questions = [
  {
    question: "Which country won the FIFA World Cup in 2018?",
    answers: [
      { text: "France", correct: true },
      { text: "Croatia", correct: false },
      { text: "Brazil", correct: false },
      { text: "Germany", correct: false },
    ],
  },
  {
    question: "How many players are there in a soccer team on the field?",
    answers: [
      { text: "11", correct: true },
      { text: "9", correct: false },
      { text: "7", correct: false },
      { text: "13", correct: false },
    ],
  },
  {
    question: "What sport is known as 'The Sport of Kings'?",
    answers: [
      { text: "Golf", correct: false },
      { text: "Horse Racing", correct: false },
      { text: "Polo", correct: true },
      { text: "Tennis", correct: false },
    ],
  },
  {
    question: "Which country is known as the birthplace of the Olympic Games?",
    answers: [
      { text: "France", correct: false },
      { text: "Greece", correct: true },
      { text: "Italy", correct: false },
      { text: "USA", correct: false },
    ],
  },
  {
    question: "Which sport is Tiger Woods associated with?",
    answers: [
      { text: "Golf", correct: true },
      { text: "Tennis", correct: false },
      { text: "Football", correct: false },
      { text: "Cricket", correct: false },
    ],
  },
  {
    question: "In cricket, what is the term for a score of zero?",
    answers: [
      { text: "Zero", correct: false },
      { text: "Egg", correct: false },
      { text: "Duck", correct: true },
      { text: "Goose", correct: false },
    ],
  },
  {
    question: "Who holds the record for the most Olympic gold medals?",
    answers: [
      { text: "Carl Lewis", correct: false },
      { text: "Mark Spitz", correct: false },
      { text: "Michael Phelps", correct: true },
      { text: "Usain Bolt", correct: false },
    ],
  },
  {
    question: "Which NBA team has the most championships?",
    answers: [
      { text: "Boston Celtics", correct: false },
      { text: "Los Angeles Lakers", correct: false },
      { text: "Both Boston Celtics and Los Angeles Lakers", correct: true },
      { text: "Chicago Bulls", correct: false },
    ],
  },
  {
    question: "How long is an Olympic swimming pool?",
    answers: [
      { text: "25 meters", correct: false },
      { text: "100 meters", correct: false },
      { text: "75 meters", correct: false },
      { text: "50 meters", correct: true },
    ],
  },
  {
    question: "Which country has won the most Cricket World Cups?",
    answers: [
      { text: "West Indies", correct: false },
      { text: "Australia", correct: true },
      { text: "India", correct: false },
      { text: "England", correct: false },
    ],
  },
  {
    question: "In which year were the first modern Olympic Games held?",
    answers: [
      { text: "1888", correct: false },
      { text: "1904", correct: false },
      { text: "1896", correct: true },
      { text: "1900", correct: false },
    ],
  },
  {
    question: "What is the national sport of Canada?",
    answers: [
      { text: "Lacrosse", correct: false },
      { text: "Basketball", correct: false },
      { text: "Baseball", correct: false },
      { text: "Ice Hockey", correct: true },
    ],
  },
  {
    question: "Which tennis player has won the most Grand Slam titles?",
    answers: [
      { text: "Roger Federer", correct: false },
      { text: "Rafael Nadal", correct: false },
      { text: "Pete Sampras", correct: false },
      { text: "Novak Djokovic", correct: true },
    ],
  },
  {
    question: "In which country is the Tour de France held?",
    answers: [
      { text: "Italy", correct: false },
      { text: "Spain", correct: false },
      { text: "France", correct: true },
      { text: "Switzerland", correct: false },
    ],
  },
  {
    question: "Which country has hosted the most FIFA World Cups?",
    answers: [
      { text: "Germany", correct: false },
      { text: "Italy", correct: false },
      { text: "USA", correct: false },
      { text: "Brazil", correct: true },
    ],
  },
  {
    question: "How many points is a touchdown worth in American Football?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: true },
      { text: "7", correct: false },
      { text: "3", correct: false },
    ],
  },
  {
    question: "Which country won the first FIFA Women's World Cup in 1991?",
    answers: [
      { text: "USA", correct: true },
      { text: "Germany", correct: false },
      { text: "Norway", correct: false },
      { text: "China", correct: false },
    ],
  },
  {
    question: "What is the maximum score in a single frame of bowling?",
    answers: [
      { text: "20", correct: false },
      { text: "25", correct: false },
      { text: "30", correct: true },
      { text: "10", correct: false },
    ],
  },
  {
    question: "What sport does Serena Williams play?",
    answers: [
      { text: "Basketball", correct: false },
      { text: "Badminton", correct: false },
      { text: "Soccer", correct: false },
      { text: "Tennis", correct: true },
    ],
  },
  {
    question: "In which sport would you perform a slam dunk?",
    answers: [
      { text: "Volleyball", correct: false },
      { text: "Tennis", correct: false },
      { text: "Soccer", correct: false },
      { text: "Basketball", correct: true },
    ],
  },
  {
    question: "Which sport uses the term 'love' for a score of zero?",
    answers: [
      { text: "Table Tennis", correct: false },
      { text: "Tennis", correct: true },
      { text: "Badminton", correct: false },
      { text: "Squash", correct: false },
    ],
  },
  {
    question: "What is the diameter of a basketball hoop in inches?",
    answers: [
      { text: "20 inches", correct: false },
      { text: "16 inches", correct: false },
      { text: "18 inches", correct: true },
      { text: "15 inches", correct: false },
    ],
  },{
    question: "How many players are there in a soccer team on the field?",
    answers: [
      { text: "7", correct: false },
      { text: "11", correct: true },
      { text: "9", correct: false },
      { text: "13", correct: false },
    ],
  },
  {
    question: "Who is known as the 'God of Cricket'?",
    answers: [
      { text: "Virat Kohli", correct: false },
      { text: "MS Dhoni", correct: false },
      { text: "Ricky Ponting", correct: false },
      { text: "Sachin Tendulkar", correct: true },
    ],
  },
  {
    question: "What is the national sport of Japan?",
    answers: [
      { text: "Judo", correct: false },
      { text: "Baseball", correct: false },
      { text: "Karate", correct: false },
      { text: "Sumo Wrestling", correct: true },
    ],
  },
  {
    question: "Which country hosted the 2020 Summer Olympics (held in 2021)?",
    answers: [
      { text: "Japan", correct: true },
      { text: "USA", correct: false },
      { text: "China", correct: false },
      { text: "Brazil", correct: false },
    ],
  },
  {
    question: "Who holds the record for the most goals in FIFA World Cup history?",
    answers: [
      { text: "Cristiano Ronaldo", correct: false },
      { text: "Miroslav Klose", correct: true },
      { text: "Pele", correct: false },
      { text: "Lionel Messi", correct: false },
    ],
  },
  {
    question: "Which tennis player has the most Grand Slam titles in men's singles as of 2023?",
    answers: [
      { text: "Roger Federer", correct: false },
      { text: "Rafael Nadal", correct: false },
      { text: "Novak Djokovic", correct: true },
      { text: "Andy Murray", correct: false },
    ],
  },
  {
    question: "What is the distance of a marathon race?",
    answers: [
      { text: "40 km", correct: false },
      { text: "50 km", correct: false },
      { text: "35 km", correct: false },
      { text: "42.195 km", correct: true },
    ],
  },
  {
    question: "Which country has won the most Olympic medals?",
    answers: [
      { text: "USA", correct: true },
      { text: "Russia", correct: false },
      { text: "China", correct: false },
      { text: "Germany", correct: false },
    ],
  },
  {
    question: "Which cricketer hit six sixes in an over during a T20 World Cup match?",
    answers: [
      { text: "Yuvraj Singh", correct: true },
      { text: "Chris Gayle", correct: false },
      { text: "AB de Villiers", correct: false },
      { text: "David Warner", correct: false },
    ],
  },
  {
    question: "What is the term for scoring three goals in a soccer game?",
    answers: [
      { text: "Treble", correct: false },
      { text: "Trio", correct: false },
      { text: "Hat-trick", correct: true },
      { text: "Triple goal", correct: false },
    ],
  },
  {
    question: "Which sport is Michael Phelps associated with?",
    answers: [
      { text: "Rowing", correct: false },
      { text: "Swimming", correct: true },
      { text: "Diving", correct: false },
      { text: "Water Polo", correct: false },
    ],
  },
  {
    question: "Who was the first Indian to win an individual Olympic gold medal?",
    answers: [
      { text: "Abhinav Bindra", correct: true },
      { text: "Leander Paes", correct: false },
      { text: "PV Sindhu", correct: false },
      { text: "Sushil Kumar", correct: false },
    ],
  },
  {
    question: "Which country is famous for its Haka dance before rugby matches?",
    answers: [
      { text: "England", correct: false },
      { text: "New Zealand", correct: true },
      { text: "Australia", correct: false },
      { text: "South Africa", correct: false },
    ],
  },
  {
    question: "Which player is known as 'The King' in basketball?",
    answers: [
      { text: "Kobe Bryant", correct: false },
      { text: "Stephen Curry", correct: false },
      { text: "LeBron James", correct: true },
      { text: "Michael Jordan", correct: false },
    ],
  },
  {
    question: "What is the maximum weight of a cricket ball?",
    answers: [
      { text: "150 grams", correct: false },
      { text: "170 grams", correct: false },
      { text: "155 grams", correct: false },
      { text: "163 grams", correct: true },
    ],
  },
  {
    question: "In which year did Roger Federer win his first Wimbledon title?",
    answers: [
      { text: "2003", correct: true },
      { text: "2001", correct: false },
      { text: "2005", correct: false },
      { text: "2007", correct: false },
    ],
  },
  {
    question: "What is the name of the trophy awarded in hockey's NHL?",
    answers: [
      { text: "Calder Cup", correct: false },
      { text: "Stanley Cup", correct: true },
      { text: "Grey Cup", correct: false },
      { text: "Heisman Trophy", correct: false },
    ],
  },
  {
    question: "Which female tennis player has won the most Grand Slam titles?",
    answers: [
      { text: "Martina Navratilova", correct: false },
      { text: "Billie Jean King", correct: false },
      { text: "Serena Williams", correct: true },
      { text: "Steffi Graf", correct: false },
    ],
  },
  {
    question: "Which country won the first Cricket World Cup in 1975?",
    answers: [
      { text: "England", correct: false },
      { text: "West Indies", correct: true },
      { text: "India", correct: false },
      { text: "Australia", correct: false },
    ],
  },
];
