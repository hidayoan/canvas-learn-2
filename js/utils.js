const randomIntFromRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkCollision(obj1, obj2) {
  // Kiểm tra va chạm giữa obj1 và obj2
  if (obj2.isDead) return false;
  return collides = obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y;


}