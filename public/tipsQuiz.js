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

// Quiz questions and answers together
const quiz = [
    "Test your knowledge on waste reduction!\n\nClick the right arrow to reveal the first question.", 
    "Q. What is composting used for? (Press next to reveal answer)\n\nA: Disposing electronics\nB: Turning organic waste into fertilizer\nC: Burning plastic waste\nD: Recycling metal",
    "Answer: B\n\nComposting is the process of turning organic waste into fertilizer.\n\n Click next to reveal the next question.",
    "Q. Why is buying in bulk more sustainable?\n\nA: It’s cheaper\nB: It reduces packaging waste\nC: It looks better\nD: It takes up more space",
    "Answer: B\n\nBuying in bulk helps reduce the amount of packaging used, minimizing waste.\n\nClick next to reveal the next question.",
    "Q. How does waste in landfills affect the environment?\n\nA: It creates more jobs\nB: It makes the land fertile\nC: It emits greenhouse gases\nD: It helps recycling",
    "Answer: C\n\nWaste in landfills emits greenhouse gases like methane, contributing to climate change.\n\nClick next to reveal the next question.",
    "Q. What does e-waste refer to?\n\nA: Organic trash\nB: Electronic waste\nC: Garden tools\nD: Furniture",
    "Answer: B\n\nE-waste includes discarded electronic items like phones, computers, and TVs.\n\nClick next to reveal the next question.",
    "Q. How can air pollution from waste be reduced?\n\nA: Burn more waste\nB: Use more landfills\nC: Recycle and compost\nD: Throw trash in rivers",
    "Answer: C\n\nRecycling and composting reduce the need for burning and landfilling, cutting down on air pollution.\n\nClick next to reveal the next question.",
    "Q. How does waste contribute to air pollution?\n\nA: Burning it releases harmful gases\nB: Waste cleans the air\nC: Waste absorbs CO2\nD: It creates oxygen when buried",
    "Answer: A\n\nBurning waste, especially plastics, releases toxic gases that pollute the air.\n\nClick next to reveal the next question.",
    "Q. Why are greenhouse gases from waste harmful?\n\nA: They trap heat in the atmosphere\nB: They boost tree growth\nC: They power wind turbines\nD: They cool the planet",
    "Answer: A\n\nGreenhouse gases like methane trap heat, contributing to global warming.\n\nClick next to reveal the next question.",
    "Q. What does plastic pollution do to coral reefs?\n\nA: Causes disease and damage\nB: Helps coral grow faster\nC: Provides structure for fish\nD: Filters water",
    "Answer: A\n\nPlastic debris can injure coral, carry pathogens, and block sunlight.\n\nClick next to reveal the next question.",
    "End of Quiz.\n\n How did you do? Take the quiz again to improve your score!",
  ];
  
  let currentQuizIndex = 0;
  const currentQuiz = document.getElementById("currentQ");
  const prevQuiz = document.getElementById("previousQ");
  const nextQuiz = document.getElementById("nextQ");
  
  // Displaying the first question
  currentQuiz.textContent = quiz[currentQuizIndex];
  
  // Moving to previous question
  prevQuiz.addEventListener("click", () => {
    currentQuizIndex = (currentQuizIndex - 1 + quiz.length) % quiz.length;
    currentQuiz.textContent = quiz[currentQuizIndex];
  });
  
  // Moving to next question
  nextQuiz.addEventListener("click", () => {
    currentQuizIndex = (currentQuizIndex + 1) % quiz.length;
    currentQuiz.textContent = quiz[currentQuizIndex];
  });
  