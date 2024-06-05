// Function to display the current date and time
function displayDateTime() {
    const now = new Date();
    const time = document.querySelector(".datetime");
    time.innerHTML = ` ${now.toLocaleString()}`;
}

displayDateTime();

// Update date and time every second
setInterval(displayDateTime, 1000);