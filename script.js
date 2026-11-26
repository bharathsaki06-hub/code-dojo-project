/* NAVIGATION */

const navButtons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

navButtons.forEach(button => {
    button.addEventListener("click", () => {
        showPage(button.dataset.page);
    });
});

function showPage(pageId) {
    pages.forEach(page => page.classList.remove("active"));
    navButtons.forEach(button => button.classList.remove("active"));

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    const selectedButton = document.querySelector(
        `.nav-btn[data-page="${pageId}"]`
    );

    if (selectedButton) {
        selectedButton.classList.add("active");
    }
}

function openWorkspace() {
    showPage("workspace");
}


/* =========================================
   CHALLENGE DATA
========================================= */

const problems = [
    {
        name: "Two Sum Variant",
        category: "Arrays",
        difficulty: "Easy",
        description: "Find two elements whose sum equals the target."
    },
    {
        name: "Reverse a String",
        category: "Strings",
        difficulty: "Easy",
        description: "Reverse the given string."
    },
    {
        name: "Binary Search",
        category: "Searching",
        difficulty: "Easy",
        description: "Find an element in a sorted array."
    },
    {
        name: "Maximum Subarray",
        category: "Arrays",
        difficulty: "Medium",
        description: "Find the maximum sum of a continuous subarray."
    },
    {
        name: "Fibonacci Number",
        category: "Dynamic Programming",
        difficulty: "Medium",
        description: "Find the nth Fibonacci number."
    },
    {
        name: "Valid Palindrome",
        category: "Strings",
        difficulty: "Easy",
        description: "Check whether a string reads the same forward and backward."
    },
    {
        name: "Merge Sorted Arrays",
        category: "Arrays",
        difficulty: "Medium",
        description: "Combine two sorted arrays into a sorted result."
    },
    {
        name: "Longest Common Subsequence",
        category: "Dynamic Programming",
        difficulty: "Hard",
        description: "Find the longest common subsequence of two strings."
    }
];


/* =========================================
   DISPLAY CHALLENGES
========================================= */

function displayProblems(problemData) {
    const problemList = document.getElementById("problemList");

    problemList.innerHTML = "";

    if (problemData.length === 0) {
        problemList.innerHTML = `
            <div class="empty-message">
                No problems found. Try another search.
            </div>
        `;
        return;
    }

    problemData.forEach(problem => {
        const card = document.createElement("div");
        card.className = "problem-card";

        const difficultyClass =
            problem.difficulty === "Easy" ? "green" : "purple";

        card.innerHTML = `
            <span class="tag ${difficultyClass}">
                ${problem.difficulty}
            </span>

            <h3>${problem.name}</h3>

            <p>${problem.description}</p>

            <div class="tags">
                <span class="tag gray">${problem.category}</span>
            </div>

            <button class="primary-btn">Solve Problem</button>
        `;

        card.querySelector("button").addEventListener("click", () => {
            openSelectedProblem(problem);
        });

        problemList.appendChild(card);
    });
}

displayProblems(problems);


/* OPEN SELECTED PROBLEM */

function openSelectedProblem(problem) {
    document.getElementById("workspaceTitle").textContent = problem.name;
    document.getElementById("workspaceDescription").textContent =
        problem.description;

    showPage("workspace");

    resetCode();
}


/* =========================================
   SEARCH AND FILTER
========================================= */

const searchProblem = document.getElementById("searchProblem");
const difficultyFilter = document.getElementById("difficultyFilter");
const categoryFilter = document.getElementById("categoryFilter");

function filterProblems() {
    const searchText = searchProblem.value.toLowerCase();
    const selectedDifficulty = difficultyFilter.value;
    const selectedCategory = categoryFilter.value;

    const filteredProblems = problems.filter(problem => {
        const matchesName =
            problem.name.toLowerCase().includes(searchText);

        const matchesDifficulty =
            selectedDifficulty === "all" ||
            problem.difficulty === selectedDifficulty;

        const matchesCategory =
            selectedCategory === "all" ||
            problem.category === selectedCategory;

        return matchesName && matchesDifficulty && matchesCategory;
    });

    displayProblems(filteredProblems);
}

searchProblem.addEventListener("input", filterProblems);
difficultyFilter.addEventListener("change", filterProblems);
categoryFilter.addEventListener("change", filterProblems);


/* =========================================
   CODE EDITOR
========================================= */

const codeEditor = document.getElementById("codeEditor");

const originalCode = `// Write your solution here

function twoSum(nums, target) {
    // Your code
}

console.log(twoSum([2, 7, 11, 15], 9));`;

function resetCode() {
    codeEditor.value = originalCode;

    document.getElementById("testResults").innerHTML = `
        <h3>Test Results</h3>
        <p>Run your code to see test results.</p>
    `;
}


/* =========================================
   RUN TESTS - FRONTEND DEMO
========================================= */

function runTests() {
    const results = document.getElementById("testResults");

    results.innerHTML = `
        <h3>Test Results</h3>

        <div class="test-case">
            <span>Test Case 1</span>
            <strong class="pass">✓ Passed</strong>
        </div>

        <div class="test-case">
            <span>Test Case 2</span>
            <strong class="pass">✓ Passed</strong>
        </div>

        <div class="test-case">
            <span>Test Case 3</span>
            <strong class="pass">✓ Passed</strong>
        </div>

        <div class="test-case">
            <span>Test Case 4</span>
            <strong class="pass">✓ Passed</strong>
        </div>

        <p class="pass" style="margin-top:12px">
            4 / 4 test cases passed!
        </p>

        <p style="margin-top:8px;font-size:12px">
            Demo results - no actual code execution.
        </p>
    `;
}


/* =========================================
   TEAM POINTS
========================================= */

let points = 850;
let solvedCount = 12;
let alreadySubmitted = false;
let currentTeamName = "Binary Beasts";

function submitCode() {
    if (alreadySubmitted) {
        openPopup("Already Submitted", `
            <p>You have already submitted this challenge.</p>
        `);
        return;
    }

    alreadySubmitted = true;

    points += 100;
    solvedCount += 1;

    document.getElementById("teamPoints").textContent = points;
    document.getElementById("solvedCount").textContent = solvedCount;
    document.getElementById("streakSolved").textContent = solvedCount;
    document.getElementById("teamPagePoints").textContent = points;

    updateLeaderboard();

    openPopup("Submission Successful 🎉", `
        <h3>Great work!</h3>
        <p>Your demo submission was recorded.</p>
        <p><strong>+100 team points</strong></p>
        <p>Total points: ${points}</p>
        <p>Problems solved: ${solvedCount}</p>
    `);
}


/* =========================================
   LEADERBOARD
========================================= */

let teams = [
    {
        name: "Binary Beasts",
        solved: 24,
        points: 2450
    },
    {
        name: "Code Crushers",
        solved: 21,
        points: 2190
    },
    {
        name: "Bug Hunters",
        solved: 18,
        points: 1850
    },
    {
        name: "Syntax Squad",
        solved: 15,
        points: 1620
    },
    {
        name: "Loop Legends",
        solved: 11,
        points: 1200
    }
];

function updateLeaderboard() {
    const myTeam = teams.find(
        team => team.name === "Binary Beasts"
    );

    if (myTeam) {
        myTeam.points = points + 1600;
        myTeam.solved = 24 + (solvedCount - 12);
    }

    teams.sort((a, b) => b.points - a.points);

    const leaderboardBody = document.getElementById("leaderboardBody");

    leaderboardBody.innerHTML = "";

    teams.forEach((team, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${team.name}</td>
            <td>${team.solved}</td>
            <td>${team.points} XP</td>
        `;

        leaderboardBody.appendChild(row);
    });

    const rank = teams.findIndex(
        team => team.name === "Binary Beasts"
    ) + 1;

    document.getElementById("teamRank").textContent = "#" + rank;
}

updateLeaderboard();


/* =========================================
   POPUP SYSTEM
========================================= */

function openPopup(title, content) {
    let popup = document.getElementById("customPopup");

    if (!popup) {
        popup = document.createElement("div");
        popup.id = "customPopup";
        popup.className = "popup-overlay";
        document.body.appendChild(popup);
    }

    popup.innerHTML = `
        <div class="popup-box">
            <button class="popup-close" onclick="closePopup()">✕</button>
            <h2>${title}</h2>
            <div class="popup-content">
                ${content}
            </div>
        </div>
    `;

    popup.style.display = "flex";

    popup.onclick = function(event) {
        if (event.target === popup) {
            closePopup();
        }
    };
}

function closePopup() {
    const popup = document.getElementById("customPopup");

    if (popup) {
        popup.style.display = "none";
    }
}


/* =========================================
   CREATE TEAM
========================================= */

function createTeam() {
    openPopup("Create Your Team", `
        <p>Enter a name for your new team.</p>

        <input
            type="text"
            id="newTeamName"
            placeholder="Enter team name"
        >

        <button class="primary-btn" onclick="confirmCreateTeam()">
            Create Team
        </button>
    `);
}

function confirmCreateTeam() {
    const input = document.getElementById("newTeamName");
    const teamName = input.value.trim();

    if (teamName === "") {
        openPopup("Team Name Required", `
            <p>Please enter a team name before continuing.</p>
            <button class="primary-btn" onclick="createTeam()">
                Try Again
            </button>
        `);
        return;
    }

    currentTeamName = teamName;

    document.getElementById("teamPageName").textContent = teamName;
    document.getElementById("dashboardTeamName").textContent = teamName;

    openPopup("Team Created 🎉", `
        <p>Your team <strong>${teamName}</strong> has been created successfully in this demo.</p>
        <p>You can now start practising coding challenges.</p>
    `);
}


/* =========================================
   JOIN TEAM
========================================= */

function joinTeam() {
    openPopup("Join a Team", `
        <p>Select a team you would like to join.</p>

        <select id="teamChoice">
            <option value="Binary Beasts">Binary Beasts</option>
            <option value="Code Crushers">Code Crushers</option>
            <option value="Bug Hunters">Bug Hunters</option>
            <option value="Syntax Squad">Syntax Squad</option>
            <option value="Loop Legends">Loop Legends</option>
        </select>

        <button class="primary-btn" onclick="confirmJoinTeam()">
            Join Team
        </button>
    `);
}

function confirmJoinTeam() {
    const teamName = document.getElementById("teamChoice").value;

    openPopup("Join Request Sent", `
        <p>Your demo join request for <strong>${teamName}</strong> has been submitted.</p>
        <p>This is a frontend demonstration.</p>
    `);
}


/* =========================================
   STREAK CALENDAR
========================================= */

const calendar = document.getElementById("calendar");

for (let i = 0; i < 35; i++) {
    const square = document.createElement("div");

    square.classList.add("square");

    if (i % 5 === 0) square.classList.add("s1");
    if (i % 4 === 0) square.classList.add("s2");
    if (i % 7 === 0) square.classList.add("s3");
    if (i % 9 === 0) square.classList.add("s4");

    square.title = "Coding activity";

    calendar.appendChild(square);
}


/* =========================================
   LANGUAGE SELECTOR
========================================= */

const languageSelect = document.getElementById("languageSelect");

languageSelect.addEventListener("change", () => {
    const language = languageSelect.value;

    if (language === "python") {
        codeEditor.value = `# Write your solution here

def two_sum(nums, target):
    pass

print(two_sum([2, 7, 11, 15], 9))`;
    }

    else if (language === "javascript") {
        codeEditor.value = originalCode;
    }

    else if (language === "java") {
        codeEditor.value = `// Write your solution here

class Solution {
    public int[] twoSum(int[] nums, int target) {
        return new int[]{};
    }
}`;
    }

    else if (language === "c") {
        codeEditor.value = `// Write your solution here

#include <stdio.h>

int main() {
    // Write your code
    return 0;
}`;
    }
});


/* =========================================
   DAILY CHALLENGE
========================================= */

function openDailyChallenge() {
    openPopup("Today's Challenge 🎯", `
        <h3>Two Sum Variant</h3>

        <p>
            Find two elements in an array whose sum is equal
            to the given target.
        </p>

        <p><strong>Difficulty:</strong> Easy</p>
        <p><strong>Category:</strong> Arrays</p>

        <button class="primary-btn" onclick="startDailyChallenge()">
            Start Challenge
        </button>
    `);
}

function startDailyChallenge() {
    closePopup();
    openWorkspace();
}


/* =========================================
   PROFILE
========================================= */

function openProfile() {
    openPopup("My Profile 👤", `
        <h3>Student Profile</h3>

        <p><strong>Name:</strong> Student</p>
        <p><strong>Role:</strong> Coding Explorer</p>
        <p><strong>Team:</strong> ${currentTeamName}</p>
        <p><strong>Problems Solved:</strong> ${solvedCount}</p>
        <p><strong>Team Points:</strong> ${points}</p>
        <p><strong>Rank:</strong> ${document.getElementById("teamRank").textContent}</p>
    `);
}


/* =========================================
   NOTIFICATIONS
========================================= */

function openNotifications() {
    openPopup("Notifications 🔔", `
        <div class="notification-item">
            <h4>🎯 Daily Challenge Available</h4>
            <p>Today's coding challenge is ready!</p>
        </div>

        <hr>

        <div class="notification-item">
            <h4>🏆 Team Update</h4>
            <p>Keep practising to improve your team score.</p>
        </div>

        <hr>

        <div class="notification-item">
            <h4>🔥 Streak Reminder</h4>
            <p>Continue your daily coding practice.</p>
        </div>
    `);
}


/* =========================================
   HELP CENTER
========================================= */

function openHelp() {
    openPopup("Help Center ❓", `
        <h3>How to use CodeDojo</h3>

        <p>1. Open the Challenges page.</p>
        <p>2. Select a coding problem.</p>
        <p>3. Click Solve Problem.</p>
        <p>4. Write code in the Workspace.</p>
        <p>5. Click Run Tests to see demo results.</p>
        <p>6. Click Submit to update demo points.</p>

        <hr>

        <p>Use the sidebar to visit different sections of the website.</p>
    `);
}


/* =========================================
   SETTINGS
========================================= */

function openSettings() {
    openPopup("Settings ⚙️", `
        <h3>Website Settings</h3>

        <p>Customize your demo experience.</p>

        <label>
            <input type="checkbox" id="darkModeToggle">
            Dark Mode
        </label>

        <br><br>

        <button class="primary-btn" onclick="applySettings()">
            Apply Settings
        </button>
    `);
}

function applySettings() {
    const darkMode = document.getElementById("darkModeToggle").checked;

    if (darkMode) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    openPopup("Settings Updated", `
        <p>Your display settings have been updated.</p>
    `);
}


/* =========================================
   PROGRESS
========================================= */

function openProgress() {
    const percentage = Math.min(solvedCount * 5, 100);

    openPopup("My Progress 📊", `
        <h3>Coding Progress</h3>

        <p>Problems Solved: ${solvedCount}</p>
        <p>Team Points: ${points}</p>
        <p>Team Rank: ${document.getElementById("teamRank").textContent}</p>

        <div style="
            background:#eee;
            border-radius:20px;
            height:18px;
            overflow:hidden;
            margin:15px 0;
        ">
            <div style="
                width:${percentage}%;
                background:#7567d9;
                height:100%;
                border-radius:20px;
            "></div>
        </div>

        <p>${percentage}% demo progress</p>
    `);
}


/* =========================================
   ASSESSMENTS
========================================= */

let quizScore = 0;
let quizQuestion = 0;
let selectedAssessment = "";

const quizQuestions = [
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["print", "let", "echo", "display"],
        answer: 1
    },
    {
        question: "Which data structure follows FIFO?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        answer: 1
    },
    {
        question: "Which loop runs while a condition is true?",
        options: ["if", "switch", "while", "break"],
        answer: 2
    },
    {
        question: "What is the index of the first element in an array?",
        options: ["1", "-1", "0", "Depends"],
        answer: 2
    },
    {
        question: "Which operator checks equality in JavaScript?",
        options: ["=", "===", "+", "&&"],
        answer: 2
    }
];

function openAssessment(name) {
    selectedAssessment = name;
    quizScore = 0;
    quizQuestion = 0;

    openPopup(name, `
        <h3>Assessment Instructions</h3>

        <p>Welcome to the ${name} assessment.</p>

        <p>There are ${quizQuestions.length} questions.</p>
        <p>Select the correct answer to earn points.</p>

        <button class="primary-btn" onclick="startQuiz()">
            Start Quiz
        </button>
    `);
}

function startQuiz() {
    quizScore = 0;
    quizQuestion = 0;
    showQuizQuestion();
}

function showQuizQuestion() {
    if (quizQuestion >= quizQuestions.length) {
        showQuizResult();
        return;
    }

    const current = quizQuestions[quizQuestion];

    let optionsHTML = "";

    current.options.forEach((option, index) => {
        optionsHTML += `
            <button class="quiz-option"
                onclick="checkQuizAnswer(${index})">
                ${option}
            </button>
        `;
    });

    openPopup("Question " + (quizQuestion + 1), `
        <p>${current.question}</p>

        ${optionsHTML}

        <p>
            Question ${quizQuestion + 1}
            of ${quizQuestions.length}
        </p>
    `);
}

function checkQuizAnswer(selectedIndex) {
    const current = quizQuestions[quizQuestion];

    if (selectedIndex === current.answer) {
        quizScore++;
    }

    quizQuestion++;
    showQuizQuestion();
}

function showQuizResult() {
    openPopup("Assessment Completed 🎉", `
        <h3>Your Score</h3>

        <p>You scored <strong>${quizScore}</strong>
        out of <strong>${quizQuestions.length}</strong>.</p>

        <p>
            ${quizScore >= 4
                ? "Excellent work! Keep practising."
                : "Good attempt! Practise more and try again."}
        </p>

        <button class="primary-btn" onclick="openAssessment(selectedAssessment)">
            Try Again
        </button>
    `);
}


/* =========================================
   EXTRA NAVIGATION SHORTCUTS
========================================= */

function openTeamPage() {
    showPage("teams");
}

function openLeaderboardPage() {
    showPage("leaderboard");
}

function openStreakPage() {
    showPage("streak");
}

function openAssessmentPage() {
    showPage("assessments");
}


/* =========================================
   INITIAL SETUP
========================================= */

resetCode();
updateLeaderboard();