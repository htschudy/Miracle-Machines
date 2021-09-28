class customButton extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, label=['',''], frame){
        super(scene, x, y, texture, frame);
        this.isClicked = false;
        this.isHovered = false;
        this.isClicking = false;
        this.hasClicked = false;
        scene.add.existing(this);
        if (label[0] != ''){
            this.label = scene.add.bitmapText(x,y, label[0], label[1]).setOrigin(0.5,0.5);
        }
    }
    
    update(cursorX, cursorY){
        if(!this.scene.input.activePointer.isDown && this.hasClicked){
            this.hasClicked = false;
        }
        if(!this.scene.input.activePointer.isDown && this.isClicking == true) {
            this.isClicking = false;
        } else if(this.scene.input.activePointer.isDown && this.isClicking == false) {
            this.isClicking = true;
        }

        if (this.mouseHoverCheck(cursorX, cursorY)) {
            this.isHovered = true
            if (this.mouseClickCheck(cursorX, cursorY)){
                this.isClicked = true;
            } else {
                this.isClicked = false;
            }
        } else {
            this.isHovered = false;
        }
    }
    mouseHoverCheck(cursorX, cursorY){
        if(cursorX >= (this.x-(this.width/2)) && cursorX <= (this.x+(this.width/2)) &&
            cursorY >= this.y-(this.height/2) && cursorY <= (this.y+(this.height/2))){
                return true;
        } else{
            return false;
        }
    }
    mouseClickCheck(cursorX, cursorY){
        if (this.mouseHoverCheck(cursorX, cursorY) && this.isClicking && !this.hasClicked){
            this.hasClicked = true;
            return true;
        } else{
            return false;
        }
    }
}