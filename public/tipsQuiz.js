// List of tips for reducing waste
const tips = [ 
    "Use reusable shopping bags instead of plastic bags.",
    "Compost organic waste to reduce landfill waste.",
    "Repair and repurpose old items instead of throwing them away.",
    "Buy products with minimal packaging to reduce waste.",
    "Use a refillable water bottle instead of buying plastic bottles.",
    "Donate clothes and electronics instead of discarding them.",
    "Avoid disposable utensils and opt for reusable alternatives.",
    "Purchase in bulk to reduce packaging waste."
];

let currentTipIndex = 0;
const tipText = document.getElementById("currentTip");
const prevButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

// Displaying the first tip
tipText.textContent = tips[currentTipIndex];

// Moving to next tip when right button is pressed
prevButton.addEventListener("click", function () {
    currentTipIndex = (currentTipIndex - 1 + tips.length) % tips.length;
    tipText.textContent = tips[currentTipIndex];
});

// Moving to previous tip when left button is pressed
nextButton.addEventListener("click", function () {
    currentTipIndex = (currentTipIndex + 1) % tips.length;
    tipText.textContent = tips[currentTipIndex];
});