import * as Constants from "../Constants";
import { Entity } from "./Entity";

export class Rhino extends Entity {
    assetName = Constants.RHINO_RUN[0];
    speed = Constants.RHINO_STARTING_SPEED;
    isEating = false;
    eatIterator;
    numEatingSteps = 5;
    runTimer;
    eatTimer;

    constructor(x, y) {
        super(x, y);

    }

    updateAsset(assetName) {
        this.assetName = assetName;
    }

    chase(skier) {
        // close x distance between rhino and skier
        if(skier.x > this.x)
            this.x += Math.min(this.speed, skier.x - this.x);
        else if (skier.x < this.x)
            this.x -= Math.min(this.speed, this.x - skier.x);
        // close y distance between rhino and skier
        if(skier.y > this.y)
            this.y += Math.min(this.speed, skier.y - this.y);
        else if (skier.y < this.y)
            this.y -= Math.min(this.speed, this.y - skier.y);

        let skierCaught = this.checkIfSkierCaught(skier);

        if (skierCaught )
            this.stopAnimateRun();

        return this.checkIfSkierCaught(skier);
    }

    animateRun() {
        let runProgression = 0;
        let rhino = this;
        this.runTimer = setInterval( function () {
            runProgression = runProgression === 0 ? 1 : 0;
            rhino.updateAsset(Constants.RHINO_RUN[runProgression]);
        }, 200);
    }

    stopAnimateRun() {
        clearInterval(this.runTimer);
    }

    checkIfSkierCaught(skier) {
        if(skier.x == this.x && skier.y == this.y) {
            return true;
        } else {
            return false;
        }
    }

    eat() {
        this.initEat();
        this.progressEat();
    }

    initEat() {
        this.isEating = true;
        this.eatIterator = 0;
        this.updateAsset(Constants.RHINO_EAT[this.eatIterator]);
    }

    progressEat() {
        let rhino = this;
        this.eatTimer = setTimeout( function(){
            rhino.eatIterator ++;
            if( rhino.eatIterator <= rhino.numEatingSteps ) {
                rhino.updateAsset(Constants.RHINO_EAT[rhino.eatIterator])
                rhino.progressEat();
            }
        }, 500)
    }

}