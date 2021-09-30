class Main extends Phaser.Scene {
    constructor() {
        super("Main");
    }

    preload(){
        this.buttonList = [];
        this.powerLevel = '020'
        this.powerLevelMax = '200'
    }

    create(){
        this.cursor = new Cursor(this, 'cursor').setDepth(10).setOrigin(0,0);

        this.gameWindow = this.add.sprite(0, 0, 'game').setOrigin(0,0).setDepth(-1);
        this.cameras.main.fadeIn(0);

        this.machinesBox = new customButton(this, borderPadding+42.5,borderPadding+25, 'uiBox1', ['plantain','Machines']).setDepth(0);
        this.buttonList.push(this.machinesBox);
        this.suppliesBox = new customButton(this, borderPadding+42.5,this.machinesBox.height+(borderPadding*2)+25, 'uiBox1', ['plantain','Supplies']).setDepth(0);
        this.buttonList.push(this.suppliesBox);
        this.contactsBox = new customButton(this, borderPadding+42.5,(this.machinesBox.height*2)+(borderPadding*3)+25, 'uiBox1', ['plantain','Contacts']).setDepth(0);
        this.buttonList.push(this.contactsBox);

        this.separator1 = this.add.image(borderPadding+(this.contactsBox.width/3)-1,this.contactsBox.height+borderPadding+1, 'uiSeparator1').setOrigin(0,0).setDepth(0);
        this.separator2 = this.add.image(borderPadding+(this.contactsBox.width/3)-1,((this.contactsBox.height+borderPadding)*2)+1, 'uiSeparator1').setOrigin(0,0).setDepth(0);
        this.separator3 = this.add.image(borderPadding+(this.contactsBox.width/3)-1,((this.contactsBox.height+borderPadding)*3)+1, 'uiSeparator1').setOrigin(0,0).setDepth(0);
        
        this.uiBoxMain = this.add.sprite((borderPadding*2)+ this.machinesBox.width-5, borderPadding-10, 'uiBoxMain').setOrigin(0,0);
        this.uiBoxPower = this.add.sprite(playWindowSize-borderPadding-170, borderPadding, 'uiBoxPower').setOrigin(-1,0);

        this.statsBox = this.add.sprite(borderPadding,(this.machinesBox.height*3)+(borderPadding*4), 'uiBox2').setOrigin(0,0).setDepth(0);
        this.contents = "The boilers are running at full power."

        this.text = this.add.bitmapText(120, 315, 'plantainSmall', this.contents);

        this.wires = this.add.image(playWindowSize-borderPadding-79, borderPadding+7, 'wires').setOrigin(0,0).setDepth(0);
        //this.add.sprite().setOrigin(0,0).setDepth(1);
        this.powerTube = this.add.sprite(playWindowSize-borderPadding-79, borderPadding+7, 'powerTube').setOrigin(0,0).setDepth(2);

        this.powerHeader = this.add.bitmapText(520,313, 'plantain', 'Power');
        this.powerHeader = this.add.bitmapText(515,335, 'plantain', `${this.powerLevel}/${this.powerLevelMax}`);
        this.powerTextSpacer = this.add.image(504,330, 'textSpacer').setOrigin(0,0).setDepth(0);

        
        this.cameras.main.fadeIn(250);

        this.settingsButton = new customButton(this, 0, 0, 'settings', ['','']).setOrigin(0,0);

        this.materiaInventory = new Inventory(this, 'inventoryLarge', 24, 405).setOrigin(0,0);
    }

    update(){
        this.cursor.update();
        this.materiaInventory.update(this.cursor.x,this.cursor.y);
        this.powerHeader.text = `${this.powerLevel}/${this.powerLevelMax}`
        
        for (let i = 0; i < this.buttonList.length; i++){
            this.buttonList[i].update(this.cursor.x,this.cursor.y);
            this.buttonCheck(this.buttonList[i]);
        }
    }

    buttonCheck(button){
        if(button.isClicked){
            button.setTint(clickColor);
            if(button == this.machinesBox) {
                this.materiaInventory.addItem("001");
            }
            if(button == this.suppliesBox){
                
            }
            if(button == this.contactsBox){
                this.materiaInventory.addItemToSlot("002", 1, 1);
            }
            if(button.label){
                button.label.setTint(clickColor);
            }
        } else {
            if (button.isHovered){
                button.setTint(hoverColor);
                if(button.label){
                    button.label.setTint(hoverColor);
                }
            } else {
                button.clearTint();
                if(button.label){
                    button.label.clearTint();
                }
            }
        }
    }

}