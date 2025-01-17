// Initialize variables
let clickCount = 0;
let level = 1;
const clicksPerLevel = 100; // Adjust for difficulty
const leaderboard = {
    "ANONYMOUS": 5000000000, // Top bot
    "Bot1": 200000,
    "Bot2": 150000,
    "Bot3": 100000,
    "Bot4": 50000,
    "Bot5": 10000,
    "Bot6": 5000,
    "Bot7": 1000,
    "Bot8": 500,
    "Bot9": 100, // Filler bots
};

// Select DOM elements
const greetingEl = document.getElementById('greeting');
const cubeEl = document.getElementById('cube');
const clickCountEl = document.getElementById('click-count');
const levelEl = document.getElementById('level');
const leaderboardListEl = document.getElementById('leaderboard-list');

// Create a message element next to the greeting
const messageEl = document.createElement('span');
messageEl.style.marginLeft = "10px"; // Add spacing between greeting and message
greetingEl.appendChild(messageEl);

// Prompt user for their name
const username = prompt("Enter your name:", "Guest") || "Guest";
greetingEl.textContent = `Hello, ${username}!`;

// Ensure the leaderboard doesn't overwrite real users
if (!leaderboard[username]) {
    leaderboard[username] = 0;
}

// Handle cube clicks
cubeEl.addEventListener('click', () => {
    clickCount++;
    clickCountEl.textContent = `Clicks: ${clickCount}`;
    
    // Level up logic
    if (clickCount >= level * clicksPerLevel) {
        level++;
        levelEl.textContent = `Level: ${level}`;
    }

    updateLeaderboard();
});

// Update leaderboard
function updateLeaderboard() {
    // Update current user's score
    leaderboard[username] = clickCount;

    // Convert leaderboard object to sorted array
    const sortedLeaderboard = Object.entries(leaderboard)
        .map(([name, clicks]) => ({ name, clicks }))
        .sort((a, b) => b.clicks - a.clicks);

    // Render leaderboard
    leaderboardListEl.innerHTML = "";
    sortedLeaderboard.slice(0, 10).forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${entry.name} - ${entry.clicks} clicks`;
        leaderboardListEl.appendChild(li);
    });
}

// Display motivational messages
function displayGoodMessage() {
    messageEl.textContent = "You can do it!";
    messageEl.style.color = "blue";
    setTimeout(() => {
        messageEl.textContent = ""; // Clear message after 2 seconds
    }, 2000);
}

// Display discouraging messages
function displayBadMessage() {
    messageEl.textContent = "BOO!";
    messageEl.style.color = "red";
    clickCount = Math.max(0, clickCount - 10); // Deduct 10 clicks, ensure no negative values
    clickCountEl.textContent = `Clicks: ${clickCount}`;
    setTimeout(() => {
        messageEl.textContent = ""; // Clear message after 2 seconds
    }, 2000);
    updateLeaderboard(); // Update leaderboard after deduction
}

// Start the message timers
setInterval(displayGoodMessage, 3000); // Good messages every 3 seconds
setInterval(displayBadMessage, 90000); // Bad messages every 1 minute and 30 seconds

// Initial leaderboard update
updateLeaderboard();
