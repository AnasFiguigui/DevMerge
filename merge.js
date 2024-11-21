const selectArea = document.querySelector(".select-container");
const mergeArea = document.querySelector(".merge-container");
const bin = document.getElementById("bin");

// Dev Stack Data with Types
const words = [
    { text: "HTML", type: "frontend" },
    { text: "CSS", type: "frontend" },
    { text: "JavaScript", type: "frontend" },
    { text: "Python", type: "backend" },
    { text: "Java", type: "backend" },
    { text: "PHP", type: "backend" },
    { text: "SQL", type: "database" },
    { text: "Node.js", type: "backend" },
    { text: "React", type: "frontend" },
    { text: "Data", type: "data" }, 
    { text: "Cloud", type: "cloud" },
    { text: "DevOps", type: "devops" },
    { text: "Docker", type: "cloud" },
    { text: "Analytics", type: "data" },
    { text: "AI", type: "ai" },
    { text: "Monitoring", type: "devops" },
    { text: "Security", type: "security" },
    { text: "GraphQL", type: "backend" },
    { text: "Mobile", type: "mobile" },
    { text: "Kubernetes", type: "cloud" },
    { text: "UI", type: "frontend" },
    { text: "Big Data", type: "data" },
    { text: "Testing", type: "testing" },
    { text: "Language", type: "ai" },
    { text: "NLP", type: "ai" },
    { text: "IoT", type: "iot" },
    { text: "Blockchain", type: "blockchain" },
    { text: "Kotlin", type: "mobile" },
    { text: "Swift", type: "mobile" },
    { text: "UIKit", type: "mobile" }
];

const merges = {
    "HTML+CSS": "Styling",
    "CSS+HTML": "Styling",
    "Styling+JavaScript": "Frontend",
    "JavaScript+Styling": "Frontend",
    "Python+Data": "Processing",
    "Data+Python": "Processing",
    "SQL+Data": "Database",
    "Data+SQL": "Database",
    "PHP+Python": "Backend",
    "Python+PHP": "Backend",
    "Backend+SQL": "Database Backend",
    "SQL+Backend": "Database Backend",
    "Frontend+Backend": "Fullstack",
    "Backend+Frontend": "Fullstack",
    "Fullstack+Cloud": "Cloud App",
    "Cloud+Fullstack": "Cloud App",
    "Fullstack+DevOps": "CICD",
    "DevOps+Fullstack": "CICD",
    "DevOps+Cloud": "Automation",
    "Cloud+DevOps": "Automation",
    "Frontend+React": "Advanced Frontend",
    "React+Frontend": "Advanced Frontend",
    "Node.js+Backend": "Fullstack JS",
    "Backend+Node.js": "Fullstack JS",
    "Cloud+Docker": "Containerized App",
    "Docker+Cloud": "Containerized App",
    "Processing+Analytics": "Insights",
    "Analytics+Processing": "Insights",
    "Processing+AI": "Machine Learning",
    "AI+Processing": "Machine Learning",
    "Analytics+AI": "AI Insights",
    "AI+Analytics": "AI Insights",
    "Cloud+AI": "AI Cloud",
    "AI+Cloud": "AI Cloud", // Duplicate to handle both orders
    "CICD+Monitoring": "Deployment",
    "Monitoring+CICD": "Deployment",
    "Monitoring+DevOps": "Observability",
    "DevOps+Monitoring": "Observability",
    "Cloud+Security": "Secure Cloud",
    "Security+Cloud": "Secure Cloud",
    "Backend+GraphQL": "API",
    "GraphQL+Backend": "API",
    "Frontend+API": "Driven App",
    "API+Frontend": "Driven App",
    "Driven App+Mobile": "Mobile App",
    "Mobile+Driven App": "Mobile App",
    "Cloud+Kubernetes": "Scalable App",
    "Kubernetes+Cloud": "Scalable App",
    "Automation+Observability": "Healing System",
    "Observability+Automation": "Healing System",
    "Fullstack+UI": "User App",
    "UI+Fullstack": "User App",
    "Analytics+Big Data": "Big Insights",
    "Big Data+Analytics": "Big Insights",
    "Big Data+Machine Learning": "AI Big Data",
    "Machine Learning+Big Data": "AI Big Data",
    "Frontend+Testing": "Testable Frontend",
    "Testing+Frontend": "Testable Frontend",
    "Backend+Testing": "Testable Backend",
    "Testing+Backend": "Testable Backend",
    "Fullstack+Testing": "Testable App",
    "Testing+Fullstack": "Testable App",
    "AI+Language": "AI NLP",
    "Language+AI": "AI NLP",
    "NLP+Cloud": "AI Chatbot",
    "Cloud+NLP": "AI Chatbot",
    "Processing+IoT": "IoT Data",
    "IoT+Processing": "IoT Data",
    "IoT+AI": "Smart IoT",
    "AI+IoT": "Smart IoT",
    "Cloud+Blockchain": "Decentralized App",
    "Blockchain+Cloud": "Decentralized App",
    "Backend+Blockchain": "Blockchain Backend",
    "Blockchain+Backend": "Blockchain Backend",
    "Frontend+Blockchain": "Web3 Frontend",
    "Blockchain+Frontend": "Web3 Frontend",
    "Web3 Frontend+Backend": "Web3 Stack",
    "Backend+Web3 Frontend": "Web3 Stack",
    "Java+Kotlin": "Android",
    "Kotlin+Java": "Android",
    "Swift+UIKit": "iOS",
    "UIKit+Swift": "iOS",
    "Android+iOS": "Mobile Dev",
    "iOS+Android": "Mobile Dev",
    "Mobile+AI": "Smart Mobile",
    "AI+Mobile": "Smart Mobile"
};

// ... (rest of your code)

// Initialize select area (with type-based colors)
function initializeSelectArea() {
    words.forEach((wordObj) => {
        const wordDiv = createWordElement(wordObj.text);
        wordDiv.classList.add(wordObj.type); // Add type class for styling
        selectArea.appendChild(wordDiv);
    });
}


// Create a word element
function createWordElement(text) {
    const div = document.createElement("div");
    div.className = "word";
    div.draggable = true;
    div.textContent = text;
    div.addEventListener("dragstart", dragStart);
    return div;
}

// Drag and Drop
let draggedElement = null;
let mergeIndicator = null; // To display the potential merge result

function dragStart(e) {
    draggedElement = e.target;
}

function dragOver(e) {
    e.preventDefault();
    const target = e.target;
    if (target === mergeArea || target.closest(".merge-container")) {
        mergeArea.classList.add("active");
        showMergeIndicator(e); 
    } else if (target === bin) {
        bin.classList.add("active");
    }
}

function dragLeave(e) {
    const target = e.target;
    if (target === mergeArea || target.closest(".merge-container")) {
        mergeArea.classList.remove("active");
        hideMergeIndicator();
    } else if (target === bin) {
        bin.classList.remove("active");
    }
}

function drop(e) {
    e.preventDefault();
    const target = e.target; 
    if (target === mergeArea || target.closest(".merge-container")) {
        mergeArea.classList.remove("active");
        hideMergeIndicator();
        const clone = draggedElement.cloneNode(true);
        mergeArea.appendChild(clone); 
        checkForMerge();
    } else if (target === bin && draggedElement) {
        bin.classList.remove("active");
        draggedElement.remove();
    }
}

// Merge Indicator
function showMergeIndicator(e) {
    const items = [...mergeArea.querySelectorAll(".word")];
    if (items.length > 0 && draggedElement) {
        const lastItem = items[items.length - 1]; 
        const key1 = `${lastItem.textContent}+${draggedElement.textContent}`;
        const key2 = `${draggedElement.textContent}+${lastItem.textContent}`;

        if (merges[key1] || merges[key2]) {
            if (!mergeIndicator) {
                mergeIndicator = createWordElement("");
                mergeIndicator.classList.add("merge-indicator");
                mergeArea.appendChild(mergeIndicator);
            }
            mergeIndicator.textContent = merges[key1] || merges[key2];
        } else {
            hideMergeIndicator();
        }
    }
}

function hideMergeIndicator() {
    if (mergeIndicator) {
        mergeIndicator.remove();
        mergeIndicator = null;
    }
}

// Merge Logic (Modified for multiple elements)
function checkForMerge() {
    const items = [...mergeArea.querySelectorAll(".word")];
    if (items.length >= 2) {
        const firstItem = items[items.length - 2]; // Second to last item
        const lastItem = items[items.length - 1];  // Last item
        const key1 = `${firstItem.textContent}+${lastItem.textContent}`;
        const key2 = `${lastItem.textContent}+${firstItem.textContent}`;

        if (merges[key1]) {
            performMerge(firstItem, lastItem, merges[key1]);
        } else if (merges[key2]) {
            performMerge(lastItem, firstItem, merges[key2]);
        }
    }
}

function performMerge(item1, item2, result) {
    item1.remove();
    item2.remove();

    // Create the new merged element
    const newWord = createWordElement(result);

    // Add the new element to the select area
    selectArea.appendChild(newWord); 
}

// Event Listeners (using event delegation)
document.addEventListener("dragover", dragOver);
document.addEventListener("dragleave", dragLeave);
document.addEventListener("drop", drop);

// Initialize
initializeSelectArea();