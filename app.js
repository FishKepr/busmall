'use strict';

//Array to store the objects
var allProducts = [];

//Arrays for current and next selections
var currProducts = [0,0,0];
var newProducts = [0,0,0];

//Misc working area fields
var maxArrayLimit = 3;
var numSelections = 0;
var maxSelections = 25;

//Constructor for products
function Product(name, filepath, numSelected, numViews) {
  this.name = name;
  this.filepath = filepath;
  this.numSelected = numSelected;
  this.numViews = numViews;
  allProducts.push(this);
}

//******* MAINLINE ********

//Restore from checkpoint if one exists, otherwise load new product array
(function getLocalStorage() {
  if (localStorage.products) {
    //Reload Product Array
    var strProducts = localStorage.getItem('products');
    var products = JSON.parse(strProducts);
    for (var prod of products) {
      var newProd = new Product(prod.name, prod.filepath, prod.numSelected, prod.numViews);
    }
    //Reload number of selections
    var strNumSelections = localStorage.getItem('numselections');
    numSelections = JSON.parse(strNumSelections);
    console.log('numSelections: '+numSelections);
    //Reload current product array
    var strCurrProducts = localStorage.getItem('currproducts');
    currProducts = JSON.parse(strCurrProducts);
    displayCurrProducts();
  } else {
    //This is the first iteration, create the product array and post first images
    instantiateProducts();
    randomProducts();
  }
})();

//If we are loading or reloading the page before results are done, declare listeners, otherwise output the totals.
if (numSelections < maxSelections) {
  var imgEl0 = document.getElementById('product0');
  var imgEl1 = document.getElementById('product1');
  var imgEl2 = document.getElementById('product2');
  imgEl0.addEventListener('click', SelectedZero);
  imgEl1.addEventListener('click', SelectedOne);
  imgEl2.addEventListener('click', SelectedTwo);
} else {
  //User reloaded the page after completing survey, output totals.
  outputTotals();
}

//Create listener to clear local storage on command.
var clearLS = document.getElementById('clearStorage');
clearLS.addEventListener('click', function() {
  console.log('Clearing Local Storage');
  localStorage.clear();
});

//******** FUNCTIONS START HERE ********

//Build product objects
function instantiateProducts() {
  new Product('bag','bag.jpeg',0,0);
  new Product('banana','banana.jpeg',0,0);
  new Product('bathroom','bathroom.jpeg',0,0);
  new Product('boots','boots.jpeg',0,0);
  new Product('breakfast','breakfast.jpeg',0,0);
  new Product('bubblegum','bubblegum.jpeg',0,0);
  new Product('chair','chair.jpeg',0,0);
  new Product('cthulhu','cthulhu.jpeg',0,0);
  new Product('dog-duck','dog-duck.jpeg',0,0);
  new Product('dragon','dragon.jpeg',0,0);
  new Product('pen','pen.jpeg',0,0);
  new Product('pet-sweep','pet-sweep.jpeg',0,0);
  new Product('tauntaun','tauntaun.jpeg',0,0);
  new Product('unicorn','unicorn.jpeg',0,0);
  new Product('usb','usb.gif',0,0);
  new Product('water-can','water-can.jpeg',0,0);
  new Product('wine-glass','wine-glass.jpeg',0,0);
}

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

  //Take Checkpoint:  Save results to local storage
  var strProducts = JSON.stringify(allProducts);
  localStorage.setItem('products', strProducts);
  var strNumSelections = JSON.stringify(numSelections);
  localStorage.setItem('numselections', strNumSelections);

  //If we are done, output the totals, otherwise post a new set
  if (numSelections < maxSelections) {
    randomProducts();
  } else{
    outputTotals();
  }
}

//Randomly display a selection of pictures (but with no duplicates)
function randomProducts() {
  for (var i=0; i<maxArrayLimit; i++) {
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

  //Replace current products array with the one and clear new product array.
  currProducts = newProducts;
  newProducts = [0,0,0];

  //Replace the images on the page
  displayCurrProducts();

  //Take Checkpoint of current products displayed.
  var strCurrProducts = JSON.stringify(currProducts);
  localStorage.setItem('currproducts', strCurrProducts);

  console.log(numSelections);
  numSelections++;
}

//This function displays the current array of products
function displayCurrProducts(){
  for (var j=0; j<maxArrayLimit; j++) {
    var imgEl = document.getElementById('product'+j);
    imgEl.src = 'img/'+currProducts[j].filepath;
    imgEl.alt = currProducts[j].name;
  }
}

//This function checks for duplicate occurances of the same product.
//We need to check both arrays to avoid contiguous occurances.
function checkDupe(randomProduct) {
  var dupFound = false;
  for (var i=0;i<maxArrayLimit;i++) {
    if (allProducts[randomProduct]===currProducts[i]) {
      console.log('Found Dupe in Current Products');
      dupFound = true;
    }
  }
  for (i=0;i<maxArrayLimit;i++) {
    if (allProducts[randomProduct]===newProducts[i]) {
      console.log('Found Dupe in New Products');
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

  //Change border of products to red, thick
  var productPic = document.getElementsByClassName('productpic');
  for (var i=0; i<productPic.length; i++) {
    productPic[i].style.borderColor = 'red';
    productPic[i].style.borderWidth = 'thick';
  }

  //Change sub-header
  var subheader = document.getElementById('subheader');
  subheader.textContent = 'Thank you for participating.';

  //Output Totals
  var listheader = document.getElementById('listheader');
  listheader.textContent = 'Survey Results';

  var resultsList = document.getElementById('resultsList');
  var liEl;

  var chartLabels = [];
  var chartNumVotes = [];
  var chartNumViews = [];

  //Spin through the products to generate the results
  for (i=0; i<allProducts.length; i++) {
    console.log(allProducts[i].name);
    console.log(allProducts[i].numSelected);

    //Build Chart Arrays
    chartLabels.push(allProducts[i].name);
    chartNumVotes.push(allProducts[i].numSelected);
    chartNumViews.push(allProducts[i].numViews);

    //Append each list line
    liEl = document.createElement('li');
    liEl.textContent = allProducts[i].numSelected + ' votes for the ' + allProducts[i].name + ' out of ' + allProducts[i].numViews + ' views.';
    resultsList.appendChild(liEl);
  }

  //Output a chart of the results.

  var ctx = document.getElementById('chartarea').getContext('2d');

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartLabels,
      datasets: [{
        label: '# of Votes',
        data: chartNumVotes,
        backgroundColor: 'purple'
      },
      {
        label: '# of Views',
        data: chartNumViews,
        backgroundColor: 'lightblue'
      }]
    },
    options: {
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true
          },
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
        }]
      }
    }
  });
}