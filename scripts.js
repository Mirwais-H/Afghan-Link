document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const userProfile = document.getElementById('user-profile');
    const avatarText = document.getElementById('avatar-text');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
  
    if (signupForm) {
      signupForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(signupForm);
        const username = formData.get('username');
        const password = formData.get('password');
  
        // Simulate an API call
        setTimeout(() => {
          if (username && password) {
            // Successful signup
            avatarText.textContent = username.charAt(0).toUpperCase();
            userProfile.style.display = 'flex';
            showPopup('Signup successful!');
  
            // Redirect to home page or another action
            window.location.href = 'index.html';
          } else {
            // Failed signup
            showPopup('Signup failed. Please try again.');
          }
        }, 1000);
      });
    }
  
    if (loginForm) {
      loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(loginForm);
        const username = formData.get('username');
        const password = formData.get('password');
  
        // Simulate an API call
        setTimeout(() => {
          if (username === 'test' && password === '1234') {
            // Successful login
            avatarText.textContent = username.charAt(0).toUpperCase();
            userProfile.style.display = 'flex';
            showPopup('Login successful!');
  
            // Redirect to home page or another action
            window.location.href = 'index.html';
          } else {
            // Failed login
            showPopup('Login failed. Invalid credentials.');
          }
        }, 1000);
      });
    }
  
    function showPopup(message) {
      popupMessage.textContent = message;
      popup.style.display = 'block';
    }
  });
  
  function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
  }
  