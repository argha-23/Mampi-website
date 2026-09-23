/* =========================================================
   MAMPI SECRET WEBSITE
   MASTER SCRIPT (FINAL SUBMIT ENABLED VERSION)
========================================================= */

// Birthday Check Function (09/07/2002)
function checkBirthday() {
    const dobInput = document.getElementById("dob");
    const errorMsg = document.getElementById("error-msg");
    
    if (!dobInput) return false;

    const userDOB = dobInput.value; // YYYY-MM-DD
    const correctDOB = "2002-07-09"; // 9th July 2002

    if (userDOB === correctDOB) {
        if (errorMsg) errorMsg.style.display = "none";
        return true;
    } else {
        if (errorMsg) errorMsg.style.display = "block";
        return false;
    }
}

const welcomeScreen = document.getElementById("welcome-screen");
const questionScreen = document.getElementById("question-screen");
const finalScreen = document.getElementById("final-screen");

const startButton = document.getElementById("start-btn");

if (startButton) {
    startButton.addEventListener("click", function(e) {
        if (!checkBirthday()) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
    }, true);
}

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");

let currentPoemTimeout = null;

const STORAGE_KEY = "mampi_secret_progress_v1";

let state = {
    currentStep: 0,
    answers: {},
    yearAnswer: "",
    textAnswers: {},
    photos: {},
    q11BCount: 0,
    poemReactionAnswer: "",
    poemReactionText: ""
};

const questions = {
    1: {
        type: "choice",
        text: "একটা কথা বল তো…\nতুই কি জানিস, এই website-টা আসলে কেন বানানো হয়েছে? 👀",
        options: [
            "তোকেই বিরক্ত করার জন্য? 😑",
            "তুই মাথা মোটা কিনা check করার জন্য? 🤭",
            "জানি না… কিন্তু ব্যাপারটা suspicious 👀",
            "আমি জানি না 🙄 (তোর favourite dialogue)"
        ]
    },
    2: {
        type: "choice",
        text: "আচ্ছা… একটা জিনিস দেখি তো 👀\nতুই আমাকে কতদিন ধরে চিনিস?",
        options: [
            "ছোটবেলা থেকেই 😌",
            "Class V–VI থেকেই",
            "Class VIII থেকে",
            "Class IX–X থেকে",
            "জানি না 🙄 (তোর favourite dialogue)"
        ]
    },
    3: {
        type: "choice",
        text: "আচ্ছা দেখি…\nআমাদের friendship আসলে কবে থেকে serious level-এ গিয়েছিল? 👀",
        options: [
            "Class VIII",
            "Class IX",
            "Class X",
            "Class XI",
            "জানি না 🙄 (তোর favourite dialogue)"
        ]
    },
    4: {
        type: "choice",
        text: "23 July… 👀\nএই date-টা দেখলে তোর মাথায় প্রথম কী আসে?",
        options: [
            "কিছুই না 😐",
            "কোথাও যেন শুনেছি… 👀",
            "একটা special day ছিল মনে হয়…",
            "আরে হ্যাঁ! মনে আছে! 🤭",
            "আমি জানি না 🙄 (তোর favourite dialogue)"
        ]
    },
    5: {
        type: "choice",
        text: "আচ্ছা Kutti… একটা খুব important প্রশ্ন। 👀\nআমি তোকে কোন নামে সবচেয়ে বেশি ডাকি?",
        options: [
            "Mau 🐄",
            "Kutti 🥹",
            "Goru 😂",
            "Chagol 🐐",
            "Mampi 🤭"
        ]
    },
    6: {
        type: "choice",
        text: "চল দেখি…\nআমাদের প্রথম proper friendship-এর সময়টা তোর মনে আছে? 👀\nকোন class থেকে আমরা সত্যি সত্যি close friend হয়ে গেছিলাম?",
        options: [
            "Class VII",
            "Class VIII",
            "Class IX",
            "Class X",
            "আমার মনে নাই 🙄"
        ]
    },
    7: {
        type: "choice",
        text: "আচ্ছা বল তো… 👀\nআমাদের দুজনের সবচেয়ে favourite জায়গা কোনটা ছিল?",
        options: [
            "School 🏫",
            "Rajnagar 😌",
            "Kurumbera 😂",
            "Belda Station 🚉",
            "জানি না 🙄"
        ]
    },
    8: {
        type: "choice",
        text: "আচ্ছা Kutti… 👀\nতুই যখন আমার সাথে phone-এ কথা বলিস, তখন এত আস্তে আস্তে কথা বলিস কেন? 😂",
        options: [
            "আমি এমনিই আস্তে কথা বলি 😌",
            "তুই শুনতে পারিস না 😑",
            "জানি না 🤭",
            "আমি তো আস্তেই কথা বলি না! 😤",
            "তোর কানে বেশি জোরে শোনায় 😂"
        ]
    },
    9: {
        type: "choice",
        text: "আচ্ছা বল তো… 👀\nতোকে আমার কখন বেশি cute/handsome লাগত?",
        options: [
            "School-এ 🏫",
            "College-এ 🎓",
            "দুটো সময়েই 😌❤️",
            "এখন 😏",
            "এখন আর cute/handsome লাগে না! 😂"
        ]
    },
    10: {
        type: "choice",
        text: "আচ্ছা বল তো… 👀\nআমাদের first hug আর kiss কোথায় হয়েছিল?",
        options: [
            "School 🏫",
            "Rajnagar-এর tuition-এর সিঁড়িতে 😌",
            "Kurumbera 😂",
            "মনে নেই 🙄"
        ]
    },
    11: {
        type: "choice",
        text: "আচ্ছা বল তো… 👀\nআমার সাথে দেখা করার জন্য তুই কখন সবচেয়ে বেশি excited থাকিস?",
        options: [
            "যখন অনেকদিন দেখা হয়নি 🥹",
            "হঠাৎ দেখা হয়ে গেলে 🤭",
            "আগে থেকে plan করা থাকলে 😌",
            "আমি তো excited হই না 😑😂",
            "জানি না 🙄"
        ]
    },
    12: {
        type: "choice",
        text: "আচ্ছা বল তো… 👀\nআমি তোকে সবচেয়ে বেশি কী বলে ডাকলে তোর ভালো লাগে?",
        options: [
            "Baby 🥹",
            "Sona ❤️",
            "Kutti 😂",
            "Mampi 🤭",
            "Other 😌"
        ]
    },
    13: {
        type: "choice",
        text: "আচ্ছা বল তো… 👀\nআমি যখন তোকে ‘Baby’ বা ‘Sona’ বলে ডাকি, তখন তোর মনে মনে কী হয়?",
        options: [
            "ভালো লাগে 🥹❤️",
            "লজ্জা লাগে 🤭",
            "হাসি পায় 😂",
            "কিছুই হয় না 😑",
            "জানি ঢং করছিস 😏"
        ]
    },
    14: {
        type: "choice",
        text: "আচ্ছা বল তো… 👀\nআমি যখন বলি ‘তুই তো আমাকে একদম miss করিস না’—তখন সত্যি সত্যি তুই কী ভাবিস?",
        options: [
            "কে বলেছে miss করি না? 🥺",
            "হ্যাঁ, করি তো… ❤️",
            "একদমই করি না 😌",
            "চুপ কর, বেশি কথা বলিস না! 😂",
            "জানি ঢং করছিস 🙄"
        ]
    },
    15: {
        type: "choice",
        text: "আচ্ছা বল তো… 👀\nআমি যদি হঠাৎ একদিন তোকে বলি—‘চল, আজকে কোথাও ঘুরতে যাই’—তুই প্রথমে কী বলবি?",
        options: [
            "চল! 😍",
            "কোথায় যাবি? 👀",
            "আগে বাড়িতে বলে নিই 😭",
            "আজকে পারব না 😑",
            "তুই আগে ঠিক কর কোথায় যাবি 😂"
        ]
    },
    16: {
        type: "choice",
        text: "আচ্ছা বল তো… 👀\nআমরা যদি একদিন পুরো একটা দিন একসাথে কাটাতে পারি, তাহলে প্রথমে কী করতে চাইবি?",
        options: [
            "অনেকক্ষণ গল্প করব 🥹",
            "কোথাও ঘুরতে যাব 🌍",
            "একসাথে খেতে যাব 🍗",
            "শুধু একসাথে বসে থাকব 😌",
            "আগে তুই ঠিক কর 😂"
        ]
    },
    17: {
        type: "choice",
        text: "আচ্ছা একটা serious প্রশ্ন করি… 👀\nতুই যদি আমার সাথে একদিন কোথাও ঘুরতে যাস, কোন জায়গাটা choose করবি?",
        options: [
            "পাহাড় 🏔️",
            "সমুদ্র 🌊",
            "জঙ্গল 🌳",
            "কোনো সুন্দর শহর 🌆",
            "যেখানে তুই নিয়ে যাবি 😌❤️"
        ]
    },
    18: {
        type: "choice",
        text: "আচ্ছা বল তো… 👀\nআমি যদি তোকে একদিন নিজের হাতে কিছু রান্না করে খাওয়াই, তুই কী খেতে চাইবি?",
        options: [
            "Mutton 🍖",
            "Chicken 🍗",
            "Biriyani 🍚",
            "যা বানাবি তাই খাব 😌❤️",
            "আগে দেখি তুই রান্না করতে পারিস কিনা! 😂"
        ]
    },
    19: {
        type: "choice",
        text: "আচ্ছা বল তো… 👀\nআমি যদি তোকে হঠাৎ একটা gift দিই, তুই কী চাইবি?",
        options: [
            "ফুল 🌹",
            "Teddy 🧸",
            "Chocolate 🍫",
            "এমন কিছু, যেটা দেখে আমাকে মনে পড়বে ❤️",
            "কিছুই চাই না 😌"
        ]
    },
    20: {
        type: "choice",
        text: "আচ্ছা বল তো… 👀\nতোর কি option লাগবে?",
        options: [
            "YES",
            "NO"
        ]
    },
    21: {
        type: "text",
        text: "আচ্ছা… এবার কোনো option নেই 👀\nনিজের মতো করে বল তো—\nআমার সাথে কাটানো কোন মুহূর্তটা তোর সবচেয়ে বেশি মনে পড়ে?"
    },
    22: {
        type: "photo",
        text: "এবার একটা কাজ কর… 👀\nআমাদের সবচেয়ে সুন্দর একটা memory-এর ছবি upload কর ❤️"
    },
    23: {
        type: "photo",
        text: "আচ্ছা… এবার এমন একটা ছবি দে, কোনটা দেখলেই আমাদের কথা মনে পড়ে 🤭❤️"
    },
    24: {
        type: "photo",
        text: "এবার আমাদের দুজনের সবচেয়ে funny memory-এর একটা ছবি দে 😂"
    },
    25: {
        type: "photo",
        text: "শেষবার… 👀\nতোর favourite picture of us—ওই ছবিটা upload কর ❤️"
    },
    26: {
        type: "photo",
        text: "আচ্ছা… এবার দেখি তোর মনে আছে কিনা 👀\nআমাদের দুজনের প্রথম ছবিটা upload কর তো ❤️"
    },
    27: {
        type: "photo",
        text: "আর এবার… 👀\nআমরা দুজন মিলে সবশেষ যে ছবিটা তুলেছিলাম, সেই ছবিটা upload কর ❤️"
    },
    28: {
        type: "photo",
        text: "আচ্ছা… এবার তোর favourite ছবিটা upload কর তো 👀❤️"
    },
    29: {
        type: "text",
        text: "আচ্ছা… এবার মন দিয়ে একটা কথা বল তো 👀\nআমাকে তুই কী কী সারাজীবন মনে রাখাতে চাস?"
    },
    30: {
        type: "text",
        text: "আচ্ছা বল তো… 👀\nআমার কোন behaviour-টা তোর সবচেয়ে বেশি পছন্দ?"
    }
};

const steps = [
    { type: "question", number: 1 },
    { type: "question", number: 2 },
    { type: "question", number: 3 },
    { type: "question", number: 4 },
    { type: "question", number: 5 },
    { type: "question", number: 6 },
    { type: "question", number: 7 },
    { type: "question", number: 8 },
    { type: "question", number: 9 },
    { type: "question", number: 10 },
    { type: "poem1Intro" },
    { type: "question", number: 11 },
    { type: "question", number: 12 },
    { type: "question", number: 13 },
    { type: "question", number: 14 },
    { type: "question", number: 15 },
    { type: "question", number: 16 },
    { type: "question", number: 17 },
    { type: "poem2Intro" },
    { type: "question", number: 18 },
    { type: "question", number: 19 },
    { type: "question", number: 20 },
    { type: "question", number: 21 },
    { type: "question", number: 22 },
    { type: "question", number: 23 },
    { type: "question", number: 24 },
    { type: "question", number: 25 },
    { type: "question", number: 26 },
    { type: "poem3Intro" },
    { type: "poemReaction" },
    { type: "question", number: 27 },
    { type: "question", number: 28 },
    { type: "question", number: 29 },
    { type: "question", number: 30 },
    { type: "final" }
];

const poem1 = [
    "কিছু মানুষ", "জীবনে আসে,", "আর আস্তে আস্তে", "জীবনেরই একটা অংশ হয়ে যায়।", "",
    "তুইও ঠিক তেমনই।", "", "কখন যে", "এতটা আপন হয়ে গেলি,", "কখন যে",
    "তোর সাথে কাটানো মুহূর্তগুলো", "এতটা special হয়ে গেল—", "জানি না।", "",
    "কত হাসি,", "কত কথা,", "কত ঝগড়া,", "কত অভিমান…", "",
    "সবকিছু মিলিয়েই", "তোকে নিয়ে", "একটা আলাদা গল্প হয়ে গেছে।", "",
    "সময় হয়তো বদলাবে,", "আমরাও হয়তো বদলে যাব…", "",
    "কিন্তু কিছু মানুষকে", "সময় দিয়ে মাপা যায় না।", "",
    "কিছু স্মৃতি", "পুরোনো হয় না।", "",
    "আর কিছু মানুষ…", "", "দূরে থাকলেও", "মনের খুব কাছেই থেকে যায়।", "",
    "তুই তেমনই একজন। ❤️"
];

const poem2 = [
    "তোকে নিয়ে", "অনেক কথা বলা যায়…", "", "কিন্তু সব কথা", "কি আর বলা যায়?", "",
    "কিছু সম্পর্ক", "কোনো নাম চায় না,", "কোনো সংজ্ঞাও চায় না।", "",
    "শুধু চায়—", "মানুষটা থেকে যাক।", "", "তোর সাথে কাটানো", "ছোট ছোট মুহূর্তগুলো",
    "হয়তো তোর কাছে", "সাধারণ…", "", "কিন্তু আমার কাছে", "সেগুলোই", "অনেক বড় স্মৃতি।", "",
    "একসাথে হাসা,", "অকারণে ঝগড়া,", "রাগ,", "অভিমান,", "আবার ঠিক হয়ে যাওয়া—", "",
    "সবকিছু মিলিয়েই", "তুই।", "", "হয়তো সবসময়", "কথা হবে না,", "",
    "হয়তো প্রতিদিন", "দেখাও হবে না,", "", "তবুও—", "",
    "কোনো একদিন", "পুরোনো স্মৃতিগুলো খুললে", "তোকে ঠিকই খুঁজে পাব।", "",
    "কারণ কিছু মানুষকে", "ভোলা যায় না…", "", "শুধু সময়ের সাথে", "তাদের আরও গভীরভাবে", "মনে রাখা যায়। ❤️"
];

const poem3 = [
    "সব মানুষ", "মনে থাকে না।", "", "কেউ কেউ আসে,", "কিছুদিন থাকে,", "তারপর হারিয়ে যায়।", "",
    "কিন্তু কিছু মানুষ", "থেকে যায়…", "", "কথার মধ্যে,", "স্মৃতির মধ্যে,", "হাসির মধ্যে,", "অভিমানের মধ্যেও।", "",
    "তুইও", "তেমনই একজন।", "", "হয়তো সময় বদলাবে,", "দূরত্ব বাড়বে,", "", "তবুও—", "",
    "কিছু জায়গা", "কখনও খালি হয় না।", "", "কিছু মানুষ", "কখনও পুরোনো হয় না।", "",
    "আর তুই…", "", "আমার গল্পের", "সেই মানুষটা। ❤️"
];

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
        const parsed = JSON.parse(saved);
        state = { ...state, ...parsed };
    } catch (error) {
        console.error("Could not load saved progress:", error);
    }
}

function clearAnimationTimeouts() {
    if (currentPoemTimeout) {
        clearTimeout(currentPoemTimeout);
        currentPoemTimeout = null;
    }
}

function showWelcomeScreen() {
    welcomeScreen.classList.add("active");
    questionScreen.classList.remove("active");
    finalScreen.classList.remove("active");
}

function showQuestionScreen() {
    welcomeScreen.classList.remove("active");
    questionScreen.classList.add("active");
    finalScreen.classList.remove("active");
}

/* FINAL SCREEN WITH SUBMIT BUTTON TO BACKEND */
function showFinalScreen() {
    welcomeScreen.classList.remove("active");
    questionScreen.classList.remove("active");
    finalScreen.classList.add("active");

    questionText.textContent = "";
    answersContainer.innerHTML = "";

    finalScreen.innerHTML = `
        <div class="final-card">
            <h1>Thank You, Goru ❤️</h1>
            <p>এতগুলো প্রশ্নের উত্তর দেওয়ার জন্য।</p>
            <p>তুই যে উত্তরগুলো দিলি, সেগুলো এবার পাঠানোর জন্য নিচের বাটনে ক্লিক কর। ❤️</p>
            
            <button id="submit-all-btn" class="answer-btn" style="margin-top:20px; background:#ff4081; color:#fff; font-weight:bold;">
                Submit All Answers ❤️
            </button>
            <p id="submit-status" style="margin-top:10px; color:#ff9fc9;"></p>

            <div id="final-notes" style="display:none; margin-top:20px;">
                <p>ভালো করে পড়াশোনা কর। 📚</p>
                <p>নিজের জীবনটা নিজের মতো করে সাজা। 🌸</p>
                <p>আর হ্যাঁ…</p>
                <p><strong>নিজের যত্ন নিস, কচি। ❤️</strong></p>
                <p>— Anirban 🤍</p>
            </div>
        </div>
    `;

    document.getElementById("submit-all-btn").addEventListener("click", function () {
        const submitBtn = document.getElementById("submit-all-btn");
        const statusText = document.getElementById("submit-status");
        
        submitBtn.disabled = true;
        statusText.textContent = "অপেক্ষা কর, সব উত্তর পাঠানো হচ্ছে… ⏳";

        fetch("/api/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(state)
        })
        .then(response => response.json())
        .then(data => {
            statusText.textContent = "সব উত্তর সাফল্যের সাথে জমা হয়ে গেছে! ❤️";
            submitBtn.style.display = "none";
            document.getElementById("final-notes").style.display = "block";
        })
        .catch(error => {
            console.error("Submission Error:", error);
            statusText.textContent = "পাঠাতে সমস্যা হয়েছে! নেটওয়ার্ক চেক করে আবার চেষ্টা কর।";
            submitBtn.disabled = false;
        });
    });
}

function setQuestionText(text) {
    questionText.innerHTML = "";
    const lines = String(text).split("\n");
    lines.forEach(function (line) {
        const div = document.createElement("div");
        if (line.trim() === "") {
            div.style.height = "12px";
        } else {
            div.textContent = line;
        }
        questionText.appendChild(div);
    });
}

function clearQuestionArea() {
    clearAnimationTimeouts();
    answersContainer.innerHTML = "";
    questionText.innerHTML = "";
    questionText.style.minHeight = "";
}

function showInputWarning(message) {
    const oldWarnings = answersContainer.querySelectorAll(".input-warning");
    oldWarnings.forEach(w => w.remove());

    const warning = document.createElement("p");
    warning.className = "input-warning";
    warning.textContent = message;
    warning.style.marginTop = "15px";
    warning.style.color = "#ff9fc9";
    warning.style.fontSize = "17px";
    warning.style.fontWeight = "600";
    answersContainer.appendChild(warning);
}

function createNavigation(getHasAnswer) {
    const navigation = document.createElement("div");
    navigation.className = "navigation";
    navigation.style.display = "flex";
    navigation.style.flexDirection = "column";
    navigation.style.gap = "10px";
    navigation.style.marginTop = "20px";

    const nextButton = document.createElement("button");
    nextButton.className = "answer-btn";
    nextButton.textContent = "Next ❤️";

    nextButton.addEventListener("click", function () {
        if (!getHasAnswer()) {
            showInputWarning("আগে answer দে তো 😒❤️");
            return;
        }
        nextStep();
    });

    const previousButton = document.createElement("button");
    previousButton.className = "answer-btn";
    previousButton.textContent = "← Previous";
    previousButton.addEventListener("click", () => previousStep());

    navigation.appendChild(nextButton);
    navigation.appendChild(previousButton);
    answersContainer.appendChild(navigation);
}

function renderChoiceQuestion(number) {
    const question = questions[number];
    clearQuestionArea();
    setQuestionText(question.text);

    question.options.forEach(function (option, index) {
        const button = document.createElement("button");
        button.className = "answer-btn choice-opt-btn";
        button.textContent = option;

        if (state.answers[number] === option) {
            button.style.background = "#ff69b4";
            button.style.color = "#ffffff";
            button.style.borderColor = "#ff9fc9";
            button.style.boxShadow = "0 0 12px rgba(255, 105, 180, 0.6)";
        }

        button.addEventListener("click", function () {
            state.answers[number] = option;
            saveState();

            const allChoiceButtons = answersContainer.querySelectorAll(".choice-opt-btn");
            allChoiceButtons.forEach(btn => {
                btn.style.background = "";
                btn.style.color = "";
                btn.style.borderColor = "";
                btn.style.boxShadow = "";
            });

            button.style.background = "#ff69b4";
            button.style.color = "#ffffff";
            button.style.borderColor = "#ff9fc9";
            button.style.boxShadow = "0 0 12px rgba(255, 105, 180, 0.6)";

            handleChoiceReaction(number, option, index);
        });

        answersContainer.appendChild(button);
    });

    if (state.answers[number]) {
        handleChoiceReaction(number, state.answers[number], question.options.indexOf(state.answers[number]));
    }

    createNavigation(() => Boolean(state.answers[number]));
}

function renderTextQuestion(number) {
    const question = questions[number];
    clearQuestionArea();
    setQuestionText(question.text);

    const textarea = document.createElement("textarea");
    textarea.className = "text-answer";
    textarea.placeholder = "নিজের মতো করে লিখ...";
    textarea.value = state.textAnswers[number] || "";
    textarea.style.width = "100%";
    textarea.style.minHeight = "180px";
    textarea.style.padding = "16px";
    textarea.style.marginTop = "10px";
    textarea.style.borderRadius = "15px";
    textarea.style.border = "1px solid rgba(255,255,255,0.2)";
    textarea.style.background = "rgba(255,255,255,0.08)";
    textarea.style.color = "white";
    textarea.style.fontSize = "17px";
    textarea.style.lineHeight = "1.6";
    textarea.style.resize = "vertical";

    textarea.addEventListener("input", function () {
        state.textAnswers[number] = textarea.value;
        saveState();
    });

    answersContainer.appendChild(textarea);
    createNavigation(() => textarea.value.trim().length > 0);
}

function renderPhotoQuestion(number) {
    const question = questions[number];
    clearQuestionArea();
    setQuestionText(question.text);

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";

    const uploadButton = document.createElement("button");
    uploadButton.className = "answer-btn";
    uploadButton.textContent = state.photos[number] ? "Change Photo 📷" : "Choose Photo 📷";

    const preview = document.createElement("img");
    preview.style.display = state.photos[number] ? "block" : "none";
    preview.style.maxWidth = "100%";
    preview.style.maxHeight = "300px";
    preview.style.marginTop = "18px";
    preview.style.borderRadius = "15px";
    preview.style.objectFit = "contain";

    if (state.photos[number]) {
        preview.src = state.photos[number];
    }

    uploadButton.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (event) {
            state.photos[number] = event.target.result;
            preview.src = event.target.result;
            preview.style.display = "block";
            uploadButton.textContent = "Change Photo 📷";
            saveState();
        };
        reader.readAsDataURL(file);
    });

    answersContainer.appendChild(uploadButton);
    answersContainer.appendChild(fileInput);
    answersContainer.appendChild(preview);

    createNavigation(() => Boolean(state.photos[number]));
}

function renderQuestion(number) {
    showQuestionScreen();
    if (questionNumber) questionNumber.textContent = number;

    const question = questions[number];
    if (!question) return;

    if (question.type === "choice") renderChoiceQuestion(number);
    else if (question.type === "text") renderTextQuestion(number);
    else if (question.type === "photo") renderPhotoQuestion(number);
}

function handleChoiceReaction(number, option, index) {
    let reaction = null;

    if (number === 1) {
        if (index === 0) reaction = "হুম… সেটাও একটা কারণ হতে পারে! 😂";
        else if (index === 1) reaction = "এই তো! নিজের কথাই নিজে বলে দিলি! 😂";
        else if (index === 2) reaction = "সন্দেহটা কিন্তু একদম ভুল না… 👀❤️";
        else if (index === 3) reaction = "আবার তোর সেই favourite dialogue! 🙄😂";
    } else if (number === 2) reaction = "আচ্ছা… মনে রাখলাম 👀❤️";
    else if (number === 3) reaction = "হুমম… এবার বুঝলাম 👀❤️";
    else if (number === 4) { showYearInput(); return; }
    else if (number === 5) reaction = "YESSS! 😌❤️ This is my favourite.";
    else if (number === 6) {
        reaction = (index === 4) ? "তোর কি মনে আছে এটা মনে রাখতে পারিস না, Chagol! 😭😂" : "আসলে আমি নিজেও answer জানতাম না 🤭😂";
    } else if (number === 7) {
        reaction = (index === 0) ? "Wahhh! 😌❤️ দুজনের same!" : "আমার তো School… কারণ তুই আমার crush ছিলি ❤️";
    } else if (number === 8) reaction = "তুই শালা ভীতু, তার জন্য আস্তে কথা বলিস! 😂";
    else if (number === 9) reaction = "আচ্ছা বুঝজ্জা… এই ব্যাপার 👀😏";
    else if (number === 10) {
        if (index === 1) {
            state.q11BCount++;
            reaction = (state.q11BCount === 1) ? "❌ Wrong Answer! 😂" : (state.q11BCount === 2) ? "❌ Wrong Answer! Try Again! 🤭" : "আরে কচি, মজা করছি 🤭😂";
        } else {
            reaction = "ছি! তুই ভুলে গেলি! 😭 ছি ছি, আমি ভাবতেই পারিনি 🤣";
        }
    } else if (number === 11) reaction = "তাহলে কবে হবে দেখা সোনা? 🥺\nআমি তো থাকতে পারছি না…\nছোট খোকা অনেক miss করছে তোমায় 🤭❤️";
    else if (number === 12) {
        if (index >= 0 && index <= 3) reaction = "ওহ্, তোর এটা ভালো লাগে? 👀\nতাহলে আর ডাকব না! 😂";
        else {
            clearQuestionArea();
            setQuestionText("কি বলে ডাকব তাহলে? 👀");
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "নিজের মতো করে লিখ...";
            input.style.width = "100%";
            input.style.padding = "15px";
            input.style.marginTop = "15px";
            input.style.borderRadius = "12px";
            input.style.border = "1px solid rgba(255,255,255,0.2)";
            input.style.background = "rgba(255,255,255,0.08)";
            input.style.color = "white";
            input.style.fontSize = "17px";
            input.value = state.textAnswers[12] || "";

            input.addEventListener("input", function () {
                state.textAnswers[12] = input.value;
                saveState();
            });

            answersContainer.appendChild(input);
            createNavigation(() => input.value.trim().length > 0);
            return;
        }
    } else if (number === 13) {
        if (index === 4) reaction = "সবসময় তুমি যেটা ভাবো সত্যি হয় না, Goru ❤️";
    } else if (number === 14) {
        reaction = (index === 0 || index === 1) ? "Okay sona ❤️" : "চুপ, মাথা মোটা! Miss তো কি তোর বাপও করবে আমায়? 😂❤️";
    } else if (number === 15) {
        if (index === 0 || index === 1) {
            clearQuestionArea();
            setQuestionText(index === 0 ? "কোথায় যাবি? 👀" : "তুই বল 😏");
            createCustomTextInput(15, () => index === 0 ? "কোথায় যাবি? 👀" : "তুই বল 😏");
            return;
        }
        reaction = "তুই কি পারিস? 😂";
    } else if (number === 16) {
        reaction = "তুই যা choice করিস না কেন… সে দিনটা তোর memorable করে দিবো ❤️🤭";
    } else if (number === 17) {
        if (index === 4) {
            clearQuestionArea();
            setQuestionText("আমি তোকে আমার পছন্দের জায়গায় নিয়ে যাব 😌❤️\nতুই বল, তোর কোথাও যাওয়ার ইচ্ছে আছে?");
            createCustomTextInput(17, () => "তোর কোথাও যাওয়ার ইচ্ছে আছে?", function () {
                nextStep();
            });
            return;
        }
    } else if (number === 18) {
        if (index === 4) reaction = "বেশি রাগাস না 🤭 ডিম সিদ্ধ করে খাওয়াইয়ে দিবো… আমিও রান্না করতে জানি, তোর মতো নুন বেশি দিই না! 😂❤️";
    } else if (number === 19) {
        reaction = (index === 3) ? "Okay sona, আমি try করবো ❤️🤭" : (index === 4) ? "চুপচাপ option choice কর! 😂" : null;
    } else if (number === 20) {
        reaction = (index === 0) ? "তোর লজ্জা নাই, ফুট মাথা মোটা! কোনো option নাই, পালা! 😂" : "Good Girl ❤️";
    }

    if (reaction) showReaction(reaction);
}

function showReaction(reaction) {
    const oldReaction = answersContainer.querySelector(".reaction-message");
    if (oldReaction) oldReaction.remove();

    const reactionElement = document.createElement("p");
    reactionElement.className = "reaction-message";
    reactionElement.textContent = reaction;
    reactionElement.style.marginTop = "18px";
    reactionElement.style.color = "#ff9fc9";
    reactionElement.style.fontSize = "18px";
    reactionElement.style.fontWeight = "600";
    reactionElement.style.lineHeight = "1.6";
    answersContainer.appendChild(reactionElement);
}

function createCustomTextInput(number, placeholderFunction, onContinue) {
    const input = document.createElement("textarea");
    input.placeholder = placeholderFunction();
    input.style.width = "100%";
    input.style.minHeight = "140px";
    input.style.padding = "15px";
    input.style.marginTop = "15px";
    input.style.borderRadius = "15px";
    input.style.border = "1px solid rgba(255,255,255,0.2)";
    input.style.background = "rgba(255,255,255,0.08)";
    input.style.color = "white";
    input.style.fontSize = "17px";
    input.style.lineHeight = "1.6";
    input.style.resize = "vertical";

    input.value = state.textAnswers[number] || "";
    input.addEventListener("input", function () {
        state.textAnswers[number] = input.value;
        saveState();
    });

    answersContainer.appendChild(input);

    const navigation = document.createElement("div");
    navigation.style.display = "flex";
    navigation.style.flexDirection = "column";
    navigation.style.gap = "10px";
    navigation.style.marginTop = "20px";

    const nextButton = document.createElement("button");
    nextButton.className = "answer-btn";
    nextButton.textContent = "Next ❤️";

    nextButton.addEventListener("click", function () {
        if (!input.value.trim()) {
            showInputWarning("আগে answer দে তো 😒❤️");
            return;
        }
        if (typeof onContinue === "function") onContinue();
        else nextStep();
    });

    const previousButton = document.createElement("button");
    previousButton.className = "answer-btn";
    previousButton.textContent = "← Previous";
    previousButton.addEventListener("click", () => previousStep());

    navigation.appendChild(nextButton);
    navigation.appendChild(previousButton);
    answersContainer.appendChild(navigation);
}

function showYearInput() {
    clearQuestionArea();
    setQuestionText("আচ্ছা… তাহলে বল তো, কোন year? 👀");

    const input = document.createElement("input");
    input.type = "text";
    input.inputMode = "numeric";
    input.placeholder = "Year লিখ...";
    input.value = state.yearAnswer || "";
    input.style.width = "100%";
    input.style.padding = "15px";
    input.style.marginTop = "15px";
    input.style.borderRadius = "12px";
    input.style.border = "1px solid rgba(255,255,255,0.2)";
    input.style.background = "rgba(255,255,255,0.08)";
    input.style.color = "white";
    input.style.fontSize = "18px";

    input.addEventListener("input", function () {
        state.yearAnswer = input.value;
        saveState();
    });

    answersContainer.appendChild(input);

    const submitButton = document.createElement("button");
    submitButton.className = "answer-btn";
    submitButton.textContent = "Submit ❤️";
    submitButton.style.marginTop = "15px";

    submitButton.addEventListener("click", function () {
        const year = input.value.trim();
        if (!year) {
            showInputWarning("আগে year লিখ তো 😒❤️");
            return;
        }

        let reaction = (year === "2018" || year === "2019") ? "Good mone ache to taile" : "Chi chi, Wrong answer 😡!";

        clearQuestionArea();
        setQuestionText(reaction);

        const nextButton = document.createElement("button");
        nextButton.className = "answer-btn";
        nextButton.textContent = "Next ❤️";
        nextButton.style.marginTop = "25px";
        nextButton.addEventListener("click", () => nextStep());

        const previousButton = document.createElement("button");
        previousButton.className = "answer-btn";
        previousButton.textContent = "← Previous";
        previousButton.style.marginTop = "10px";
        previousButton.addEventListener("click", () => previousStep());

        answersContainer.appendChild(nextButton);
        answersContainer.appendChild(previousButton);
    });

    answersContainer.appendChild(submitButton);

    const previousButton = document.createElement("button");
    previousButton.className = "answer-btn";
    previousButton.textContent = "← Previous";
    previousButton.style.marginTop = "10px";
    previousButton.addEventListener("click", () => previousStep());
    answersContainer.appendChild(previousButton);
}

function renderPoem1Intro() {
    clearQuestionArea();
    setQuestionText("Wait wait… একটু rest নে… ❤️\n\nঅনেক কষ্ট করে এতগুলো question-এর answer দিয়েছিস। ❤️\n\nআমি একটা কবিতা লিখেছি… শুনবি? ❤️");

    const yesButton = document.createElement("button");
    yesButton.className = "answer-btn";
    yesButton.textContent = "হ্যাঁ, শুনব ❤️";
    yesButton.addEventListener("click", () => renderPoemTitle(1));

    const noButton = document.createElement("button");
    noButton.className = "answer-btn";
    noButton.textContent = "না 😑";
    noButton.addEventListener("click", function () {
        clearQuestionArea();
        setQuestionText("চুপচাপ কবিতা শুন। অনেক কষ্ট করে লিখেছি, তুই শুনবি না কি তোর বাপ শুনবে? 😂");

        const button = document.createElement("button");
        button.className = "answer-btn";
        button.textContent = "ঠিক আছে, কবিতা শুনি ❤️";
        button.style.marginTop = "20px";
        button.addEventListener("click", () => renderPoemTitle(1));
        answersContainer.appendChild(button);
    });

    answersContainer.appendChild(yesButton);
    answersContainer.appendChild(noButton);

    const previousButton = document.createElement("button");
    previousButton.className = "answer-btn";
    previousButton.textContent = "← Previous";
    previousButton.style.marginTop = "10px";
    previousButton.addEventListener("click", () => previousStep());
    answersContainer.appendChild(previousButton);
}

function renderPoem2Intro() {
    clearQuestionArea();
    setQuestionText("আবার একটু থাম… ❤️\n\nএতক্ষণে নিশ্চয়ই বুঝে গেছিস—\nএই কবিতা কিন্তু এখানেই শেষ হয়নি।\n\nআরেকটা পার্ট বাকি আছে…");

    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = "পরের পার্টটা শুনি ❤️";
    button.style.marginTop = "25px";
    button.addEventListener("click", () => renderPoemTitle(2));

    const previousButton = document.createElement("button");
    previousButton.className = "answer-btn";
    previousButton.textContent = "← Previous";
    previousButton.style.marginTop = "10px";
    previousButton.addEventListener("click", () => previousStep());

    answersContainer.appendChild(button);
    answersContainer.appendChild(previousButton);
}

function renderPoem3Intro() {
    clearQuestionArea();
    setQuestionText("আবার থাম… ❤️\n\nএবার কিন্তু সত্যিই শেষের দিকে চলে এসেছি।\n\nএতক্ষণে নিশ্চয়ই বুঝে গেছিস—\nশেষ কবিতাটুকুও এখনও বাকি…");

    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = "শেষ কবিতাটা পড়ি ❤️";
    button.style.marginTop = "25px";
    button.addEventListener("click", () => renderPoemTitle(3));

    const previousButton = document.createElement("button");
    previousButton.className = "answer-btn";
    previousButton.textContent = "← Previous";
    previousButton.style.marginTop = "10px";
    previousButton.addEventListener("click", () => previousStep());

    answersContainer.appendChild(button);
    answersContainer.appendChild(previousButton);
}

function renderPoemTitle(poemNum) {
    clearQuestionArea();
    setQuestionText("“তুই”\n\nকবি — Anirban 🤍");

    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = "কবিতা শুরু হোক ❤️";
    button.style.marginTop = "25px";
    button.addEventListener("click", function () {
        if (poemNum === 1) renderPoem(poem1, 1);
        else if (poemNum === 2) renderPoem(poem2, 2);
        else renderPoem(poem3, 3);
    });

    const previousButton = document.createElement("button");
    previousButton.className = "answer-btn";
    previousButton.textContent = "← Previous";
    previousButton.style.marginTop = "10px";
    previousButton.addEventListener("click", () => previousStep());

    answersContainer.appendChild(button);
    answersContainer.appendChild(previousButton);
}

function renderPoem(poem, poemNumber) {
    clearQuestionArea();
    setQuestionText("");

    const poemBox = document.createElement("div");
    poemBox.className = "poem-box";
    poemBox.style.width = "100%";
    poemBox.style.maxHeight = "55vh";
    poemBox.style.overflowY = "auto";
    poemBox.style.display = "flex";
    poemBox.style.flexDirection = "column";
    poemBox.style.gap = "10px";
    poemBox.style.padding = "15px 10px";
    poemBox.style.scrollBehavior = "smooth";

    answersContainer.appendChild(poemBox);

    const skipButton = document.createElement("button");
    skipButton.className = "answer-btn";
    skipButton.textContent = "Skip Poem ⏭️";
    skipButton.style.marginTop = "15px";
    skipButton.style.background = "rgba(255, 255, 255, 0.15)";
    skipButton.addEventListener("click", function () {
        clearAnimationTimeouts();
        nextStep();
    });
    answersContainer.appendChild(skipButton);

    let index = 0;
    function addNextLine() {
        if (index >= poem.length) {
            currentPoemTimeout = setTimeout(() => nextStep(), 1500);
            return;
        }

        const line = poem[index++];
        const lineElement = document.createElement("div");
        lineElement.textContent = line;
        lineElement.style.fontSize = "20px";
        lineElement.style.lineHeight = "1.8";
        lineElement.style.color = "#ffd6e7";
        lineElement.style.textAlign = "center";
        
        lineElement.style.opacity = "0";
        lineElement.style.transition = "opacity 1.2s ease-in-out";

        if (line === "") {
            lineElement.style.height = "14px";
        } else {
            lineElement.style.fontWeight = "500";
        }

        poemBox.appendChild(lineElement);

        setTimeout(() => {
            lineElement.style.opacity = "1";
        }, 50);

        setTimeout(() => { 
            poemBox.scrollTop = poemBox.scrollHeight; 
        }, 100);

        currentPoemTimeout = setTimeout(addNextLine, 1200);
    }

    addNextLine();
}

function renderPoemReaction() {
    clearQuestionArea();
    setQuestionText("কী রে… কবিতাটা পড়ে কেমন লাগল? 🥹❤️\nসত্যি করে বল তো—কবি কেঁদে ফেলেছে, নাকি তুই কেঁদে ফেলেছিস? 👀");

    const options = [
        "কবি কেঁদে ফেলেছে 🥹",
        "তুই কেঁদে ফেলেছিস 🥹",
        "দুজনেই কেঁদে ফেলেছে 😭❤️",
        "কেউই কাঁদেনি 😂"
    ];

    options.forEach(function (option) {
        const button = document.createElement("button");
        button.className = "answer-btn";
        button.textContent = option;

        button.addEventListener("click", function () {
            state.poemReactionAnswer = option;
            saveState();

            clearQuestionArea();
            setQuestionText("আচ্ছা… এবার নিজের মতো করে একটা কথা বল তো 👀\n\nকবিতাটা পড়ে তোর কি মনে হলো?\n\n(মন দিয়ে একটু বড় করে উত্তর দে, ছোট ছোট উত্তর কিন্তু চলবে না! 😒❤️)");

            const textarea = document.createElement("textarea");
            textarea.className = "text-answer";
            textarea.placeholder = "নিজের মতো করে একটু বড় করে লিখ...";
            textarea.value = state.poemReactionText || "";
            textarea.style.width = "100%";
            textarea.style.minHeight = "180px";
            textarea.style.padding = "16px";
            textarea.style.marginTop = "10px";
            textarea.style.borderRadius = "15px";
            textarea.style.border = "1px solid rgba(255,255,255,0.2)";
            textarea.style.background = "rgba(255,255,255,0.08)";
            textarea.style.color = "white";
            textarea.style.fontSize = "17px";
            textarea.style.lineHeight = "1.6";
            textarea.style.resize = "vertical";

            textarea.addEventListener("input", function () {
                state.poemReactionText = textarea.value;
                saveState();
            });

            answersContainer.appendChild(textarea);

            const navigation = document.createElement("div");
            navigation.style.display = "flex";
            navigation.style.flexDirection = "column";
            navigation.style.gap = "10px";
            navigation.style.marginTop = "20px";

            const nextButton = document.createElement("button");
            nextButton.className = "answer-btn";
            nextButton.textContent = "Next ❤️";

            nextButton.addEventListener("click", function () {
                if (!textarea.value.trim()) {
                    showInputWarning("আগে উত্তর দিয়ে যা 😒❤️");
                    return;
                }
                nextStep();
            });

            const previousButton = document.createElement("button");
            previousButton.className = "answer-btn";
            previousButton.textContent = "← Previous";
            previousButton.addEventListener("click", () => renderPoemReaction());

            navigation.appendChild(nextButton);
            navigation.appendChild(previousButton);
            answersContainer.appendChild(navigation);
        });

        answersContainer.appendChild(button);
    });

    const previousButton = document.createElement("button");
    previousButton.className = "answer-btn";
    previousButton.textContent = "← Previous";
    previousButton.style.marginTop = "10px";
    previousButton.addEventListener("click", () => previousStep());
    answersContainer.appendChild(previousButton);
}

function renderCurrentStep() {
    const step = steps[state.currentStep];
    if (!step) return;

    if (step.type === "question") renderQuestion(step.number);
    else if (step.type === "poem1Intro") renderPoem1Intro();
    else if (step.type === "poem2Intro") renderPoem2Intro();
    else if (step.type === "poem3Intro") renderPoem3Intro();
    else if (step.type === "poemReaction") renderPoemReaction();
    else if (step.type === "final") showFinalScreen();
}

function nextStep() {
    if (state.currentStep < steps.length - 1) {
        state.currentStep++;
        saveState();
        renderCurrentStep();
    } else {
        showFinalScreen();
    }
}

function previousStep() {
    if (state.currentStep > 0) {
        state.currentStep--;
        saveState();
        renderCurrentStep();
    }
}

startButton.addEventListener("click", function () {
    loadState();
    state.currentStep = Number(state.currentStep) || 0;
    saveState();
    renderCurrentStep();
});

loadState();

if (state.currentStep >= steps.length - 1) {
    showFinalScreen();
} else {
    showWelcomeScreen();
}
