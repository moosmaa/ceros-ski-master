import * as Constants from "../Constants";
import { Skier } from "./Skier";

test('On turnLeft after crash, skier faces left',() => {
    let skier = new Skier(0, 0);
    skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
    skier.turnLeft();
    expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
});
