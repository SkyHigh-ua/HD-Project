// Fetch request to send form data to the server
function signUp() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm_password').value;

  // Check if any field contains spaces
  if (hasSpaces(name) || hasSpaces(email) || hasSpaces(password) || hasSpaces(confirmPassword)) {
    alert('Fields cannot contain spaces');
    return; // Exit the function if any field contains spaces
  }
  
    if (isEmpty(name) || isEmpty(email) || isEmpty(password) || isEmpty(confirmPassword)) {
    alert('Fields cannot be empty');
    return; // Exit the function if any field is empty
  }

/*
  const payload = {
    username: name,
    email,
    password,
    confirm_password: confirmPassword
  };


  fetch('/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.error) {
        // Display error message to the user
        alert(data.error);
      } else {
        // Sign up was successful, redirect to sign-in page or display success message
        alert('User signed up successfully');
        window.location.href = 'signin.html'; // Redirect to sign-in page
      }
    })
    .catch(error => {
      console.error('Error:', error);
    }); */
	console.log('all is OK')
}

// Helper function to check if a string contains spaces
function hasSpaces(value) {
  return /\s/.test(value);
}

function isEmpty(value) {
  return value.trim().length === 0;
}

// Add event listener to the form submit button
const signUpForm = document.getElementById('signup-form');
signUpForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission
  signUp(); // Call the signUp function to send the request
});