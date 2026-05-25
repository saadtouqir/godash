document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('delivery-date');
    const slotBtns = document.querySelectorAll('.slot-btn');
    const typeRadios = document.querySelectorAll('input[name="delivery-type"]');
    const confirmBtn = document.getElementById('confirm-delivery-btn');

    const previewDate = document.getElementById('preview-date');
    const previewTime = document.getElementById('preview-time');
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryDeliveryFee = document.getElementById('summary-delivery-fee');
    const summaryGrandTotal = document.getElementById('summary-grand-total');

    let selectedDate = '';
    let selectedTime = '';
    let deliveryCost = 5;
    let subtotal = parseFloat(localStorage.getItem('orderSubtotal')) || 0;

    // 1. Set Min Date to Today
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // 2. Load Subtotal
    summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
    updateTotals();

    // 3. Date Selection
    dateInput.addEventListener('change', (e) => {
        selectedDate = e.target.value;
        previewDate.textContent = selectedDate;
        checkValidation();
    });

    // 4. Time Slot Selection
    slotBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            slotBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedTime = btn.dataset.time;
            previewTime.textContent = selectedTime;
            checkValidation();
        });
    });

    // 5. Delivery Type Selection
    typeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            deliveryCost = parseFloat(e.target.dataset.cost);
            summaryDeliveryFee.textContent = `$${deliveryCost.toFixed(2)}`;
            updateTotals();
        });
    });

    function updateTotals() {
        const grandTotal = subtotal + deliveryCost;
        summaryGrandTotal.textContent = `$${grandTotal.toFixed(2)}`;
    }

    function checkValidation() {
        if (selectedDate && selectedTime) {
            confirmBtn.disabled = false;
        } else {
            confirmBtn.disabled = true;
        }
    }

    // 6. Confirm Delivery
    confirmBtn.addEventListener('click', () => {
        const deliveryData = {
            date: selectedDate,
            time: selectedTime,
            type: document.querySelector('input[name="delivery-type"]:checked').value,
            cost: deliveryCost,
            total: subtotal + deliveryCost
        };

        localStorage.setItem('deliveryDetails', JSON.stringify(deliveryData));
        
        // Show success and redirect
        confirmBtn.textContent = "Processing Order...";
        confirmBtn.disabled = true;

        setTimeout(() => {
            window.location.href = 'tracking.html';
        }, 2000);
    });
});