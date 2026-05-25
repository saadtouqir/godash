document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    const responseDiv = document.getElementById('contact-response');

    // Simulate sending a message (can be connected to a backend route later)
    try {
        // Show loading
        const btn = e.target.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = "Sending...";
        btn.disabled = true;

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Display success
        responseDiv.textContent = "✅ Message sent! We'll get back to you soon.";
        responseDiv.className = "response-success"; // Reuse forms.css success style
        responseDiv.classList.remove('hidden');
        
        e.target.reset();
        btn.textContent = originalText;
        btn.disabled = false;

    } catch (error) {
        responseDiv.textContent = "❌ Failed to send message. Please try again.";
        responseDiv.className = "response-error";
        responseDiv.classList.remove('hidden');
    }
});