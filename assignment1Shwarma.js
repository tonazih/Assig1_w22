const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TYPE:   Symbol("type"),
    SECOND_ITME: Symbol("second"),
    DRINKS:  Symbol("drinks"),
    FRUIT: Symbol("FRUIT")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sType = "";
        this.sDrinks = "";
        this.sItem = "Seafood";
        this.sItem2 ="Soup";
        this.sItem2_type ="";
        this.sFruit = "";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Conestoga's Seafood.");
                aReturn.push("What meal size would you like?");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TYPE
                this.sSize = sInput;
                aReturn.push("What type would you like?");
                break;
            case OrderState.TYPE:
                this.stateCur = OrderState.DRINKS
                this.sType = sInput;
                aReturn.push("Would you like drinks with that?");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} meal of ${this.sItem} of type ${this.sType}`);
                if(this.sDrinks){
                    aReturn.push(` with a drink of ${this.sDrinks}`);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}