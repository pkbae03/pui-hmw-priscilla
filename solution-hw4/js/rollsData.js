// creates an object with options for image and base prices
const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg"
    }    
};

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



// function to update links with roll parameter
function updateLinks() {
    const links = document.querySelectorAll("#roll1 a");
    links.forEach(link => {
        // get the roll type from the alt description of the image
        const rollType = link.querySelector("img").alt;
        // update the href link with the roll parameter
        link.href = "orginal.html?roll=" + rollType;
    });
}

// function to set roll image and other details based on roll type
function setRollDetails(rollType) {
    if (rolls[rollType]) {
        const basePrice = rolls[rollType].basePrice;
        const imageFile = rolls[rollType].imageFile;
        const imagePath = "./assets/products/" + imageFile; // create the image path with corresponding ImageFiles in the rolls object 

        document.getElementById("basePrice").innerHTML = "$" + basePrice.toFixed(2);
        document.getElementById("rollImage").src = imagePath;
    }
}

