class Rock {
  constructor({ position, size, color }) {
    this.x = position.x;
    this.y = position.y;

    this.width = size.width;
    this.height = size.height;

    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.draw();
  }
}