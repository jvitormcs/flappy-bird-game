console.log('[JoaoVitor] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


// [Plano de Fundo]
const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );
  },
};

// [Chao]
const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
  desenha() {
    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      chao.x, chao.y,
      chao.largura, chao.altura,
    );

    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      (chao.x + chao.largura), chao.y,
      chao.largura, chao.altura,
    );
  },
};

function fazColisao (flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.atualiza;
  const chaoY = chao.y;
  if (flappyBirdY >= chaoY) {
    return true;
  }
  
  return false; 
};

const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  pulo: 4.7,
  pula() {
    flappyBird.velocidade = - flappyBird.pulo;
  },
  velocidade: 0,
  gravidade: 0.28,
  atualiza() {
    if (fazColisao(flappyBird, chao)) {
      console.log ("Fez Colisão")
      return;
    }


    flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
    flappyBird.y = flappyBird.y + flappyBird.velocidade;

  },
  desenha() {
    contexto.drawImage(
      sprites,
      flappyBird.spriteX, flappyBird.spriteY, // Sprite X, Sprite Y
      flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
      flappyBird.x, flappyBird.y,
      flappyBird.largura, flappyBird.altura,
    );
  }
}


const mensagemGetReady  = {
  sX: 134,
  sy: 0,
  w: 174,
  h: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,

  desenha() {
    contexto.drawImage (
      sprites,
      mensagemGetReady.sX, mensagemGetReady.sy,
      mensagemGetReady.w, mensagemGetReady.h,
      mensagemGetReady.x, mensagemGetReady.y,
      mensagemGetReady.w, mensagemGetReady.h
    );
  }
}


//
// [Telas]
//

let telaAtiva = {};
function mudaParaTela(novaTela) {
  telaAtiva = novaTela;
};

const Telas = {
  INICIO: {
    desenha () {
      planoDeFundo.desenha();
      chao.desenha();
      flappyBird.desenha();
      mensagemGetReady.desenha();
    },

    click () {
      mudaParaTela(Telas.JOGO);
    },

    atualiza () {

    }
  }
};

Telas.JOGO = {
  desenha () {
    planoDeFundo.desenha();
    chao.desenha();
    flappyBird.desenha();
  },

  click() {
    flappyBird.pula();
  },

  atualiza() {
    flappyBird.atualiza();
  }
}

function loop() {
  
  telaAtiva.desenha();
  telaAtiva.atualiza();

  

  requestAnimationFrame(loop);
}


window.addEventListener('click', () => {
  if (telaAtiva.click) {
      telaAtiva.click();
  }
})


mudaParaTela(Telas.INICIO);
loop();