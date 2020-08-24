import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Skier extends Entity {
    assetName = Constants.SKIER_DOWN;

    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;
    diagonalSpeed = Constants.SKIER_DIAGONAL_SPEED;
    isJumping = false;
    jumpProgression = null;
    preJumpY = this.y;


    constructor(x, y) {
        super(x, y);
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset(Constants.SKIER_DIRECTION_ASSET[direction]);
    }

    updateAsset(assetName) {
        this.assetName = assetName;
    }

    move() {
        switch(this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
        }
    }

    moveSkierLeft() {
        this.x -= this.speed;
    }

    moveSkierLeftDown() {
        this.x -= this.diagonalSpeed;
        this.y += this.diagonalSpeed;
        if(this.isJumping) {
            this.progressJump(this.diagonalSpeed);
        }
    }

    moveSkierDown() {
        this.y += this.speed;
        if(this.isJumping) {
            this.progressJump(this.speed);
        }
    }

    moveSkierRightDown() {
        this.x += this.diagonalSpeed;
        this.y += this.diagonalSpeed;
        if(this.isJumping) {
            this.progressJump(this.diagonalSpeed);
        }
    }

    moveSkierRight() {
        this.x += this.speed;
    }

    moveSkierUp() {
        this.y -= this.speed;
    }

    turnLeft() {
        if(this.isJumping){
            // Do nothing. Skier cannot turn midair.
        } else if(this.direction === Constants.SKIER_DIRECTIONS.LEFT){
            this.moveSkierLeft();
        } else if (this.direction === Constants.SKIER_DIRECTIONS.CRASH){
            this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
            this.moveSkierLeft();
        } else {
            this.setDirection(this.direction - 1);
        }
    }

    turnRight() {
        if(this.isJumping){
            // Do nothing. Skier cannot turn midair.
        } else if(this.direction === Constants.SKIER_DIRECTIONS.RIGHT){
            this.moveSkierRight();
        } else if (this.direction === Constants.SKIER_DIRECTIONS.CRASH){
            this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
            this.moveSkierRight();
        } else {
            this.setDirection(this.direction + 1);
        }
    }

    turnUp() {
        if(this.isJumping){
            // Do nothing. Skier cannot turn midair.
        } else if (this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        if(this.isJumping){
            // Do nothing. Skier cannot turn midair.
        } else {
            this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        }
    }

    initJump() {
        // skier can only jump if moving in a downward direction
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT_DOWN || this.direction === Constants.SKIER_DIRECTIONS.RIGHT_DOWN || this.direction === Constants.SKIER_DIRECTIONS.DOWN){
            this.preJumpY = this.y;
            this.isJumping = true;
            this.jumpProgression = 0;
            this.updateAsset(Constants.SKIER_JUMP[this.jumpProgression]);
        }
    }

    progressJump(downwardSpeed) {
        let jumpInterval = downwardSpeed*5;
        // if skier is not at the end of the jump
        if(this.jumpProgression < 4) {
            if((this.y - this.preJumpY) % jumpInterval === 0){
                this.jumpProgression += 1;
                this.updateAsset(Constants.SKIER_JUMP[this.jumpProgression]);
            }
        // else, complete the jump
        } else {
            if((this.y - this.preJumpY) % jumpInterval === 0) {
                this.isJumping = false;
                this.updateAsset(Constants.SKIER_DIRECTION_ASSET[this.direction]);
            }
        }
    }



    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        const asset = assetManager.getAsset(this.assetName);
        const skierBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );

        const collision = obstacleManager.getObstacles().find((obstacle) => {
            const obstacleAssetName = obstacle.getAssetName();
            const obstacleAsset = assetManager.getAsset(obstacleAssetName);
            if(this.isJumping && Constants.OBSTACLES_SKIER_CAN_JUMP.indexOf(obstacleAssetName) > -1) {
                return false;
            } else {
                const obstaclePosition = obstacle.getPosition();
                const obstacleBounds = new Rect(
                    obstaclePosition.x - obstacleAsset.width / 2,
                    obstaclePosition.y - obstacleAsset.height / 2,
                    obstaclePosition.x + obstacleAsset.width / 2,
                    obstaclePosition.y
                );

                const skierHitObstacle = intersectTwoRects(skierBounds, obstacleBounds);

                if(skierHitObstacle && obstacle.getAssetName() == Constants.JUMP_RAMP){
                    this.initJump();
                    return false;
                } else {
                    return skierHitObstacle;
                }

            }

        });

        if(collision) {
            this.isJumping = false;
            this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        }
    };
}