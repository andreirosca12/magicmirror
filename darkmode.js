// darkmode.js
const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");

    // Darkmode switch text
    if (document.body.classList.contains("dark-mode")) {
        darkModeToggle.textContent = "Light Mode";
    } else {
        darkModeToggle.textContent = "Dark Mode";
    }
});
