'use strict';

//array to store the objects
var allProducts = [];

var currProducts = [];
var newProducts = [];
var maxArrayLimit = 3;
var numSelections = 0;
var maxSelections = 25;
// var allDone = false;

//make my constructor function
function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.numSelected = 0;
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


// declare listener
var imgEl0 = document.getElementById('product0');
var imgEl1 = document.getElementById('product1');
var imgEl2 = document.getElementById('product2');

imgEl0.addEventListener('click', SelectedZero);
imgEl1.addEventListener('click', SelectedOne);
imgEl2.addEventListener('click', SelectedTwo);


//Initialize Arrays with dummy Values

for (var i=0; i<maxArrayLimit; i++); {
  currProducts.push('dummy');
}
for (i=0; i<maxArrayLimit; i++); {
  newProducts.push('dummy');
}

//Post initial images for selection.
randomProducts();

//Handle Selections
function SelectedZero() {
  currProducts[0].numSelected++;
  if (numSelections >= maxSelections) {
    outputTotals();
  } else{
    randomProducts();
  }
}
function SelectedOne() {
  currProducts[1].numSelected++;
  if (numSelections >= maxSelections) {
    outputTotals();
  } else{
    randomProducts();
  }
}
function SelectedTwo() {
  currProducts[2].numSelected++;
  if (numSelections >= maxSelections) {
    outputTotals();
  } else{
    randomProducts();
  }
}

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
    newProducts[i] = allProducts[randomProduct];
  }

  currProducts = newProducts;

  for (var j=0; j<maxArrayLimit;j++) {
    var imgEl = document.getElementById('product'+j);
    imgEl.src = currProducts[j].filepath;
  }
  //Console.log(numSelections);
  numSelections++;
}

//This function checks for duplicate occurances of the same product.
//We need to check both arrays to avoid contiguous occurances.
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

function outputTotals() {
  //Turn listeners off
  document.getElementById('product0').removeEventListener('click', SelectedZero);
  document.getElementById('product1').removeEventListener('click', SelectedOne);
  document.getElementById('product2').removeEventListener('click', SelectedTwo);

  //Output Totals
  var subheader = document.getElementById('subheader');
  subheader.textContent = 'Thank you for participating.';

  //Output Totals
  var resultsList = document.getElementById('resultsList');
  var liEl;

  for (var i=0; i<allProducts.length;i++) {
    console.log(allProducts[i].name);
    console.log(allProducts[i].numSelected);
    liEl = document.createElement('li');
    liEl.textContent = allProducts[i].numSelected + ' votes for the ' + allProducts[i].name;
    resultsList.appendChild(liEl);
  }

}