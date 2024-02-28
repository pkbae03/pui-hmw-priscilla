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



// creates an object with options for glazing and pack size
const options = {
  glazing: {
      "Keep original": 0,
      "Sugar milk": 0,
      "Vanilla milk": 0.5,
      "Double chocolate": 1.5
  },
  size: {
      "1": 1,
      "3": 3,
      "6": 5,
      "12": 10
  }
};


class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
      this.type = rollType;
      this.glazing =  rollGlazing;
      this.size = packSize;
      this.basePrice = basePrice;
      this.price = (basePrice + options.glazing[rollGlazing]) * options.size[packSize];
      this.imagePath = "./assets/products/" + rolls[rollType].imageFile;
  }
}

var original = new Roll("Original","Sugar Milk","1",2.49)
cart.push(original)
var walnut = new Roll("Walnut","Vanilla Milk","12",3.49);
cart.push(walnut);
var raisin = new Roll("Raisin","Sugar Milk","3",2.99);
cart.push(raisin);
var apple = new Roll("Apple","Original","3",3.49);
cart.push(apple);



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