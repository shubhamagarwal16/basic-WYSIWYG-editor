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
  addHeader(mainContainer);

  const inputArea = document.createElement("div");
  inputArea.setAttribute("contentEditable", "");
  inputArea.classList.add("inputArea");
  mainContainer.appendChild(inputArea);

  editor.insertAdjacentElement("afterend", mainContainer);

  console.log("here");
}

function addHeader(editor) {
  if (!editor) {
    console.error("[addHeader] Main container not found!");
    return;
  }
  const editorHeader = document.createElement("div");
  editorHeader.classList.add("containerHeader");

  //   ========================= BOLD BUTTON =============================
  const boldBtn = document.createElement("button");
  boldBtn.innerHTML = "B";
  boldBtn.classList.add("btn");
  boldBtn.classList.add("btn-secondary");
  boldBtn.classList.add("boldBtn");
  boldBtn.addEventListener("click", event => performClickAction(event, "bold"));
  editorHeader.appendChild(boldBtn);

  //   ========================= ITALIC BUTTON =============================
  const italicBtn = document.createElement("button");
  italicBtn.innerHTML = "I";
  italicBtn.classList.add("btn");
  italicBtn.classList.add("btn-secondary");
  italicBtn.classList.add("italicBtn");
  italicBtn.addEventListener("click", event =>
    performClickAction(event, "italic")
  );
  editorHeader.appendChild(italicBtn);

  //   ========================= UNDERLINE BUTTON =============================
  const underlineBtn = document.createElement("button");
  underlineBtn.innerHTML = "U";
  underlineBtn.classList.add("btn");
  underlineBtn.classList.add("btn-secondary");
  underlineBtn.classList.add("underlineBtn");
  underlineBtn.addEventListener("click", event =>
    performClickAction(event, "underline")
  );
  editorHeader.appendChild(underlineBtn);

  editor.appendChild(editorHeader);
}

function performClickAction(e, action) {
  e.preventDefault();
  console.log({ action });
}
