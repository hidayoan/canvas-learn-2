class Bullet {
  constructor({ position, size, color }) {
    this.initX = position.x;
    this.initY = position.y;

    this.x = position.x;
    this.y = position.y;

    this.width = size.width;
    this.height = size.height;

    this.radius = 4;

    this.color = color;

    this.mouseX = MOUSE.x;
    this.mouseY = MOUSE.y;

    this.click = false;
    this.isEnd = false;

    const image = new Image();
    image.src = './assets/images/bullet.png';
    this.image = image;
  }

  draw(angle) {
    ctx.fillStyle = this.color;

    ctx.save();

    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;

    ctx.translate(centerX, centerY);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.drawImage(this.image, -this.width / 4, -this.height / 4, this.width * 2, this.height * 2);
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    if (!this.isEnd) {
      const dx = this.mouseX - this.x;
      const dy = this.mouseY - this.y;

      this.x += dx / 10; 
      this.y += dy / 10;

      const diagonal = Math.sqrt(
        Math.pow(
          this.x - this.initX, 2
        ) + Math.pow(
          this.y - this.initY, 2
        )
      );
      if (diagonal > 300) {
        
        this.isEnd = true;
      }

      if (this.x < this.mouseX + 1 && this.x > this.mouseX - 1 && this.y < this.mouseY + 1 && this.y > this.mouseY - 1) {
        this.isEnd = true;
      }
    }
  }

  update(angle) {
    this.draw(angle);
  }
}