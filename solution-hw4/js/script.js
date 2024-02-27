const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

window.addEventListener('load', function() {
  // set roll image and other details based on roll type
  setRollDetails(rollType);
  //changes roll description based on selection
  changeRollName(rollType);
  // call functions to populate dropdowns
  populateGlazingOptions();
  populateSizeOptions();
});

function populateGlazingOptions() {
  const glazingSelect = document.getElementById("glazingOptions");
 //this for loop is populating through the options object for the dropdown, setting the glazing values
  for (const option in options.glazing) {
      const value = options.glazing[option];
      const optionElement = document.createElement("option");
      optionElement.value = value;
      optionElement.textContent = option;
      glazingSelect.appendChild(optionElement);
  }
}

function populateSizeOptions() {
  const sizeSelect = document.getElementById("sizeOptions");
 //this for loop is populating through the options object for the dropdown, setting the size values 
  sizeSelect.innerHTML = "";
  for (const option in options.size) {
      const value = options.size[option];
      const optionElement = document.createElement("option");
      optionElement.value = value;
      optionElement.textContent = option;
      sizeSelect.appendChild(optionElement);
  }
}
//create glazing calculation changes based off of glazing selections
function glazingChange() {
  const basePrice = rolls[rollType].basePrice; 
  const glazePrice = parseFloat(document.getElementById("glazingOptions").value);
  const total = (basePrice + glazePrice) * parseInt(document.getElementById('sizeOptions').value);

  document.getElementById("basePrice").innerHTML = "$" + total.toFixed(2);
  document.getElementById('basePrice').style.fontWeight = "bold";
}


//create size calculation changes based off of size selections
function sizeChange() {
  const basePrice = rolls[rollType].basePrice; 
  const glazePrice = parseFloat(document.getElementById("glazingOptions").value);
  const total = (basePrice + glazePrice) * parseInt(document.getElementById('sizeOptions').value);

  document.getElementById("basePrice").innerHTML = "$" + total.toFixed(2);
  document.getElementById('basePrice').style.fontWeight = "bold";
}


//creating an empty array
const cart = [];

class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
      this.type = rollType;
      this.glazing =  rollGlazing;
      this.size = packSize;
      this.basePrice = basePrice;
  }
}
//adding rolls to the cart array when button is clicked 
function addToCart() {
  const glazingSelect = document.getElementById("glazingOptions");
  const glazingOption = glazingSelect.options[glazingSelect.selectedIndex];
  const rollGlazing = glazingOption.textContent;

  const sizeSelect = document.getElementById("sizeOptions");
  const packSize = sizeSelect.options[sizeSelect.selectedIndex].textContent; // gets the selected pack size

  const basePrice = rolls[rollType].basePrice; // gets the base price based on the selected roll type

  const roll = new Roll(rollType, rollGlazing, packSize, basePrice);
  cart.push(roll);

  console.log(cart);
}

// function to update the roll description based on selected roll
function changeRollName(selectedRoll) {
  const h2Element = document.getElementById('descr');
  h2Element.textContent = selectedRoll + " Cinnamon Roll";
}