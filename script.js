const questions = [
  "Bra/Dick Size",
  "Favorite Color",
  "Favorite Pastime",
  "Send me a pic of yours",
  "Rate me",
  "Rate yourself",
  "First thing you notice in a person",
  "2 things you like about me",
  "2 things you dislike about me",
  "Would you go out on a date with me",
  "Wildest Fantasy",
  "Craziest thing you've done online",
  "One thing you would like to change about me",
  "Favorite sex position",
  "What turns you on?",
  "Virgin?",
  "Do you like to give or receive oral?",
  "Condom or no condom",
  "What would you do if I accidentally saw you naked",
  "What would you do if you saw me accidentally naked",
  "Pussy or Anal",
  "Rubbing or licking/sucking",
  "What would you do if I was your slave",
  "If I kissed you?",
  "If we were alone?",
  "In which outfit do you look the sexiest",
  "What are you wearing right now",
  "Color of your underwear",
  "Color of your bra",
  "Send me a picture of my choice",
  "When was the last time you masturbated",
  "When was the last time you had sex",
  "Favorite feature of your body",
  "Dirtiest thing you've done",
  "Do you use anything to masturbate",
  "Pick a number of your choice",
  "Ask me anything",
  "Have you ever slept naked?",
  "What’s your fetish",
  "Have you ever gone skinny dipping",
  "Have you ever used lubricant?",
  "If you only had 20 minutes left to live, what would you do?",
  "Have you ever put on a strip show?",
  "Have you ever tasted cum or female juice?",
  "Do you prefer doing it in the dark or in the light?",
  "How would you want your bf/gf to wake you up?",
  "Would you rather be on top or down while having sex?",
  "Weirdest thing that ever made you horny",
  "One sexual thing you would never do",
  "Best compliment you ever got",
  "When was the first time you masturbated",
  "Do you own any sex toys?",
  "Have you ever cheated on someone?",
  "Have you ever been caught while in action?",
  "One thing you want to tell me about yourself."
];

const grid = document.getElementById("numberGrid");
const questionBox = document.getElementById("questionBox");
const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answerInput");
const submitButton = document.getElementById("submitAnswer");
const turnDisplay = document.getElementById("currentUser");
const log = document.getElementById("log");

let currentUser = 1;
let currentQuestion = "";

for (let i = 1; i <= 55; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.onclick = () => {
    btn.disabled = true;
    currentQuestion = questions[i - 1];
    questionText.textContent = `Q${i}: ${currentQuestion}`;
    questionBox.classList.remove("hidden");
  };
  grid.appendChild(btn);
}

submitButton.onclick = () => {
  const answer = answerInput.value.trim();
  if (answer === "") return;

  const logEntry = document.createElement("div");
  logEntry.innerHTML = `<strong>User ${currentUser}</strong> answered: <em>${answer}</em> <br/><strong>Question:</strong> ${currentQuestion}<hr/>`;
  log.prepend(logEntry);

  answerInput.value = "";
  questionBox.classList.add("hidden");

  // Switch turn
  currentUser = currentUser === 1 ? 2 : 1;
  turnDisplay.textContent = `User ${currentUser}`;
};
