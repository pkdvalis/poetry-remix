let vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
let vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);
let instructionsToggle = 0;
let enter;
let input;
const colors = [
  ["8ecae6", "219ebc", "023047", "ffb703", "fb8500"],
  ["fe6a86", "fd969a", "ffdce0", "fee255", "ffdd13"],
  ["ffd6ff", "e7c6ff", "c8b6ff", "b8c0ff", "bbd0ff"],
  [
    "eae4e9",
    "fff1e6",
    "fde2e4",
    "fad2e1",
    "e2ece9",
    "bee1e6",
    "f0efeb",
    "dfe7fd",
    "cddafd",
  ],
  ["fbfbf2", "e5e6e4", "cfd2cd", "a6a2a2", "847577"],
  [
    "03045e",
    "023e8a",
    "0077b6",
    "0096c7",
    "00b4d8",
    "48cae4",
    "90e0ef",
    "ade8f4",
    "caf0f8",
  ],
  ["5f0f40", "9a031e", "fb8b24", "e36414", "0f4c5c"],
  [
    "f94144",
    "f3722c",
    "f8961e",
    "f9844a",
    "f9c74f",
    "90be6d",
    "43aa8b",
    "4d908e",
    "577590",
    "277da1",
  ],
];
let colorIndex = 0;
const paragraphtext = document.querySelector("p");
let totalMagnets = 0;
const audio = new Audio(
  "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
);
let hintTimeout;
let instructionsInterval;
const instructions = {
  choose: "Choose One.",
  instructionsToggleFunction: "Press M to toggle menu.",
  fullscreen: "Press F11 to toggle Full Screen.",
  color: "Press C to cycle color palette.",
  sound: "Press S to toggle sound.",
  reset: "Press R key to reset.",
  enterText: "Press E key to enter text.",
};

//BG Gradient animation
let div = document.querySelector("body");
div.addEventListener("mousemove", function (e) {
  x = e.clientX / vw;
  y = e.clientY / vh;
  //console.log(x,y)
  div.style.background = `linear-gradient(
  ${x * 150}deg,
  rgba(${x * 25},${x * 50},${y * 250},1) ${y * 50}%,
  rgba(${y * 250},${x * 150},209,1) 100%)`;
});

//remove magnets
function removeMagnets() {
  if (totalMagnets > 0) {
    for (let i = 0; i <= totalMagnets; i++) {
      document.getElementById(i).remove();
    }
  }

  if (document.querySelectorAll(".magnet").length > 0) {
    for (let i = 0; i <= document.querySelectorAll(".magnet").length; i++) {
      document.querySelectorAll(".magnet")[i].remove();
    }
  }
  totalMagnets = 0;
}

//clear Screen
function clearScreen() {
  removeMagnets();
  hideButtons();
  instructionsToggle ? instructionsToggleFunction() : null;
  if (
    document.getElementById("textinput") ||
    document.getElementById("enter")
  ) {
    document.getElementById("enter").remove();
    document.getElementById("textinput").remove();
  }
}

//show and fade hints
function showInstruction(index = 1) {
  paragraphtext.innerText = instructions[Object.keys(instructions)[index]];
  index++;
  paragraphtext.style.color = "rgba(255,255,255,1)";
  hintTimeout = setTimeout(() => {
    paragraphtext.style.color = "rgba(255,255,255,0)";
  }, 6000);
}

const moana =
  "La mer est le miroir des étoiles Mais celles-ci enflamment le ciel Et dans mon cœur, allument une étincelle Le choix peut me sembler évident Mais le défi est bien plus grand Les vents tournent et m'éloignent du sable blanc Pourquoi partir Si loin de la maison? De nos amis Et de tous ceux que nous aimons? Aller plus loin D'autres cieux m'ont invitée Mais j'ai peur de m'égarer De me perdre en chemin Si je vais plus loin Quitter tout ce que j'aimais Pour ce futur que l'océan nous promet Dois-je aller plus loin? C'est un destin en devenir Qui demande à s'accomplir Je ne laisserai jamais la peur nous envahir J'entends l'appel Il m'ensorcèle Mais si je pars Je devrais leur dire au revoir ";

const jameswright =
  "Over my head, I see the bronze butterfly, Asleep on the black trunk, Blowing like a leaf in green shadow. Down the ravine behind the empty house, The cowbells follow one another Into the distances of the afternoon. To my right, In a field of sunlight between two pines, The droppings of last year’s horses Blaze up into golden stones. I lean back, as the evening darkens and comes on. A chicken hawk floats over, looking for home. I have wasted my life.";

const theroadnot =
  "Two roads diverged in a yellow wood, And sorry I could not travel both And be one traveler, long I stood And looked down one as far as I could To where it bent in the undergrowth; Then took the other, as just as fair, And having perhaps the better claim, Because it was grassy and wanted wear; Though as for that the passing there Had worn them really about the same, And both that morning equally lay In leaves no step had trodden black. Oh, I kept the first for another day! Yet knowing how way leads on to way, I doubted if I should ever come back. I shall be telling this with a sigh Somewhere ages and ages hence: Two roads diverged in a wood, and I— I took the one less traveled by, And that has made all the difference.";

const nothinggold =
  "Nature's first green is gold, Her hardest hue to hold, Her early leaf's a flower; But only so an hour. Then leaf subsides to leaf. So Eden sank to grief, So dawn goes down to day. Nothing gold can stay.";

const theoldpond = "Old pond a frog jumps in water's sound";

const poppies =
  "Even the sun-clouds this morning cannot manage such skirts. Nor the woman in the ambulance Whose red heart blooms through her coat so astoundingly A gift, a love gift Utterly unasked for By a sky Palely and flamily Igniting its carbon monoxides, by eyes Dulled to a halt under bowlers. Oh my God, what am I That these late mouths should cry open In a forest of frosts, in a dawn of cornflowers.";

const redwoods =
  "The first time I entered a forest I saw the trees, of course, huddled together in rings, thin veils of mist between their branches, some dead but still standing, or fallen thigh bones on the desiccated floor, but I also saw the great buttery platters of fungus climbing like stepping stones up their shaggy trunks: tzadee, tzadee, tzadee, each a different size: small to large or large to small, as if some rogue architect had been cocky enough to install them on the stunned trees’ northern sides, leading up to the balcony of their one ton boughs. I was here";

const albemarle =
  "Albemarle, Virginia two Piedmonts nearly touch across green water I watch my hands fill up with wilderness these mountains have given us so much & we will not even give ourselves to each other";

const iffire =
  "river brush float on the Rio Grande in very little water to the north a sleeper fire holdover from last season’s wilds bust sprout flame crawl the moon mistaken for a hole in the sky if next world still deer soften into field field field meadow hawk rodent nests overgrown undergrowth all tinder is white space its span a mirror your mouth around light";

const onabranch = "On a branch floating downriver cricket, singing.";

//style and place buttons
const buttonTotal = document.querySelectorAll("button").length;
let currentButton = "";
for (let i = 0; i < buttonTotal; i++) {
  currentButton = document.getElementsByTagName("button")[i];
  currentButton.style.visibility = "visible";
  currentButton.style.backgroundColor =
    "#" +
    colors[colorIndex][Math.floor(Math.random() * colors[colorIndex].length)];
  if (
    ["rgb(2, 48, 71)", "rgb(3, 4, 94)"].includes(
      currentButton.style.backgroundColor
    )
  ) {
    currentButton.style.color = "#8ecae6";
  }
  currentButton.style.left = Math.abs(Math.random() * vw - 200) + "px";
  currentButton.style.top = Math.abs(Math.random() * vh - 200) + "px";
}

//enter text
function enterText() {
  clearScreen();

  const inputdiv = document.createElement("div");
  document.getElementById("bgdiv").appendChild(inputdiv);
  inputdiv.id = "inputdiv";

  const input = document.createElement("textarea");
  input.rows = 10;
  input.cols = 100;
  input.id = "textinput";
  input.placeholder = "Copy/paste text here";

  document.getElementById("inputdiv").appendChild(input);

  //trying to clear the textarea
  input.onfocus = function () {
    input.value = "";
  };

  function ct() {
    input.value = "";
  }
  input.addEventListener("focus", ct());
  input.focus();
  input.value = "";
  //trying to clear the textarea

  paragraphtext.innerText =
    "Copy/Paste a poem or lyrics into the text box and press Enter.";
  paragraphtext.style.color = "rgba(255,255,255,1)";

  const enter = document.createElement("button");
  enter.innerText = "Enter";
  enter.id = "enter";
  enter.onclick = function () {
    paragraphtext.style.color = "rgba(255,255,255,0)";
    createScene(input.value);
  };
  document.getElementById("inputdiv").appendChild(enter);
}

function reset() {
  clearScreen();

  //make buttons visible
  for (let i = 0; i < document.querySelectorAll("button").length; i++) {
    document.querySelectorAll("button")[i].style.visibility = "visible";
  }
  //clearInterval(instructionInterval);
  paragraphtext.style.transition = "color 1s";
  paragraphtext.innerText = "Choose one.";
  paragraphtext.style.color = "rgba(255,255,255,1)";
}

function color() {
  colorIndex++;
  if (colorIndex >= colors.length) {
    colorIndex = 0;
  }

  //change magnets color
  if (totalMagnets) {
    for (let i = 0; i <= totalMagnets; i++) {
      document.getElementById(i).style.color = "#211111";
      document.getElementById(i).style.backgroundColor =
        "#" +
        colors[colorIndex][
          Math.floor(Math.random() * colors[colorIndex].length)
        ];

      if (
        [
          "rgb(2, 48, 71)",
          "rgb(3, 4, 94)",
          "rgb(2, 62, 138)",
          "rgb(15, 76, 92)",
          "rgb(95, 15, 64)",
        ].includes(document.getElementById(i).style.backgroundColor)
      ) {
        document.getElementById(i).style.color = "#8ecae6";
      }
    }
  }

  //change buttons color
  for (let i = 0; i < buttonTotal; i++) {
    currentButton = document.getElementsByTagName("button")[i];
    //currentButton.style.color = "#112211";
    currentButton.style.backgroundColor =
      "#" +
      colors[colorIndex][Math.floor(Math.random() * colors[colorIndex].length)];
    if (currentButton.style.backgroundColor == "rgb(2, 48, 71)") {
      currentButton.style.color = "#8ecae6";
    }
  }
}

function sound() {
  audio.currentTime = 0;
  audio.volume = audio.volume ? 0 : 1;
}

function instructionsToggleFunction() {
  if (!instructionsToggle) {
    instructionsToggle = 1;
    const instructionDiv = document.createElement("div");
    instructionDiv.id = "instructionDiv";
    for (let i = 2; i < Object.keys(instructions).length; i++) {
      console.log(Object.keys(instructions)[i]);
      instructionDiv.innerHTML += `<button class="insButton" onclick="${
        Object.keys(instructions)[i]
      }()">${instructions[Object.keys(instructions)[i]]}</button>`;
    }

    //clearInterval(instructionInterval);
    //clearTimeout(hintTimeout);
    bgdiv.appendChild(instructionDiv);
  } else {
    instructionsToggle = 0;
    document.getElementById("instructionDiv").remove();
  }
}

//Keypress
document.addEventListener("keydown", captureKeypress);

function captureKeypress(e) {
  //if the textarea is present, disable key detection
  if (document.getElementById("textinput")) {
    return;
  }

  //enter text
  if (e.code == "KeyE") {
    if (document.getElementById("textinput") == null) {
      setTimeout(() => {
        document.getElementById("textinput").value = "";
      }, 100);
    }
    enterText();
  }

  //Reset
  if (e.code == "KeyR") {
    reset();
  }

  //change colour palette
  if (e.code == "KeyC") {
    color();
  }

  //toggle sound
  if (e.code == "KeyS") {
    sound();
  }

  //toggle menu
  if (e.code == "KeyM") {
    instructionsToggleFunction();
  }
}

//hint cycle
function hintCycle() {
  let instructionIndex = 1;
  instructionInterval = setInterval(function () {
    showInstruction(instructionIndex);
    instructionIndex++;
    if (instructionIndex >= Object.keys(instructions).length) {
      instructionIndex = 1;
    }
  }, 18000);
}
hintCycle();

function hideButtons() {
  for (let i = 0; i < document.querySelectorAll("button").length; i++) {
    document.querySelectorAll("button")[i].style.visibility = "hidden";
  }
}

//Place the DIVs
function createScene(poem) {
  clearScreen();
  paragraphtext.style.transition = "color 1s";
  poem = poem.split(" ");
  regex = /([a-zA-Zé-œàù'&]*)/;
  let newDiv;

  for (const word in poem) {
    newDiv = document.createElement("div");
    newDiv.className = "magnet";
    totalMagnets = newDiv.id = word;
    newDiv.innerText = poem[word].match(regex)[0];
    newDiv.style.left = Math.abs((Math.random() * vw) / 1.1) + "px";
    newDiv.style.top = Math.abs((Math.random() * vh) / 1.3) + "px";
    newDiv.style.backgroundColor =
      "#" +
      colors[colorIndex][Math.floor(Math.random() * colors[colorIndex].length)];
    if (newDiv.style.backgroundColor == "rgb(2, 48, 71)") {
      newDiv.style.color = "#8ecae6";
    }
    document.body.appendChild(newDiv);
  }

  for (let i = 0; i <= totalMagnets; i++) {
    dragElement(document.getElementById(i));
    mobiledrag(document.getElementById(i));
  }
}

// Make the DIV elements draggable
// Based on the code from https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    audio.currentTime = 0;
    audio.play();
    elmnt.style.transform = "scale(1.2)";
    elmnt.style.boxShadow = "0.25rem 0.25rem rgba(0,0,0,0.5)";
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    audio.currentTime = 0;
    audio.play();
    // stop moving when mouse button is released:
    elmnt.style.transform = "scale(1)";
    elmnt.style.boxShadow = "";
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

createScene(jameswright);

//mobile
// based on code from https://codepen.io/deepakkadarivel/pen/LrGEdL?editors=1010
function mobiledrag(elmnt) {
  elmnt.addEventListener("touchstart", function (e) {
    audio.currentTime = 0;
    audio.play();
    elmnt.style.transform = "scale(1.2)";
    elmnt.style.boxShadow = "0.25rem 0.25rem rgba(0,0,0,0.5)";
  });

  /* listen to the touchMove event,
  every time it fires, grab the location
  of touch and assign it to box */

  elmnt.addEventListener("touchmove", function (e) {
    // grab the location of touch
    var touchLocation = e.targetTouches[0];

    // assign box new coordinates based on the touch.
    elmnt.style.left = touchLocation.pageX - 40 + "px";
    elmnt.style.top = touchLocation.pageY - 20 + "px";
  });

  /* record the position of the touch
  when released using touchend event.
  This will be the drop position. */

  elmnt.addEventListener("touchend", function (e) {
    // current box position.
    elmnt.style.transform = "scale(1)";
    elmnt.style.boxShadow = "";
    audio.currentTime = 0;
    audio.play();

    let x = parseInt(box.style.left);
    let y = parseInt(box.style.top);
  });
}
