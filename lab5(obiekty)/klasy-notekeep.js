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
    constructor(){
        this.notesArr = [];
        this.db = new Db();
        
        setInterval(() => {
            this.checkforNotifications();
        }, 1000);   
    }

    checkforNotifications(){
        const timestamp = Date.now();
        const notifies = this.notesArr.filter(el => Math.abs(el.reminderDate - timestamp) < 1000);
        
        if(notifies.length > 0){
            for (let i = 0; i < notifies.length; i++) {
                alert('Przypomnienie o notatce \n' + 'Tytuł notatki: \n' + notifies[i].title + '\n' + 'Data utworzenia: \n' + 
                notifies[i].createDate + '\n' + 'Treść notatki: \n' + notifies[i].content);
            }
        } 
    }  
    
    createNote(info){
    
        let note = new Note(info[0],info[1], info[2], false, info[3], info[4]);
        return note;
    }
    addNote(note){
        
        this.notesArr.push(note);
        this.db.saveNotes(this.notesArr);
        
    }
    removeNote(id){
        let czyPinned = this.notesArr.find(el => el.id == id ).pinned;
        this.notesArr = this.notesArr.filter(el => el.id != id);
        
        console.log(this.notesArr);
        this.db.saveNotes(this.notesArr);
        return czyPinned;
        
    }
    getNote(id){
        return this.notesArr.find(el => el.id == id);
    }
    getNotes(){
        return [...this.notesArr];
    }   
    editNote(nr, info){
        let editedNote = this.notesArr.find(el => el.id == nr);
        let index = this.notesArr.indexOf(editedNote);
        
        this.notesArr[index].title = info[0];
        this.notesArr[index].content = info[1];
        this.notesArr[index].color = info[2];
        this.notesArr[index].reminderDate = new Date(info[3]);
        this.notesArr[index].tagi = info[4];
        this.db.saveNotes(this.notesArr);
    }
    pinnNote(nr){

        let editedNote = this.notesArr.find(el => el.id == nr);
        console.log(editedNote);
        let index = this.notesArr.indexOf(editedNote);
        if(this.notesArr[index].pinned == false){
            this.notesArr[index].pinned = true;
            this.db.saveNotes(this.notesArr);
            return this.notesArr[index];
        }
        else
        {
            this.notesArr[index].pinned = false;
            this.db.saveNotes(this.notesArr);
            return this.notesArr[index];
        }
           
    }    
}


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
    constructor(){
        
        this.notesObj = new Notes();
        this.uiObj = new UI();
        this.createNoteUIObj = new createNoteUI();
        this.addNewNoteHandler(this.uiObj, this.notesObj, this.createNoteUIObj, this.ReminderObj);
        this.SearchNoteHandler(this.notesObj);  
    }
    
    addNewNoteHandler(uiObj, notesObj, createNoteUIObj) {
        
        document.querySelector('#newNoteBtn').addEventListener('click',function(){
            
            const noteData = uiObj.createUI();
            let note = notesObj.createNote(noteData);
            notesObj.addNote(note);
            createNoteUIObj.creatNote(note, notesObj);   
        });
    }

    SearchNoteHandler(notesObj){
        document.querySelector('#searchBtn').addEventListener('click', function(){
            let szukane = document.querySelector('#search').value;
            let arr = notesObj.getNotes();
            for(let i = 0; i < arr.length; i++){
                if(arr[i].title.search(szukane) != -1 || arr[i].content.search(szukane) != -1||arr[i].tagi.search(szukane) != -1 || (JSON.stringify(arr[i].createDate.toLocaleString()).search(szukane)) != -1){
                    console.log(arr);
                    let identyfikator = arr[i].id;
                    document.getElementById(identyfikator).classList.remove('note');
                    document.getElementById(identyfikator).classList.add('green');
                }
            }
            const htmlCofnij = document.createElement('button');
            htmlCofnij.innerHTML = 'confnij wyszukiwanie';
            document.querySelector('section').appendChild(htmlCofnij);

            htmlCofnij.addEventListener('click', function(){
                document.querySelector('section').removeChild(htmlCofnij);
                let notki = document.querySelectorAll('.green');
                for(let i = 0; i < notki.length; i ++){
                    notki[i].classList.remove('green');
                    notki[i].classList.add('note'); 
                    
                }

            });
        });
        
        
        
    }
}


class createNoteUI{

    constructor( containerSelector = 'main'){
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
    }
    creatNote(note, notesObj){
        
        const htmlNote = document.createElement('div');
        const htmlPinn = document.createElement('div');
        const htmlTitle = document.createElement('h1');
        const htmlContent = document.createElement('p');
        const htmlTime = document.createElement('time');
        const htmlButton = document.createElement('button');
        const htmlEditButton = document.createElement('button');
        const htmlTagi = document.createElement('p');
        htmlNote.classList.add('note');
        htmlTitle.innerHTML = note.title;
        //htmlPinn.innerHTML = '<i class="fas fa-thumbtack"></i>';
        htmlContent.innerHTML = note.content;
        htmlTime.innerHTML = note.createDate.toLocaleString();//tutaj
        htmlPinn.classList.add('pinn');
        htmlPinn.style.backgroundColor = 'rgb(251,136,136)';
        if(note.pinned == false){
            htmlPinn.innerHTML = 'pinn';
        }
        else
        {
            htmlPinn.innerHTML = 'unpinn';
        }
        htmlNote.style.backgroundColor = note.color;
        htmlButton.innerHTML = 'remove';
        htmlEditButton.innerHTML = 'edit';
        htmlNote.id = note.id;
        htmlTagi.innerHTML = note.tagi;
        htmlButton.id = 's' + note.id;
        htmlPinn.id = 'p' + note.id;
        htmlButton.classList.add('remove');
        htmlEditButton.classList.add('edit');
        let createNoteUIObj2 = new createNoteUI();
        let createNoteUIObject = new createNoteUI('#pinned');
        htmlEditButton.addEventListener('click', function(ev){
            
            let id = ev.target.parentElement.id;
            let notatkaSzukana = notesObj.getNote(id);
            console.log(notatkaSzukana);
            document.querySelector('#noteTitle').value = notatkaSzukana.title;
            document.querySelector('#noteContent').value = notatkaSzukana.content;
            document.querySelector('#choosenColor').value = notatkaSzukana.color;
            
            const htmlSubmitButton = document.createElement('button');
            const htmlCancelButton = document.createElement('button');
            htmlSubmitButton.innerHTML = 'Submit changes';
            htmlCancelButton.innerHTML = 'Cancel';
            const sect = document.querySelector('section');
            sect.appendChild(htmlSubmitButton);
            sect.appendChild(htmlCancelButton);
            htmlCancelButton.addEventListener('click', function(){
                sect.removeChild(htmlSubmitButton);
                sect.removeChild(htmlCancelButton);
            });
            htmlSubmitButton.addEventListener('click', function(){
                
                console.log(id);
                let newUIObj = new UI();
                let noweDane = newUIObj.createUI();
                notesObj.editNote(id, noweDane);
                let notatki = document.querySelectorAll('.note');
                notatki.forEach(element => {
                    if(element.id == id){
                        htmlTitle.innerHTML = noweDane[0];
                        htmlContent.innerHTML = noweDane[1]; 
                        htmlTagi.innerHTML = noweDane[4];   
                        htmlNote.style.backgroundColor = noweDane[2];
                    }
                });
                sect.removeChild(htmlSubmitButton);
                sect.removeChild(htmlCancelButton);
                
            });
            
            
        });
        htmlButton.addEventListener('click', function(ev) {
            let id = ev.target.parentElement.id;
            
            let czyPrzyp = notesObj.removeNote(id);
            if(czyPrzyp){
                createNoteUIObject.removeNote(id);
            }
            else{
                createNoteUIObj2.removeNote(id);
            }
           
        });

        
        htmlPinn.addEventListener('click', function(ev){
            let id = ev.target.parentElement.id;
            let pinnedNote = notesObj.pinnNote(id);
            
            if(pinnedNote.pinned == true){
                
                createNoteUIObj2.removeNote(id);
                createNoteUIObject.creatNote(pinnedNote,notesObj);
            }
            else
            {
                createNoteUIObject.removeNote(id);
                createNoteUIObj2.creatNote(pinnedNote, notesObj);
            }

        });
        
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
        
        
        let cont = this.getNotesContainer();
        const elem = document.getElementById(id);
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
        document.querySelector('#reminder').value = null;
        return info;  
    }
    
}

//export{NotesUI};

//storage
//ui operations

