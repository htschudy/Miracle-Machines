let playWindowSize = 600;
let borderPadding = 15;
let hoverColor = 0xfeb835;
let clickColor = 0xcd2838;

let config = {
    type: Phaser.WEBGL,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        width: playWindowSize,
        height: playWindowSize
    },
    scene: [Loading, Menu, Main],
    autoCenter: true,
}

let game = new Phaser.Game(config);