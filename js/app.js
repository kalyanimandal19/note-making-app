console.log("Welcome to notes app!");

showNotes();
//If user adds a note, add it to localStorage
let addBtn = document.getElementById('addBtn');

addBtn.addEventListener("click", function (e) {
    let addTitle = document.getElementById('addTitle');
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myobj ={
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTitle.value = " ";
    addTxt.value = " ";
    // console.log(notes);
    showNotes();
});


//function to show the notes
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    
    let html = " ";
    notesObj.forEach(function(element, index) {
        html += `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text"> ${element.text}</p>
                            <button id="${index}" onclick="delNote(this.id)" class="btn btn-primary">Delete Note</button>
                        </div>
                </div>`;
      });

    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0){
        notesElem.innerHTML = html;
    }
    else{
        notesElem.innerHTML = `<h3>Nothing to show!!<br>Create your first note today.</h3>`;
    }
}

//function to delete note
function delNote(index){
    // console.log("Deleted!!");
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener('input',function() {
    let inputVal = searchTxt.value.toLowerCase();
    // console.log("Input event fires",inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });

});

/*
Further features:
1. Add title
2. Mark a note as important
3. Separate notes by user
4. Sync and host to a web server
*/