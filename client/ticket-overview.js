var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }




// get tickets 

//#region TicketsImi
tickets = [
  {
    id: 1,
    title: 'Complaint',
    from: 'John Doe',
    text: 'Complaint from john doe',
    insertURL: ['string'],
    deadline: '2023-12-23',
    status: 'available',
    user: 'token'
  },
  {
    id: 2,
    title: 'Problem',
    from: 'Anna F.',
    text: 'Problem description',
    insertURL: ['string'],
    deadline: '2023-12-29',
    status: 'available',
    user: 'token'
  },
  {
    id: 3,
    title: 'Lag',
    from: 'Dan L.',
    text: 'Lag appears when',
    insertURL: ['string'],
    deadline: '2023-12-21',
    status: 'available',
    user: 'token'
  },
  {
    id: 4,
    title: 'Complaint',
    from: '@someuser',
    text: 'Lorem ipsum...',
    insertURL: ['string'],
    deadline: '2023-12-23',
    status: 'available',
    user: 'token'
  },
  {
    id: 5,
    title: 'Bug',
    from: 'Denis Kling',
    text: 'I found a bug',
    insertURL: ['string'],
    deadline: '2023-12-10',
    status: 'available',
    user: 'token'
  },
  {
    id: 6,
    title: 'Complaint',
    from: 'Lucy A.',
    text: 'Lorem ipsum... Lucy',
    insertURL: ['string'],
    deadline: '2023-12-23',
    status: 'available',
    user: 'token'
  },
  {
    id: 7,
    title: 'Test',
    from: 'Forest G.',
    text: 'System test',
    insertURL: ['string'],
    deadline: '2023-12-23',
    status: 'available',
    user: 'token'
  },
  {
    id: 8,
    title: 'Complaint',
    from: 'John Doe',
    text: 'Complaint from john doe',
    insertURL: ['string'],
    deadline: '2023-12-23',
    status: 'available',
    user: 'token'
  },
  {
    id: 9,
    title: 'Problem',
    from: 'Anna F.',
    text: 'Problem description',
    insertURL: ['string'],
    deadline: '2023-12-29',
    status: 'available',
    user: 'token'
  },
  {
    id: 10,
    title: 'Lag',
    from: 'Dan L.',
    text: 'Lag appears when',
    insertURL: ['string'],
    deadline: '2023-12-21',
    status: 'available',
    user: 'token'
  },
  {
    id: 11,
    title: 'Complaint',
    from: '@someuser',
    text: 'Lorem ipsum...',
    insertURL: ['string'],
    deadline: '2023-12-23',
    status: 'available',
    user: 'token'
  },
  {
    id: 12,
    title: 'Bug',
    from: 'Denis Kling',
    text: 'I found a bug',
    insertURL: ['string'],
    deadline: '2023-12-10',
    status: 'available',
    user: 'token'
  },
  {
    id: 13,
    title: 'Complaint',
    from: 'Lucy A.',
    text: 'Lorem ipsum... Lucy',
    insertURL: ['string'],
    deadline: '2023-12-23',
    status: 'available',
    user: 'token'
  },
  {
    id: 14,
    title: 'Test',
    from: 'Forest G.',
    text: 'System test',
    insertURL: ['string'],
    deadline: '2023-12-23',
    status: 'available',
    user: 'token'
  },
  {
    id: 15,
    title: 'Complaint',
    from: 'John Doe',
    text: 'Complaint from john doe',
    insertURL: ['string'],
    deadline: '2023-12-23',
    status: 'available',
    user: 'token'
  },
  {
    id: 16,
    title: 'Problem',
    from: 'Anna F.',
    text: 'Problem description',
    insertURL: ['string'],
    deadline: '2023-12-29',
    status: 'available',
    user: 'token'
  },
  {
    id: 17,
    title: 'Lag',
    from: 'Dan L.',
    text: 'Lag appears when',
    insertURL: ['string'],
    deadline: '2023-12-21',
    status: 'available',
    user: 'token'
  },
  {
    id: 18,
    title: 'Complaint',
    from: '@someuser',
    text: 'Lorem ipsum...',
    insertURL: ['string'],
    deadline: '2023-12-23',
    status: 'available',
    user: 'token'
  },
  {
    id: 19,
    title: 'Bug',
    from: 'Denis Kling',
    text: 'I found a bug',
    insertURL: ['string'],
    deadline: '2023-12-10',
    status: 'available',
    user: 'token'
  },
  {
    id: 20,
    title: 'Complaint',
    from: 'Lucy A.',
    text: 'Lorem ipsum... Lucy',
    insertURL: ['string'],
    deadline: '2023-12-23',
    status: 'available',
    user: 'token'
  },
  {
    id: 21,
    title: 'Test',
    from: 'Forest G.',
    text: 'System test',
    insertURL: ['string'],
    deadline: '2023-12-23',
    status: 'available',
    user: 'token'
  }
];
//#endregion

let selectedTicketId = null; // Store the ID of the selected ticket

function createTicketRow(ticket) {
  return `
    <tr>
      <td>
        <label class="checkbox-circle">
          <input class="checkbox" type="checkbox" data-ticket-id="${ticket.id}">
          <span class="checkmark"></span>
        </label>
      </td>
      <td>${ticket.from}</td>
      <td>${ticket.title}</td>
      <td>${ticket.deadline}</td>
      <td>${ticket.status}</td>
    </tr>
  `;
}

function populateTable(tickets) {
  ticketRows = document.getElementById('ticketRows');
  ticketRows.innerHTML = '';

  tickets.forEach(ticket => {
    const ticketRow = createTicketRow(ticket);
    ticketRows.insertAdjacentHTML('beforeend', ticketRow);
  });

  // Add event listener to checkboxes
  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', event => {
      const ticketId = parseInt(event.target.dataset.ticketId);

      if (ticketId === selectedTicketId) {
        // If the same ticket is selected, deselect it
        selectedTicketId = null;
        event.target.checked = false;
      } else {
        // Deselect the previously selected ticket, if any
        const previousCheckbox = document.querySelector(`.checkbox[data-ticket-id="${selectedTicketId}"]`);
        if (previousCheckbox) {
          previousCheckbox.checked = false;
        }

        // Select the new ticket
        selectedTicketId = ticketId;
      }

      // Log the selected ticket ID for demonstration
      console.log(selectedTicketId);
    });
  });
}

populateTable(tickets);





const rowsPerPage = 10;

const table = document.getElementById("myTable");

const pagination = document.getElementById("pagination");

const rows = Array.from(table.querySelectorAll("tbody tr"));

totalPages = Math.ceil(rows.length / rowsPerPage);

function displayRows(page) {
  // Calculate the start and end indices for the rows of the current page
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = page * rowsPerPage;

  // Clear the table body
  table.querySelector("tbody").innerHTML = "";

  // Loop through the rows and display the rows for the current page
  for (let i = startIndex; i < endIndex && i < rows.length; i++) {
    table.querySelector("tbody").appendChild(rows[i]);
  }

  truncateTableContent();
}

// Function to generate the pagination links
function generatePagination() {
  pagination.innerHTML = "";

  if (totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = i;

      if (i === 1) {
        li.classList.add("active");
      }

      link.addEventListener("click", function () {
        //uncheck all checkboxes and clear selectedId
        checkboxes = document.querySelectorAll('.checkbox');
        checkboxes.forEach(checkbox => {
          checkbox.checked = false;
        });
        selectedTicketId = null;

        pagination.querySelector(".active").classList.remove("active");
        this.parentNode.classList.add("active");
        displayRows(i);
      });

      li.appendChild(link);
      pagination.appendChild(li);
    }
  }
}

// Display the rows for the first page initially
displayRows(1);

// Generate the pagination links
generatePagination();





// Truncate the table content
function truncateTableContent() {
  const characterLimit = 25; // Define the maximum number of characters

  const displayedRows = table.querySelectorAll("tbody tr");
  for (let i = 0; i < displayedRows.length; i++) {
    const row = displayedRows[i];
    const cells = row.querySelectorAll("td");
    for (let j = 0; j < cells.length; j++) {
      const cell = cells[j];

      // Check if the cell contains a label with a checkbox
      const checkboxLabel = cell.querySelector("label.checkbox-circle");
      if (checkboxLabel) {
        // Skip the cell if it contains a label with a checkbox
        continue;
      }

      const text = cell.textContent.trim();
      if (text.length > characterLimit) {
        const truncatedText = text.slice(0, characterLimit) + "...";
        cell.textContent = truncatedText;
        cell.setAttribute("title", text); // Add a tooltip with the full text
      }
    }
  }
}


/*const myOpenedBtn = document.getElementById('my-tickets-opened');

myOpenedBtn.addEventListener('click', function() {
  console.log('hit');

tickets = [
  {
    id: 1,
    title: 'Complaint',
    from: 'John Doe',
    text: 'Complaint from john doe',
    insertURL: ['string'],
    deadline: '2023-12-23',
    status: 'opened',
    user: 'token'
  },
  {
    id: 4,
    title: 'Complaint',
    from: '@someuser',
    text: 'Lorem ipsum...',
    insertURL: ['string'],
    deadline: '2023-12-23',
    status: 'opened',
    user: 'token'
  },
  {
    id: 7,
    title: 'Test',
    from: 'Forest G.',
    text: 'System test',
    insertURL: ['string'],
    deadline: '2023-12-23',
    status: 'opened',
    user: 'token'
  },
  {
    id: 8,
    title: 'Complaint',
    from: 'John Doe',
    text: 'Complaint from john doe',
    insertURL: ['string'],
    deadline: '2023-12-23',
    status: 'opened',
    user: 'token'
  },
  {
    id: 9,
    title: 'Problem',
    from: 'Anna F.',
    text: 'Problem description',
    insertURL: ['string'],
    deadline: '2023-12-29',
    status: 'opened',
    user: 'token'
  },
  {
    id: 10,
    title: 'Lag',
    from: 'Dan L.',
    text: 'Lag appears when',
    insertURL: ['string'],
    deadline: '2023-12-21',
    status: 'opened',
    user: 'token'
  },
  {
    id: 11,
    title: 'Complaint',
    from: '@someuser',
    text: 'Lorem ipsum...',
    insertURL: ['string'],
    deadline: '2023-12-23',
    status: 'opened',
    user: 'token'
  },
  {
    id: 12,
    title: 'Bug',
    from: 'Denis Kling',
    text: 'I found a bug',
    insertURL: ['string'],
    deadline: '2023-12-10',
    status: 'opened',
    user: 'token'
  },
  {
    id: 13,
    title: 'Complaint',
    from: 'Lucy A.',
    text: 'Lorem ipsum... Lucy',
    insertURL: ['string'],
    deadline: '2023-12-23',
    status: 'opened',
    user: 'token'
  },
  {
    id: 14,
    title: 'Test',
    from: 'Forest G.',
    text: 'System test',
    insertURL: ['string'],
    deadline: '2023-12-23',
    status: 'opened',
    user: 'token'
  },
  {
    id: 15,
    title: 'Complaint',
    from: 'John Doe',
    text: 'Complaint from john doe',
    insertURL: ['string'],
    deadline: '2023-12-23',
    status: 'opened',
    user: 'token'
  },
  {
    id: 16,
    title: 'Problem',
    from: 'Anna F.',
    text: 'Problem description',
    insertURL: ['string'],
    deadline: '2023-12-29',
    status: 'opened',
    user: 'token'
  }
];
  populateTable(tickets);
  totalPages = Math.ceil(rows.length / rowsPerPage);
  displayRows(1);
  generatePagination();
}); */

















const statButton = document.getElementById('button-stat');
const url = 'statistics/statistics.html';

statButton.addEventListener('click', function() {
  window.location.href = url;
});

const ticketButton = document.getElementById('middle-btn');
const ticketUrl = 'ticket-overview.html';

ticketButton.addEventListener('click', function() {
  window.location.href = ticketUrl;
});


const closeButton = document.getElementById('button-close');
const closeUrl = 'sign-in/signin.html';

closeButton.addEventListener('click', function() {
  window.location.href = closeUrl;
});


































const viewButton = document.querySelector('.view-button');
viewButton.addEventListener('click', changeSectionView);

function changeSectionView() {

  selectedTicket = tickets.find(ticket => ticket.id === selectedTicketId);

  if (selectedTicket) {

    const oldDivElement =document.querySelector('.main.justify-content-center');
    const newHTML = `
    <div class="main-ticket-view justify-content-center">
    <h2>Ticket View</h2>
    <div class="nav-cont-view">
      <div class="button-container">
        <button class="back-button btn" id="button-back">Back</button>
        <button class="accept-button-view btn">Accept</button>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <div class="ticket">
        <div class="ticket-header">
          <div class="ticket-header-left">
            <span class="mb-1"><strong>From:</strong> ${selectedTicket.from}</span>
            <span><strong>Subject:</strong> ${selectedTicket.title}</span>
          </div>
          <div class="ticket-header-right">
            <span><strong>Deadline:</strong> ${selectedTicket.deadline}</span>
          </div>
        </div>
        <div class="ticket-main">
          <p>${selectedTicket.text}</p>
        </div>
      </div>
    </div>
    </div>
    `;
    
    oldDivElement.outerHTML = newHTML;
    const scriptElement = document.createElement('script');
    scriptElement.src = 'ticket-view.js';
    document.body.appendChild(scriptElement);


  } else {
    console.log("Ticket not found.");
  }
}



const acceptButton = document.querySelector('.accept-button');
acceptButton.addEventListener('click', changeSectionViewAns);

function changeSectionViewAns() {

selectedTicket = tickets.find(ticket => ticket.id === selectedTicketId); 

if (selectedTicket) {

  let oldDivElement = document.querySelector('.main.justify-content-center');

  const newHTML = `
  <div class="main-ans justify-content-center">
  
        <h2>Ticket View</h2>
  
        <div class="nav-cont-view">
          <div class="button-container">
            <button class="back-button btn" id="button-back">Back</button>
            <button class="save-button btn">Save</button>
            <button class="solve-button btn">Solve</button>
          </div>
        </div>
  
        <div class="d-flex justify-content-center">
          <div class="ticket-ans">
            <div class="ticket-header-ans">
              <div class="ticket-header-left">
                <span class="mb-1"><strong>From:</strong> ${selectedTicket.from}</span>
                <span><strong>Subject:</strong> ${selectedTicket.title}</span>
              </div>
              <div class="ticket-header-right">
                <span><strong>Deadline:</strong> ${selectedTicket.deadline}</span>
              </div>
            </div>
            <div class="ticket-main-ans">
              <div id="editor"></div>
            </div>
          </div>
        </div>
      </div>
  `;
  
  oldDivElement.outerHTML = newHTML;
  const scriptElementAns = document.createElement('script');
  scriptElementAns.src = 'ticket-view-ans.js';
  document.body.appendChild(scriptElementAns);



} else {
  console.log("Ticket not found.");
}


}

