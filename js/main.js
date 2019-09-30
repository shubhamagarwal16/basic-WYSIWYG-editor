const metaData = [];
const editorMain = document.querySelectorAll("[SAEditor]");
console.log(editorMain, editorMain.length);

if (!editorMain.length) {
  console.error("No Attribute found");
} else if (editorMain.length > 1) {
  editorInit();
} else {
  editorUI(editorMain[0], 0);
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
  inputArea.setAttribute("contentEditable", true);
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
  afterEditorIsCreated();
  console.log("here");
}

function addHeader(editor, index) {
  if (!editor) {
    console.error("[addHeader] Main container not found!");
    return;
  }
  const editorHeader = document.createElement("div");
  editorHeader.classList.add("containerHeader");

  //   ========================= HEADING DROPDOWN =============================
  let isparagraphDrpdwnOpen = false;
  const headingDrpDwnContainer = document.createElement("div");
  headingDrpDwnContainer.classList.add("paragraphDropdownContainer");

  const headingDrpDwnButton = document.createElement("button");
  headingDrpDwnButton.setAttribute("title", "Heading");
  headingDrpDwnButton.classList.add("paragraphDropdownButton");
  headingDrpDwnButton.innerHTML =
    '<span>Paragraph</span><i class="fa fa-angle-down" aria-hidden="true"></i>';
  headingDrpDwnButton.addEventListener("click", event => {
    event.preventDefault();
    let displayValue = "block";
    if (isparagraphDrpdwnOpen) displayValue = "none";

    document.getElementById(
      `paragraphbuttonDropdown${index}`
    ).style.display = displayValue;

    isparagraphDrpdwnOpen = !isparagraphDrpdwnOpen;
  });

  const paragraphbuttonDropdown = document.createElement("ul");
  paragraphbuttonDropdown.setAttribute("id", `paragraphbuttonDropdown${index}`);
  paragraphbuttonDropdown.classList.add("paragraphbuttonDropdown");
  paragraphbuttonDropdown.innerHTML = `
  <li paraDrpDwnData="paragraph" >Paragraph</li>
  <li paraDrpDwnData="heading1" ><h1>Heading 1</h1></li>
  <li paraDrpDwnData="heading2" ><h2>Heading 2</h2></li>
  <li paraDrpDwnData="heading3" ><h3>Heading 3</h3></li>
  <li paraDrpDwnData="heading4" ><h4>Heading 4</h4></li>
  <li paraDrpDwnData="heading5" ><h5>Heading 5</h5></li>
  <li paraDrpDwnData="heading6" ><h6>Heading 6</h6></li>
  `;

  headingDrpDwnContainer.appendChild(headingDrpDwnButton);
  headingDrpDwnContainer.appendChild(paragraphbuttonDropdown);

  editorHeader.appendChild(headingDrpDwnContainer);

  //   ========================= BOLD BUTTON =============================
  const boldBtn = document.createElement("button");
  boldBtn.innerHTML = '<i class="fa fa-bold" aria-hidden="true"></i>';
  boldBtn.classList.add("btn2");
  //   boldBtn.classList.add("btn-secondary");
  boldBtn.classList.add("boldBtn");
  boldBtn.setAttribute("title", "Bold");
  boldBtn.addEventListener("click", event => performClickAction(event, "bold"));
  editorHeader.appendChild(boldBtn);

  //   ========================= ITALIC BUTTON =============================
  const italicBtn = document.createElement("button");
  italicBtn.innerHTML = '<i class="fa fa-italic" aria-hidden="true"></i>';
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
  underlineBtn.innerHTML = '<i class="fa fa-underline" aria-hidden="true"></i>';
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
  linkBtn.innerHTML = '<i class="fa fa-link" aria-hidden="true"></i>';
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

  //   ========================= Color Picker =============================
  const colorPicker = document.createElement("input");
  colorPicker.type = "color";
  // colorPicker.classList.add("btn2");
  colorPicker.classList.add("colorBtn");
  colorPicker.setAttribute("title", "Color Picker");
  colorPicker.addEventListener("change", event => {
    // console.log(event.target.value);
    if (event.target && event.target.value)
      performClickAction(event, "color", event.target.value);
  });

  editorHeader.appendChild(colorPicker);

  // ===============================================================================

  editor.appendChild(editorHeader);
}

function afterEditorIsCreated() {
  document
    .querySelector(".paragraphbuttonDropdown")
    .addEventListener("click", event => {
      console.log(event);
      performClickAction(event, "underline");
    });
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
    case "color":
      document.execCommand("foreColor", false, value);
      break;
  }
}

// var aa = false;
// function drpdwn(e) {
//   e.preventDefault();
//   console.log(aa, "====");
//   if (aa)
//     document.getElementById("paragraphbuttonDropdown").style.display = "block";
//   else
//     document.getElementById("paragraphbuttonDropdown").style.display = "none";
//   aa = !aa;
// }
