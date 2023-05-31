// Fetch request to send GET request to the server
function signIn() {
	
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
	
	/*
  fetch('/users/login', {
    method: 'GET'
  })
    .then(response => {
      if (response.status === 200) {
        // Extract the line from the response body
        return response.text();
      } else {
        throw new Error('Sign-in request failed');
      }
    })
    .then(line => {
      // Redirect to ticket-overview page 
      const url = `ticket-overview.html`;
      window.location.href = url;
    })
    .catch(error => {
      console.error('Error:', error);
    });
	*/
	
	console.log('success');
	const url = `../ticket-overview.html`;
    window.location.href = url;
}


// Add event listener to the form submit button
const signInForm = document.getElementById('signin-form');
signInForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission
  signIn(); // Call the signIn function to send the request
});