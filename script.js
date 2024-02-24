
document.getElementById('needHelpBtn').addEventListener('click', function() {
    document.getElementById('helpPopup').style.display = 'block';
});


document.getElementById('emergencyBtn').addEventListener('click', function() {
    document.getElementById('emergencyPopup').style.display = 'block';
});


document.querySelectorAll('.close, .popup').forEach(function(element) {
    element.addEventListener('click', function(event) {
        if (event.target === this) {
            this.style.display = 'none';
        }
    });
});


document.getElementById('helpForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('nameInput').value.trim();
    const address = document.getElementById('addressInput').value.trim();
    const details = document.getElementById('detailsInput').value.trim();
    

    const issue = {
        details: details,
        likes: 0 
    };
    addIssue(issue); 
    console.log(issue); 
    document.getElementById('helpPopup').style.display = 'none';
});


document.getElementById('issuesTab').addEventListener('click', function() {
    document.getElementById('issuesPage').style.display = 'block';
    document.getElementById('noticePage').style.display = 'none';
});


document.getElementById('noticeTab').addEventListener('click', function() {
    document.getElementById('issuesPage').style.display = 'none';
    document.getElementById('noticePage').style.display = 'block';
});


document.getElementById('opinionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const content = document.getElementById('opinionContent').value.trim();
    if (content !== '') {
        const opinion = {
            content: content,
            likes: 0 
        };
        addOpinion(opinion);
        document.getElementById('opinionContent').value = ''; 
    }
});



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


function addIssue(issue) {
    const issuesContainer = document.getElementById('issuesPage');
    const issueDiv = document.createElement('div');
    issueDiv.classList.add('issue');
    issueDiv.classList.add('emergency-issue'); 
    issueDiv.innerHTML = `
        <p>${issue.details}</p>
        <button class="voteBtn" onclick="vote(this)">Vote</button>
        <span class="votes">${issue.likes} votes</span>
        <div class="priority-circle"></div>
    `;
    issuesContainer.appendChild(issueDiv);
}


document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const reportDetails = document.getElementById('reportDetailsInput').value.trim();
    if (reportDetails !== '') {
        const report = {
            details: reportDetails,
            likes: 0 
        };
        addIssue(report); 
        document.getElementById('reportPopup').style.display = 'none';
    }
});


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


document.getElementById('sortSelect').addEventListener('change', function() {
    const sortBy = this.value;
    if (sortBy === 'votes') {
        sortByVotes();
    } else if (sortBy === 'recent') {
        sortByRecent();
    }
});


function addIssue(issue) {
    const issuesContainer = document.getElementById('issuesPage');
    const issueDiv = document.createElement('div');
    issueDiv.classList.add('issue');
    issueDiv.classList.add('emergency-issue'); 
    issueDiv.dataset.timestamp = new Date().toISOString(); 
    issueDiv.innerHTML = `
        <p>${issue.details}</p>
        <button class="voteBtn" onclick="vote(this)">Vote</button>
        <span class="votes">${issue.likes} votes</span>
        <div class="priority-circle"></div>
    `;
    issuesContainer.appendChild(issueDiv);
}

document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const reportDetails = document.getElementById('reportDetailsInput').value.trim();
    if (reportDetails !== '') {
        const report = {
            details: reportDetails,
            likes: 0 
        };
        addIssue(report); 
        document.getElementById('reportPopup').style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("issuesPage").style.display = "block";
    
    document.getElementById("noticePage").style.display = "none";
    
    document.getElementById("issuesTab").classList.add("active");
});

function switchTab(tabName) {
    document.getElementById("issuesPage").style.display = "none";
    document.getElementById("noticePage").style.display = "none";
    
    document.getElementById("issuesTab").classList.remove("active");
    document.getElementById("noticeTab").classList.remove("active");
    
    document.getElementById(tabName + "Page").style.display = "block";
    
    document.getElementById(tabName + "Tab").classList.add("active");
}

function redirectToEmergencyPage() {
    window.location.href = 'emergency_report.html';
}
