const loginToggle = document.getElementById('login-toggle');
const registerToggle = document.getElementById('register-toggle');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const authMessage = document.getElementById('auth-message');

// Toggle between Login and Register
loginToggle.addEventListener('click', () => {
    loginToggle.classList.add('active');
    registerToggle.classList.remove('active');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    authMessage.classList.add('hidden');
});

registerToggle.addEventListener('click', () => {
    registerToggle.classList.add('active');
    loginToggle.classList.remove('active');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    authMessage.classList.add('hidden');
});

// Helper to show messages
function showMessage(msg, isSuccess) {
    authMessage.textContent = (isSuccess ? "✅ " : "❌ ") + msg;
    authMessage.className = isSuccess ? "response-success" : "response-error";
    authMessage.classList.remove('hidden');
}

// REGISTER logic
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    try {
        const res = await fetch('http://127.0.0.1:5001/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await res.json();
        if (res.ok) {
            showMessage(data.message, true);
            registerForm.reset();
            // Automatically switch to login after successful registration
            setTimeout(() => loginToggle.click(), 2000);
        } else {
            showMessage(data.error, false);
        }
    } catch (err) {
        showMessage("Server connection failed", false);
    }
});

// LOGIN logic
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const res = await fetch('http://127.0.0.1:5001/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            showMessage("Login successful! Redirecting...", true);
            // Store token and user data in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showMessage(data.error, false);
        }
    } catch (err) {
        showMessage("Server connection failed", false);
    }
});