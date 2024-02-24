
document.getElementById('needHelpBtn').addEventListener('click', function() {
    document.getElementById('helpPopup').style.display = 'block';
});

// popup for emergency options
document.getElementById('emergencyBtn').addEventListener('click', function() {
    document.getElementById('emergencyPopup').style.display = 'block';
});

// popup when close button or outside the popup is clicked
document.querySelectorAll('.close, .popup').forEach(function(element) {
    element.addEventListener('click', function(event) {
        if (event.target === this) {
            this.style.display = 'none';
        }
    });
});

// Submit help form
document.getElementById('helpForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('nameInput').value.trim();
    const address = document.getElementById('addressInput').value.trim();
    const details = document.getElementById('detailsInput').value.trim();
    // Media file handling can be added here if needed

    const issue = {
        details: details,
        likes: 0 // Initialize likes to 0
    };
    addIssue(issue); // Add issue to the Issues tab
    console.log(issue); // For testing, you can replace this with code to display the submitted issue
    document.getElementById('helpPopup').style.display = 'none';
});

// Display Issues tab
document.getElementById('issuesTab').addEventListener('click', function() {
    document.getElementById('issuesPage').style.display = 'block';
    document.getElementById('noticePage').style.display = 'none';
});

// Display Notice tab
document.getElementById('noticeTab').addEventListener('click', function() {
    document.getElementById('issuesPage').style.display = 'none';
    document.getElementById('noticePage').style.display = 'block';
});

// Handle submission of opinion form
document.getElementById('opinionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const content = document.getElementById('opinionContent').value.trim();
    if (content !== '') {
        const opinion = {
            content: content,
            likes: 0 // Initialize likes to 0
        };
        addOpinion(opinion);
        document.getElementById('opinionContent').value = ''; // Clear the input field after submission
    }
});


// Function to handle voting
function vote(button) {
    const container = button.parentNode;
    const votesElement = container.querySelector('.votes');
    let votes = parseInt(votesElement.textContent.split(' ')[0]);
    votes++;
    votesElement.textContent = `${votes} votes`;

    const priorityCircle = container.querySelector('.priority-circle');
    if (votes > 20) {
        priorityCircle.style.backgroundColor = 'red';
    } else if (votes > 10) {
        priorityCircle.style.backgroundColor = 'yellow';
    } else {
        priorityCircle.style.backgroundColor = 'green';
    }
}

// Function to add an issue to the Issues tab
function addIssue(issue) {
    const issuesContainer = document.getElementById('issuesPage');
    const issueDiv = document.createElement('div');
    issueDiv.classList.add('issue');
    issueDiv.classList.add('emergency-issue'); // Add emergency class for styling
    issueDiv.innerHTML = `
        <p>${issue.details}</p>
        <button class="voteBtn" onclick="vote(this)">Vote</button>
        <span class="votes">${issue.likes} votes</span>
        <div class="priority-circle"></div>
    `;
    issuesContainer.appendChild(issueDiv);
}

// Handle submission of report form under emergency
document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const reportDetails = document.getElementById('reportDetailsInput').value.trim();
    if (reportDetails !== '') {
        const report = {
            details: reportDetails,
            likes: 0 // Initialize likes to 0
        };
        addIssue(report); // Add report to the Issues tab
        document.getElementById('reportPopup').style.display = 'none';
    }
});

// Function to sort issues by votes
function sortByVotes() {
    const issuesContainer = document.getElementById('issuesPage');
    const issues = Array.from(issuesContainer.querySelectorAll('.issue'));

    issues.sort((a, b) => {
        const votesA = parseInt(a.querySelector('.votes').textContent.split(' ')[0]);
        const votesB = parseInt(b.querySelector('.votes').textContent.split(' ')[0]);
        return votesB - votesA;
    });

    issues.forEach(issue => issuesContainer.appendChild(issue));
}

// Function to sort issues by recent
function sortByRecent() {
    const issuesContainer = document.getElementById('issuesPage');
    const issues = Array.from(issuesContainer.querySelectorAll('.issue'));

    issues.sort((a, b) => {
        const timeA = new Date(a.dataset.timestamp);
        const timeB = new Date(b.dataset.timestamp);
        return timeB - timeA;
    });

    issues.forEach(issue => issuesContainer.appendChild(issue));
}

// Handle sorting when the selection changes
document.getElementById('sortSelect').addEventListener('change', function() {
    const sortBy = this.value;
    if (sortBy === 'votes') {
        sortByVotes();
    } else if (sortBy === 'recent') {
        sortByRecent();
    }
});

// Function to add an issue to the Issues tab
function addIssue(issue) {
    const issuesContainer = document.getElementById('issuesPage');
    const issueDiv = document.createElement('div');
    issueDiv.classList.add('issue');
    issueDiv.classList.add('emergency-issue'); // Add emergency class for styling
    issueDiv.dataset.timestamp = new Date().toISOString(); // Store timestamp for sorting by recent
    issueDiv.innerHTML = `
        <p>${issue.details}</p>
        <button class="voteBtn" onclick="vote(this)">Vote</button>
        <span class="votes">${issue.likes} votes</span>
        <div class="priority-circle"></div>
    `;
    issuesContainer.appendChild(issueDiv);
}

// Handle submission of report form under emergency
document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const reportDetails = document.getElementById('reportDetailsInput').value.trim();
    if (reportDetails !== '') {
        const report = {
            details: reportDetails,
            likes: 0 // Initialize likes to 0
        };
        addIssue(report); // Add report to the Issues tab
        document.getElementById('reportPopup').style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Display the "Issues" tab content
    document.getElementById("issuesPage").style.display = "block";
    
    // Hide the "Notice" tab content
    document.getElementById("noticePage").style.display = "none";
    
    // Add active class to the "Issues" tab
    document.getElementById("issuesTab").classList.add("active");
});

// Function to switch between tabs
function switchTab(tabName) {
    // Hide all tab contents
    document.getElementById("issuesPage").style.display = "none";
    document.getElementById("noticePage").style.display = "none";
    
    // Remove active class from all tabs
    document.getElementById("issuesTab").classList.remove("active");
    document.getElementById("noticeTab").classList.remove("active");
    
    // Show the selected tab content
    document.getElementById(tabName + "Page").style.display = "block";
    
    // Add active class to the selected tab
    document.getElementById(tabName + "Tab").classList.add("active");
}
