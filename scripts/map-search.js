// grab the box and image elements
const box = document.getElementById("box");
var img = document.querySelector("img");

var array = [[]];
var data;

// var imgWidth = img.width, imgHeight = img.height;
// console.log(imgWidth + "x" + imgHeight);
// var imgX = img.x, imgY = img.y;

var imgX = img.x, imgY = img.y;
console.log("x = " + imgX + "\ny = " + imgY); 

// X and Y starting coordinates for the box
const A1 = [11.5, 36.25];
// amount to push by every iteration
const push = 16.588587;
// unit to push by every iteration - note: unit has to be same as box positioning unit
const unit = 'px';
// measure by which to make the animation smooth - note: 0 means no smoothing
const smoothing = 1;
// time between function calls (FPS for box movement animation)
// const ms = 1;
// previous values: 0.1727275, 'in'

// these variables are used as reference points for the box's current coordinates
let startX = 0, startY = 0;

// move to specific pixel coordinates in reference to the image
function position(object) {
  object.style.left = A1[0] + unit;
  object.style.top = A1[1] + unit;
  startX = 0;
  startY = 0;
}

position(box);

const xC = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
           'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
           'AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH', 'II', 'JJ', 'KK', 'LL', 'MM',
           'NN', 'OO', 'PP', 'QQ', 'RR', 'SS', 'TT', 'UU', 'VV', 'WW', 'XX', 'YY', 'ZZ',
           'AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG', 'HHH', 'III', 'JJJ', 'KKK', 'LLL', 'MMM',
           'NNN', 'OOO'/*, 'PPP', 'QQQ', 'RRR', 'SSS', 'TTT', 'UUU', 'VVV', 'WWW', 'XXX', 'YYY', 'ZZZ'*/];

const yC = [];

for(let i = 1; i <= 75; i++) {
  yC[i - 1] = i;
}

// get coordinate points from grid's dimensions
function getCoordinates(x, y) {

  // determine size of X axis
  let size = xC.length;

  // search xC array to determine X axis point
  for(let i = 0; i < size; i++) {
    if(xC[i] == x) {
      x = i;
      break;
    }
  }

  // determine size of Y axis
  size = yC.length;

  // search yC array to determine Y axis point
  for(let i = 0; i < size; i++) {
    if(yC[i] == y) {
      y = i;
      break;
    }
  }

  // return the dot coordinates
  return [x, y];

}

// get X coordinate from a coordinate point value
function getX(coordinate) {
  return coordinate[0];
}

// get Y coordinate from a coordinate point value
function getY(coordinate) {
  return coordinate[1];
}

// move the box up by 1
function up() {
  box.style.top = (parseFloat(box.style.top) - push / smoothing) + unit;
}

// move the box down by 1
function down() {
  box.style.top = (parseFloat(box.style.top) + push / smoothing) + unit;
}

// move the box left by 1
function left() {
  box.style.left = (parseFloat(box.style.left) - push / smoothing) + unit;
}

// move the box right by 1
function right() {
  box.style.left = (parseFloat(box.style.left) + push / smoothing) + unit;
}

var animation = false;

// move along the Y axis
function moveY(y) {

  /*
  animation = false;

  let animationTimer = setInterval(function() {
    if (animation) { clearInterval(animationTimer); }
    else {
      if(startY > y) {
        up();
        startY -= 1 / smoothing;
      } else if(startY < y) {
        down();
        startY += 1 / smoothing;
      } else {
        clearInterval(animationTimer);
        animation = true;
      }
    }
  }, ms);
  */

  // up border is 1, down border is 75
  while(startY > y) {
    up();
    startY--;
  }

  while(startY < y) {
    down();
    startY++;
  }

}

// move along the X axis
function moveX(x) {

  /*
  animation = false;

  let animationTimer = setInterval(function() {
    if (animation) { clearInterval(animationTimer); }
    else {
      if(startX < x) {
        right();
        startX += 1 / smoothing;
      } else if(startX > x) {
        left();
        startX -= 1 / smoothing;
      } else {
        clearInterval(animationTimer);
        animation = true;
      }
    }
  }, ms);*/
  
  // left border is 1, right border is 67
  while(startX < x) {
    right();
    startX++;
  }

  while(startX > x) {
    left();
    startX--;
  }

}

// move along both axis via coordinate point value
function move(coordinates) {

  // move along both axis via coordinate point value
  if(arguments.length == 1) {
    moveX(getX(coordinates));
    moveY(getY(coordinates));
  }
  
  // move along both axis via X and Y values
  else if(arguments.length == 2) {
    moveX(arguments[0] - 1);
    moveY(arguments[1] - 1);
  }

}

const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

function csvToArray(str, delimiter = ",") {

  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  const arr = rows.map(function (row) {

    const values = row.split(delimiter);

    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});

    return el;

  });

  // return the array
  return arr;

}

// search function for searching an array of strings for a string
function search(toSearch, criteria) {
  // console.log(criteria);
  // for each item in the array...
  for (i = 0; i < toSearch.length; i++) {
    // console.log(i + " >> " + toSearch[i] + " = " + criteria + " ?");
    if (toSearch[i] === criteria) {
      // console.log(i);
      return i;
    }
  }
  // console.log(-1);
  return -1;
}

// submit button functionality
/*
myForm.addEventListener("submit", function (e) {

  e.preventDefault();

  // find input file
  const input = csvFile.files[0];
  
  // filereader to read the document
  const reader = new FileReader();

  // create an array out of the data
  reader.onload = function (e) {
    const text = e.target.result;
    array = csvToArray(text);
    // document.write(JSON.stringify(data));
    // document.write(array);
    // console.log(array);
  };
  
  // read the text to the screen
  reader.readAsText(input);

});*/

// function to find all occurences of "searchStr" in "str" (returns array)
/*
function searchString(str, searchStr, caseSensitive) {
  var searchStrLen = searchStr.length;
  if (searchStrLen == 0) {
      return [];
  }
  var startIndex = 0, index, values = [];
  if (!caseSensitive) {
      str = str.toLowerCase();
      searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      values.push(index);
      startIndex = index + searchStrLen;
  }
  return values;
}*/

// function to create autocomplete effect
function autocomplete(inp, arr, nonSort) {

  // the autocomplete function takes two arguments,
  // the text field element and an array of possible autocompleted values:
  var currentFocus;
  // execute a function when someone writes in the text field:
  inp.addEventListener("input", function(e) {

    var sectionContainer, a, b, i, val = this.value;

    // close any already open lists of autocompleted values
    closeAllLists();

    if (!val) { return false;}
    currentFocus = -1;

    // create a DIV element that will contain the items (values):
    a = document.createElement("DIV");

    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");

    // append the DIV element as a child of the autocomplete container:
    this.parentNode.appendChild(a);

    // sort the array
    arr.sort();

    // for each item in the array...
    for (i = 0; i < arr.length; i++) {

      for(j = 0; j < arr[i].length; j++) {

        // check if the item starts with the same letters as the text field value (add .toUpperCase() to both to remove casesensitivity):
        if (arr[i].substr(j, val.length) == val) {

          j = arr[i].length;

          // create a DIV element for each matching element:
          // b = document.createElement("DIV");
          b = document.createElement("a");
          b.setAttribute("href", "#box");

          // find the matching locations
          // let locations = searchString(arr[i], val);

          // code for people learning what NOT to do when bolding multiple lines:

          // make the matching letters bold:
          // b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          // b.innerHTML += arr[i].substr(val.length);
          
          // using the located matching locations, make the matching letters bold:
          // for(s = 0; s < locations.length; s++) {
          //   // part of the string before the matching location
          //   if(s > 0) { b.innerHTML = arr[i].substr(locations[s - 1] + val.length, locations[s]); }
          //   else { b.innerHTML = arr[i].substr(0, locations[s]); }
          //   // matching part of the string
          //   b.innerHTML += "<strong>" + arr[i].substr(locations[s], val.length) + "</strong>";
          //   // part of the string after the matching location
          //   if(s < locations.length) { b.innerHTML += arr[i].substr(locations[s] + val.length, locations[s + 1]); }
          //   else { b.innerHTML += arr[i].substr(locations[s], arr[i].length); }
          // }
          
          // bold all matches to current input value
          // b.innerHTML = arr[i].replace(`${val}`, "<strong>" + val + "</strong>");
          
          b.innerHTML = "<div class=\"text-hover\">" + arr[i].replaceAll(`${val}`, "<strong>" + val + "</strong>") + "</div>";
          
          // insert a input field that will hold the current array item's value:
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

          let temp = i;

          // execute a function when someone clicks on the item value (DIV element):
          b.addEventListener("click", function(e) {

            e.preventDefault();

            // insert the value for the autocomplete text field:
            inp.value = arr[temp];

            let results = search(nonSort, inp.value);
            // console.log("found out that " + inp.value + " is located at index: " + results);

            move(getCoordinates(array[results]["txtXAxes"], array[results]["txtYAxes"] - 25));
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            move(getCoordinates(array[results]["txtXAxes"], array[results]["txtYAxes"]));

            // console.log("Result value: " + results);
            // console.log("Relocating box to coordinates: (" + array[results]["txtXAxes"] + ", " + array[results]["txtYAxes"] + ")");
            // console.log("> input value: " + inp.value);
            // console.log("> temp value: " + temp);
            // console.log("> arr[temp - 1] value: " + arr[temp - 1]);
            // console.log("> arr[temp] value: " + arr[temp]);

            // close the list of autocompleted values,
            // (or any other open lists of autocompleted values:
            closeAllLists();

          });

          a.appendChild(b);

        }

      }
    
    }

  });

  // execute a function presses a key on the keyboard:
  inp.addEventListener("keydown", function(e) {

    var x = document.getElementById(this.id + "autocomplete-list");

    if (x) x = x.getElementsByTagName("div");

    if (e.keyCode == 40) {

      // If the arrow DOWN key is pressed,
      // increase the currentFocus variable:
      currentFocus++;

      // and and make the current item more visible:
      addActive(x);

    } else if (e.keyCode == 38) { // up

      // If the arrow UP key is pressed,
      // decrease the currentFocus variable:
      currentFocus--;

      // and and make the current item more visible:
      addActive(x);

    } else if (e.keyCode == 13) {

      // If the ENTER key is pressed, prevent the form from being submitted,
      e.preventDefault();

      if (currentFocus > -1) {

        // and simulate a click on the "active" item:
        if (x) x[currentFocus].click();
        
      }

    }

  });

  function addActive(x) {

    // a function to classify an item as "active":
    if (!x) return false;

    // start by removing the "active" class on all items:
    removeActive(x);

    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);

    // add class "autocomplete-active":
    x[currentFocus].classList.add("autocomplete-active");

  }

  function removeActive(x) {

    // a function to remove the "active" class from all autocomplete items:
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }

  }

  function closeAllLists(elmnt) {

    // close all autocomplete lists in the document,
    // except the one passed as an argument:
    var x = document.getElementsByClassName("autocomplete-items");

    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }

  }

  // execute a function when someone clicks in the document:
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });

}

var list = [];
var dontSort = [];

// async function loadList() {
//   list = await array.slice(0);
// }

async function loadFile(url) {
  try {
    // fetch data from given link; works with server file paths or files on the web
    array = await fetch(url);
    data = await array.text();
    // console.log(data);
    array = csvToArray(data, ";");
    // loadList();
    // load only the data that is useful to the user into the list for autocompletion
    list = overrideList(array);
    dontSort = overrideList(array);
    // initiate the autocomplete function on the "searchbar" element, and pass along the csv array as possible autocomplete values:
    autocomplete(document.getElementById("searchbar"), list, dontSort);
  } catch (err) {
    console.error(err);
    console.log("This website must be run using a server, for example the free Live Server extension for Visual Studio Code will work.");
  }
}

// grab only data valuable to the user
function overrideList(arr) {
  let newArray = [];
  for(let i = 0; i < arr.length - 1; i++) {
      newArray[i] = arr[i]["txtFirstName"];
      if(arr[i]["txtFirstName"]) {
        newArray[i] += " ";
      }
      if(arr[i]["txtMiddleName"]) {
        newArray[i] += arr[i]["txtMiddleName"] + " ";
      }
      newArray[i] += arr[i]["txtLastName"] + " (" + arr[i]["dteBirth"] + " - " + arr[i]["dteDeath"] + ")";
      if(arr[i]["txtBranchService"] || arr[i]["txtWar"]) { newArray[i] += " ["; }
      if(arr[i]["txtBranchService"]) { newArray[i] += arr[i]["txtBranchService"]; }
      if(arr[i]["txtBranchService"] && arr[i]["txtWar"]) { newArray[i] += " - "; }
      if(arr[i]["txtWar"]) { newArray[i] += arr[i]["txtWar"]; }
      if(arr[i]["txtBranchService"] || arr[i]["txtWar"]) { newArray[i] += "]"; }
  }
  return newArray;
}

loadFile('../tables/tblPeople.txt');