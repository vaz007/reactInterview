// const data = require('./data.json'); // Assuming data.json contains the provided JSON
const data = {"tickets":[{"id":"CAM-1","title":"Update User Profile Page UI","tag":["Feature request"],"userId":"usr-1","status":"Todo","priority":4},{"id":"CAM-2","title":"Add Multi-Language Support - Enable multi-language support within the application.","tag":["Feature Request"],"userId":"usr-2","status":"In progress","priority":3},{"id":"CAM-3","title":"Optimize Database Queries for Performance","tag":["Feature Request"],"userId":"usr-2","status":"In progress","priority":1},{"id":"CAM-4","title":"Implement Email Notification System","tag":["Feature Request"],"userId":"usr-1","status":"In progress","priority":3},{"id":"CAM-5","title":"Enhance Search Functionality","tag":["Feature Request"],"userId":"usr-5","status":"In progress","priority":0},{"id":"CAM-6","title":"Third-Party Payment Gateway","tag":["Feature Request"],"userId":"usr-2","status":"Todo","priority":1},{"id":"CAM-7","title":"Create Onboarding Tutorial for New Users","tag":["Feature Request"],"userId":"usr-1","status":"Backlog","priority":2},{"id":"CAM-8","title":"Implement Role-Based Access Control (RBAC)","tag":["Feature Request"],"userId":"usr-3","status":"In progress","priority":3},{"id":"CAM-9","title":"Upgrade Server Infrastructure","tag":["Feature Request"],"userId":"usr-5","status":"Todo","priority":2},{"id":"CAM-10","title":"Conduct Security Vulnerability Assessment","tag":["Feature Request"],"userId":"usr-4","status":"Backlog","priority":1}],"users":[{"id":"usr-1","name":"Anoop sharma","available":false},{"id":"usr-2","name":"Yogesh","available":true},{"id":"usr-3","name":"Shankar Kumar","available":true},{"id":"usr-4","name":"Ramesh","available":true},{"id":"usr-5","name":"Suresh","available":true}]}



function groupTicketsByStatus(data) {
    const priorityLabels = ["Backlog", "Todo", "InProgress", "Done", "Canceled"];
    const groupedTickets = {};
  
    // Initialize groupedTickets object with keys for each status
    priorityLabels.forEach((label) => {
      groupedTickets[label] = [];
    });

    data.tickets.forEach((ticket) => {
      if (ticket.status === "In progress") {
        groupedTickets["InProgress"].push(ticket);
      }
      if (groupedTickets[ticket.status]) {
        console.log(groupedTickets[ticket.status], ticket);
        groupedTickets[ticket.status].push(ticket);
      }
    });
  
    return groupedTickets;
  }
  
  function groupTicketsByUser(data) {
    const groupedTickets = {};

    // Iterate over tickets and group them by userId
    data.tickets.forEach(ticket => {
        const { userId } = ticket;
        const user = data.users.find(user => user.id === userId);

        if (user) {
            if (!groupedTickets[userId]) {
                groupedTickets[userId] = {
                    name: user.name,
                    tickets: []
                };
            }
            groupedTickets[userId].tickets.push(ticket);
        }
    });

    return groupedTickets;
}


// Function to filter tickets by user
function filterTicketsByUser(userId) {
    const userTickets = {};
    data.tickets.forEach(ticket => {
        if (ticket.userId === userId) {
            if (!userTickets[ticket.status]) {
                userTickets[ticket.status] = [];
            }
            userTickets[ticket.status].push(ticket);
        }
    });
    return userTickets;
}

// Function to group tickets by priority
function groupTicketsByPriority(data) {
    const priorityLabels = ["NoPriority", "Urgent", "Low", "Medium", "High"];
    const groupedTickets = {};

    // Initialize the groupedTickets object with keys for each priority level

    priorityLabels.forEach(label => {
        groupedTickets[label] = [];
    });

    data.tickets.forEach(ticket => {
        const priorityIndex = ticket.priority; // Assuming ticket.priority is the priority index
        const priorityLabel = priorityLabels[priorityIndex];
        groupedTickets[priorityLabel].push(ticket);
    });

    return groupedTickets;
}

// Function to sort tickets by priority in descending order
function sortTicketsByPriorityDescending() {
    return data.tickets.sort((a, b) => b.priority - a.priority);
}

// Function to sort tickets by title in ascending order
function sortTicketsByTitleAscending() {
    return data.tickets.sort((a, b) => a.title.localeCompare(b.title));
}

module.exports = {
    // filterTicketsByStatus,
    groupTicketsByUser,
    groupTicketsByStatus,
    filterTicketsByUser,
    groupTicketsByPriority,
    sortTicketsByPriorityDescending,
    sortTicketsByTitleAscending

}