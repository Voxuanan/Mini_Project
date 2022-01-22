const toggles = Array.from(document.querySelectorAll(".toggle"));

const familyEl = document.querySelector("#family");
const moneyEl = document.querySelector("#money");
const timeEl = document.querySelector("#time");

toggles.forEach((toggle) =>
    toggle.addEventListener("change", (e) => {
        if (toggles.every((toggle) => toggle.checked)) {
            if (e.target === familyEl) {
                timeEl.checked = false;
            }

            if (e.target === moneyEl) {
                familyEl.checked = false;
            }

            if (e.target === timeEl) {
                moneyEl.checked = false;
            }
        }
    })
);
