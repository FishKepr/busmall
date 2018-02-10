'use strict';

//array to store the objects
var allProducts = [];

var currProducts = [];
var newProducts = [];


//make my constructor function
function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  allProducts.push(this);
}

new Product('bag','img/bag.jpeg');
new Product('banana','img/banana.jpeg');
new Product('bathroom','img/bathroom.jpeg');
new Product('boots','img/boots.jpeg');
new Product('breakfast','img/breakfast.jpeg');
new Product('bubblegum','img/bubblegum.jpeg');
new Product('chair','img/chair.jpeg');
new Product('cthulhu','img/cthulhu.jpeg');
new Product('dog-duck','img/dog-duck.jpeg');
new Product('dragon','img/dragon.jpeg');
new Product('pen','img/pen.jpeg');
new Product('pet-sweep','img/pet-sweep.jpeg');
new Product('tauntaun','img/tauntaun.jpeg');
new Product('unicorn','img/unicorn.jpeg');
new Product('usb','img/usb.gif');
new Product('water-can','img/water-can.jpeg');
new Product('wine-glass','img/wine-glass.jpeg');


//listener
var imgEl0 = document.getElementById('product0');
var imgEl1 = document.getElementById('product1');
var imgEl2 = document.getElementById('product2');

imgEl0.addEventListener('click', randomProducts);
imgEl1.addEventListener('click', randomProducts);
imgEl2.addEventListener('click', randomProducts);


//Initialize Arrays with dummy Values
var maxArrayLimit = 3;
for (var i=0; i<maxArrayLimit; i++); {
  currProducts.push('dummy');
}
for (i=0; i<maxArrayLimit; i++); {
  newProducts.push('dummy');
}

randomProducts();

//randomly display three of the pictures (but with no duplicates)
function randomProducts() {
  for (var i=0; i<maxArrayLimit;i++) {
    var found = false;
    while (found === false) {
      var randomProduct = Math.floor(Math.random() * allProducts.length);
      if (checkDupe(randomProduct) === false) {
        found = true;
      }
    }
    console.log(allProducts[randomProduct]);
    newProducts[i] = allProducts[randomProduct];
  }

  currProducts = newProducts;

  for (var j=0; j<maxArrayLimit;j++) {
    console.log(j);
    var imgEl = document.getElementById('product'+j);
    console.log(imgEl);
    console.log(currProducts[j]);
    imgEl.src = currProducts[j].filepath;
  }
}

//This function checks for duplicate occurances of the same product.
function checkDupe(randomProduct) {
  var dupFound = false;
  for (var i=0;i<maxArrayLimit;i++) {
    if (allProducts[randomProduct]===currProducts[i]) {
      dupFound = true;
    }
  }
  for (i=0;i<maxArrayLimit;i++) {
    if (allProducts[randomProduct]===newProducts[i]) {
      dupFound = true;
    }
  }
  return dupFound;
}