document.getElementById('feedback-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const rating = document.getElementById('rating').value;
    const suggestions = document.getElementById('suggestions').value;
    const responseMessage = document.getElementById('response-message');

    const feedbackData = {
        name,
        email,
        rating: parseInt(rating),
        suggestions
    };

    try {
        const response = await fetch('http://localhost:5000/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedbackData)
        });

        const data = await response.json();

        if (response.ok) {
            responseMessage.textContent = "✅ " + data.message;
            responseMessage.className = "response-success";
            document.getElementById('feedback-form').reset();
        } else {
            responseMessage.textContent = "❌ Error: " + data.error;
            responseMessage.className = "response-error";
        }
    } catch (error) {
        console.error("Error submitting feedback:", error);
        responseMessage.textContent = "❌ Failed to connect to server. Please try again later.";
        responseMessage.className = "response-error";
    }
});