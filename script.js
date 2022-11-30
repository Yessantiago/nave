/* **** Examen 1 *************************
* Nombre: Yessica Fabiola Santiago Valdes
* Matricula: 2173011484
* Fecha: 25/11/2022 **********************/

const CREACION = 100;
const PRECARGA = 200;
const INICIO = 300;

class NaveEspacial {
  constructor(x, y, imagen, velocidad = -1) {
    this.x = x;
    this.y = y;
    this.imagen = imagen;

    this.velocidad = velocidad;
    this.gdireccion = null;
    this.sdireccion = null;

    this.gdireccionY = null;
    this.sdireccionY = null;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getVelocidad() {
    return this.velocidad;
  }
  setX(x) {
    this.x = x;
  }
  setY(y) {
    this.y = y;
  }
  setVelocidad(velocidad) {
    this.velocidad = velocidad;
  }
  setImagen(imagen) {
    this.imagen = imagen;
  }
  getImagen() {
    return this.imagen;
  }
  dibujar(ctx, width = 100, height = 50) {
    ctx.drawImage(
      this.getImagen(),
      0,
      0,
      width,
      height,
      this.getX(),
      this.getY(),
      width,
      height
    );
  }
} //fin de la clase NaveEspacial

function Animacion() {
  this.estado = CREACION;
  this.imagenes = new Array();
  this.canvas = document.getElementById("canvas");
  this.contexto = this.canvas.getContext("2d");
  this.auxcanvas = document.createElement("canvas"); // "canvas" se refiera a la etiqueta <canvas>
  this.auxcontexto = this.auxcanvas.getContext("2d");

  this.canvas.width = document.body.clientWidth; // tamaño actual de la ventana -> con esto se fija el limite
  this.canvas.height = document.body.clientHeight;
  this.auxcanvas.width = document.body.clientWidth;
  this.auxcanvas.height = document.body.clientHeight;

  this.naveNodriza = null;
  this.nave = null;
  this.nave2 = null;
  this.nave3 = null;
  this.nave4 = null;
  this.nave5 = null;

  let objeto = this;

  this.cargarImagenes = function () {
    this.imagenes["naveNodriza"] = new Image();
    this.imagenes["naveNodriza"].name = "naveNodriza";
    this.imagenes["naveNodriza"].src = "img/nave-nodriza.png";

    this.imagenes["nave"] = new Image();
    this.imagenes["nave"].name = "nave";
    this.imagenes["nave"].src = "img/nave.png";

    this.imagenes["nave2"] = new Image();
    this.imagenes["nave2"].name = "nave2";
    this.imagenes["nave2"].src = "img/nave2.png";

    this.imagenes["nave3"] = new Image();
    this.imagenes["nave3"].name = "nave3";
    this.imagenes["nave3"].src = "img/nave3.png";

    this.imagenes["nave4"] = new Image();
    this.imagenes["nave4"].name = "nave4";
    this.imagenes["nave4"].src = "img/nave3.png";

    this.imagenes["nave5"] = new Image();
    this.imagenes["nave5"].name = "nave5";
    this.imagenes["nave5"].src = "img/nave.png";
  };
  // navecitas 
  this.actualizacion = function () {
    // context.clearRect(x,y,width,height);
    this.auxcontexto.clearRect(0, 0, this.canvas.width, this.canvas.height); //limpia el canvas de naves
    this.contexto.clearRect(0, 0, this.canvas.width, this.canvas.height); // en ambos canvas el fondo no se borra

    this.naveNodriza.dibujar(this.auxcontexto, 500, 245);
    this.nave.dibujar(this.auxcontexto);
    this.nave2.dibujar(this.auxcontexto);
    this.nave3.dibujar(this.auxcontexto);
    this.nave4.dibujar(this.auxcontexto);
    this.nave5.dibujar(this.auxcontexto);

    this.contexto.drawImage(
      this.auxcanvas,
      0,
      0,
      this.auxcanvas.width,
      this.auxcanvas.height,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    this.naveNodriza = this.validaPosicionNaveNodriza(this.naveNodriza);
    this.nave = this.validaPosicionX(this.nave);
    this.nave2 = this.validaPosicionY(this.nave2);
    this.nave3 = this.validaPosicionX(this.nave3);
    this.nave4 = this.validaPosicionY(this.nave4);
    this.nave5 = this.validaPosicionX(this.nave5);
  };

  this.validaPosicionNaveNodriza = function (nave) {
    let direccionX = nave.getVelocidad();
    let direccionY = nave.getVelocidad();

    console.log(`COORDENADAS [${nave.getX()},${nave.getY()}]`);

    if (nave.getX() > this.canvas.width - 500 || nave.getX() < 0) {
      direccionX = -1 * direccionX;

      if (nave.getY() < 0 || nave.getY() > this.canvas.height - 245)
        direccionY = -1 * direccionY;
    } else {
      if (nave.getY() < 0 || nave.getY() > this.canvas.height - 245) {
        direccionY = -1 * direccionY;

        if (nave.getX() > this.canvas.width - 500 || nave.getX() < 0)
          direccionX = -1 * direccionX;
      }
    }
    nave.sdireccion(nave.gdireccion() + direccionX);
    nave.sdireccionY(nave.gdireccionY() + direccionY);

    return nave;
  };

  this.validaPosicionX = function (nave, widthDiferencia = 100) {
    if (nave.getX() > this.canvas.width - widthDiferencia || nave.getX() < 0)
      nave.setVelocidad(-1 * nave.getVelocidad());

    // sdireccion -> setX y gdireccion -> getX
    // x = 5 -> 5 + 3
    nave.sdireccion(nave.gdireccion() + nave.getVelocidad());
    return nave;
  };

  this.validaPosicionY = function (nave, heightDiferencia = 50) {
    if (nave.getY() > this.canvas.height - heightDiferencia || nave.getY() < 0)
      nave.setVelocidad(-1 * nave.getVelocidad());

    nave.sdireccion(nave.gdireccion() + nave.getVelocidad());
    return nave;
  };

  this.desplazamiento = function (e) {
    e = e || window.event;
    if (e.key == "r") {
      objeto.naveNodriza.setVelocidad(0);
      let coordenadaXN = objeto.naveNodriza.getX();
      console.log(
        "🚀 ~ file: script.js ~ line 186 ~ Animacion ~ coordenadaXN",
        coordenadaXN
      );
      let coordenadaX = objeto.nave2.getX();
      console.log(
        "🚀 ~ file: script.js ~ line 188 ~ Animacion ~ coordenadaX",
        coordenadaX
      );

      objeto.nave2.setX(coordenadaXN);
      if (coordenadaX == coordenadaXN) objeto.nave2.setVelocidad(0);

      if (coordenadaX > coordenadaXN) objeto.nave2.setVelocidad(8);

      if (coordenadaX < coordenadaXN) objeto.nave2.setVelocidad(3);
    }

    if (e.keyCode == "38" || e.keyCode == "40") {
      objeto.naveNodriza.sdireccion = objeto.naveNodriza.setY;
      objeto.naveNodriza.gdireccion = objeto.naveNodriza.getY;
      if (e.keyCode == "38")
        //Arriba
        objeto.naveNodriza.setVelocidad(-3);
      //Abajo
      else objeto.naveNodriza.setVelocidad(3);
    } else if (e.keyCode == "37" || e.keyCode == "39") {
      objeto.naveNodriza.sdireccion = objeto.naveNodriza.setX;
      objeto.naveNodriza.gdireccion = objeto.naveNodriza.getX;
      if (e.keyCode == "37") objeto.naveNodriza.setVelocidad(-3);
      //derecha
      else objeto.naveNodriza.setVelocidad(3);
    }
  };

  this.generaNumeroAleatorio = function () {
    return Math.floor(Math.random() * 2); // puede devolver 0 o 1
  };

  this.generaPosicionAleatoriaX = function () {
    return Math.floor(Math.random() * this.canvas.width - 100); // puede devolver 0 o 1
  };

  this.generaPosicionAleatoriaY = function () {
    return Math.floor(Math.random() * this.canvas.height - 50); // puede devolver 0 o 1
  };

  this.ejecutarMaquinaDeEstados = function () {
    let imagenesCargadas = true;
    console.log("Estado: Entro " + objeto.estado);

    if (objeto.estado == CREACION) {
      objeto.cargarImagenes();
      objeto.estado = PRECARGA;

      setTimeout(objeto.ejecutarMaquinaDeEstados, 100);
      console.log("Estado: creacion");
    }

    if (objeto.estado == PRECARGA) {
      console.log("Estado: precarga");
      for (let i = 0; i < objeto.imagenes.length; i++)
        if (objeto.imagenes[i].complete != true) imagenesCargadas = false;

      if (imagenesCargadas == true) {
        objeto.naveNodriza = new NaveEspacial(
          100,
          150,
          objeto.imagenes["naveNodriza"],
          2
        );

        console.log(
          "🚀 ~ file: script.js ~ line 250 ~ Animacion ~ objeto.imagenes",
          objeto.imagenes
        );

        objeto.naveNodriza.gdireccion = objeto.naveNodriza.getX; //gdireccion-get-  movimiento inicial
        objeto.naveNodriza.sdireccion = objeto.naveNodriza.setX;
        objeto.naveNodriza.gdireccionY = objeto.naveNodriza.getY; //gdireccion-get-  movimiento inicial
        objeto.naveNodriza.sdireccionY = objeto.naveNodriza.setY;

        //200 y 100 es la posicion inicial de la nave
        objeto.nave = new NaveEspacial(150, 430, objeto.imagenes["nave"], -2);
        objeto.nave.gdireccion = objeto.nave.getX; //gdireccion-get-  movimiento inicial
        objeto.nave.sdireccion = objeto.nave.setX; //sdireccion-set-  en eje de las x

        objeto.nave2 = new NaveEspacial(460, 30, objeto.imagenes["nave2"], 20);
        objeto.nave2.gdireccion = objeto.nave2.getY;
        objeto.nave2.sdireccion = objeto.nave2.setY;

        objeto.nave3 = new NaveEspacial(140, 103, objeto.imagenes["nave3"], 2);
        objeto.nave3.gdireccion = objeto.nave3.getX;
        objeto.nave3.sdireccion = objeto.nave3.setX;

        objeto.nave4 = new NaveEspacial(560, 258, objeto.imagenes["nave4"], -2);
        objeto.nave4.gdireccion = objeto.nave4.getY;
        objeto.nave4.sdireccion = objeto.nave4.setY;

        objeto.nave5 = new NaveEspacial(320, 203, objeto.imagenes["nave5"], 2);
        objeto.nave5.gdireccion = objeto.nave5.getX;
        objeto.nave5.sdireccion = objeto.nave5.setX;

        objeto.estado = INICIO;
        document.onkeydown = objeto.desplazamiento;
      }

      setTimeout(objeto.ejecutarMaquinaDeEstados, 100);
    }

    if (objeto.estado == INICIO) {
      console.log("Estado: inicio de la animacion");
      objeto.actualizacion();
      setTimeout(objeto.ejecutarMaquinaDeEstados, 100);
    }
  };
} //fin de la clase/funcion Animacion

animacion = new Animacion();
animacion.ejecutarMaquinaDeEstados();
