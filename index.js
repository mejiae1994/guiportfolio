// TODO:

// based on weather data
// terminal right side of the screen to accept input
// implement other filetypes
// draggable positioning widgets
// maybe some animation cartoon pixel walking
// make it cozy
// parallax top to bottom animation repeating in cycle

/* 
  background snow falling, snow that falls piles on the bottom while user is in website
  I will probably need different size flakes, maybe 6 different flakes
  falling at different speed
*/

const windowGrid = document.querySelector(".window-grid");

const layout = [
  [1, 1, 0],
  [1, 1, 0],
  [1, 1, 0],
  [1, 1, 0],
  [1, 1, 0],
];

let openedTabs = [];

const iconType = {
  Link: "Link",
  Folder: "Folder",
  Project: "Project",
  Blog: "Blog",
};

const filesArray = [
  {
    fileType: iconType.Link,
    title: "Resume",
    content: "",
    url: "https://docs.google.com/document/d/1Rh3avqDgyAyEnCqN48QGoRxv2S4qwu4cy5SrNwri9h4/edit",
    src: "images/resume.png",
  },
  {
    fileType: iconType.Link,
    title: "Github",
    content: "",
    url: "https://github.com/mejiae1994",
    src: "images/github.png",
  },
  {
    fileType: iconType.Link,
    title: "Linkedin",
    content: "",
    url: "https://www.linkedin.com/in/mejiae1994/",
    src: "images/linkedin.png",
  },
  {
    fileType: iconType.Project,
    title: "Mapeeter",
    content:
      "Mapeeter is an interactive map application that allows users to mark and share images/comments of places they have traveled to. Mapeeter is a solo project that uses React with Material-UI, TypeScript, Node.js with Express, and Postgresql (Supabase). The aim is to create a push pin travel map with social aspects/features.",
    url: "https://github.com/mejiae1994/mapeeter",
    src: "images/folder.png",
    imgsrc: "images/mapeeter.PNG",
  },
  {
    fileType: iconType.Project,
    title: "Timer Log Extension",
    content:
      "Timer Log is a personnal chrome extension that I use to monitor/log the amount of time I spent on various self-improvement actitivies such as learning, working on projects, etc. It integrates with the Notion API to update a databse.",
    url: "https://github.com/mejiae1994/timer-log-extension",
    src: "images/folder.png",
    imgsrc: "images/log-extension.PNG",
  },
  {
    fileType: iconType.Project,
    title: "Eel Rush",
    content:
      "Eel is a multi-level video game in which the player assumes the role of an eel. The objective is to protect its offspring while evading deadly predators. The game is developed using plain JavaScript, HTML, and CSS, with canvas and physics algorithms utilized for rendering, animation, and movement.",
    url: "https://github.com/mejiae1994/Eel",
    src: "images/folder.png",
    imgsrc: "images/eel-project.png",
  },
];

let fileIndex = 0;
for (let i = 0; i < layout.length; i++) {
  for (let j = 0; j < layout[i].length; j++) {
    var gridChild = document.createElement("div");
    gridChild.className = "grid-child";

    if (layout[i][j] && fileIndex < filesArray.length) {
      gridChild.setAttribute("index", fileIndex);
      let currentFile = filesArray[fileIndex];
      let localFileTemplate = getFileTemplate(currentFile);

      gridChild.appendChild(localFileTemplate);
      fileIndex++;
    }
    windowGrid.appendChild(gridChild);
  }
}

//this function will create the various elements based on filetype
function getFileTemplate(file) {
  switch (file.fileType) {
    case iconType.Link: {
      let aTag = document.createElement("a");
      aTag.className = "folder";
      aTag.href = file.url;
      aTag.target = "_blank";
      let imgTag = document.createElement("img");
      imgTag.className = "folder-icon";
      imgTag.src = file.src;
      aTag.appendChild(imgTag);
      aTag.innerHTML += file.title;
      return aTag;
    }
    case iconType.Project: {
      let divTag = document.createElement("div");
      divTag.className = "folder";
      let imgTag = document.createElement("img");
      imgTag.className = "folder-icon";
      imgTag.src = file.src;
      divTag.appendChild(imgTag);
      divTag.innerHTML += file.title;
      divTag.addEventListener("click", function (e) {
        openWindow(e);
      });
      return divTag;
    }
    case iconType.Folder: {
      break;
    }
    case iconType.Blog: {
      break;
    }
  }
}

//Events
function openWindow(e) {
  e.stopPropagation();

  let currentEl = e.target;
  let eleIndex = currentEl.parentElement.parentElement.getAttribute("index");
  let elementExist = openedTabs.find((value) => value == eleIndex);

  if (currentEl.className === "folder-icon" && !elementExist) {
    currentEl.parentElement.parentElement.appendChild(
      getModalWindowElement(eleIndex)
    );
  }
}
//maybe construct the modal based on the type of icon/file we click
//I need to add the original icon properties to know how to populate the modal
function getModalWindowElement(eleIndex) {
  openedTabs.push(eleIndex);
  let offset = openedTabs.length * 100;
  let elementContent = filesArray[eleIndex];

  let divEl = document.createElement("div");
  let divChild = document.createElement("div");
  let divButton = document.createElement("button");
  let divP = document.createElement("p");

  let imgtag = document.createElement("img");
  imgtag.className = "window-img";
  imgtag.src = elementContent?.imgsrc;

  divEl.className = "window-modal";
  divChild.className = "window-titlebar";
  divButton.className = "window-button";

  divEl.style.zIndex = offset;
  divEl.style.left = `${offset + 50}px`;
  divEl.style.bottom = `${offset - 20}px`;
  divChild.innerText = elementContent.title;
  divP.innerText = elementContent.content;
  let aTag = document.createElement("a");
  aTag.innerText = "Link to project";
  aTag.href = elementContent.url;
  aTag.target = "_blank";
  divP.appendChild(aTag);

  divButton.innerText = "Close";
  makeDraggable(divChild);
  divEl.style.display = "flex";
  divChild.appendChild(divButton);
  divEl.appendChild(divChild);
  divEl.appendChild(imgtag);
  divEl.appendChild(divP);

  divButton.addEventListener("click", function (e) {
    let index = eleIndex;
    e.stopPropagation();
    if (e.target.className == "window-button") {
      divEl.style.display = "none";
      openedTabs = openedTabs.filter((number) => number != index);
    }
  });
  return divEl;
}

const bioDesc = `I am an experienced Software Developer based in New York, with a strong background in 
various software development technologies and tools. I am now actively transitioning my focus to 
specialize in web development and web applications. Leave a comment below :)`;

const cliRow = `<div class="cli-row">
<span>emejia@DESKTOP-HI:<span class="blue-span">~</span><span class="w-span">$</span> </span>
<input class="cli-input" type="text" name="cmd" autofocus></input>
</div>`;

getTerminalPanel();

function getTerminalPanel() {
  let terminal = document.createElement("div");
  terminal.className = "terminal";
  terminal.style.display = "block";
  let terminalHeader = document.createElement("div");
  terminalHeader.className = "terminal-header";

  makeDraggable(terminalHeader);

  let headerButton = document.createElement("button");
  headerButton.className = "header-button";
  headerButton.innerText = "X";

  headerButton.addEventListener("click", function (e) {
    e.stopPropagation();
    if (e.target.className == "header-button") {
      if (terminal.style.display === "block") {
        terminal.style.display = "none";
      }
    }
  });

  let terminalDesc = document.createElement("div");
  terminalDesc.className = "terminal-desc";
  let terminalP = document.createElement("p");
  terminalP.textContent = bioDesc;
  let terminalCLI = document.createElement("div");
  terminalCLI.className = "terminal-cli";
  terminalCLI.innerHTML += cliRow;

  terminalHeader.appendChild(headerButton);
  terminal.appendChild(terminalHeader);

  terminalDesc.appendChild(terminalP);
  terminal.appendChild(terminalDesc);
  terminal.appendChild(terminalCLI);

  terminal.addEventListener("mouseover", function () {
    let cliInput = document.querySelector(".cli-input");
    cliInput.focus();
  });

  document.body.appendChild(terminal);
}

//need to add flashing | character to cli row to indicate awaiting input
let cliInput = document.querySelector(".cli-input");
cliInput.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    e.preventDefault();
    let inputValue = e.target.value;
    e.target.value = "";
    let terminalCLI = document.querySelector(".terminal-cli");
    let cliDiv = document.createElement("div");
    cliDiv.className = "cli-row";
    let rowP = document.createElement("p");
    rowP.textContent = inputValue;
    cliDiv.appendChild(rowP);
    terminalCLI.append(cliDiv);
  }
});

function createSnowflake() {
  var snowflakes = document.querySelectorAll(".snowflake");

  if (snowflakes.length > 150) {
    return;
  }
  var snowflake = document.createElement("div");
  snowflake.className = "snowflake";
  snowflake.style.left = random(0, window.innerWidth) + "px";
  snowflake.style.width = snowflake.style.height = random(5, 13) + "px";
  document.body.appendChild(snowflake);
}

function removeOutOfWindowSnowflakes() {
  var snowflakes = document.querySelectorAll(".snowflake");
  snowflakes.forEach(function (snowflake) {
    var rect = snowflake.getBoundingClientRect();

    if (rect.bottom > window.innerHeight && snowflakes?.length > 148) {
      snowflake.remove();
    }
  });
}

function moveSnow(currentTime) {
  var snowflakes = document.querySelectorAll(".snowflake");

  setTimeout(() => {
    snowflakes.forEach(function (snowflake) {
      if (snowflake.style.top < 1) {
        snowflake.style.top = "0px";
      }

      let topPos = snowflake.style.top.split("p")[0];
      topPos = parseInt(topPos) + 1;
      snowflake.style.top = `${topPos}px`;
    });
    window.requestAnimationFrame(moveSnow);
  }, 20);
}

setInterval(function () {
  createSnowflake();
  removeOutOfWindowSnowflakes();
}, 200);

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.requestAnimationFrame(moveSnow);

//draggable windows, parent of passed element needs to be the main div
function makeDraggable(draggableElement) {
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  draggableElement.onmousedown = function (event) {
    // Calculate the offset at the start of the drag
    dragOffsetX = event.clientX - draggableElement.parentElement.offsetLeft;
    dragOffsetY = event.clientY - draggableElement.parentElement.offsetTop;

    // Add the mousemove event listener
    document.addEventListener("mousemove", onMouseMove);
  };

  function onMouseMove(event) {
    // Calculate new position
    let newLeft = event.clientX - dragOffsetX;
    let newTop = event.clientY - dragOffsetY;

    // Get the bounding rectangle of the window
    let windowRect = document.body.getBoundingClientRect();

    // Check if the new position is within the window bounds
    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (newLeft > windowRect.width - draggableElement.offsetWidth)
      newLeft = windowRect.width - draggableElement.offsetWidth;
    if (newTop > windowRect.height - draggableElement.offsetHeight)
      newTop = windowRect.height - draggableElement.offsetHeight;

    // Adjust the position of the draggable element
    draggableElement.parentElement.style.left = newLeft + "px";
    draggableElement.parentElement.style.top = newTop + "px";
  }

  draggableElement.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
  };
}
