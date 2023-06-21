class Background {
  constructor({ position, size }) {
    this.x = position.x;
    this.y = position.y;

    this.width = size.width;
    this.height = size.height;
    const img = new Image();
    img.src = 'assets/images/background.png';
    this.image = img;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update() {
    this.draw();
  }
}