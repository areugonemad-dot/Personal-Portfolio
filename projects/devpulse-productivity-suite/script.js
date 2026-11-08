/* ======================================================
   1. Live Date & Dynamic Motivation Generator
====================================================== */
const dateElem = document.getElementById("currentDateStr");
const now = new Date();
dateElem.textContent = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

const quotes = [
  "First, solve the problem. Then, write the code.",
  "Simplicity is prerequisite for reliability. — Edsger Dijkstra",
  "Make it work, make it right, make it fast. — Kent Beck",
  "Code is like humor. When you have to explain it, it’s bad.",
  "Clean code always looks like it was written by someone who cares."
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuoteBtn");

newQuoteBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = `"${quotes[randomIndex]}"`;
});

/* ======================================================
   2. Interactive Pomodoro Focus Engine
====================================================== */
let totalSeconds = 1500;
let remainingSeconds = 1500;
let timerInterval = null;
let isRunning = false;

const timerDisplay = document.getElementById("timerDisplay");
const timerStateLabel = document.getElementById("timerStateLabel");
const startBtn = document.getElementById("startTimerBtn");
const pauseBtn = document.getElementById("pauseTimerBtn");
const resetBtn = document.getElementById("resetTimerBtn");
const modeBtns = document.querySelectorAll(".mode-btn");

function updateTimerDisplay() {
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  timerDisplay.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function playCompletionBeep() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 note
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.35);
  } catch (e) {
    console.log("Audio not supported or blocked");
  }
}

startBtn.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    timerStateLabel.textContent = "Focus session in progress...";

    timerInterval = setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        timerStateLabel.textContent = "Session completed! Well done.";
        playCompletionBeep();
      }
    }, 1000);
  }
});

pauseBtn.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    timerStateLabel.textContent = "Session paused";
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  isRunning = false;
  remainingSeconds = totalSeconds;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  timerStateLabel.textContent = "Ready to code";
  updateTimerDisplay();
});

modeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modeBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    clearInterval(timerInterval);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;

    totalSeconds = parseInt(btn.dataset.time, 10);
    remainingSeconds = totalSeconds;
    timerStateLabel.textContent = btn.textContent;
    updateTimerDisplay();
  });
});

/* ======================================================
   3. Developer Scratchpad (Auto-Save & Word Counters)
====================================================== */
const notesArea = document.getElementById("notesArea");
const charCount = document.getElementById("charCount");
const copyNotesBtn = document.getElementById("copyNotesBtn");
const clearNotesBtn = document.getElementById("clearNotesBtn");

// Load local-storage cache
notesArea.value = localStorage.getItem("devpulse_notes") || "";

function updateCounters() {
  const text = notesArea.value;
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  charCount.textContent = `${chars} characters · ${words} words`;
  localStorage.setItem("devpulse_notes", text);
}

notesArea.addEventListener("input", updateCounters);
updateCounters();

copyNotesBtn.addEventListener("click", () => {
  if (!notesArea.value) return;
  navigator.clipboard.writeText(notesArea.value).then(() => {
    const original = copyNotesBtn.innerHTML;
    copyNotesBtn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
    setTimeout(() => (copyNotesBtn.innerHTML = original), 1500);
  });
});

clearNotesBtn.addEventListener("click", () => {
  if (confirm("Clear all scratchpad contents?")) {
    notesArea.value = "";
    updateCounters();
  }
});

/* ======================================================
   4. Sprint Task Board
====================================================== */
let tasks = [
  { id: 1, title: "Refactor API authentication headers", tag: "Backend", done: true },
  { id: 2, title: "Audit CSS contrast accessibility", tag: "Frontend", done: false },
  { id: 3, title: "Fix flexbox overflow on mobile viewports", tag: "Bug", done: false }
];

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskTag = document.getElementById("taskTag");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");

function renderTasks() {
  taskList.innerHTML = tasks
    .map(
      (t) => `
    <li class="task-item ${t.done ? "completed" : ""}" data-id="${t.id}">
      <div class="task-left">
        <input type="checkbox" class="task-checkbox" ${t.done ? "checked" : ""} />
        <span class="task-title">${t.title}</span>
        <span class="task-tag-badge tag-${t.tag}">${t.tag}</span>
      </div>
      <button class="delete-task-btn" title="Delete"><i class="fa-regular fa-trash-can"></i></button>
    </li>
  `
    )
    .join("");

  const completed = tasks.filter((t) => t.done).length;
  taskCounter.textContent = `${completed} / ${tasks.length} Done`;

  // Attach dynamic event listeners
  document.querySelectorAll(".task-checkbox").forEach((cb) => {
    cb.addEventListener("change", (e) => {
      const parentId = parseInt(e.target.closest(".task-item").dataset.id, 10);
      const targetTask = tasks.find((t) => t.id === parentId);
      if (targetTask) {
        targetTask.done = e.target.checked;
        renderTasks();
      }
    });
  });

  document.querySelectorAll(".delete-task-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const parentId = parseInt(e.target.closest(".task-item").dataset.id, 10);
      tasks = tasks.filter((t) => t.id !== parentId);
      renderTasks();
    });
  });
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.unshift({
    id: Date.now(),
    title: text,
    tag: taskTag.value,
    done: false
  });

  taskInput.value = "";
  renderTasks();
});

renderTasks();