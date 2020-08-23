import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Skier extends Entity {
    assetName = Constants.SKIER_DOWN;

    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;
    diagonalSpeed = Constants.SKIER_DIAGONAL_SPEED;
    isJumping = false;
    preJumpDirection = this.direction;
    preJumpY = this.y;

    constructor(x, y) {
        super(x, y);
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    }

    updateAsset() {
        this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
    }

    move() {
        const directionMoving = this.isJumping ? this.preJumpDirection : this.direction;

        switch(directionMoving) {
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
        switch(this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT:
                this.moveSkierLeft();
                break;
            case Constants.SKIER_DIRECTIONS.CRASH:
                this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
                this.moveSkierLeft();
                break;
            case Constants.SKIER_DIRECTIONS.JUMP1: // to-do, add all jump cases
                // Do nothing. Skier cannot turn midair.
                break;
            default:
                this.setDirection(this.direction - 1);
        }
    }

    turnRight() {
        switch(this.direction) {
            case Constants.SKIER_DIRECTIONS.RIGHT:
                this.moveSkierRight();
                break;
            case Constants.SKIER_DIRECTIONS.CRASH:
                this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
                this.moveSkierRight();
                break;
            case Constants.SKIER_DIRECTIONS.JUMP1: // to-do: add all jump cases
                // Do nothing. Skier cannot turn midair.
                break;
            default:
                this.setDirection(this.direction + 1);
        }
    }

    turnUp() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        // to-do: cannot turn during jump
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    initJump() {
        // skier can only jump if moving in a downward direction
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT_DOWN || this.direction === Constants.SKIER_DIRECTIONS.RIGHT_DOWN || this.direction === Constants.SKIER_DIRECTIONS.DOWN){
            this.preJumpDirection = this.direction;
            this.preJumpY = this.y;
            this.isJumping = true;
            this.setDirection(Constants.SKIER_DIRECTIONS.JUMP1);
        }
    }

    progressJump(downwardSpeed) {
        let jumpInterval = downwardSpeed*5;
        // if skier is not at the end of the jump
        if(this.direction < Constants.SKIER_DIRECTIONS.JUMP5) {
            if((this.y - this.preJumpY) % jumpInterval === 0){
                this.setDirection(this.direction + 1);
            }
        // else, complete the jump
        } else {
            if((this.y - this.preJumpY) % jumpInterval === 0) {
                this.isJumping = false;
                this.setDirection(this.preJumpDirection);
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

                return intersectTwoRects(skierBounds, obstacleBounds);
            }

        });

        if(collision) {
            this.isJumping = false;
            this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        }
    };
}