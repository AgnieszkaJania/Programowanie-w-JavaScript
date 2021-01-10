
export default class Database{
    constructor(itemName = 'weather'){
        this.itemName = itemName;
    }
    setItem(item){
        localStorage.clear();
        localStorage.setItem(this.itemName, JSON.stringify(item));
    }
    
    getItem(){

        const check = localStorage.getItem(this.itemName);
        if(check != null){
            return JSON.parse(localStorage.getItem(this.itemName));
        }
    }
    removeItems(){
        localStorage.clear();
    }
    
        
    
}
