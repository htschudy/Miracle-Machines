class Item extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, itemObject, texture=itemObject.texture, frame){
        super(scene, x, y, texture, frame);
        this.itemObject = itemObject;
        this.name = itemObject.name;
        this.aspects = itemObject.aspects;
        this.color = itemObject.color;
        this.texture = itemObject.texture;
        this.tint = this.color;
        scene.add.existing(this);
    }
}