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





const rowsPerPage = 10;

const table = document.getElementById("myTable");

const pagination = document.getElementById("pagination");

const rows = Array.from(table.querySelectorAll("tbody tr"));

const totalPages = Math.ceil(rows.length / rowsPerPage);

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
