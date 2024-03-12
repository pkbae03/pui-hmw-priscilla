document.addEventListener('DOMContentLoaded', function() {


var cart = JSON.parse(localStorage.getItem("cart"));
// creating an empty cart array if it doesn't exist in the storage
if (cart == null) {
    cart = []; 
    localStorage.setItem("cart", JSON.stringify(cart)); //placed in local storage
}
  // creating a roll instance
  class Roll {
      constructor(rollType, rollGlazing, packSize, basePrice) {
          this.type = rollType;
          this.glazing = rollGlazing;
          this.size = packSize;
          this.basePrice = basePrice;
          this.price = (basePrice + options.glazing[rollGlazing]) * options.size[packSize]; //create price calculation
          // add the image path correctly based on the roll type
          this.imagePath = `./assets/products/${rollType.toLowerCase()}-cinnamon-roll.jpg`; //create image path
      }
  }
  
  let totalPrice = 0;//setting price equal to zero

  //function to display cart
  function displayCart(roll) {
      let temp = document.getElementById('cartItemTemplate'); // getting the template
      if (!temp) {// kept getting an error with the temp.content, so created if statement to override so cartBadge could be updated
        console.error("Template element with ID 'cartItemTemplate' not found");
        return;
      }
      let clone = temp.content.cloneNode(true); // clone the template content

      //updated cloned elements with roll information for each clone type
      clone.querySelector('.roll-image').src = roll.imagePath;
      clone.querySelector('.roll-name').innerText = roll.type + ' Cinnamon Roll';
      clone.querySelector('.roll-glazing').innerText = "Glazing: " + roll.glazing;
      clone.querySelector('.packSize').innerText = "Pack Size: " + roll.size;
      clone.querySelector('.packPrice').innerText = "$" + roll.price.toFixed(2);



      // event listener will remove the selected remove class on click
      const removeButton = clone.querySelector('.remove');
      removeButton.addEventListener('click', () => {
        removeButton.parentNode.parentNode.remove();

        //updated price when the remove button is clicked
        updateTotalPrice(-parseFloat(roll.price));

        //calls the function that will remove the item from the cart array
        cart = cartItemRemove(cart,roll);

        //shows the update cart item number on the badge and save it in the local storage
        document.getElementById("cartBadge").textContent = cart.length;
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(cart);
          
      });

      //function removes all occurences of clicked value from the array
      function cartItemRemove(item, value) { 
        return item.filter(function(element){ 
            return element != value; 
            
        });
    }

      // add the cloned items to the cart container
      document.querySelector('.cartContainer').appendChild(clone);

      //total price is called on and updated
      updateTotalPrice(roll.price);
  }

  // for loop in order to display items and calls on displayCart function
  for (let i = 0; i < cart.length; i++) {
      const roll = cart[i];
      displayCart(roll);
  }

  //function to update the total price
  function updateTotalPrice(price) {
      const totalPriceElement = document.getElementById('totalPrice');
      let totalPrice = parseFloat(totalPriceElement.innerText.replace('$', '')) || 0.00;
      totalPrice += parseFloat(price);
      totalPriceElement.innerText = "$" + parseFloat(totalPrice.toFixed(2));
  }

  //function to add the items to the cart and is called in the cart button
  function addToCart() {
    const glazingSelect = document.getElementById("glazingOptions"); 
    const glazingOption = glazingSelect.options[glazingSelect.selectedIndex];
    const rollGlazing = glazingOption.textContent;
    const sizeSelect = document.getElementById("sizeOptions");
    const packSize = sizeSelect.options[sizeSelect.selectedIndex].textContent; // gets the selected pack size
    const basePrice = rolls[rollType].basePrice; // gets the base price based on the selected roll type
  
    //creates a new roll instance with the product info
    const roll = new Roll(rollType, rollGlazing, packSize, basePrice);

    //adds the new roll instance to the cart array
    cart.push(roll);
  
    //prints the current contents of the cart in local storage
    console.log(localStorage.getItem("cart"));
    
  }

  
      //updates the cart badge to display the current number of items in the cart
      document.getElementById("cartBadge").textContent = cart.length;
  
      //converts the cart array to JSON
      const cartJSON = JSON.stringify(cart);
    
      //saves the cart JSON in local storage
      localStorage.setItem("cart", cartJSON);
});
