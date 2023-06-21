class Sprite {
  constructor({ position, size, color }) {
    this.x = position.x;
    this.y = position.y;

    this.width = size.width;
    this.height = size.height;

    this.color = color;

    this.gun = {
      position: {
        x: this.x + this.width / 2,
        y: this.y + this.height / 2
      },
      size: {
        width: 20,
        height: 4
      },
      color: 'transparent',
      bullets: []
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.lastKey = null;

    this.framesElapsed = 0;
    this.framesPerSecond = 2;

    this.currentFrame = 0;
    this.currentState = 'idle';
    this.frames = {
      idle: PLAYER_ASSETS.idle.map(src => {
        const img = new Image();
        img.src = src;
        return img;
      }
      ),
      move: PLAYER_ASSETS.move.map(src => {
        const img = new Image();
        img.src = src;
        return img;
      }
      )
    }
  }

  addBullet() {
    const bullet = new Bullet({
      position: {
        x: this.x + this.width / 2,
        y: this.y + this.height / 2
      },
      size: {
        width: 10,
        height: 10
      },
      color: 'red'
    });
    this.gun.bullets.push(bullet);
  }

  animatedBullets(angle) {
    const bullets = this.gun.bullets;
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].update(angle);
      if (bullets[i].isEnd) {
        this.gun.bullets.splice(i, 1);
      }
    }
  }

  checkCollisionBullets(enermy) {
    const bullets = this.gun.bullets;
    for (let i = 0; i < bullets.length; i++) {
      const val = checkCollision(bullets[i], enermy);
      if (val) {
        this.gun.bullets.splice(i, 1);
        return val;
      }
    }

    return false;
  }

  rotateRectangleByMouse() {

    const currentFrames = this.frames[this.currentState];

    const { x, y, width, height } = this;

    const centerX = x + width / 2;
    const centerY = y + height / 2;
    const angle = Math.atan2(MOUSE.y - centerY, MOUSE.x - centerX);

    this.animatedBullets(angle);

    ctx.save();
    ctx.translate(centerX, centerY);
    
    if (this.currentState !== 'dead') {
      ctx.rotate(angle);
    }

    // Draw the image back and up

    // ctx.fillRect(-width / 2, -height / 2, width, height);
    ctx.drawImage(currentFrames[this.currentFrame], -width / 1.4, -height / 1.4, width * 1.4, height * 1.4);
    ctx.fillStyle = this.gun.color;
    ctx.fillRect(this.gun.size.width / 6, -this.gun.size.height / 2, this.gun.size.width, this.gun.size.height);
    ctx.restore();

  }

  animateFrames() {
    const currentFrames = this.frames[this.currentState];
    this.framesElapsed++;
    if (this.framesElapsed % this.framesPerSecond === 0) {
      if (this.currentFrame === currentFrames.length - 1) {
        this.currentFrame = 0;
      } else {
        this.currentFrame++
      }
    }
  }

  changeState(newState) {
    // Set the new state
    this.currentState = newState;

    // Reset the current frame index
    this.currentFrame = 0;
  }

  draw() {
    this.rotateRectangleByMouse();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.x <= 0) {
      this.x = 0;
    } else if (this.x + this.width >= WIDTH) {
      this.x = WIDTH - this.width;
    }

    if (this.y <= 0) {
      this.y = 0;
    } else if (this.y + this.height >= HEIGHT) {
      this.y = HEIGHT - this.height;
    }

    this.draw();
    this.animateFrames();
  }
}