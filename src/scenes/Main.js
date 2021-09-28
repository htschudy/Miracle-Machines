class Main extends Phaser.Scene {
    constructor() {
        super("Main");
    }

    preload(){
        this.buttonList = [];
        this.stats = [12, 30, 10, 30, 17, 30, 10000];
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
        
        //this.separator3 = this.add.image(100+borderPadding-1,90, 'uiSeparator1').setOrigin(0,0).setDepth(0).setRotation(1.5708);

        this.uiBoxMain = this.add.sprite((borderPadding*2)+ this.machinesBox.width-5, borderPadding-10, 'uiBoxMain').setOrigin(0,0);
        this.uiBoxPower = this.add.sprite(playWindowSize-borderPadding-170, borderPadding, 'uiBoxPower').setOrigin(-1,0);

        this.statsBox = this.add.sprite(borderPadding,(this.machinesBox.height*3)+(borderPadding*4), 'uiBox2').setOrigin(0,0).setDepth(0);
        this.statNumberValues = `${this.stats[0]}\n\r${this.stats[1]}\n\r${this.stats[2]}\n\r${this.stats[3]}\n\r${this.stats[4]}\n\r${this.stats[5]}\n\r\n\r${this.stats[6]}`;
        this.contents = "The boilers are running at full power."

        this.text = this.add.bitmapText(120, 315, 'plantainSmall', this.contents);

        this.wires = this.add.image(playWindowSize-borderPadding-79, borderPadding+7, 'wires').setOrigin(0,0).setDepth(0);
        //this.add.sprite().setOrigin(0,0).setDepth(1);
        this.powerTube = this.add.sprite(playWindowSize-borderPadding-79, borderPadding+7, 'powerTube').setOrigin(0,0).setDepth(2);

        this.powerHeader = this.add.bitmapText(520,313, 'plantain', 'Power');
        this.powerHeader = this.add.bitmapText(515,335, 'plantain', `${this.powerLevel}/${this.powerLevelMax}`);
        this.powerTextSpacer = this.add.image(504,330, 'textSpacer').setOrigin(0,0).setDepth(0);

        this.statsHeader = this.add.bitmapText(borderPadding+5, (borderPadding*4)+(this.machinesBox.height*3)+5, 'plantain', 'Stats');
        this.statSeparator = this.add.image(borderPadding+3.5, (borderPadding*4)+(this.machinesBox.height*3)+this.statsHeader.height+10, 'textSpacer').setOrigin(0,0);
        this.statDescriptionText = this.add.bitmapText(borderPadding+5, (borderPadding*4)+(this.machinesBox.height*3)+40, 'plantainSmallItalics', 'Smarts\nFatigue\nCharm\nSanity\nSpirit\nFocus\n\nMoney');
        this.moneySeparator = this.add.image(borderPadding+3.5, (borderPadding*4)+(this.machinesBox.height*3)+this.statsHeader.height+this.statDescriptionText.height, 'textSpacer').setOrigin(0,0);
        this.statNumbers = this.add.bitmapText(borderPadding+30, (borderPadding*4)+(this.machinesBox.height*3)+40, 'plantainSmallItalics', this.statNumberValues).setRightAlign();
        this.cameras.main.fadeIn(250);

        this.settingsButton = new customButton(this, 0, 0, 'settings', ['','']).setOrigin(0,0);
    }

    update(){
        this.cursor.update();
        this.powerHeader.text = `${this.powerLevel}/${this.powerLevelMax}`
        this.statNumbers.text = `${this.stats[0]}\n\r${this.stats[1]}\n\r${this.stats[2]}\n\r${this.stats[3]}\n\r${this.stats[4]}\n\r${this.stats[5]}\n\r\n\r${this.stats[6]}`;
        
        for (let i = 0; i < this.buttonList.length; i++){
            this.buttonList[i].update(this.cursor.x,this.cursor.y);
            this.buttonCheck(this.buttonList[i]);
        }
    }

    buttonCheck(button){
        if(button.isClicked){
            button.setTint(clickColor);
            if(button == this.machinesBox) {
                this.stats[6]*=10;
            }
            if(button == this.suppliesBox){
                console.log(this.stats)
            }
            if(button == this.contactsBox){
                this.clicks++
                console.log(this.clicks)
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