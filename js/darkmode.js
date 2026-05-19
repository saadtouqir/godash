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