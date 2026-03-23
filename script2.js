// Navigation Handling

const navItems = document.querySelectorAll('.nav-link');
const tabSections = document.querySelectorAll('.tab-content');

// I briefly considered event delegation here,
// but this is easier to reason about at the moment.
navItems.forEach(function(item) {
item.addEventListener('click', function(event) {
event.preventDefault();

    // Reset all nav states
    navItems.forEach(function(nav) {
        nav.classList.remove('active');
    });

    // Hide all sections (might be slightly repetitive, but safe)
    tabSections.forEach(function(section) {
        section.classList.add('hidden');
    });

    // Activate clicked tab
    item.classList.add('active');

    // Convert link-xyz → view-xyz (assuming naming convention stays consistent)
    var targetView = item.id.replace('link-', 'view-');
    var targetEl = document.getElementById(targetView);

    if (targetEl) {
        targetEl.classList.remove('hidden');
    }
    // else {
    //     console.warn("No matching view found for:", targetView);
    // }
});


});

// Wallet Logic
let walletBalance = 0.00;

/*Toast helper.*/
function showToast(messageText) {

let wrapper = document.getElementById('notification-container');

// Create container if it doesn't exist
if (!wrapper) {
    wrapper = createNotificationWrapper();
}

const toastEl = document.createElement('div');
toastEl.className = 'toast success';
toastEl.innerText = messageText;

wrapper.appendChild(toastEl);

// Auto remove after 3 seconds
setTimeout(function() {
    toastEl.style.opacity = '0';

    setTimeout(function() {
        if (toastEl && toastEl.parentNode) {
            toastEl.parentNode.removeChild(toastEl);
        }
    }, 500);
}, 3000);


}

// Slight rename from original, just sounds better to me
function createNotificationWrapper() {
const box = document.createElement('div');
box.id = 'notification-container';
document.body.appendChild(box);
return box;
}

// Update wallet display in UI
function refreshBalanceUI() {
const balanceNode = document.querySelector('.primary-bg .value');

// Defensive check (ran into null errors earlier while testing)
if (balanceNode) {
    balanceNode.innerText = '₹' + walletBalance.toFixed(2);
}


}

// Preset Top-up Buttons
document.querySelectorAll('.preset-btn').forEach(function(button) {
button.addEventListener('click', function() {

    var rawText = button.innerText || '';
    var cleanAmount = rawText.replace('₹', '').trim();

    const inputField = document.querySelector('.top-up-input');
    if (inputField) {
        inputField.value = cleanAmount;
    }
});


});
// Manual Top-up
const topUpButton = document.querySelector('.top-up-btn');

if (topUpButton) {
topUpButton.addEventListener('click', function() {

    const inputBox = document.querySelector('.top-up-input');
    if (!inputBox) return; // fail silently for now

    const enteredValue = parseFloat(inputBox.value);
    const amountToAdd = isNaN(enteredValue) ? 0 : enteredValue;

    if (amountToAdd > 0) {

        // Not rounding before adding — might cause tiny float issues later.
        walletBalance = walletBalance + amountToAdd;

        refreshBalanceUI();
        showToast("Wallet topped up successfully!");

        // Reset to default value
        inputBox.value = "25";

    } else {
        alert("Please enter a valid amount.");
    }
});


}

// Check-In Logic
const checkInBtn = document.querySelector('.btn-green');

if (checkInBtn) {
checkInBtn.addEventListener('click', function() {

    const formInputs = document.querySelectorAll('#view-checkin input');

    // Slightly relying on index positions (not ideal but quick implementation)
    var rfidValue = formInputs[0] ? formInputs[0].value : '';
    var vehicleNumber = formInputs[1] ? formInputs[1].value : '';
    var selectedSpaceEl = document.getElementById('parkingSpace');
    var selectedSpace = selectedSpaceEl ? selectedSpaceEl.value : '';

    if (rfidValue && vehicleNumber && selectedSpace) {
        alert("Checking in Vehicle: " + vehicleNumber + " at Space: " + selectedSpace);

        // TODO: maybe store check-in state somewhere?
    } else {
        alert("Please fill in all fields.");
    }
});


}

// Checkout Logic
const checkoutBtn = document.querySelector('.btn-red');

if (checkoutBtn) {
checkoutBtn.addEventListener('click', function() {

    alert("Processing payment and checkout...");

    // TODO: Deduct parking fee from walletBalance
    // Might integrate timer-based billing later.
});


}
// Subscription Upgrade
const upgradeButton = document.querySelector('.upgrade-btn');

if (upgradeButton) {
upgradeButton.addEventListener('click', function() {

    const enteredCard = prompt("Enter your permanent card number:");

    // Not validating format yet — will revisit if needed
    if (enteredCard && enteredCard.trim() !== "") {

        const statusLabel = document.getElementById('sub-status');

        if (statusLabel) {
            statusLabel.innerText = "10% Discount (Active)";
        }

        showToast("Subscription upgraded successfully!");

        // Hide upgrade button after success
        upgradeButton.style.display = 'none';
    }
});


}