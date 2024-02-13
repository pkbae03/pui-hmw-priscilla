

function glazingChange() {
    // get value of selected glazing option
    const basePrice = 2.49; 
    const glazePrice = parseFloat(document.getElementById("glazingOptions").value);
    const total = (basePrice + glazePrice) * parseInt(document.getElementById('sizeOptions').value);


    document.getElementById("basePrice").innerHTML = "$" + total.toFixed(2);
    document.getElementById('basePrice').style.fontWeight = "bold";


  }
  
  function sizeChange() {
    // get value of selected size option

    const basePrice = 2.49; 
    const glazePrice = parseFloat(document.getElementById("glazingOptions").value);
    const total = (basePrice + glazePrice) * parseInt(document.getElementById('sizeOptions').value);
   
    document.getElementById("basePrice").innerHTML = "$" + total.toFixed(2);
    document.getElementById('basePrice').style.fontWeight = "bold";
    

  }