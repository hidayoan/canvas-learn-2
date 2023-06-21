const WIDTH = 1200;
const HEIGHT = 800;

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;

const KEY_W = 87;
const KEY_S = 83;
const KEY_A = 65;
const KEY_D = 68;

const KEY_SPACE = 32;

const MOVE_SPEED = 5;

const PLAYER_ASSETS = {
  idle: new Array(20).fill().map((_, i) => `assets/images/player/idle/survivor-idle_shotgun_${i}.png`),
  move: new Array(20).fill().map((_, i) => `assets/images/player/move/survivor-move_shotgun_${i}.png`),
  dead: ['assets/images/corpse.png']
}

const ZOMBIE_ASSETS = {
  idle: new Array(17).fill().map((_, i) => `assets/images/zombie/idle/skeleton-idle_${i}.png`),
  move: new Array(17).fill().map((_, i) => `assets/images/zombie/move/skeleton-move_${i}.png`),
  dead: ['assets/images/corpse.png']
}