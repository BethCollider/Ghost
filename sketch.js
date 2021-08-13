    //Se definen las variables que alojaran a los objetos  
    var ghost, torre, puerta, climber;
    var ghostImg,torreImg, puertaImg, climberImg; 
  var puertaGrup, climberGrup;
  var invblokGrup, invblok;
  var gameState = "play"

    //Se llama a la funcion que pre-carga las imagenes en png
    function preload () {
      torreImg = loadImage ("tower.png");
      puertaImg = loadImage ("door.png");
      climberImg = loadImage ("climber.png");
      ghostImg = loadImage ("ghost-standing.png");
      spookySound = loadSound("spooky.wav");

      //Se define el grupo de imagenes que apareceran aleatoriamente en el lienzo de trabajo de las puertas
      puertaGrup = new Group ();

      //Se define el grupo de imagenes que aparecera al par de las puertas
      climberGrup = new Group ();

      //Se define las propiedades para todo el grupo de animaciones de los bloues invicibles que van apareciendo
      invblokGrup = new Group ();
    }

    //Se llama la funcion para asignar propiedades
    function setup () {
      //Se crea el lienzo de trabajo
      createCanvas (600,600);
      //Se agrega la musica del juego
      spookySound.loop();
      //Se diseña el objeto de la torre
      torre = createSprite (300, 300);
      //Se carga la animacion de la torre con la funcion
      torre.addImage ("torre", torreImg);
      //Se define un dezplazamiento hacia abajo segun las perspectiva del lienzo
      torre.velocityY = 1;

      //Diseño del personaje ghost
      ghost = createSprite (200,200,50,50);
      ghost.scale = 0.3;
      ghost.addImage ("ghost", ghostImg);
    }

    //Se llama ala funcion de dibujo 
    function draw () {
      //Se define el color del fondo
      background (0);

     //Incorporacion del estado de juego al movimiento de personaje ghost
       if(gameState === "play"){

      //Agregar jugabilidad con las teclas y la barra espaciadora
      if(keyDown("left")){
        ghost.x = ghost.x - 3;
      }
      if(keyDown("right")){
        ghost.x = ghost.x + 3;
      }
      if(keyDown("space")){
        ghost.velocityY = -5;
      }

      //Agregar efecto de gravedad al saltar
      ghost.velocityY = ghost.velocityY + 0.8;

          //Se condicion a un codigo para ciclar el desplazamiento de la animacion de la torre, cada vez que llege a la posicion y = 300, se regresa a la posicion mas y = 400
      if (torre.y > 400){
        torre.y = 300
      }

      //Se agrega la funcion spawnPuertas (), para que el codigo las dibuje segun las propiedades definidas en el bloque de instrucciones de la funcion donde se diseño
  spawnPuertas();
          //Se establece una condicional para darle jugabilidad al ghost con las ventanas
      if(climberGrup.isTouching(ghost)){
        ghost.velocityY = 0;
      }

      //Se define la condicional para finalizar el juego al momento de tocar la puerta pode debajo o si el personaje ghost sale del lienzo de trabajo
      if(invblokGrup.isTouching(ghost) || ghost.y > 600){
        ghost.destroy();
        //Se incorpora el estado de juego para finalizarlo
        gameState = "end"
      }


      //Se llama al comando para dibujar todos los objetos en el lienzo de trabajo
      drawSprites();
    }
      //Se define el estado de juego end y los elementos que muestra
      if(gameState === "end"){
        stroke ("yellow");
        fill("yellow");
        textSize(30);
        text("Game Over",230,250)
      }
    }

  //Se crea la funcion que aloja a los objetos de las puertas, asi como las propiedades y funciones que deben de tener segun el diseño del juego
  function spawnPuertas () {

    //con la condicional de if condicionamos alojamos en le bloque de instrucciones el objeto y algunas propiedades, ademas la aparicion de los objetos se ejecuta con frameCount
    if ( frameCount % 300 === 0) {
      //se aloja en una variable que esta dentro del if () el diseño del objeto
      var puerta = createSprite (200, -50);
      //Se carga la imagen png. de la puerta
      puerta.addImage("puerta", puertaImg);

      //Se diseña el objeto que alojara las imagenes de los climber, es necesario alojarlas en la misma funcion que las puertas, debido a que estos objetos complementan la jugabilidad 
       var climber = createSprite (200,10);
      //Se anima el objeto con la imagen correspondeinte en png
      climber.addImage("climber",climberImg);

      //Dentro del bucle de aparicion de las animaciones se incorpora el bloque donde se posiciona el ghost por arriba del climber
      var invblok = createSprite (200,15);
      invblok.width = climber.width;
      invblok.height = 2;
      //Se determina el area donde pueden aparecer los objetos puerta en el lienzo de trabajo
      puerta.x = Math.round(random(120,400));
      //Se defin ela velocidad del desplazamiento de la animacion que sea similar ala imagen principal
      puerta.velocityY = 1;

      //Se define posicion de los climber, deben ser las mismas que las puetas.x
      climber.x = puerta.x;
      //Se define el desplazamiento de los climber como la imagen principal
      climber.velocityY = 1;

      //Se define la posicion del bloque invisible que sea igual a la posocion de la puerta
      invblok.x = puerta.x;
      invblok.velocityY = 1;


      //Se define el tiempo de vida de los objetos puerta
      puerta.lifetime = 800;

       climber.lifetime = 800;
      //Se indica que todas las propiedades y funciones se comportaran igual
      puertaGrup.add(puerta);
      climberGrup.add(climber);

      //Se incluye 
      invblok.debug = true;
      invblokGrup.add(invblok);

         //Agregar profundidad a la imagen del fantasma para que aparesca en la primera capa del diseño
      ghost.depth = puerta.depth;
      ghost.depth += 1;

    }
  }
