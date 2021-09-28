class Loading extends Phaser.Scene {
    constructor() {
        super('Loading');
    }
    preload(){
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(240, 270, 320, 50);
        
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        this.loadingText = this.add.text(this.width / 2, this.height / 2 - 50, 'Loading...', {font: '20px monospace', fill: '#ffffff'}).setOrigin(0.5, 0.5);
        this.percentText = this.add.text(this.width / 2, this.height / 2 - 5,'0%', {font: '18px monospace', fill: '#ffffff'}).setOrigin(0.5, 0.5);
        this.assetText = this.add.text(this.width / 2, this.height / 2 + 50, '', {font: '18px monospace', fill: '#ffffff'}).setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value) {
            this.percentText.setText(parseInt(value * 100) + '%');
            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            this.progressBar.fillRect(250, 280, 300 * value, 30);
        }, this);
        
        this.load.on('fileprogress', function (file) {
            this.assetText.setText('Loading asset: ' + file.key);
        }, this);

        this.load.on('complete', function () {
            this.progressBar.destroy();
            this.progressBox.destroy();
            this.loadingText.destroy();
            this.percentText.destroy();
            this.assetText.destroy();
            this.scene.start('Menu');
        }, this);

        this.load.image('mainMenu', './assets/sprites/menu/mainMenu.png');
        this.load.image('startButton', './assets/sprites/menu/startButton.png')
        this.load.image('startHit', './assets/sprites/menu/startButtonHit.png');
        this.load.image('startHover', './assets/sprites/menu/startButtonHover.png');
        this.load.image('cursor', './assets/sprites/global/cursor.png');
        this.load.audio('menuSelect', './assets/sound/menuSelect.wav');
        this.load.audio('menuConfirm', './assets/sound/menuConfirm.wav');
        this.load.image('game','./assets/sprites/game/game.png');
        this.load.image('textSpacer','./assets/sprites/ui/textSpacer.png');
        this.load.image('suppliesImage','./assets/sprites/ui/supplies.png');
        this.load.image('contactsImage','./assets/sprites/ui/contacts.png');
        this.load.image('machinesImage','./assets/sprites/ui/machines.png');
        this.load.image('uiBox1', './assets/sprites/ui/uiBox1.png');
        this.load.image('uiBox2','./assets/sprites/ui/uiBox2.png');
        this.load.image('uiBoxPower','./assets/sprites/ui/uiBoxPower.png');
        this.load.image('uiBoxMain','./assets/sprites/ui/uiBoxMain.png');
        this.load.image('uiSeparator1','./assets/sprites/ui/uiSeparator1.png');
        this.load.image('powerTube', './assets/sprites/game/tubes.png');
        this.load.image('wires', './assets/sprites/game/wire.png');
        this.load.image('settings', './assets/sprites/ui/settings.png');
        this.load.bitmapFont('plantain', './assets/fonts/plantain_0.png', './assets/fonts/plantain.fnt');
        this.load.bitmapFont('plantainBold', './assets/fonts/plantainBold_0.png', './assets/fonts/plantainBold.fnt');
        this.load.bitmapFont('plantainItalics', './assets/fonts/plantainItalics_0.png', './assets/fonts/plantainItalics.fnt');
        this.load.bitmapFont('plantainSmall', './assets/fonts/plantainSmall_0.png', './assets/fonts/plantainSmall.fnt');
        this.load.bitmapFont('plantainSmallBold', './assets/fonts/plantainSmallBold_0.png', './assets/fonts/plantainSmallBold.fnt');
        this.load.bitmapFont('plantainSmallItalics', './assets/fonts/plantainSmallItalics_0.png', './assets/fonts/plantainSmallItalics.fnt');
    }
    create(){

    }
    update(){

    }
}