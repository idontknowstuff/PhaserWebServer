import Phaser from "phaser";
import Data from "../data.json";
class Duel extends Phaser.Scene {
    constructor() {
        super("Duel");

        this.block1;
        this.block2;
        this.block3;
        this.block4;
        this.block1text;
        this.block2text;
        this.block3text;
        this.block4text;
        this.time;

        this.trueanswer;
        this.rightwrong;

        // global variables
        this.playerProgress = 0;
        this.enemyProgress = 1;
        this.playerProgressBar;
        this.enemyProgressBar;
        this.enemyHealth;
        this.playerHealth;
        this.playerProgressText;
        this.enemyProgressText;
        this.playerY;
        this.enemyY;
        this.mentionVictory = false;

        // keyspaces
        this.keySpace;
    }

    

    create(){

        // variables
        this.playerHealth = 5;
        this.enemyHealth = 5;

        this.timer = 300;
        
        const arr = ["0","0","0","0"];

        this.trueanswer = arr;

        var useranswer = ["0","0","0","0"];
        this.rightwrong = [0,0,0,0];

        // background
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0,0);

        // progress bar for amount of questions completed
        // enemy bar
        this.enemyProgressBar = this.makeBar(950,600,0x900f0f);
        this.setValue(this.enemyProgressBar, this.enemyProgress*20);
        // player bar
        this.playerProgressBar = this.makeBar(900,600,0x1eb053);
        this.setValue(this.playerProgressBar, this.playerProgress*20);

        // text
        this.playerHealthText = this.add.text(200,50, this.playerHealth);
        this.EnemyHealthText = this.add.text(600,50, this.enemyHealth);
        this.enemyY = this.mini(575 - this.enemyProgress*100, 575);
        this.playerY = this.mini(575 - this.playerProgress*100, 575);
        this.enemyProgressText = this.add.text(970, this.enemyY, this.enemyProgress, {fontSize: '20px', fill: "#000000", stroke: '#000000', strokeThickness: 1});
        this.playerProgressText = this.add.text(920, this.playerY, this.playerProgress, {fontSize: '20px', fill: "#000000", stroke: '#000000', strokeThickness: 1});
        this.time = this.add.text(350, 50, this.timer);
        // timer
        // const timerLabel = this.add.text(50,50, "45");
 
        // work place, question place, blocks place
        this.add.image(0, 200, "WorkPlace").setOrigin(0,0);
        this.add.image(0, 100, "QuestionPlace").setOrigin(0,0);

        // blocks and sets name
        this.block1 = this.add.image(575, 250, "blocks").setName("1");
        this.block2 = this.add.image(575, 350, "blocks").setName("2");
        this.block3 = this.add.image(575, 450, "blocks").setName("3");
        this.block4 = this.add.image(575, 550, "blocks").setName("4");


        // empty text variables for later inserting uses 
        this.block1text = this.add.text(200,300, "");
        this.block2text = this.add.text(200,300, "");
        this.block3text = this.add.text(200,300, "");
        this.block4text = this.add.text(200,300, "");

        // make the blocks draggable
        this.block1.setInteractive();
        this.block2.setInteractive();
        this.block3.setInteractive();
        this.block4.setInteractive();
        this.input.setDraggable(this.block1);
        this.input.setDraggable(this.block2);
        this.input.setDraggable(this.block3);
        this.input.setDraggable(this.block4);


        
        // when object is dragged
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

            console.log("dragged");
        });

        //  4 drop zones and sets the names
        this.zone1 = this.add.zone(200, 250, 100, 50).setRectangleDropZone(100,50).setName("1");
        this.zone2 = this.add.zone(200, 350, 100, 50).setRectangleDropZone(100,50).setName("2");
        this.zone3 = this.add.zone(200, 450, 100, 50).setRectangleDropZone(100,50).setName("3");
        this.zone4 = this.add.zone(200, 550, 100, 50).setRectangleDropZone(100,50).setName("4");

        
        // registering input keys for debugging
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //  Just a visual display of the drop zone
        var graphics = this.add.graphics();
        graphics.lineStyle(2, 0xffff00);
        graphics.strokeRect(this.zone1.x - this.zone1.input.hitArea.width / 2, this.zone1.y - this.zone1.input.hitArea.height / 2, this.zone1.input.hitArea.width, this.zone1.input.hitArea.height);
        graphics.strokeRect(this.zone2.x - this.zone2.input.hitArea.width / 2, this.zone2.y - this.zone2.input.hitArea.height / 2, this.zone2.input.hitArea.width, this.zone2.input.hitArea.height);
        graphics.strokeRect(this.zone3.x - this.zone3.input.hitArea.width / 2, this.zone3.y - this.zone3.input.hitArea.height / 2, this.zone3.input.hitArea.width, this.zone3.input.hitArea.height);
        graphics.strokeRect(this.zone4.x - this.zone4.input.hitArea.width / 2, this.zone4.y - this.zone4.input.hitArea.height / 2, this.zone4.input.hitArea.width, this.zone4.input.hitArea.height);
        

        this.input.on('dragenter', function (pointer, gameObject, dropZone) {

            graphics.lineStyle(2, 0x00ffff);
            graphics.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height);
        }, this);

        this.input.on('dragleave', function (pointer, gameObject, dropZone) {

            graphics.clear();
            graphics.lineStyle(2, 0xffff00);
            // graphics.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height);
            graphics.strokeRect(this.zone1.x - this.zone1.input.hitArea.width / 2, this.zone1.y - this.zone1.input.hitArea.height / 2, this.zone1.input.hitArea.width, this.zone1.input.hitArea.height);
            graphics.strokeRect(this.zone2.x - this.zone2.input.hitArea.width / 2, this.zone2.y - this.zone2.input.hitArea.height / 2, this.zone2.input.hitArea.width, this.zone2.input.hitArea.height);
            graphics.strokeRect(this.zone3.x - this.zone3.input.hitArea.width / 2, this.zone3.y - this.zone3.input.hitArea.height / 2, this.zone3.input.hitArea.width, this.zone3.input.hitArea.height);
            graphics.strokeRect(this.zone4.x - this.zone4.input.hitArea.width / 2, this.zone4.y - this.zone4.input.hitArea.height / 2, this.zone4.input.hitArea.width, this.zone4.input.hitArea.height);

        },this);

        this.input.on('drop', function (pointer, gameObject, dropZone) {

            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            // changes the index that is needed to be changed into integer
            var change = parseInt(dropZone.name);
            
            // change answers
            useranswer[change-1] = gameObject.name;

            // allows inputs
            gameObject.input.enabled = true;

        });

        this.input.on('dragend', function (pointer, gameObject, dropped) {

            if (!dropped)
            {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }

            graphics.clear();
            graphics.lineStyle(2, 0xffff00);
            // graphics.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height);
            graphics.strokeRect(this.zone1.x - this.zone1.input.hitArea.width / 2, this.zone1.y - this.zone1.input.hitArea.height / 2, this.zone1.input.hitArea.width, this.zone1.input.hitArea.height);
            graphics.strokeRect(this.zone2.x - this.zone2.input.hitArea.width / 2, this.zone2.y - this.zone2.input.hitArea.height / 2, this.zone2.input.hitArea.width, this.zone2.input.hitArea.height);
            graphics.strokeRect(this.zone3.x - this.zone3.input.hitArea.width / 2, this.zone3.y - this.zone3.input.hitArea.height / 2, this.zone3.input.hitArea.width, this.zone3.input.hitArea.height);
            graphics.strokeRect(this.zone4.x - this.zone4.input.hitArea.width / 2, this.zone4.y - this.zone4.input.hitArea.height / 2, this.zone4.input.hitArea.width, this.zone4.input.hitArea.height);

        },this);

        // back button
        var BackBtn = this.add.image(50, 25, "Back");
        BackBtn.setInteractive({useHandCursor: true});
        BackBtn.on('pointerdown', () => this.clickBackButton());
        
        // loads question
        this.loadquestion();
        
        // sets timer
        setInterval(this.countdown.bind(this), 1000);


        // check button to see if answer is correct
        var SubmitBtn = this.add.image(700, 150, "checkBtn");
        SubmitBtn.setInteractive();
        SubmitBtn.on('pointerdown', () => this.clickSubmit(useranswer));
        // resets answer for next attempt
    }

    update(){
        this.block1text.setPosition(this.block1.x, this.block1.y);
        this.block2text.setPosition(this.block2.x, this.block2.y);
        this.block3text.setPosition(this.block3.x, this.block3.y);
        this.block4text.setPosition(this.block4.x, this.block4.y);
        // var graphics = this.add.graphics();
        // graphics.strokeRect(this.zone1.x - this.zone1.input.hitArea.width / 2, this.zone1.y - this.zone1.input.hitArea.height / 2, this.zone1.input.hitArea.width, this.zone1.input.hitArea.height);
        // graphics.strokeRect(this.zone2.x - this.zone2.input.hitArea.width / 2, this.zone2.y - this.zone2.input.hitArea.height / 2, this.zone2.input.hitArea.width, this.zone2.input.hitArea.height);
        // graphics.strokeRect(this.zone3.x - this.zone3.input.hitArea.width / 2, this.zone3.y - this.zone3.input.hitArea.height / 2, this.zone3.input.hitArea.width, this.zone3.input.hitArea.height);
        // graphics.strokeRect(this.zone4.x - this.zone4.input.hitArea.width / 2, this.zone4.y - this.zone4.input.hitArea.height / 2, this.zone4.input.hitArea.width, this.zone4.input.hitArea.height);
        if (this.keySpace.isDown){
            console.log("SPACEKEY IS DOWN");
            console.log(this.zone1.x);
            console.log(this.input.mousePointer.y);
        }
    }

    loseHealth(){
        this.playerHealth -= 1;
        this.playerHealthText.setText(this.playerHealth);
    }

    countdown(){
        if (this.timer >= 0){
            this.timer -= 10;
            this.time.setText("Time left: " + this.timer);
        }
        else{
            if (this.mentionVictory == false){
                this.timesUp();
                this.mentionVictory = true;
            }
        }
    }

    timesUp(){
        if (this.playerProgress > this.enemyProgress){
            console.log("PLAYER WINS!");
        }
        else if(this.playerProgress < this.enemyProgress){
            console.log("ENEMY WINS!");
        }
        else{
            console.log("TIE BREAKER! Who has the most health WINS!");

            if (this.playerHealth > this.enemyHealth){
                console.log("PLAYERWINS");
            }
            else if (this.playerHealth < this.enemyHealth){
                console.log("ENEMYWINS");
            }
            else{
                console.log("REAL TIE :|");
            }
        }
    }

    clickBackButton(){
        // input.manager.resetCursor({ cursor: true });
        this.scene.switch('DuelPrep');
    }

    UpscorePlayer(){
        this.playerProgress += 1;
        this.setValue(this.playerProgressBar, this.playerProgress*20);
        this.playerProgressText.setText(this.playerProgress);
        this.playerY = this.mini(575 - this.playerProgress*100, 575);
        this.playerProgressText.y = this.playerY;
    }

    clickSubmit(ans){
        // contains checking
        console.log("checking!");
        var correct = true;
        var whichwrong = [0,0,0,0];
        console.log(ans);
        console.log(this.trueanswer);

        // resets block position after submit
        this.block1.x = 575;
        this.block1.y = 250;
        this.block2.x = 575;
        this.block2.y = 350;
        this.block3.x = 575;
        this.block3.y = 450;
        this.block4.x = 575;
        this.block4.y = 550;

        for (let i = 0; i < 4; i++){
            if (ans[i] == this.trueanswer[i]){
                continue;
            }
            else{
                whichwrong[i] = 1;
                var correct = false;
            }
        }
        if (correct){
            // if the player gets correct combo
            console.log("pass");
            this.UpscorePlayer();
            console.log(this.playerProgress);
            // resets the answer after submit
            ans[0] = "0";
            ans[1] = "0";
            ans[2] = "0";
            ans[3] = "0";
        }
        else{
            // player gets it wrong
            for (let i = 0; i < 4; i++){
                if (whichwrong[i]){
                    // finds which ones are wrong
                    console.log(i + " is wrong");
                }
            }
            // reset answer after wrong as well
            ans[0] = "0";
            ans[1] = "0";
            ans[2] = "0";
            ans[3] = "0";
            // penalty
            this.loseHealth();
        }
    }

    

    makeBar(x, y, color){
        let bar = this.add.graphics();

        // coloring the bar
        bar.fillStyle(color, 1);

        // add rectangle
        bar.fillRect(0, 0, 50, 500);

        // where the bar is
        bar.x = x;
        bar.y = y;

        // returns the results of the bar
        return bar;
    }

    // sets the bar's percentage
    setValue(bar, percentage){
        bar.scaleY = -percentage/100;
    }

    mini(a, b){
        if (a < b){
            return a;
        }
        else{
            return b;
        }
    }

    loadquestion(){
        fetch(Data)
            .then(response => response.json())
            .then(data => {
                var style = { font: "20px Arial", fill: "#00ff00", align: "center", wordWrap: { width: 600 } };
                var text = this.add.text(25,125,data.questions[0].question, style);
                text.setColor("#00ff00");

                // insert the data into the empty string variables
                this.block1text.setText(data.questions[0].blocks[0]);
                this.block2text.setText(data.questions[0].blocks[1]);
                this.block3text.setText(data.questions[0].blocks[2]);
                this.block4text.setText(data.questions[0].blocks[3]);

                this.trueanswer[0] = data.questions[0].answer[0];
                this.trueanswer[1] = data.questions[0].answer[1];
                this.trueanswer[2] = data.questions[0].answer[2];
                this.trueanswer[3] = data.questions[0].answer[3];
                console.log(this.trueanswer);


            })
            .catch(error => console.log(error));
    }
}

export default Duel;