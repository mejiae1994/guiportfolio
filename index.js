var windowGrid = document.querySelector(".window-grid");

let layout = [
  [1, 1, 0],
  [1, 1, 0],
  [1, 1, 0],
  [1, 1, 0],
  [1, 1, 0],
];

var openedTabs = [];

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
  },
  {
    fileType: iconType.Link,
    title: "Github",
    content: "",
    url: "https://github.com/mejiae1994",
  },
  {
    fileType: iconType.Link,
    title: "Linkedin",
    content: "",
    url: "https://www.linkedin.com/in/mejiae1994/",
  },
  {
    fileType: iconType.Project,
    title: "Mapeeter",
    content:
      "Mapeeter is an interactive map application that allows users to mark and share images/comments of places they have traveled to. Mapeeter is a solo project that uses React with Material-UI, TypeScript, Node.js with Express, and Postgresql (Supabase). The aim is to create a push pin travel map with social aspects/features.",
    url: "https://github.com/mejiae1994/mapeeter",
  },
  {
    fileType: iconType.Project,
    title: "Timer Log Extension",
    content:
      "Timer Log is a personnal chrome extension that I use to monitor/log the amount of time I spent on various self-improvement actitivies such as learning, working on projects, etc. It integrates with the Notion API to update a databse.",
    url: "https://github.com/mejiae1994/timer-log-extension",
  },
  {
    fileType: iconType.Project,
    title: "Eel Rush",
    content:
      "Eel is a multi-level video game in which the player assumes the role of an eel. The objective is to protect its offspring while evading deadly predators. The game is developed using plain JavaScript, HTML, and CSS, with canvas and physics algorithms utilized for rendering, animation, and movement.",
    url: "https://github.com/mejiae1994/Eel",
  },
];

const folder =
  '<a class="folder" href="https://github.com/mejiae1994/Eel"><img class="folder-icon" src="./folder.png" />Folder</a>';

function extractHtmlFromRawString(rawHtml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, "text/html");
  const folderAnchor = doc.querySelector("a");
  return folderAnchor;
}

let fileIndex = 0;
for (let i = 0; i < layout.length; i++) {
  for (let j = 0; j < layout[i].length; j++) {
    var divEl = document.createElement("div");
    divEl.className = "window-icon";
    divEl.setAttribute("index", i * 3 + j);

    if (layout[i][j]) {
      if (fileIndex < filesArray.length) {
        anchorTag = extractHtmlFromRawString(folder);
        anchorTag.addEventListener("click", function (e) {
          openWindow(e);
        });

        divEl.appendChild(anchorTag);
        fileIndex++;
      }
    }
    windowGrid.appendChild(divEl);
  }
}

//I want to click on the icon and either trigger an anchor tag to open or the content
// for (let i = 0; i < 40; i++) {
//   var divEl = document.createElement("div");
//   divEl.className = "window-icon";
//   divEl.setAttribute("index", i);
//   anchorTag = extractHtmlFromRawString(folder);
//   //   anchorTag.addEventListener("click", function (e) {
//   //     openWindow(e);
//   //   });

//   divEl.appendChild(anchorTag);

//   windowGrid.appendChild(divEl);
// }

function openWindow(e) {
  e.preventDefault();
  e.stopPropagation();
  console.log(e);
  let currentEl = e.target;
  //   let eleIndex = currentEl.getAttribute("index");
  if (currentEl.className === "folder") {
    console.log("clicked the folder");
    // currentEl.appendChild(getModalWindowElement(eleIndex));
  }
}
//maybe construct the modal based on the type of icon/file we click
//I need to add the original icon properties to know how to populate the modal
function getModalWindowElement(eleIndex) {
  openedTabs.push(eleIndex);

  let divEl = document.createElement("div");
  let divChild = document.createElement("div");
  let divButton = document.createElement("button");

  divEl.className = "window-modal";
  divChild.className = "window-titlebar";
  divButton.className = "window-button";

  divButton.innerText = "Close";

  divEl.style.display = "block";
  divChild.appendChild(divButton);
  divEl.appendChild(divChild);

  divButton.addEventListener("click", function (e) {
    let index = eleIndex;
    e.preventDefault();
    e.stopPropagation();
    if (e.target.className == "window-button") {
      console.log("close window");
      divEl.style.display = "none";
      //remove clicked window from openedtabs array
      console.log("removing element");
      openedTabs = openedTabs.filter((number) => number != index);
      console.log(openedTabs);
    }
  });
  console.log(openedTabs);

  return divEl;
}
