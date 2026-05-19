// This file contains the JavaScript code for handling the dark mode 
// toggle functionality on the GoDash frontend. 
// It includes an event listener for the dark mode toggle button, 
// which toggles the "dark-mode" class on the body element. 
// The user's dark mode preference is saved in localStorage, 
// allowing the site to remember the setting across page reloads. 
// When the page loads, it checks localStorage for the dark mode setting and applies it if necessary.
const darkModeToggle =
    document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode")
    );
});

window.addEventListener("load", () => {

    const darkMode =
        localStorage.getItem("darkMode");

    if (darkMode === "true") {

        document.body.classList.add("dark-mode");
    }
});