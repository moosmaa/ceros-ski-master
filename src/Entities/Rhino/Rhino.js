import * as Constants from "../../Constants";
import { Entity } from "../Entity";
import { intersectTwoRects, Rect } from "../../Core/Utils";

export class Rhino extends Entity {
    assetName = Constants.RHINO_LEFT;
    speed = Constants.RHINO_STARTING_SPEED;
    diagonalSpeed = Constants.RHINO_DIAGONAL_SPEED;
    isChasing = false;
    foodCaught = false;
    isEating = false;
    eatProgression = null;

    constructor(x, y) {
        super(x, y);
    }

    updateAsset(assetName) {
        this.assetName = assetName;
    }

    chase(food) {
        this.isChasing = true;

        if(food.x > this.x)
            this.x += Math.min(this.speed, food.x - this.x);
        else if (food.x < this.x)
            this.x -= Math.min(this.speed, this.x - food.x);

        if(food.y > this.y)
            this.y += Math.min(this.speed, food.y - this.y);
        else if (food.y < this.y)
            this.y -= Math.min(this.speed, this.y - food.y);

        this.foodCaught = this.checkIfFoodCaught(food);
    }

    checkIfFoodCaught(food) {
        if(food.x == this.x && food.y == this.y) {
            return true;
        } else {
            return false;
        }
    }

    initEat() {
        this.isEating = true;
        this.eatProgression = 0;
        this.updateAsset(Constants.RHINO_EAT[this.eatProgression]);
    }

    // asyncEat(downwardSpeed) {
    //     let jumpInterval = downwardSpeed*5;
    //     // if skier is not at the end of the jump
    //     if(this.jumpProgression < 4) {
    //         if((this.y - this.preJumpY) % jumpInterval === 0){
    //             this.jumpProgression += 1;
    //             this.updateAsset(Constants.RHINO_JUMP[this.jumpProgression]);
    //         }
    //     // else, complete the jump
    //     } else {
    //         if((this.y - this.preJumpY) % jumpInterval === 0) {
    //             this.isJumping = false;
    //             this.updateAsset(Constants.RHINO_DIRECTION_ASSET[this.direction]);
    //         }
    //     }
    // }


}