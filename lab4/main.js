// how to store and save notes in local storage
let isNoteKey = 'notes';
let convertedNotes;
let htmlNote;
let notes = [];

//let Id = 1;
// const note = {
//     title: 'new note',
//     content: 'simple note',
//     colour: '#ff1455',
//     pinned: false,
//     createDate: new Date()
// };

// notes.push(note);
// notes.push(note);
// notes.push(note);

//note.toString
let tagi = document.getElementsByName('Tagi');

function onNewNote(){
    
    
    const title = document.querySelector('#noteTitle').value;
    const content = document.querySelector('#noteContent').value;
    const color = document.querySelector('#choosenColor').value;
    const data = document.querySelector('#reminder').value;
    console.log(data);
    let wybTagi = [];
    for(let i = 0; i < tagi.length; i++){
        if(tagi[i].checked == true){
            wybTagi.push(tagi[i].value);
        }
    }
    
    console.log(title, content);
    const note = {
        title: title,
        content: content,
        colour: color,
        pinned: false,
        createDate: new Date(),
        tagi: wybTagi,
        reminderDate: new Date(data)
    };
    notes.push(note);
    
    createLocalStorage();
    createOutput();
}

function createLocalStorage(){
    localStorage.clear();
    localStorage.setItem(isNoteKey, JSON.stringify(notes));

    const notesFromLocalStorage = JSON.parse(localStorage.getItem(isNoteKey));
    //console.log(notesFromLocalStorage);

    convertedNotes = notesFromLocalStorage.map( note =>{
        note.createDate = new Date(note.createDate);
        return note;

    });
}

function createOutput(){
    let elem = document.querySelectorAll('.notes');
    
    for(let i = 0; i < elem.length; i++){
        elem[i].parentNode.removeChild(elem[i]);
    }
    const notesContainer = document.querySelector('main');
    const pinnedNotesContainer = document.querySelector('#pinned');
    let ident = 0;
    
    for(const newnote of convertedNotes){

        htmlNote = document.createElement('div');
        const htmlPinn = document.createElement('div');
        const htmlTitle = document.createElement('h1');
        const htmlContent = document.createElement('p');
        const htmlTime = document.createElement('time');
        const htmlButton = document.createElement('button');
        const htmlEditButton = document.createElement('button');
        const htmlTagi = document.createElement('p');
        htmlNote.classList.add('notes');
        

        htmlTitle.innerHTML = newnote.title;
        htmlPinn.innerHTML = '<i class="fas fa-thumbtack"></i>';
        htmlContent.innerHTML = newnote.content;
        htmlTime.innerHTML = newnote.createDate.toLocaleString();//tutaj
        //console.log(newnote.tagi);
        htmlTagi.innerHTML = newnote.tagi.toString();
        htmlButton.innerHTML = 'remove';
        htmlEditButton.innerHTML = 'edit';
        htmlButton.id = ident;
        htmlPinn.id = ident;
        htmlEditButton.id = ident;
    
        htmlNote.style.backgroundColor = newnote.colour;
        htmlButton.addEventListener('click', removeNote);
        htmlEditButton.addEventListener('click',editNote );

        htmlNote.appendChild(htmlPinn);
        htmlNote.appendChild(htmlTitle);
        htmlNote.appendChild(htmlContent);
        htmlNote.appendChild(htmlTime);
        
        htmlNote.appendChild(htmlButton);
        htmlNote.appendChild(htmlEditButton);
        htmlNote.appendChild(htmlTagi);

        if(newnote.pinned == false){
            notesContainer.appendChild(htmlNote);
        }
        else{
            pinnedNotesContainer.appendChild(htmlNote);
        }
        
        
        htmlPinn.addEventListener('click', createPinnedNote);
        ident++;
    }

}

function checkforNotifications(){
    const timestamp = Date.now();
    
    const notifies = notes.filter(el => Math.abs(el.reminderDate - timestamp) < 1000);
    console.log(notifies);
    if(notifies.length > 0){
        for (let i = 0; i < notifies.length; i++) {
            alert('Przypomnienie o notatce \n' + 'Tytuł notatki: \n' + notifies[i].title + '\n' + 'Data utworzenia: \n' + 
             notifies[i].createDate + '\n' + 'Treść notatki: \n' + notifies[i].content);
            
            
        }
    }
}

setInterval(() => {
    checkforNotifications();
}, 1000);

function createPinnedNote(ev){
    let x = ev.target.parentElement.id;

    if (notes[x].pinned == false){
        notes[x].pinned = true;
        createLocalStorage();
        createOutput();
    }
    else
    {
        notes[x].pinned = false;
        createLocalStorage();
        createOutput();
    }

}
let flg = false;
function editNote(ev){
    
    if(flg == false)
    {
        flg = true;
        let title = document.querySelector('#noteTitle');
        let content = document.querySelector('#noteContent');
        let color = document.querySelector('#choosenColor');

        let x = ev.target.id;
        title.value = notes[x].title;
        content.value = notes[x].content;
        color.value = notes[x].colour;
        
    
    
        const submitButton = document.createElement('button');
        submitButton.innerHTML = 'submit changes';
        const sect = document.querySelector('section');
        sect.appendChild(submitButton);
        submitButton.addEventListener('click', function(){
            const title = document.querySelector('#noteTitle').value;
            const content = document.querySelector('#noteContent').value;
            const color = document.querySelector('#choosenColor').value;
            const data = document.querySelector('#reminder').value;
        
            let wybTagi = [];
            for(let i = 0; i < tagi.length; i++){
                if(tagi[i].checked == true){
                    wybTagi.push(tagi[i].value);
                }
            }

            console.log(x);
            const note = {
                title: title,
                content: content,
                colour: color,
                pinned: notes[x].pinned,
                createDate: notes[x].createDate,
                tagi: wybTagi,
                reminderDate: new Date(data)
            };
            notes.splice(x, 1, note);
            //notes.push(note);
            console.log(x);
            createLocalStorage();
            createOutput();
            document.querySelector('section').removeChild(document.querySelector('section').lastElementChild);
            flg = false;
        });
        
    }

    
   
    
    
}

document.querySelector('#searchBtn').addEventListener('click', searchNote);
let czySzukam = true;

function searchNote(){
    let szukane = document.querySelector('#search').value;
    if(notes.length == 0){
        alert('Nie ma żadnych notatek !');
    }
    else if(szukane.length == 0){
        alert('Podaj szukana fraze !');
    }
    else
    {
        if(czySzukam){
        
            let elem = document.querySelectorAll('.notes');
            let flaga = false;
            console.log(JSON.stringify(notes[0].createDate.toLocaleString()));
            for (let i = 0; i < notes.length; i++) {
            
                if((notes[i].title.search(szukane) != -1) || (notes[i].content.search(szukane) != -1)||(JSON.stringify(notes[i].createDate.toLocaleString()).search(szukane)) != -1){
                    elem[i].style.backgroundColor= '#F7CBF7';
                    flaga = true;
                }
            
            }
            if(!flaga){
                alert('Can not find the note');  
            } 
    
            document.querySelector('#searchBtn').innerHTML = 'exit';
            czySzukam = false;
        }else
        {
            createOutput();
            document.querySelector('#searchBtn').innerHTML = 'Search note';
            czySzukam = true;
        }
    
    }
   

}

//notes = ['one','two','three'];
//read the notes from the local storage
//html structure modify
//simple way
//full object way


function removeNote(ev) {
    console.log(ev);
    
    let x = ev.target.id;
    console.log(x);
    notes.splice(x, 1);
    
    createLocalStorage();
    createOutput();
}    

document.querySelector('#newNoteBtn').addEventListener('click',onNewNote);

