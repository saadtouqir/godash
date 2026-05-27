const darkModeToggle =
document.getElementById(
    "dark-mode-toggle"
);

darkModeToggle.addEventListener(
    "change",
    () => {

        document.body.classList.toggle(
            "dark-mode"
        );

    }
);