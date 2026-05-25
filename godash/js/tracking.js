document.addEventListener('DOMContentLoaded', () => {
    // 1. Generate Random Order ID
    const orderId = Math.floor(100000 + Math.random() * 900000);
    document.getElementById('display-order-id').textContent = orderId;

    // 2. Load Delivery Data
    const deliveryDetails = JSON.parse(localStorage.getItem('deliveryDetails'));
    
    if (deliveryDetails) {
        document.getElementById('track-date').textContent = deliveryDetails.date;
        document.getElementById('track-time').textContent = deliveryDetails.time;
        document.getElementById('track-type').textContent = 
            deliveryDetails.type.charAt(0).toUpperCase() + deliveryDetails.type.slice(1);
    }

    // 3. Countdown Timer (Simulated 3 hours)
    let totalSeconds = 3 * 60 * 60; // 3 hours

    const timerDisplay = document.getElementById('countdown-timer');

    const interval = setInterval(() => {
        totalSeconds--;

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        timerDisplay.textContent = 
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        // 4. Update Progress Steps based on time
        updateProgress(totalSeconds);

        if (totalSeconds <= 0) {
            clearInterval(interval);
            timerDisplay.textContent = "00:00:00";
            timerDisplay.style.color = "#10b981"; // Success green
        }
    }, 1000);

    function updateProgress(secondsLeft) {
        const step2 = document.getElementById('step-2');
        const step3 = document.getElementById('step-3');
        const step4 = document.getElementById('step-4');

        // Logic to simulate stages
        if (secondsLeft < 10700) { // After 5 mins, mark as Packed
            step2.classList.add('active');
        }
        if (secondsLeft < 5400) { // After 1.5 hours, mark as Out for Delivery
            step3.classList.add('active');
        }
        if (secondsLeft <= 0) { // At 0, mark as Delivered
            step4.classList.add('active');
        }
    }
});