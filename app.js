showNotes();
let addbtn = document.getElementById("addbtn");

addbtn.addEventListener("click", (e) => {
  let addTxt = document.getElementById("addTxt");

  let notes = localStorage.getItem("notes");
  if (addTxt.value.length == 0) {
    alert("Input something first");
  } else {
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
  }
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach((element, index) => {
    html += `
          <div class="noteCard my-2 mx-2 card" style="width: 21rem;">
          <div class="card-body">
            <h5 class="card-title">Node ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
          </div>
        </div>
          `;
  });

  let nodesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    nodesElm.innerHTML = html;
  } else {
    nodesElm.innerHTML = `<b>Nothing to show you "Add a Note" section above to add notes</b>`;
  }
}

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let searchTxt = document.getElementById("searchTxt");

searchTxt.addEventListener("input", () => {
  let inputVal = searchTxt.value.toLowerCase();

  let noteCard = document.getElementsByClassName("noteCard");

  Array.from(noteCard).forEach((element) => {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
