export default class Dane {
    constructor(){
        this.arr = [];
    }
    AddNote(note){
        this.arr.push(note);
        
    }
    getNotes(){ 
        return [...this.arr];
    }
    removeNotes(){
        this.arr = [];
    }
}