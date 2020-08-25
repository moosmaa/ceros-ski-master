import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Rhino extends Entity {
    assetName = Constants.RHINO_RUN[0];
    speed = Constants.RHINO_STARTING_SPEED;
    isEating = false;
    eatProgression;
    numEatingSteps = 5;
    runT; // to-do: make these variables more intuitive
    eatT;

    constructor(x, y) {
        super(x, y);

    }

    updateAsset(assetName) {
        this.assetName = assetName;
    }

    chase(food) {
        if(food.x > this.x)
            this.x += Math.min(this.speed, food.x - this.x);
        else if (food.x < this.x)
            this.x -= Math.min(this.speed, this.x - food.x);

        if(food.y > this.y)
            this.y += Math.min(this.speed, food.y - this.y);
        else if (food.y < this.y)
            this.y -= Math.min(this.speed, this.y - food.y);

        let foodCaught = this.checkIfFoodCaught(food);

        if (foodCaught )
            this.stopAnimateRun();

        return this.checkIfFoodCaught(food);
    }

    animateRun() {
        let runProgression = 0;
        let rhino = this;
        this.runT = setInterval( function () {
            runProgression = runProgression === 0 ? 1 : 0;
            rhino.updateAsset(Constants.RHINO_RUN[runProgression]);
        }, 200);
    }

    stopAnimateRun() {
        clearInterval(this.runT);
    }

    checkIfFoodCaught(food) {
        if(food.x == this.x && food.y == this.y) {
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
        this.eatProgression = 0;
        this.updateAsset(Constants.RHINO_EAT[this.eatProgression]);
    }

    progressEat() {
        let rhino = this;
        this.eatT = setTimeout( function(){
            rhino.eatProgression ++;
            if( rhino.eatProgression <= rhino.numEatingSteps ) {
                rhino.updateAsset(Constants.RHINO_EAT[rhino.eatProgression])
                rhino.progressEat();
            }
        }, 500)
    }

}