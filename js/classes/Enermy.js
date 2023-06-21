class Enermy extends Sprite {
  constructor({ position, size, color }) {
    super({ position, size, color });
    this.frames = {
      idle: ZOMBIE_ASSETS.idle.map(src => {
        const img = new Image();
        img.src = src;
        return img;
      }),
      move: ZOMBIE_ASSETS.move.map(src => {
        const img = new Image();
        img.src = src;
        return img;
      }),
      dead: ZOMBIE_ASSETS.dead.map(src => {
        const img = new Image();
        img.src = src;
        return img;
      }),
    }
    this.framesPerSecond = 2
  }
}