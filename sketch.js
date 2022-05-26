//Projeto Elementrouble
var katzume; //Personagem principal

//Animações
var animationrun, animationjump, animationdown, animationidle, animationdownwalk;
var animationrun_right, animationjump_right, animationdown_right, animationidle_right, animationdownwalk_right;

let cam; //Criar a camera

//Cenario do fundo
var fundoobj, fundoobj1, fundoobj2, fundoobj3, fundoimgesq, fundoimgdir, fundoaldeiaesq, fundoaldeiadir;
var solo, solo1, solo2, solo3, solo4;
var soloimg, soloimg1, soloimgal, soloimgal1;
var sky;

var leftedges, rightedges, topedges;

//Animais e inimigos
var passaro, passaroimg;
var zombie, zombieimg, zombiecollison, zombiecollisonscale;
let attackzombiecooldown = 0

//Estado
var estadodojogo; //Estado do jogo
var estadopersonagem; //Se agachar mudar a colisão
var estadosaltando; //Não poder aperta o botão de pula varias vezes
var localização; //Mudar o cenario do jogo
var estadoataque; //Estado do Ataque
var ladopersonagem; //Verificar qual é o lado do personagem
var estadopause;

//Vida
var lifecounterhud, lifehud2, lifehud3, lifehud4, lifehud5;
var lifecounterimg;
var lifecounter; //Contador de vida
var somdead;

//Energia
var energymeterhud,energymeterimg;
var energymeter;
var estadoenergia;

//Carregando
var tela, telacontrol;
var btn_start, btn_control;
var btn_mudarcenario;

//Update Objetivo
var objetivo_aviso, objetivo_avisoobj;

//Menu HUD
var pausesprite, pauseimg;
var pauseconfig_btn, pausesair_btn, pauseconfig, pausesair, pausevoltar;

var musicamenu;

function preload(){
  //Animações de movimento
  animationrun = loadImage("./animation/run_left.gif")
  animationdownwalk = loadImage("./animation/downrun_left.gif")
  animationrun_right = loadImage("./animation//run_right.gif")
  animationdownwalk_right = loadImage("./animation/downrun_right.gif")

  //Animações de comando
  animationidle = loadImage("./animation/idle.png")
  animationjump = loadImage("./animation/jump.png")
  animationdown = loadImage("./animation/down.png")

  animationidle_right = loadImage("./animation/idle_right.png")
  animationjump_right = loadImage("./animation/jump_right.png")
  animationdown_right = loadImage("./animation/down_right.png")

  fundoimgesq = loadImage("./image/fundo.jpg") //Fundo da imagem
  fundoimgdir = loadImage("./image/fundoright.png")

  fundoaldeiaesq = loadImage("./image/aldeia_fundo.png")
  fundoaldeiadir = loadImage("./image/aldeiafundo_right.png")

  soloimg = loadImage("./image/chao.png") //Imagem solo
  soloimg1 = loadImage("./image/chãoright.png")
  soloimgal = loadImage("./image/chaoaldeia.png")
  soloimgal1 = loadImage("./image/chaoaldeia_right.png")

  passaroimg = loadImage("./animals/bird.png") //Imagem passaro
  zombieimg = loadImage("./animals/zombie.png") //Imagem inimigo

  objetivo_aviso = loadImage("./animation/novo_objetivo.gif")

  pauseconfig = loadImage("./image/menupause_config.png");
  pausesair = loadImage("./image/menupause_sair.png");
  pauseimg = loadImage("./image/menudesign.png")

  musicamenu = loadSound("./som/musiquinha.mp3");
}

function setup(){
  createCanvas(2000,1000,WEBGL);
  katzume = createSprite(1000,570);
  katzume.addImage(animationidle) //Katzume iniciar na animação parado
 
  objetivo_avisoobj = createSprite(katzume.x,katzume.y -370);
  objetivo_avisoobj.addImage(objetivo_aviso);
  objetivo_avisoobj.visible = 0;

  lifecounterhud = createSprite(katzume.x -712,70,75,50)
  lifehud2 = createSprite(katzume.x -812,70,75,50)
  lifehud3 = createSprite(katzume.x -912,70,75,50)
  lifehud4 = createSprite(katzume.x -1012,70,75,50)
  lifehud5 = createSprite(katzume.x -1112,70,125,50)

  lifecounterhud.shapeColor = "red"
  lifehud2.shapeColor = "red" //Adicionar cor
  lifehud3.shapeColor = "red"
  lifehud4.shapeColor = "red"
  lifehud5.shapeColor = "red"

  musicamenu.play();

  lifecounter = 6;
  lifecounterhud.visible = 0
  fundoobj1 = lifecounterhud.depth -1

  energymeterhud = createSprite(katzume.x -750,90,300,20)
  energymeterhud.shapeColor = "Navy"
  energymeter = 100;
  
  fundoobj1 = energymeterhud.depth -1

  estadodojogo = "CARREGANDO"; //Estado de loading
  estadopersonagem = "LEVANTADO"; //Verificar e mudar a colisão
  estadosaltando = "NÃO";
  localização = "TREINAMENTO"; //Mudar o cenario
  estadoataque = "NÃO ATACANDO";
  ladopersonagem = "DIREITA";

  //Tela do inicio
  tela = createSprite(1000,450,5000,4200)
  tela.shapeColor = "#1C1C1C"

  btn_start = createImg("./image/btn_start.png") //Botão start
  btn_start.position(240,460)
  
  btn_control = createImg("./image/btn_controle.png") //Botão para ver controles
  btn_control.position(240,590)

  sky = createSprite(2000,-600,10000,1000)
  sky.shapeColor = "#5CE4F4";
  sky.depth = lifecounterhud.depth -1
  sky.depth = katzume.depth -100

  //Camera
  cam = createCamera();
  cam.setPosition(1000, katzume.y -99.5, 865); //100 = X, 500 = Y, 865 = Zoom
  //cam.perspective();

  //Fundo
  fundoobj = createSprite(1000,400,2000,1000)
  fundoobj.depth = fundoobj.depth -1000
  fundoobj.addImage(fundoimgesq);
  fundoobj.scale = 3.2
  katzume.depth = fundoobj.depth +1 //Katzume ficar na frente do fundo

  fundoobj1 = createSprite(3000,400,2000,1000)
  fundoobj1.depth = fundoobj1.depth -1000
  fundoobj1.addImage(fundoimgdir);
  fundoobj1.scale = 3.2
  katzume.depth = fundoobj1.depth +1 //Katzume ficar na frente do fundo

  fundoobj2 = createSprite(5000,400,2000,1000)
  fundoobj2.depth = fundoobj2.depth -1000
  fundoobj2.addImage(fundoimgesq);
  fundoobj2.scale = 3.2
  katzume.depth = fundoobj2.depth +1

  fundoobj3 = createSprite(-1000,400,2000,1000)
  fundoobj3.depth = fundoobj3.depth -1000
  fundoobj3.addImage(fundoimgdir);
  fundoobj3.scale = 3.2
  katzume.depth = fundoobj3.depth +1

  solo = createSprite(1000,850,2000,400); //Objeto do chão do jogo
  solo1 = createSprite(3000,850,2000,400)
  solo2 = createSprite(5000,850,2000,400)
  solo3 = createSprite(-1000,850,2000,400)
  solo4 = createSprite(-3000,850,2000,400)

  solo.addImage(soloimg); //Imagem do chão y = 900
  solo1.addImage(soloimg1)
  solo2.addImage(soloimg)
  solo3.addImage(soloimg1)
  solo4.addImage(soloimgal)

  solo.depth = katzume.depth -1
  solo1.depth = katzume.depth -1
  solo2.depth = katzume.depth -1
  solo3.depth = katzume.depth -1
  solo4.depth = katzume.depth -1

  //edges = createEdgeSprites(); //Criar barreiras
  //edges.visible = 0
  topedges = createSprite(3000,5,10000,10);
  leftedges = createSprite(0,500,10,1000);
  rightedges = createSprite(4000,500,10,1000);
  topedges.visible = 0
  leftedges.visible = 0
  rightedges.visible = 0 //Barreira do top ficar invisivel

  passaro = createSprite(200,200,100,20);
  passaro.addImage(passaroimg);
  passaro.scale = 0.07 //Escala da imagem

  zombiecollisonscale = 400;
  zombie = createSprite(200,550);
  zombiecollison = createSprite(zombie.x,zombie.y,zombiecollisonscale,zombiecollisonscale)
  zombie.addImage(zombieimg);
  zombie.scale = 0.3
  zombiecollison.visible = 0

}

function draw(){
  background(0);
  image(fundoimgesq,-4000,-100,2000,1000)
  
  //Vida
  lifecounterhud.x = katzume.x -912
  lifecounterhud.y = katzume.y -500

  lifehud2.x = katzume.x -838
  lifehud2.y = katzume.y -500

  lifehud3.x = katzume.x -764
  lifehud3.y = katzume.y -500

  lifehud4.x = katzume.x -690
  lifehud4.y = katzume.y -500

  lifehud5.x = katzume.x -612
  lifehud5.y = katzume.y -500

  energymeterhud.x = katzume.x -800
  energymeterhud.y = katzume.y -460
  objetivo_avisoobj.x = katzume.x;
  objetivo_avisoobj.y = katzume.y -370;
  
  katzume.collide(solo);
  katzume.collide(solo1);
  katzume.collide(solo2);
  katzume.collide(solo3); //Colidir com o solo
  //katzume.collide(edges); //Colidir com as barreiras
  katzume.collide(topedges); //Colidir com a barreira de cima
  katzume.collide(leftedges); //Colidir com a barreira da esquerda
  katzume.collide(rightedges); //Colidir com a barreira da direita

  katzume.velocityY = katzume.velocityY + 0.5; //Gravidade do jogo

  //Chamar funções
  //keyboard(); //Função teclado
  colisao(); //Função da colisão e resetar as animações
  enemy(); //Função do inimigo para jogar o personagem para longe e dimuniur a vida
  verificaragachar(); //Função para verificar se ele esta agachado
  life(); //Função de verificar o valor da vida e mudar a Barra
  verificarlado();
  console.log(clear);
  // console.log(estadodojogo)

  //Passaro loop
  if (passaro.x > 5500){
    passaro.x = -1500
  }

  if (estadodojogo === "CARREGANDO"){
    btn_start.mouseClicked(mudarestado);
    btn_control.mouseClicked(abrirtelacontrol);
    passaro.depth = tela.depth -1
    lifecounter = 5;
    zombie.visible = 0
    solo.visible = 0
    solo1.visible = 0
    katzume.x = 1000
    katzume.y = 570
  }

  if (estadodojogo === "JOGANDO"){
    visiblejogando();
    btn_start.position(-1000,0)
    btn_control.position(-1000,0)
    musicamenu.pause();
    keyboard(); //Função teclado
    camset(); //Função se aperta a seta de baixo mudar a camera
    attack(); //Função para dar os golpes
    tela.destroy();
    passaro.velocityX = +15;
    if (keyDown("Esc")){
      estadodojogo = "PAUSE"
      menucreate();
    }
  }
  
  if (estadodojogo === "MORTE"){
    katzume.velocityX = 0
    katzume.velocityY = 0
    katzume.visible = 0
    energymeterhud.visible = 0
    energymeter = -1
    //console.log("Morte")
    if (keyDown("R")){
      estadodojogo = "CARREGANDO"
    }
  }

  if (estadosaltando === "SIM"){
    if (ladopersonagem === "DIREITA"){
        katzume.addImage(animationjump_right)
    }
  if (ladopersonagem === "ESQUERDA"){
        katzume.addImage(animationjump)
      }
  } else { }

  if (localização === "TREINAMENTO"){
    if (katzume.collide(rightedges)){
      if (keyDown("ENTER")){
        localização = "COLONIA 1"
      }
    } else {
      
    }
  }
  if (localização === "COLONIA 1"){
      //console.log("Colonia 1")
      solo.addImage(soloimgal);
      solo1.addImage(soloimgal1);
      solo2.addImage(soloimgal);
      solo3.addImage(soloimgal1);
      leftedges.x = -2000;
      passaro.destroy();
      fundoobj.addImage(fundoaldeiaesq);
      fundoobj1.addImage(fundoaldeiadir);
      fundoobj2.addImage(fundoaldeiaesq);
      fundoobj3.addImage(fundoaldeiadir);
      sky.shapeColor = "#C9ECFF"
      //katzume.colidde()
  }
  drawSprites();
}
  
//Funções
function colisao() { //Função colisão animação
  if (katzume.collide(topedges)){
    katzume.addImage(animationjump)

  }
  if (katzume.collide(leftedges) || katzume.collide(rightedges)){
    katzume.addImage(animationidle)

  } 

  if (katzume.collide(solo)){
    cam.setPosition(katzume.x, 500, 865);
    katzume.velocityY = 0
  }

  if (katzume.collide(solo1)){
    katzume.velocityY = 0.5
  }

}
function keyboard(){ //Função do teclado 
  //Ir para a esquerda
  if (keyDown("A")){
    katzume.x = katzume.x -12 //Original -10
    katzume.addImage(animationrun); //Para mudar de animação
    cam.setPosition(katzume.x -10, katzume.y - 99.5, 865);
    ladopersonagem = "ESQUERDA"
  } else {
    //katzume.addImage(animationidle)
  } 

  //Ir para a direita
  if (keyDown("D")){
    katzume.x = katzume.x +12
    katzume.addImage(animationrun_right);
    cam.setPosition(katzume.x+10, katzume.y - 99.5, 865);
    ladopersonagem = "DIREITA"
  } else {
  }

  //Mudar Imagem quando presionar a tecla A & D
  if (keyDown("A") && keyDown("D")){
    katzume.addImage(animationidle)
  }

  //Agachar
  if (keyDown("S") || keyDown("SHIFT")){
    cam.setPosition(katzume.x, katzume.y -70, 865);
    estadopersonagem = "AGACHAR"
    if (keyDown("A")){
      katzume.addImage(animationdownwalk)
      //ladopersonagem = "ESQUERDA"
    } else {
      cam.setPosition(katzume.x, katzume.y -99.5, 865);
      if (keyDown("D")){
        katzume.addImage(animationdownwalk_right)
        cam.setPosition(katzume.x, katzume.y -70, 865);
        //ladopersonagem = "DIREITA"
      }
    }
    if (keyDown("A") && keyDown("D")){
      katzume.addImage(animationdown)
    }
    if (keyDown("space")){
      katzume.addImage(animationdown)
    }
  } else {
    cam.setPosition(katzume.x, katzume.y -99.5, 865);
  }
}
function verificarlado(){
  if (ladopersonagem === "DIREITA"){
      katzume.addImage(animationidle_right);
      if (estadosaltando === "SIM"){
        katzume.addImage(animationjump_right)
      }
      if (keyDown("S") || keyDown("SHIFT")){
        katzume.addImage(animationdown_right)
      }
    }
  if (ladopersonagem === "ESQUERDA"){
      katzume.addImage(animationidle);
      if (estadosaltando === "SIM"){
        katzume.addImage(animationjump)
      }
      if (keyDown("S") || keyDown("SHIFT")){
        katzume.addImage(animationdown)
      }
    }
}
function enemy(){ //Função inimigo
  if (katzume.collide(zombie)){
    katzume.velocityX = +10
    katzume.velocityY = -17
    if (katzume.velocityX === +10){
      setTimeout(() => {
        katzume.velocityX = 0
      }, 450);
    }
    //katzume.y = katzume.y -200
    
    lifecounter = lifecounter -1;
    //console.log(lifecounter)
    if (katzume.collide(zombiecollison)){
      zombie.velocityX +2
    }
    if (lifecounter === 0){
      estadodojogo = "MORTE" }
  }
}
function verificaragachar(){ //Função mudar a colissão
  if (estadopersonagem === "LEVANTADO"){
    katzume.setCollider("rectangle",20,1,110,200); // raio de colisão
  } else {
    katzume.setCollider("rectangle",2,40,115,150);
  }
}
function keyPressed(){ //Pulo
  if(keyCode === 32 && katzume.velocityY === 0.5 && estadodojogo === "JOGANDO"){
    katzume.velocityY = -30;
    estadosaltando = "SIM"
    //katzume.y = katzume.y -350;
    //katzume.addImage(animationjump)
    cam.setPosition(katzume.x, katzume.y - 200, 865);
    setTimeout(() => {
      cam.setPosition(katzume.x, katzume.y -99.5, 865);
      estadosaltando = "NÃO"
      //katzume.addImage(animationdown);
    }, 1000);
  }

}
function keyReleased(){ //Soltar e mudar o estado
  if(keyCode === 83){
    estadopersonagem = "LEVANTADO"
  }
}
function camset(){ //Sistema para mover a camera
  if (keyDown("DOWN_ARROW")){
    cam.setPosition(katzume.x, katzume.y -50.5, 865);
  }
  if (keyDown("LEFT_ARROW")){
    cam.setPosition(katzume.x -40, katzume.y -99.5, 865);
  }
  if (keyDown("RIGHT_ARROW")){
    cam.setPosition(katzume.x +40, katzume.y -99.5, 865);
  }
  if (keyDown("LEFT_ARROW")){
    cam.setPosition(katzume.x -40, katzume.y -99.5, 865);
  }
  if (keyDown("UP_ARROW")){
    cam.setPosition(katzume.x, katzume.y -139.5, 865);
  }

}
function life(){ //Verificar a quantidade de vida e mudar a cor da Barra
  if (lifecounter === 5){
    lifehud5.visible = 1
  }
  if (lifecounter === 4){
    lifehud5.visible = 0
  }
  if (lifecounter === 3){
    lifehud4.visible = 0
  }
  if (lifecounter === 2){
    lifehud3.visible = 0
  }
  if (lifecounter === 1){
    lifehud2.visible = 0
  }
  if (lifecounter === 0){
    lifecounterhud.visible = 0
    estadodojogo = "MORTE"
  }
}
function visiblejogando(){ //Resumo para aparecer os objetos
  lifecounterhud.visible = 1
  zombie.visible = 1
  solo.visible = 1
  solo1.visible = 1
  katzume.visible = 1
}
function attack(){ //Função dos dois tipos de ataque
  
  if (keyDown("R") && estadoataque === "NÃO ATACANDO" && energymeter > 0){ //Ataque magico
    katzume.addImage(animationdown);
    katzume.collide(zombiecollison)
    //energy();
    energymeter = energymeter -2;
    //energymeterhud.width = energymeterhud.width -20
    katzume.setCollider("rectangle",20,-42,300,280);
    if (katzume.collide(zombiecollison)){
      zombie.destroy()
      somdead.play()
      zombiecollison.destroy()
    }
  }
  if (keyDown("E") && estadoataque === "NÃO ATACANDO"){ //Ataque normal
    katzume.addImage(animationjump);
    katzume.collide(zombiecollison)
    katzume.setCollider("rectangle",20,1,220,200);
    if (katzume.collide(zombiecollison)){
      zombie.destroy()
      zombiecollison.destroy()
      //somdead.play()
    }
  }
}
function keyReleased(){ //Ter um intervalo de ataque
  if (keyCode === 82 || keyCode === 69){
    estadoataque = "APOS ATAQUE"
    setTimeout(() => {
      estadoataque = "NÃO ATACANDO"
    }, 1500);
  }
  
}
function mudarestado(){ //Função do botão Play
  estadodojogo = "JOGANDO"
}
function abrirtelacontrol(){ //Aparecer tela de controles
  telacontrol = createImg("./image/tela_control.png")
  telacontrol.position(700,200)
  telacontrol.mouseClicked(mudartelacontrole)
}
function mudartelacontrole(){ //Sumir a tea de controles
  telacontrol.position(-1000)
}
function menucreate(){
  if (keyDown("Esc")){
    pausecreate = createSprite(1000,493,2200,1200)
    pausecreate.addImage(pauseimg)
    pausecreate.scale = 0.907
    pauseconfig = createImg("./image/menupause_config.png")
    pauseconfig.position(100,500)
    pausesair = createImg("./image/menupause_sair.png")
    pausesair.position(100,700)
    pausevoltar = createImg("./image/menupause_voltar.png")
    pausevoltar.position(1400,700)
    pausevoltar.mouseClicked(fecharmenu)
    musicamenu.play();
    //estadopause = "MENU";
  }
  }
function fecharmenu(){
  pausecreate.destroy();
  estadodojogo = "JOGANDO"
  pauseconfig.size(0.01)
  pausesair.size(0.01)
  pausevoltar.size(0.01)
}