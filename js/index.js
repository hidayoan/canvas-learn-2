const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.style.border = '1px solid black';

canvas.width = WIDTH;
canvas.height = HEIGHT;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, WIDTH, HEIGHT);
let canvasPosition = canvas.getBoundingClientRect();

let count = 0;

const MOUSE = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  click: false
}

const KEYS = {
  KEY_W: {
    pressed: false
  },

  KEY_S: {
    pressed: false
  },

  KEY_A: {
    pressed: false
  },

  KEY_D: {
    pressed: false
  },
}

const background = new Background({
  position: {
    x: 0,
    y: 0
  },
  size: {
    width: WIDTH,
    height: HEIGHT
  }
});

const player = new Sprite({
  position: {
    x: canvas.width / 2,
    y: canvas.height / 2
  },
  size: {
    width: 50,
    height: 50
  },
  color: 'white'
});

const enermies = Array(50).fill().map(() => {
  let x = Math.random() * canvas.width;
  while (x + 100 > player.x && x - 50 < player.x) {
    x = Math.random() * canvas.width;
  }
  let y = Math.random() * canvas.height;
  while (y + 100 > player.y && y - 50 < player.y) {
    y = Math.random() * canvas.height;
  }
  return new Enermy({
    position: {
      x: x,
      y: y
    },
    size: {
      width: 50,
      height: 50
    },
    color: 'red'
  });
});

const generateEnermy = () => {
  let x = Math.random() * canvas.width;
  while (x + 100 > player.x && x - 50 < player.x) {
    x = Math.random() * canvas.width;
  }
  let y = Math.random() * canvas.height;
  while (y + 100 > player.y && y - 50 < player.y) {
    y = Math.random() * canvas.height;
  }
  enermies.push(new Enermy({
    position: {
      x: x,
      y: y
    },
    size: {
      width: 50,
      height: 50
    },
    color: 'red'
  }));
}

const animate = () => {
  count++;
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, WIDTH, HEIGHT);


  ctx.clearRect(0, 0, canvas.width, canvas.height);
  window.requestAnimationFrame(animate);

  background.update();

  if (count % 100 === 0) {
    generateEnermy();
  }

  enermies.forEach((enermy) => {
    enermy.update();
    // check player collision
    let check = player.checkCollisionBullets(enermy);
    if (check) {
      enermy.isDead = true;
      enermy.changeState('dead');

      setTimeout(() => {
        enermies.splice(enermies.indexOf(enermy), 1);
      }
      , 1500);
    }
    
  });

  player.update();

  if (KEYS.KEY_W.pressed) {
    player.velocity.y = -MOVE_SPEED;
  } else if (KEYS.KEY_S.pressed) {
    player.velocity.y = MOVE_SPEED;
  } else if (KEYS.KEY_A.pressed) {
    player.velocity.x = -MOVE_SPEED;
  } else if (KEYS.KEY_D.pressed) {
    player.velocity.x = MOVE_SPEED;
  }
}

animate();

window.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case KEY_W:
      player.changeState('move');
      KEYS.KEY_W.pressed = true;
      break;
    case KEY_S:
      player.changeState('move');
      KEYS.KEY_S.pressed = true;
      break;
    case KEY_A:
      player.changeState('move');
      KEYS.KEY_A.pressed = true;
      break;
    case KEY_D:
      player.changeState('move');
      KEYS.KEY_D.pressed = true;
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.keyCode) {
    case KEY_W:
      player.changeState('idle');
      KEYS.KEY_W.pressed = false;
      player.velocity.y = 0;
      break;
    case KEY_S:
      player.changeState('idle');
      KEYS.KEY_S.pressed = false;
      player.velocity.y = 0;
      break;
    case KEY_A:
      player.changeState('idle');
      KEYS.KEY_A.pressed = false;
      player.velocity.x = 0;
      break;
    case KEY_D:
      player.changeState('idle');
      KEYS.KEY_D.pressed = false;
      player.velocity.x = 0;
      break;
  }
});

window.addEventListener('mousemove', (event) => {
  const { clientX, clientY } = event;
  MOUSE.x = clientX - canvasPosition.left;
  MOUSE.y = clientY - canvasPosition.top;
});


window.addEventListener('click', (event) => {
  if (event.button === 0) {
    player.addBullet();
  }
});

canvas.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});
