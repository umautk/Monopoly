module.exports = class Player{
    constructor (name, id) {
         this.name = name;
         this.id = id;
         this.pos = 0;
         this.money = 1500;
    }
    getId (){
        return this.id;
    }
    getNmae(){
        return this.name;
    }
    getPos(){
        return this.pos;
    }
    setPos(val){
        this.pos = val;
    }
    getMoney(){
        return this.money;
    }
    setMoney(val){
        this.money = val;
    }
}