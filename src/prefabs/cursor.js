class Cursor extends Phaser.GameObjects.Sprite {
    constructor(scene, texture, x=100, y=100, frame){
        super(scene, x, y, texture, frame)
        this.CursorX = this.scene.input.activePointer.position.x;
        this.cursorY = this.scene.input.activePointer.position.y;
        scene.add.existing(this);
        this.canvas = this.scene.sys.canvas;
        this.canvas.style.cursor = 'none';
        
    }
    update(){
        this.cursorX = this.scene.input.activePointer.position.x;
        this.cursorY = this.scene.input.activePointer.position.y;
        this.setPosition(this.cursorX, this.cursorY);
    }
}