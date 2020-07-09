console.log("Welcome to notes app. This is app.js");
let noteTitle = document.querySelector(".note-title");
showNotes();

console.log(noteTitle);


// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  
  
//   console.log(notesObj);
  showNotes();
  noteTitle.value = "";
});

// Function to show elements from localStorage
function showNotes() {
 
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  
 
  notesObj.forEach(function(element, index) {
    html += `
            <div class="noteCard card" style="width: 12rem;">
                    <div class="card-body">
                        <h5 class="card-title"> ${noteTitle.value}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="add-note-btn">Delete Note</button>
                    </div>
                </div>`;
  });
  
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `<h5 class="nothing-to-show">Nothing to show! Use "Add a Note" section above to add notes.</h5>`;
  }
}

// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);

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