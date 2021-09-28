class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.cameras.main.fadeOut(0);
    }

    create() {
        this.cursor = new Cursor(this, 'cursor').setDepth(10).setOrigin(0,0);

        this.menu = this.add.sprite(0, 0, 'mainMenu').setOrigin(0,0).setDepth(-1);
        this.startButton = new customButton(this, playWindowSize-300, playWindowSize-200, 'startButton');

        this.selectSound = this.sound.add('menuSelect');
        this.confirmSound = this.sound.add('menuConfirm');

        //this.menuMusic.setLoop(true);
            //this.menuMusic.play();
            //this.menuMusic.setVolume(0);
            //this.tweens.add({
                //targets:  this.menuMusic,
                //volume:   1,
                //duration: 1000
            //});

        this.time.delayedCall(0, () => {
            this.cameras.main.fadeIn(250);
        });
    }

    update() {
        this.cursor.update();
        this.startButton.update(this.cursor.x, this.cursor.y);
        if (this.startButton.isHovered){
            this.startButton.setTexture('startHover');
        } else {
            if (this.startButton.setTexture != 'startButton'){
                this.startButton.setTexture('startButton')
            }
        }
        if (this.startButton.isClicked){
            this.startButton.setTexture('startHit');
            this.time.delayedCall(500, () => {
                this.cameras.main.fadeOut(250);
                this.scene.start('Main');
            });
        }
    }
}