// how to stora and save notes in local storage

const isNoteKey = 'notes';
const notes = [];
const note = {
    title: 'new note',
    content: 'simple note',
    colour: '#ff1455',
    pinned: false,
    createDate: new Date()
};
notes.push(note);
notes.push(note);
notes.push(note);

//note.toString

localStorage.setItem(isNoteKey, JSON.stringify(notes));

const notesFromLocalStorage = JSON.parse(localStorage.getItem(isNoteKey));

const convertedNotes = notesFromLocalStorage.map( note =>{
    note.createDate = new Date(note.createDate);
    return note;
});
//notes = ['one','two','three'];


//read the notes from the local storage

//html structure modify
//simple way

//full object way
const notesContainer = document.querySelector('main');
for(const note of convertedNotes){
    const htmlNote = document.createElement('section');
    const htmlTitle = document.createElement('h1');
    const htmlContent = document.createElement('p');
    const htmlTime = document.createElement('time');
    const htmlButton = document.createElement('button');

    htmlNote.classList.add('note');
    htmlTitle.innerHTML = note.title;
    htmlContent.innerHTML = note.content;
    htmlTime.innerHTML = note.createDate.toLocaleString();
    htmlButton.innerHTML = 'remove';
    
    htmlButton.addEventListener('click', removeNote);
    htmlNote.appendChild(htmlTitle);
    htmlNote.appendChild(htmlContent);
    htmlNote.appendChild(htmlTime);
    htmlNote.appendChild(htmlButton);
    notesContainer.appendChild(htmlNote);
}

function removeNote() {}    

document.querySelector('#newNoteBtn').addEventListener('click',onNewNote);



function onNewNote(){
    const title = document.querySelector('#noteTitle').value;
    const content = document.querySelector('#noteContent').value;
    console.log(title, content);
}
//utworzyc obiekt i dac do listy obiects
