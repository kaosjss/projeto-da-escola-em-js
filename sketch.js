//Variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//Velocidade da bolinha
let velocidadeXbolinha = 5;
let velocidadeYbolinha = 5;

let raqueteComprimento = 10
let raqueteAltura= 90

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;

// variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons 
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp4");
  raquetada = loadSound("raquetada.mp4")
}
    
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(10);
  mostraBolinha();
  movimentaBolinha(); 
  verificaColisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  //calculaChanceDeErrar();
}


function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXbolinha;
  yBolinha += velocidadeYbolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXbolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYbolinha *= -1;
  }
}

 function mostraRaquete(x,y) {
  rect(x, y, raqueteComprimento, raqueteAltura);

}
      
       
function movimentaMinhaRaquete(){
if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  } 
    if(keyIsDown(DOWN_ARROW)){
      yRaquete +=10;
    }
}

function verificaColisaoRaquete(){
  if(xBolinha - raio < xRaquete + raqueteComprimento &&
    yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x,y){
  colidiu= collideRectCircle(x,y, raqueteComprimento,raqueteAltura,xBolinha,yBolinha,raio)
  if(colidiu){
    velocidadeXbolinha *=-1;
    raquetada.play();
  }
}


function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 -30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 30){
    chanceDeErrar = 32
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 15){
    chanceDeErrar = 21
    }
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(0,0,128));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(0,0,128));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
  
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10){
    pontosDoOponente += 1; 
    ponto.play();
  }
}
