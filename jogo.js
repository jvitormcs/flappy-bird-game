
let frames = 0;
const somHIT = new Audio();
somHIT.src = "./efeitos/hit.wav";

const sprites = new Image();
sprites.src = "./sprites.png";

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");

// [Plano de Fundo]
const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    contexto.fillStyle = "#70c5ce";
    contexto.fillRect(0, 0, canvas.width, canvas.height);

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX,
      planoDeFundo.spriteY,
      planoDeFundo.largura,
      planoDeFundo.altura,
      planoDeFundo.x,
      planoDeFundo.y,
      planoDeFundo.largura,
      planoDeFundo.altura
    );

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX,
      planoDeFundo.spriteY,
      planoDeFundo.largura,
      planoDeFundo.altura,
      planoDeFundo.x + planoDeFundo.largura,
      planoDeFundo.y,
      planoDeFundo.largura,
      planoDeFundo.altura
    );
  },
};

// [Chao]
function criaChao() {
  const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,

    atualiza() {
      const movimentoChao = 1;
      const repeteChao = chao.largura / 4;
      const movimentacao = chao.x - movimentoChao;

      chao.x = movimentacao % repeteChao;
    },

    desenha() {
      contexto.drawImage(
        sprites,
        chao.spriteX,
        chao.spriteY,
        chao.largura,
        chao.altura,
        chao.x,
        chao.y,
        chao.largura,
        chao.altura
      );

      contexto.drawImage(
        sprites,
        chao.spriteX,
        chao.spriteY,
        chao.largura,
        chao.altura,
        chao.x + chao.largura,
        chao.y,
        chao.largura,
        chao.altura
      );
    },
  };

  return chao;
}

function fazColisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY = chao.y;
  if (flappyBirdY >= chaoY) {
    return true;
  }
  return false;
}

function criaFlappyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.9,
    pula() {
      flappyBird.velocidade = -flappyBird.pulo;
    },
    velocidade: 0,
    gravidade: 0.28,
    atualiza() {
      if (fazColisao(flappyBird, globais.chao)) {
        somHIT.play();

          mudaParaTela(Telas.GAMEOVER);
        return;
      }

      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
      flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },

    movimento: [
      { spriteX: 0, spriteY: 0 }, //asinha pra cima
      { spriteX: 0, spriteY: 26 }, //asinha no meio
      { spriteX: 0, spriteY: 52 }, // asinha pra baixo
      { spriteX: 0, spriteY: 26 }, //asinha no meio
    ],

    frameAtual: 0,
    atualizaFrameAtual() {
      const intervaloFrames = 10;

      const passouIntervalo = frames % intervaloFrames === 0;

      if (passouIntervalo) {
        const baseIncremento = 1;
        const incremento = baseIncremento + flappyBird.frameAtual;
        const baseRepeticao = flappyBird.movimento.length;
        flappyBird.frameAtual = incremento % baseRepeticao;
      }
    },
    desenha() {
      flappyBird.atualizaFrameAtual();
      const { spriteX, spriteY } = flappyBird.movimento[flappyBird.frameAtual];
      contexto.drawImage(
        sprites,
        spriteX,
        spriteY, // Sprite X, Sprite Y
        flappyBird.largura,
        flappyBird.altura, // Tamanho do recorte na sprite
        flappyBird.x,
        flappyBird.y,
        flappyBird.largura,
        flappyBird.altura
      );
    },
  };
  return flappyBird;
}

const mensagemGetReady = {
  sX: 134,
  sy: 0,
  w: 174,
  h: 152,
  x: canvas.width / 2 - 174 / 2,
  y: 50,

  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.sX,
      mensagemGetReady.sy,
      mensagemGetReady.w,
      mensagemGetReady.h,
      mensagemGetReady.x,
      mensagemGetReady.y,
      mensagemGetReady.w,
      mensagemGetReady.h
    );
  },
};

const mensagemGameOver = {
  sX: 134,
  sy: 153,
  w: 226,
  h: 200,
  x: canvas.width / 2 - 226 / 2,
  y: 50,

  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGameOver.sX,
      mensagemGameOver.sy,
      mensagemGameOver.w,
      mensagemGameOver.h,
      mensagemGameOver.x,
      mensagemGameOver.y,
      mensagemGameOver.w,
      mensagemGameOver.h
    );
  },
};

function criaCanos() {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 52,
      spriteY: 169,
    },
    espaco: 90,
    desenha() {
      canos.pares.forEach(function (par) {
        const yRandom = par.y;
        const espacamentoEntreCanos = 100;

        const canoCeuX = par.x;
        const canoCeuY = yRandom;

        // [Cano do C??u]
        contexto.drawImage(
          sprites,
          canos.ceu.spriteX,
          canos.ceu.spriteY,
          canos.largura,
          canos.altura,
          canoCeuX,
          canoCeuY,
          canos.largura,
          canos.altura
        );

        // [Cano do Ch??o]
        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
        contexto.drawImage(
          sprites,
          canos.chao.spriteX,
          canos.chao.spriteY,
          canos.largura,
          canos.altura,
          canoChaoX,
          canoChaoY,
          canos.largura,
          canos.altura
        );

        par.canoCeu = {
          x: canoCeuX,
          y: canos.altura + canoCeuY,
        };
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY,
        };
      });
    },
    temColisaoComOFlappyBird(par) {
      const cabecaDoFlappy = globais.flappyBird.y;
      const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

      if (globais.flappyBird.x + globais.flappyBird.largura >= par.x) {
        if (cabecaDoFlappy <= par.canoCeu.y) {
          return true;
        }

        if (peDoFlappy >= par.canoChao.y) {
          return true;
        }
      }
      return false;
    },
    pares: [],
    atualiza() {
      const passou100Frames = frames % 100 === 0;
      if (passou100Frames) {
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        });
      }

      canos.pares.forEach(function (par) {
        par.x = par.x - 2;

        if (canos.temColisaoComOFlappyBird(par)) {
          somHIT.play();
          mudaParaTela(Telas.GAMEOVER);
        }

        if (par.x + canos.largura <= 0) {
          canos.pares.shift();
        }
      });
    },
  };

  return canos;
}

function criaPlacar() {
  const placar = {
    pontuacao: 0,
    desenha() {
      contexto.font = '40px "VT323"';
      contexto.textAlign = 'right';
      contexto.fillStyle = 'white';
      contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);      
    },
    atualiza() {
      const intervaloDeFrames = 20;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if(passouOIntervalo) {
        placar.pontuacao = placar.pontuacao + 1;
      }
    }
  }
  return placar;
}

//
// [Telas]
//

const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
  telaAtiva = novaTela;

  if (telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}

const Telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criaFlappyBird();
      globais.chao = criaChao();
      globais.canos = criaCanos();
    },

    desenha() {
      planoDeFundo.desenha();
      globais.chao.desenha();
      globais.flappyBird.desenha();
      mensagemGetReady.desenha();
    },

    click() {
      mudaParaTela(Telas.JOGO);
    },

    atualiza() {
      globais.chao.atualiza();
    },
  },
};

Telas.JOGO = {

  inicializa() {
    globais.placar = criaPlacar();
  },

  desenha() {
    planoDeFundo.desenha();
    globais.canos.desenha();
    globais.chao.desenha();
    globais.flappyBird.desenha();
    globais.placar.desenha();
  },

  click() {
    globais.flappyBird.pula();
  },

  atualiza() {
    globais.flappyBird.atualiza();
    globais.chao.atualiza();
    globais.canos.atualiza();
    globais.placar.atualiza();
  },
};


Telas.GAMEOVER = {
  desenha() {
    mensagemGameOver.desenha();
  },
  atualiza(){

  },
  click() {
    mudaParaTela(Telas.INICIO)
  }
}

function loop() {
  telaAtiva.desenha();
  telaAtiva.atualiza();

  frames = frames + 1;
  requestAnimationFrame(loop);
}

window.addEventListener("click", () => {
  if (telaAtiva.click) {
    telaAtiva.click();
  }
});

window.addEventListener('keydown', (e) => {
  if (telaAtiva.click && !e.repeat && e.code === 'Space') {
    telaAtiva.click();
  }
});

mudaParaTela(Telas.INICIO);
loop();
