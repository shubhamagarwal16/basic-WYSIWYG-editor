const metaData = [];
const editorMain = document.querySelectorAll("[SAEditor]");
console.log(editorMain, editorMain.length);

if (!editorMain.length) {
  console.error("No Attribute found");
} else if (editorMain.length > 1) {
  editorInit();
} else {
  editorUI("");
}

function editorInit() {
  for (let i = 0; i < editorMain.length; i++) {
    editorUI(editorMain[i], i);
  }
}

function editorUI(editor, index = 0) {
  if (!editor) editor = editorMain;
  editor.style.display = "none";

  //============== Adding main container
  const mainContainer = document.createElement("div");
  mainContainer.setAttribute("id", `editorMainContainer${index}`);
  //   mainContainer.setAttribute("contentEditable", "");
  mainContainer.classList.add("mainContainer");
  addHeader(mainContainer, index);

  const inputArea = document.createElement("div");
  inputArea.setAttribute("contentEditable", "");
  inputArea.appendChild(
    document.createTextNode("A simple text without errors")
  );
  inputArea.classList.add("inputArea");
  inputArea.addEventListener("keyup", () => {
    editor.innerHTML = inputArea.innerHTML;
    console.log(editor.innerHTML, inputArea.innerHTML);
  });
  mainContainer.appendChild(inputArea);

  editor.insertAdjacentElement("afterend", mainContainer);

  console.log("here");
}

function addHeader(editor, index) {
  if (!editor) {
    console.error("[addHeader] Main container not found!");
    return;
  }
  const editorHeader = document.createElement("div");
  editorHeader.classList.add("containerHeader");

  //   ========================= BOLD BUTTON =============================
  const boldBtn = document.createElement("button");
  boldBtn.innerHTML = "B";
  boldBtn.classList.add("btn2");
  //   boldBtn.classList.add("btn-secondary");
  boldBtn.classList.add("boldBtn");
  boldBtn.setAttribute("title", "Bold");
  boldBtn.addEventListener("click", event => performClickAction(event, "bold"));
  editorHeader.appendChild(boldBtn);

  //   ========================= ITALIC BUTTON =============================
  const italicBtn = document.createElement("button");
  italicBtn.innerHTML = "I";
  italicBtn.classList.add("btn2");
  //   italicBtn.classList.add("btn-secondary");
  italicBtn.classList.add("italicBtn");
  italicBtn.setAttribute("title", "Italic");
  italicBtn.addEventListener("click", event =>
    performClickAction(event, "italic")
  );
  editorHeader.appendChild(italicBtn);

  //   ========================= UNDERLINE BUTTON =============================
  const underlineBtn = document.createElement("button");
  underlineBtn.innerHTML = "U";
  underlineBtn.classList.add("btn2");
  //   underlineBtn.classList.add("btn-secondary");
  underlineBtn.classList.add("underlineBtn");
  underlineBtn.setAttribute("title", "Underline");
  underlineBtn.addEventListener("click", event =>
    performClickAction(event, "underline")
  );
  editorHeader.appendChild(underlineBtn);

  //   ========================= LINK BUTTON =============================
  const linkBtn = document.createElement("button");
  linkBtn.innerHTML = "A";
  linkBtn.classList.add("btn2");
  //   linkBtn.classList.add("btn-secondary");
  linkBtn.classList.add("LinkBtn");
  linkBtn.setAttribute("title", "Link");
  linkBtn.addEventListener("click", event => {
    const getLink = window.prompt("Enter the link/url", "#");
    if (getLink) performClickAction(event, "link", getLink);
  });
  editorHeader.appendChild(linkBtn);

  //   ========================= Character Length =============================
  const charCountContainer = document.createElement("span");
  charCountContainer.classList.add("charCountContainer");

  const charCountCkBox = document.createElement("input");
  charCountCkBox.type = "checkbox";
  charCountCkBox.classList.add("charCountCkBox");
  charCountCkBox.setAttribute("title", "Check for limiting character count");
  charCountContainer.appendChild(charCountCkBox);

  const charCountInput = document.createElement("input");
  charCountInput.type = "number";
  charCountInput.classList.add("charCountInput");
  charCountInput.setAttribute("disabled", true);
  charCountInput.style.webkitAppearance = "none";
  charCountInput.setAttribute("title", "Enter character count");

  charCountInput.addEventListener("change", event => {
    console.log(event.target.value);
    metaData[index] = {};
    metaData[index].charLength = event.target.value;
  });
  charCountCkBox.addEventListener("change", () => {
    charCountInput.toggleAttribute("disabled");
    // charCountInput.target.value = 0;
    // metaData[index].charLength = 0;
  });

  charCountCkBox.insertAdjacentElement("afterend", charCountInput);

  editorHeader.appendChild(charCountContainer);

  editor.appendChild(editorHeader);
}

function performClickAction(e, action, value = "") {
  e.preventDefault();
  console.log({ action });
  let text = "";
  if (!window.getselection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  if (!text) return;
  console.log(text);

  switch (action) {
    case "bold":
      document.execCommand("bold", false, true);
      break;
    case "italic":
      document.execCommand("italic", false, true);
      break;
    case "underline":
      document.execCommand("underline", false, true);
      break;
    case "link":
      document.execCommand("createLink", false, value);
      break;
  }
}
