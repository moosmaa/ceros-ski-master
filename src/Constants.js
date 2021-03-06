export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';
export const SKIER_JUMP = [
    'skierJump1',
    'skierJump2',
    'skierJump3',
    'skierJump4',
    'skierJump5'
    ];
export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';
export const JUMP_RAMP = 'jumpRamp';
export const RHINO_RUN = [
    'rhinoLeft',
    'rhinoLeft2'
    ]
export const RHINO_EAT = [
    'rhinoLift',
    'rhinoLiftMouthOpen',
    'rhinoLiftEat1',
    'rhinoLiftEat2',
    'rhinoLiftEat3',
    'rhinoLiftEat4'
    ]
export const RHINO_DEFAULT = 'rhinoDefault';

export const OBSTACLES_SKIER_CAN_JUMP = [
    ROCK1,
    ROCK2,
    JUMP_RAMP
]

export const SKIER_STARTING_SPEED = 10;
export const SKIER_HEAD_START = 10000; // in milliseconds
export const SKIER_DIAGONAL_SPEED = 7
export const RHINO_STARTING_SPEED = 10;

export const ASSETS = {
    [SKIER_CRASH]: 'img/skier_crash.png',
    [SKIER_LEFT]: 'img/skier_left.png',
    [SKIER_LEFTDOWN]: 'img/skier_left_down.png',
    [SKIER_DOWN]: 'img/skier_down.png',
    [SKIER_RIGHTDOWN]: 'img/skier_right_down.png',
    [SKIER_RIGHT]: 'img/skier_right.png',
    [SKIER_JUMP[0]]: 'img/skier_jump_1.png',
    [SKIER_JUMP[1]]: 'img/skier_jump_2.png',
    [SKIER_JUMP[2]]: 'img/skier_jump_3.png',
    [SKIER_JUMP[3]]: 'img/skier_jump_4.png',
    [SKIER_JUMP[4]]: 'img/skier_jump_5.png',
    [RHINO_DEFAULT]: 'img/rhino_default.png',
    [RHINO_RUN[0]]: 'img/rhino_run_left.png',
    [RHINO_RUN[1]]: 'img/rhino_run_left_2.png',
    [RHINO_EAT[0]]: 'img/rhino_lift.png',
    [RHINO_EAT[1]]: 'img/rhino_lift_mouth_open.png',
    [RHINO_EAT[2]]: 'img/rhino_lift_eat_1.png',
    [RHINO_EAT[3]]: 'img/rhino_lift_eat_2.png',
    [RHINO_EAT[4]]: 'img/rhino_lift_eat_3.png',
    [RHINO_EAT[5]]: 'img/rhino_lift_eat_4.png',
    [TREE] : 'img/tree_1.png',
    [TREE_CLUSTER] : 'img/tree_cluster.png',
    [ROCK1] : 'img/rock_1.png',
    [ROCK2] : 'img/rock_2.png',
    [JUMP_RAMP] : 'img/jump_ramp.png',
};

export const SKIER_DIRECTIONS = {
    CRASH : 0,
    LEFT : 1,
    LEFT_DOWN : 2,
    DOWN : 3,
    RIGHT_DOWN : 4,
    RIGHT : 5
};

export const SKIER_DIRECTION_ASSET = {
    [SKIER_DIRECTIONS.CRASH] : SKIER_CRASH,
    [SKIER_DIRECTIONS.LEFT] : SKIER_LEFT,
    [SKIER_DIRECTIONS.LEFT_DOWN] : SKIER_LEFTDOWN,
    [SKIER_DIRECTIONS.DOWN] : SKIER_DOWN,
    [SKIER_DIRECTIONS.RIGHT_DOWN] : SKIER_RIGHTDOWN,
    [SKIER_DIRECTIONS.RIGHT] : SKIER_RIGHT
};

export const KEYS = {
    LEFT : 37,
    RIGHT : 39,
    UP : 38,
    DOWN : 40,
    SPACE: 32
};