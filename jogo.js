console.log('[JoãoVitor] Flappy Bird');

const sprite = new Image();
sprite.src = './sprite.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

function loop () {
  
  contexto.drawImage(
    sprite,
    0, 0, // Sprite X e Sprite Y
    33, 24, // Tamanho de Recorte do Sprite
    10, 50,
    33, 24
  );

  requestAnimationFrame(loop);

}

loop();