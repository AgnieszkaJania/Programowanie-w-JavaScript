//note 
//note.js
class Note{
    constructor(title, content, color, pinned = false, dataPrzypomnienia, tagi){
        this.title = title;
        this.content = content;
        this.color = color;
        this.pinned = pinned;
        this.createDate = new Date();
        this.reminderDate = new Date(dataPrzypomnienia),
        this.id = Date.now();
        this.tagi = tagi;
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
        this.UI = new UI();
        
        
    }
    
    createNote(info){
    
        let note = new Note(info[0],info[1], info[2], false, info[3], info[4]);
        return note;
    }
    addNote(note){
        
        this.notesArr.push(note);
        this.db.saveNotes(this.notesArr);
        this.NotesUI.createNote(note);
        
    }
    removeNote(id){
        this.NotesUI.removeNote(id);
        this.notesArr = this.notesArr.filter(el => el.id != id);
        console.log(this.notesArr);
        this.db.saveNotes(this.notesArr);
        
    }
    getNote(id){
        return this.notesArr.find(el => el.id === id);
    }
    getNotes(){
        return [...this.notesArr];
    }   
    editNote(nr){
        let editedNote = this.notesArr.find(el => el.id == nr);
        console.log(editedNote);
        let index = this.notesArr.indexOf(editedNote);
        let info = this.UI.createUI();
        this.notesArr[index].title = info[0];
        this.notesArr[index].content = info[1];
        this.notesArr[index].color = info[2];
        this.notesArr[index].reminderDate = info[3];
        this.notesArr[index].tagi = info[4];
        this.db.saveNotes(this.notesArr);
        this.NotesUI.removeNote(nr);
        this.NotesUI.createNote(this.notesArr[index]);

    }
    pinnNote(id){

        this.NotesUI.removeNote(id);
        let editedNote = this.notesArr.find(el => el.id == id);
        console.log(editedNote);
        let index = this.notesArr.indexOf(editedNote);
        console.log(this.notesArr[index]);
        if(this.notesArr[index].pinned == false){
            this.notesArr[index].pinned = true;
            this.db.saveNotes(this.notesArr);
            let x = new NotesUI('#pinned');
            console.log(x.getNotesContainer());
            x.createNote(this.notesArr[index]);
        }
        else
        {

        }
       


        
        // if(this.flaga == false){
        //     this.NotesUI.removeNote(id);
    
        //     let editedNote = this.notesArr.find(el => el.id == id);
        //     console.log(editedNote);
        //     let index = this.notesArr.indexOf(editedNote);
        //     console.log(this.notesArr[index]);
        //     let x = new NotesUI('#pinned');
        //     console.log(x.getNotesContainer());
        //     x.createNote(this.notesArr[index]);
        //     this.flaga = true;
        // }
        // else{
        //     let cont = document.querySelector('#pinned');
        //     const elem = document.getElementById(id);
        //     console.log(elem);
        //     cont.removeChild(elem);
            
        //     let editedNote = this.notesArr.find(el => el.id == id);
        //     console.log(editedNote);
        //     let index = this.notesArr.indexOf(editedNote);
        //     console.log(this.notesArr[index]);
        //     let x = new NotesUI('main');
        //     console.log(x.getNotesContainer());
        //     x.createNote(this.notesArr[index]);
        //     this.flaga = false;
        // }
        
        

    }

    


}

//const notesObj = new Note();
// const notesArr = notesObj.notesArr;
// const notesArr = notesObj.getNotes();

class Db{
    constructor(){
        this.lsNotesKey = 'notes';
    }
    saveNotes(notes){
        localStorage.clear();
        localStorage.setItem(this.lsNotesKey, JSON.stringify(notes));
    }

    getNotes(){
        //check if ls has item notes
        const check = localStorage.getItem(this.isNotesKey);
        if(check != null){
            return JSON.parse(localStorage.getItem(this.lsNotesKey)); 
        }
        
    }
}

class NotesUI{
    constructor(containerSelector = 'main'){
        this.notesContainer = document.querySelector(containerSelector);
        
    }
    addNote(noteTem){
        
        //all the things with object
        
        const container = this.getNotesContainer();
        const x = noteTem.htmlNote;
        container.appendChild(x);
        x.appendChild(noteTem.htmlPinn);
        x.appendChild(noteTem.htmlTitle);
        x.appendChild(noteTem.htmlContent);
        x.appendChild(noteTem.htmlTime);
        x.appendChild(noteTem.htmlTagi);
        x.appendChild(noteTem.htmlButton);
        x.appendChild(noteTem.htmlEditButton);
        //htmlButton.addEventListener('click',)

        

    }
    createNote(note){
        
        const htmlNote = document.createElement('div');
        const htmlPinn = document.createElement('div');
        const htmlTitle = document.createElement('h1');
        const htmlContent = document.createElement('p');
        const htmlTime = document.createElement('time');
        const htmlButton = document.createElement('button');
        const htmlEditButton = document.createElement('button');
        const htmlTagi = document.createElement('p');
        htmlNote.classList.add('note');
        // return [htmlNote, htmlPinn, htmlTitle, htmlContent, htmlTime, htmlButton, htmlEditButton, htmlTagi]
        htmlTitle.innerHTML = note.title;
        //htmlPinn.innerHTML = '<i class="fas fa-thumbtack"></i>';
        htmlContent.innerHTML = note.content;
        htmlTime.innerHTML = note.createDate.toLocaleString();//tutaj
        htmlPinn.classList.add('pinn');
        htmlPinn.style.backgroundColor = 'rgb(251,136,136)';
        htmlPinn.innerHTML = 'pinn';
        //htmlTagi.innerHTML = note.tagi.toString();
        htmlButton.innerHTML = 'remove';
        htmlEditButton.innerHTML = 'edit';
        htmlNote.id = note.id;
        htmlTagi.innerHTML = note.tagi;
        htmlButton.id = 's' + note.id;
        htmlPinn.id = 'p' + note.id;
        htmlButton.classList.add('remove');
        htmlEditButton.classList.add('edit');
        // htmlPinn.id = note.id;
        // htmlEditButton.id = note.id;
        htmlNote.style.backgroundColor = note.color;
        //const elementy = [htmlNote, htmlPinn, htmlTime, htmlContent, htmlTime, htmlButton, htmlEditButton];
        //return elementy;
        
        const noteTem = {
            htmlNote: htmlNote,
            htmlPinn: htmlPinn,
            htmlTitle: htmlTitle,
            htmlContent:htmlContent,
            htmlTime: htmlTime,
            htmlButton: htmlButton,
            htmlEditButton: htmlEditButton,
            htmlTagi: htmlTagi

        };
        this.addNote(noteTem);
    }
    removeNote(id){
        
        //let cont = document.querySelector('main');
        let cont = this.getNotesContainer();
        const elem = document.getElementById(id);
        console.log(elem);
        cont.removeChild(elem);
        

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
        return element.addEventListener(callback, event);
    }
    
    createUI(){
        const title = document.querySelector('#noteTitle').value;
        const content = document.querySelector('#noteContent').value;
        const color = document.querySelector('#choosenColor').value;
        const data = document.querySelector('#reminder').value;
        let tagi = document.getElementsByName('Tagi');
        
        
        let wybTagi = [];
        for(let i = 0; i < tagi.length; i++){
            if(tagi[i].checked == true){
                wybTagi.push(tagi[i].value);
            }
        }
        let info = [title, content, color, data, wybTagi.toString()];
        return info;
       
        
    }
    
}


//storage
//ui operations
