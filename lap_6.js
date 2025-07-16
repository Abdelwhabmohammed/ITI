const form = document.getElementById('profileForm');
const errorDiv = document.getElementById('error');
const display = document.getElementById('profileDisplay');

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function displayProfile(profile) {
  display.innerHTML = `
    <h3>Saved Profile</h3>
    <p><strong>Name:</strong> ${profile.name}</p>
    <p><strong>Email:</strong> ${profile.email}</p>
    <p><strong>Bio:</strong> ${profile.bio}</p>
  `;
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  errorDiv.textContent = '';

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const bio = document.getElementById('bio').value.trim();

  if (!name || !email) {
    errorDiv.textContent = 'Name and Email are required.';
    return;
  }

  if (!validateEmail(email)) {
    errorDiv.textContent = 'Please enter a valid email address.';
    return;
  }

  const profile = { name, email, bio };
  localStorage.setItem('profile', JSON.stringify(profile));
  displayProfile(profile);
  form.reset();
});

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('profile');
  if (saved) {
    displayProfile(JSON.parse(saved));
  }
});
