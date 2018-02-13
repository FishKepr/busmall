'use strict';

//Array to store the objects
var allProducts = [];

//Arrays for current and next selections
var currProducts = [];
var newProducts = [];

//Misc working area fields
var maxArrayLimit = 3;
var numSelections = 0;
var maxSelections = 25;

//Constructor for products
function Product(name, filepath) {
  this.name = name;
  this.filepath = 'img/'+filepath;
  this.numSelected = 0;
  this.numViews = 0;
  allProducts.push(this);
}

//******* MAINLINE ********

//Build product objects
new Product('bag','bag.jpeg');
new Product('banana','banana.jpeg');
new Product('bathroom','bathroom.jpeg');
new Product('boots','boots.jpeg');
new Product('breakfast','breakfast.jpeg');
new Product('bubblegum','bubblegum.jpeg');
new Product('chair','chair.jpeg');
new Product('cthulhu','cthulhu.jpeg');
new Product('dog-duck','dog-duck.jpeg');
new Product('dragon','dragon.jpeg');
new Product('pen','pen.jpeg');
new Product('pet-sweep','pet-sweep.jpeg');
new Product('tauntaun','tauntaun.jpeg');
new Product('unicorn','unicorn.jpeg');
new Product('usb','usb.gif');
new Product('water-can','water-can.jpeg');
new Product('wine-glass','wine-glass.jpeg');

// declare listener
var imgEl0 = document.getElementById('product0');
var imgEl1 = document.getElementById('product1');
var imgEl2 = document.getElementById('product2');
imgEl0.addEventListener('click', SelectedZero);
imgEl1.addEventListener('click', SelectedOne);
imgEl2.addEventListener('click', SelectedTwo);

//Initialize working arrays with dummy Values
for (var i=0; i<maxArrayLimit; i++); {
  currProducts.push('dummy');
  newProducts.push('dummy');
}

//Post initial images for selection.
randomProducts();

//******** FUNCTIONS START HERE ********

//Handle/Determine Different Selections
function SelectedZero() {
  userSelection(0);
}
function SelectedOne() {
  userSelection(1);
}
function SelectedTwo() {
  userSelection(2);
}

//Handle Selection
function userSelection(selection) {
  console.log('User selected ' + currProducts[selection].name);
  currProducts[selection].numSelected++;
  //If we are done, output the totals, otherwise post a new set
  if (numSelections < maxSelections) {
    randomProducts();
  } else{
    outputTotals();
  }
}

//Randomly display a selection of pictures (but with no duplicates)
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
    allProducts[randomProduct].numViews++;
  }

  //Replace current products array with the one.
  currProducts = newProducts;

  //Replace the images on the page
  for (var j=0; j<maxArrayLimit;j++) {
    var imgEl = document.getElementById('product'+j);
    imgEl.src = currProducts[j].filepath;
    imgEl.alt = currProducts[j].name;
  }
  console.log(numSelections);
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

//This function outputs the final results of the survey.
function outputTotals() {
  //Turn listeners off
  document.getElementById('product0').removeEventListener('click', SelectedZero);
  document.getElementById('product1').removeEventListener('click', SelectedOne);
  document.getElementById('product2').removeEventListener('click', SelectedTwo);

  //Change sub-header
  var subheader = document.getElementById('subheader');
  subheader.textContent = 'Thank you for participating.';

  //Output Totals
  var listheader = document.getElementById('listheader');
  listheader.textContent = 'Survey Results';

  var resultsList = document.getElementById('resultsList');
  var liEl;

  for (var i=0; i<allProducts.length;i++) {
    console.log(allProducts[i].name);
    console.log(allProducts[i].numSelected);
    liEl = document.createElement('li');
    liEl.textContent = allProducts[i].numSelected + ' votes for the ' + allProducts[i].name + ' out of ' + allProducts[i].numViews + ' views.';
    resultsList.appendChild(liEl);
  }
}