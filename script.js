// Firebase config using your credentials
const firebaseConfig = {
  apiKey: "AIzaSyAVlIA0iWqThYyWUWEuWmDCZLyqnMlMBA8",
  authDomain: "pickanumbergame-8747a.firebaseapp.com",
  databaseURL: "https://pickanumbergame-8747a-default-rtdb.firebaseio.com",
  projectId: "pickanumbergame-8747a",
  storageBucket: "pickanumbergame-8747a.appspot.com",
  messagingSenderId: "99509554202",
  appId: "1:99509554202:web:9225bfed9f00b3ace155a3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Your questions from 1–55 (replace with full list from your PDF)
const questions = {
  1: "What motivates you every day?",
  2: "What is your biggest fear?",
  3: "What’s your dream destination?",
  // ... up to 55
};

// UI references
const grid = document.getElementById("number-grid");
const questionBox = document.getElementById("question");
const answerInput = document.getElementById("answer");
const submitBtn = document.getElementById("submit");
const chatLog = document.getElementById("log");

// Prompt for player name
let player = prompt("Enter your name (e.g., Player 1 or Player 2):");

// Create grid buttons 1 to 55
for (let i = 1; i <= 55; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.className = "number-btn";
  btn.onclick = () => pickNumber(i);
  grid.appendChild(btn);
}

// Pick number for opponent to answer
function pickNumber(number) {
  db.ref("game/current").set({
    pickedBy: player,
    number: number,
    question: questions[number],
    answeredBy: "",
    answer: ""
  });
}

// Submit answer
submitBtn.onclick = () => {
  const answer = answerInput.value.trim();
  if (!answer) return;
  db.ref("game/current").update({
    answeredBy: player,
    answer: answer
  });
  answerInput.value = "";
};

// Listen for game updates
db.ref("game/current").on("value", (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  // Show the selected question
  questionBox.textContent = `Q${data.number}: ${data.question} (Picked by: ${data.pickedBy})`;

  // Show answer log if answered
  if (data.answeredBy && data.answer) {
    const logItem = document.createElement("div");
    logItem.textContent = `${data.answeredBy} answered: ${data.answer}`;
    chatLog.appendChild(logItem);
  }
});
