import * as Constants from "../Constants";
import { Skier } from "./Skier";

describe('Skier', () => {

    let skier;

    beforeEach(() => {
        skier = new Skier(0,0);
    });

    describe('that has CRASHed', () => {

        beforeEach(() => {
            skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        });

        test('should face LEFT on turnLeft',() => {
            skier.turnLeft();
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
        });

        test('should face RIGHT on turnRight',() => {
            skier.turnRight();
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
        });

    });

    describe('that is facing LEFT', () => {

        beforeEach(() => {
            skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
        });

        test('should face LEFT on turnLeft',() => {
            skier.turnLeft();
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
        });

        test('should move LEFT on turnLeft',() => {
            const moveLeftSpy = jest.spyOn(skier,'moveSkierLeft');
            skier.turnLeft();
            expect(moveLeftSpy).toHaveBeenCalled();
        });

        test('should face LEFT_DOWN on turnRight',() => {
            skier.turnRight();
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
        });

    });

    describe('that is facing LEFT_DOWN', () => {

        beforeEach(() => {
            skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
        });

        test('should face LEFT on turnLeft',() => {
            skier.turnLeft();
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
        });

        test('should face DOWN on turnRight',() => {
            skier.turnRight();
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.DOWN);
        });

    });

    describe('that is facing DOWN', () => {

        beforeEach(() => {
            skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        });

        test('should face LEFT_DOWN on turnLeft',() => {
            skier.turnLeft();
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
        });

        test('should face RIGHT_DOWN on turnRight',() => {
            skier.turnRight();
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
        });

    });

    describe('that is facing RIGHT', () => {

        beforeEach(() => {
            skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
        });

        test('should face RIGHT on turnRight',() => {
            skier.turnRight();
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
        });

        test('should move RIGHT on turnRight',() => {
            const moveRightSpy = jest.spyOn(skier,'moveSkierRight');
            skier.turnRight();
            expect(moveRightSpy).toHaveBeenCalled();
        });

        test('should face RIGHT_DOWN on turnLeft',() => {
            skier.turnLeft();
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
        });

    });

    describe('that is facing RIGHT_DOWN', () => {

        beforeEach(() => {
            skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
        });

        test('should face RIGHT on turnRight',() => {
            skier.turnRight();
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
        });

        test('should face DOWN on turnLeft',() => {
            skier.turnLeft();
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.DOWN);
        });

    });





});


