//creating an empty array
const cart = [];
// creating a roll class with different constructors
class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
      this.type = rollType;
      this.glazing =  rollGlazing;
      this.size = packSize;
      this.basePrice = basePrice;
      this.price = (basePrice + options.glazing[rollGlazing]) * options.size[packSize]; //create price calculation
      // add the image path correctlly based on the roll type
      this.imagePath = `./assets/products/${rollType.toLowerCase()}-cinnamon-roll.jpg`; //create image path
  }
}
 //creating variable for each type of item that will be displated and adding it to cart array
var original = new Roll("Original","Sugar Milk","1",2.49)
cart.push(original)
var walnut = new Roll("Walnut","Vanilla Milk","12",3.49);
cart.push(walnut);
var raisin = new Roll("Raisin","Sugar Milk","3",2.99);
cart.push(raisin);
var apple = new Roll("Apple","Original","3",3.49);
cart.push(apple);

//function to display cart
function displayCart(roll) {
  let temp = document.getElementById('cartItemTemplate'); // Get the template
  let clone = temp.content.cloneNode(true); // Clone the template content

  // updated cloned elements with roll information for each clone type
  clone.querySelector('.roll-image').src = roll.imagePath;
  clone.querySelector('.roll-name').innerText = roll.type + ' Cinnamon Roll';
  clone.querySelector('.roll-glazing').innerText = "Glazing: " + roll.glazing;
  clone.querySelector('.packSize').innerText = "Pack Size: " + roll.size;
  clone.querySelector('.packPrice').innerText = "$" + roll.price.toFixed(2);

  // event listener will remove the selected remove class on click
  const removeButton = clone.querySelector('.remove');
  removeButton.addEventListener('click', () => {
    roll.element.remove();
    //updated price when the remove button is clicked
    updateTotalPrice(-parseFloat(roll.price));
  });

  // add the cloned items to the cart container
  document.querySelector('.cartContainer').appendChild(clone);

//total price is called on and updated
  updateTotalPrice(roll.price);
}

// the display function is called to display items
for (let i = 0; i < cart.length; i++) {
  const roll = cart[i];
  displayCart(roll);
}

//function to update the price 
function updateTotalPrice(price) {
  const totalPriceElement = document.getElementById('totalPrice');
  let totalPrice = parseFloat(totalPriceElement.innerText.replace('$', '')) || 0;
  totalPrice += parseFloat(price);
  totalPriceElement.innerText = "$" + totalPrice.toFixed(2);
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

