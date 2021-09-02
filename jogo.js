console.log('[JoãoVitor] Flappy Bird');

const sprite = new Image();
sprite.src = './sprite.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

contexto.drawImage(
  sprite,
  sx, sy,
  sWidth, sHeight,
  dx, dy,
  dWidth, dHeight
);