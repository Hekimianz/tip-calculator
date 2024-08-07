const form = document.querySelector("form");
const bill = form.querySelector(".bill__input");
const nPeople = form.querySelector(".people__input");
const inputs = form.querySelectorAll(".bill__input, .people__input");
const percentageInputs = form.querySelectorAll("input[type='radio']");
const customRadio = document.getElementById("custom");
const customInput = document.getElementById("customInput");
const tipTotal = document.querySelector(".tip__result");
const subTotal = document.querySelector(".total__result");
const resetBtn = document.querySelector(".resetBtn");

let billValue = +bill.value || 0;
let nPeopleValue = +nPeople.value || 0;
let percentage = 0;
let resetAvailable = true;

// resetBtn
const checkIfResetAvailable = () => {
  if (billValue === 0 || nPeopleValue === 0) {
    resetAvailable = false;
  } else {
    resetAvailable = true;
  }
};

const resetBtnStyling = () => {
  checkIfResetAvailable();
  if (!resetAvailable) {
    resetBtn.style.backgroundColor = "#0D686D";
    resetBtn.style.pointerEvents = "none";
  } else {
    resetBtn.style.backgroundColor = "#26C2AE";
    resetBtn.style.pointerEvents = "auto";
  }
};

const resetData = () => {
  if (resetAvailable) {
    billValue = 0;
    nPeopleValue = 0;
    renderTotals();
    form.reset();
  }
};

resetBtn.addEventListener("click", resetData);

// Function to update the percentage value
const updatePercentage = () => {
  percentageInputs.forEach((input) => {
    if (input.checked) {
      percentage = +input.value;
    }
  });

  // Ensure custom input percentage is considered
  if (customRadio.checked) {
    percentage = +customInput.value || 0;
  }
  if (billValue > 0 && nPeopleValue > 0 && percentage > 0) {
    renderTotals();
  }
};
updatePercentage();

// Event listener for custom label
document.querySelector(".custom__label").addEventListener("click", function () {
  customRadio.checked = true;
  customInput.classList.add("border");
  updatePercentage();
});

// Event listener for percentage radio buttons
percentageInputs.forEach((input) => {
  input.addEventListener("change", function () {
    updatePercentage();
    if (input.id !== "custom") {
      customInput.classList.remove("border");
    }
  });
});

// Event listener for custom input field
customInput.addEventListener("input", function () {
  if (customRadio.checked) {
    updatePercentage();
  }
});

// Check for empty inputs
const validateInputs = (e) => {
  inputs.forEach((input) => {
    const errorMsg = document.querySelector(`.${e.target.id}__error`);
    if (e.target.value.length === 0) {
      e.target.style.border = "2px solid #E17052";
      errorMsg.style.display = "inline";
    } else {
      e.target.style.border = "none";
      errorMsg.style.display = "none";
    }
  });
};

// get tip per person
function calculateTip() {
  return (billValue * percentage) / 100 / nPeopleValue;
}

// get total per person
function calculateTotal() {
  return billValue / nPeopleValue + calculateTip();
}

// render totals
function renderTotals() {
  let tip = calculateTip() || 0;
  let total = calculateTotal() || 0;
  tipTotal.innerText = `$${tip.toFixed(2)}`;
  subTotal.innerText = `$${total.toFixed(2)}`;
}

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    validateInputs(e);
    if (e.target.id === "bill") {
      billValue = +e.target.value;
    } else {
      nPeopleValue = +e.target.value;
    }
    if (billValue > 0 && nPeopleValue > 0 && percentage > 0) {
      renderTotals();
    }
    resetBtnStyling();
    console.log(billValue);
  });
});

resetBtnStyling();
