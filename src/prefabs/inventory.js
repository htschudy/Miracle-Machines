class Inventory extends Phaser.GameObjects.Sprite {
    constructor(scene, texture, x, y, frame){
        super(scene, texture, frame);
        this.x = x;
        this.y = y;
        this.itemActiveZoneSize = 32
        this.itemBorderSize = 3;
        this.itemWidth = 13;
        this.itemHeight = 4;
        this.spacingPX = 5;
        this.itemQueue = [...Array(this.itemHeight)].map(e => Array(this.itemWidth));
        this.initialize()
        console.log(this.itemQueue);
    }
    update(cursorX, cursorY){
        for (let i = 0; i < this.itemHeight; i++){
            for (let j = 0; j < this.itemWidth; j++){
                if (this.checkItemCollision(this.itemQueue[i][j], cursorX, cursorY)){
                    console.log(`collision detected in cell [${i}][${j}] at ${this.itemQueue[i][j].hitZoneX}, ${this.itemQueue[i][j].hitZoneY}!`);
                }
            }
        }
    }
    initialize(){
        for (let i = 0; i < this.itemHeight; i++){
            let currentY = this.y + this.itemBorderSize + (this.itemActiveZoneSize+(this.itemBorderSize*2)+this.spacingPX)*i;
            for (let j = 0; j < this.itemWidth; j++){
                let currentX = this.x + this.itemBorderSize + (this.itemActiveZoneSize+(this.itemBorderSize*2)+this.spacingPX)*j;
                this.itemQueue[i][j] = {hitZoneX: currentX, hitZoneY: currentY, item: undefined};
            }
        }
    }
    addItem(itemID){
        let itemToAdd = itemDataBase.find(x => x.id === itemID);
        console.log(`Found ${itemToAdd.name} at item id ${itemID}`);
        let itemAddedBool = false;
        itemAdd:for (let i = 0; i < this.itemHeight; i++){
            for (let j = 0; j < this.itemWidth; j++){
                if(!this.itemQueue[i][j].item){
                    this.itemQueue[i][j].item = new Item(this.scene, this.itemQueue[i][j].hitZoneX, this.itemQueue[i][j].hitZoneY, itemToAdd).setOrigin(0,0);
                    console.log(`Successfully added ${itemToAdd.name}!`);
                    itemAddedBool = true;
                    break itemAdd;
                }
            }
        }
        if (!itemAddedBool){
            console.log(`Not enough room to add ${itemToAdd.name}.`)
        }
    }
    addItemToSlot(itemID, i, j){
        let itemToAdd = itemDataBase.find(x => x.id === itemID);
        console.log(`Found ${itemToAdd.name} at item id ${itemID}`);
        if (!this.itemQueue[i][j].item){
            this.itemQueue[i][j].item = new Item(this.scene, this.itemQueue[i][j].hitZoneX, this.itemQueue[i][j].hitZoneY, itemToAdd).setOrigin(0,0);
            console.log(`Successfully added ${itemToAdd.name} to slot [${i}][${j}]!`);
        } else {
            console.log(`Slot [${i}][${j}] is already full.`)
        }
    }
    removeItem(itemID){
        itemDel:for (let i = 0; i < this.itemHeight; i++){
            for (let j = 0; j < this.itemWidth; j++){
                if (this.itemQueue[i][j].id === itemID){
                    //TODO: Item quantities.
                    this.itemQueue[i][j] = undefined;
                }
            }
        }
    }
    checkItemCollision(value, cursorX, cursorY){
        if(cursorX >= (value.hitZoneX) && cursorX <= (value.hitZoneX+this.itemActiveZoneSize) &&
            cursorY >= (value.hitZoneY) && cursorY <= (value.hitZoneY+this.itemActiveZoneSize)){
                return true;
        } else{
            return false;
        }
    }
}