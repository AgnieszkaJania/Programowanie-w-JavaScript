//note 
//note.js
class Note{
    constructor(title, content, color = 'red', pinned = false){
        this.title = title;
        this.content = content;
        this.color = color;
        this.pinned = pinned;
        this.createDate = new Date();
        this.id = Date.now();
    }
}

// const n1 = new Note('title,'content', 'red','true');
// const n2 = new Note()
//notes collection
//notes.js
class Notes{
    constructor(containerSelector){
        this.notesArr = [];
        this.db = new Db();
        this.NotesUI = new NotesUI(containerSelector);
    }
    addNote(note){
        this.notesArr.push(note);
        this.db.saveNotes(this.notesArr);

        
        
    }
    removeNote(id){
        this.notesArr = this.notesArr.filter(el => el.id !== id);
    }
    getNote(id){
        return this.notesArr.find(el => el.id === id);
    }
    getNotes(){
        return [...this.notesArr];
    }
    


}

const notesObj = new Note();
    // const notesArr = notesObj.notesArr;
    // const notesArr = notesObj.getNotes();

class Db{
    constructor(){
        this.lsNotesKey = 'notes';
    }
    saveNotes(notes){
        localStorage.setItem(this.lsNotesKey, JSON.stringify(notes));
    }

    getNotes(){
        //check if ls has item notes
        return JSON.parse(localStorage.getItem(this.lsNotesKey));
    }
}

class NotesUI{
    constructor(containerSelector = 'selection'){
        this.notesContainer = document.querySelector(containerSelector);
    }
    addNote(note){
        
        //all the things with object
        const container = this.getNotesContainer();
        container.appendChild(htmlNote);

    }
    createNote(){
        const htmlNote = document.createElement('div');
        htmlNote.classList.add('note');
    }
    removeNote(id){

    }
    getNotesContainer(){
        return this.notesContainer;
    }
}

class UI{
    getElement(selector){
        return document.querySelector(selector);
    }
    listen(element, event, callback){
        return element.addEventListener
    }
}
//storage
//ui operations
