import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { Rhino } from "../Entities/Rhino";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';

export class Game {
    gameWindow = null;
    rhinoTimerStarted = false;
    rhinoChasing = false;
    skierCaught = false;
    rhinoEating = false;

    constructor() {
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0);
        this.obstacleManager = new ObstacleManager();

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    init() {
        this.obstacleManager.placeInitialObstacles();
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    run() {
        this.canvas.clearCanvas();

        this.updateGameWindow();
        this.drawGameWindow();

        requestAnimationFrame(this.run.bind(this));

        if(!this.rhinoTimerStarted) {
            this.startRhinoTimer();
        }

    }

    updateGameWindow() {
        // if skier isn't caught, move skier
        // if rhino is currently chasing, move rhino
        if ( !this.skierCaught ){

            this.skier.move();

            if(this.rhinoChasing){
                this.skierCaught = this.rhino.chase(this.skier);
                this.rhinoChasing = !this.skierCaught;
            }
        }

        const previousGameWindow = this.gameWindow;
        this.calculateGameWindow();

        if(this.gameWindow) {
            this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);

            this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);
        }
    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

        // if skier isn't caught, draw skier
        // if skier is caught, draw rhino eating skier
        // if rhino is chasing, draw rhino chasing
        if (!this.skierCaught) {
            this.skier.draw(this.canvas, this.assetManager);
        } else {
            if(!this.rhinoEating) {
                this.rhino.eat();
                this.rhinoEating = true;
            }
            this.rhino.draw(this.canvas, this.assetManager);
        }

        if(this.rhinoChasing) {
            this.rhino.draw(this.canvas, this.assetManager);
        }

        this.obstacleManager.drawObstacles(this.canvas, this.assetManager);

    }

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    startRhinoTimer() {
        if(!this.rhinoTimerStarted){
            this.rhinoTimerStarted = true;
            return setTimeout(() => {
                this.startRhinoChase();
            }, Constants.SKIER_HEAD_START);
        }
    }

    startRhinoChase() {
        this.rhino = new Rhino(this.gameWindow.right - 50, this.gameWindow.top + 50);
        this.rhino.draw(this.canvas, this.assetManager);
        this.skierCaught = this.rhino.chase(this.skier);
        this.rhinoChasing = true;
        this.rhino.animateRun();
    }

    handleKeyDown(event) {
        switch(event.which) {
            case Constants.KEYS.LEFT:
                this.skier.turnLeft();
                event.preventDefault();
                break;
            case Constants.KEYS.RIGHT:
                this.skier.turnRight();
                event.preventDefault();
                break;
            case Constants.KEYS.UP:
                this.skier.turnUp();
                event.preventDefault();
                break;
            case Constants.KEYS.DOWN:
                this.skier.turnDown();
                event.preventDefault();
                break;
            case Constants.KEYS.SPACE:
                this.skier.initJump();
                event.preventDefault();
                break;
        }
    }
}