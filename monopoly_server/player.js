module.exports = class Player{
    constructor (name, id) {
         this.name = name;
         this.id = id;
         this.pos = 0;
         this.money = 1500;
         this.status = "Watcher";
    }
    getId (){
        return this.id;
    }
    getName(){
        return this.name;
    }
    getPos(){
        return this.pos;
    }
    setPos(val){
        this.pos = val;
    }
    addPos(val){
        this.pos += val;
        if ( this.pos > 39 ){
            this.pos -= 40;
        }
    }
    getMoney(){
        return this.money;
    }
    setMoney(val){
        this.money = val;
    }
    addMoney(val){
        this.money += val;
    }
    setState(val){
        this.state = val;
    }
}