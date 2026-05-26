// =====================================================================
// Módulo de la Sesión 5 - escena5.js (ARCADE CONTINUAR / EPÍLOGO)
// Menú de decisión interactivo, imagen interactiva compacta y epílogo
// =====================================================================

let eleccionContinuar = 0; // 0 = Esperando decisión, 1 = Presionó SÍ, 2 = Presionó NO
let imagenFinalObra = null;
let imagenCargadaRez = false;

function dibujarEscena5Epilogo() {
  // 1. CASO APAGADO TOTAL (Eligió NO)
  if (eleccionContinuar === 2) {
    background(0); // Pantalla negra absoluta de terminal apagada
    cursor(ARROW);
    return;
  }

  // 2. CASO REVELACIÓN FINAL (Eligió SÍ)
  if (eleccionContinuar === 1) {
    background(10, 10, 25);

    // Carga asíncrona de tu imagen "1.jpg" para que no congele el canvas
    if (!imagenCargadaRez) {
      imagenFinalObra = loadImage('1.jpg', () => {
        imagenCargadaRez = true;
      });
    }

    // 🌟 REGRESO AL TAMAÑO ORIGINAL PROTEGIDO
    let imgX = width / 2;
    let imgY = height / 2 - 40; 
    let imgW = 240; 
    let imgH = 180;

    // Detectamos si el mouse está posicionado encima de la imagen compacta
    let sobreImagen = (mouseX > imgX - imgW/2 && mouseX < imgX + imgW/2 && 
                       mouseY > imgY - imgH/2 && mouseY < imgY + imgH/2);

    // Dibujamos la imagen centrada si ya está lista en memoria
    if (imagenCargadaRez && imagenFinalObra) {
      push();
      imageMode(CENTER);
      
      // Si pasa el mouse sobre la imagen, aplicamos un sutil marco interactivo
      if (sobreImagen) {
        stroke(0, 255, 100); strokeWeight(2); noFill();
        rect(imgX - imgW/2, imgY - imgH/2, imgW, imgH, 2);
      }
      
      image(imagenFinalObra, imgX, imgY, imgW, imgH);
      pop();
    }

    // 🌟 REUBICACIÓN DEL CUADRO VERDE DE TEXTO (Posición original a Y: 310)
    fill(10, 15, 35, 230); stroke(0, 255, 100); strokeWeight(2);
    rect(80, 310, width - 160, 140, 4);

    fill(0, 255, 100); noStroke(); textAlign(CENTER, TOP); textFont("Courier New"); textSize(13);
    let textoCierreObra = "SISTEMA INTEGRADO COMPLETO - BITACORA A MÁXIMA CAPACIDAD\n\n¿Qué nos espera ahora? Me interesa seguir perfeccionando este proceso. Me gustaría que la comunicación entre las visuales y SonicPi fuera bidireccional, explorar otras oportunidades de manipulación, y el tema de la performance activó un bichito que no tenía haha";
    text(textoCierreObra, 100, 325, width - 200);

    // 👆 CONTROL DE CURSOR INTUITIVO EN EL FINAL
    // Si flota sobre la imagen o sobre el texto de reinicio inferior (Y > 430) ponemos mano
    if (sobreImagen || mouseY > 430) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }
    return;
  }

  // 🕹️ 3. CASO MENÚ EN ESPERA (¿CONTINUE?)
  background(5, 5, 15);

  // Texto gigante parpadeante estilo arcade
  textAlign(CENTER, CENTER); textFont("Courier New");
  if (frameCount % 30 < 15) {
    fill(255, 0, 100); textSize(38);
    text("¿ CONTINUE ?", width / 2, height / 2 - 80);
  } else {
    fill(20, 20, 40); textSize(38);
    text("¿ CONTINUE ?", width / 2, height / 2 - 80);
  }

  // Botones Interactivos: YES / NO
  let distSi = dist(mouseX, mouseY, width / 2 - 100, height / 2 + 30);
  let distNo = dist(mouseX, mouseY, width / 2 + 100, height / 2 + 30);

  // Botón YES (SÍ)
  if (distSi < 40) {
    fill(0, 255, 255); stroke(255); strokeWeight(2); textSize(24);
    text("> YES <", width / 2 - 100, height / 2 + 30);
  } else {
    fill(0, 255, 255, 150); noStroke(); textSize(20);
    text("YES", width / 2 - 100, height / 2 + 30);
  }

  // Botón NO
  if (distNo < 40) {
    fill(255, 255, 0); stroke(255); strokeWeight(2); textSize(24);
    text("> NO <", width / 2 + 100, height / 2 + 30);
  } else {
    fill(255, 255, 0, 150); noStroke(); textSize(20);
    text("NO", width / 2 + 100, height / 2 + 30);
  }

  // Guía visual interactiva de mouse (Manito arcade)
  if (distSi < 40 || distNo < 40) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

// 📦 EVALUACIÓN DE CLICK EXCLUSIVA PARA LA ESCENA 5
function evaluarClickEpilogo() {
  // Lógica interactiva si ya estamos en la revelación final (SÍ)
  if (eleccionContinuar === 1) {
    let imgX = width / 2;
    let imgY = height / 2 - 40;
    let imgW = 240;
    let imgH = 180;

    // 1. Si clickean DIRECTO en la imagen compacta, abre el archivo en resolución completa
    if (mouseX > imgX - imgW/2 && mouseX < imgX + imgW/2 && 
        mouseY > imgY - imgH/2 && mouseY < imgY + imgH/2) {
      window.open('1.jpg', '_blank'); 
      return;
    }

    // 2. Si clickean en la zona inferior libre, reinicia la obra completa a la Escena 0
    if (mouseY > 430) {
      escenaActual = 0;
      eleccionContinuar = 0;
      paradasCompletadas = 0;
      imagenCargadaRez = false;
      dispararNotaPianoProgresiva();
    }
    return;
  }

  if (eleccionContinuar !== 0) return;

  let distSi = dist(mouseX, mouseY, width / 2 - 100, height / 2 + 30);
  let distNo = dist(mouseX, mouseY, width / 2 + 100, height / 2 + 30);

  if (distSi < 40) {
    eleccionContinuar = 1; // Elige SÍ: Abre imagen y texto final
    dispararNotaPianoProgresiva();
  } else if (distNo < 40) {
    eleccionContinuar = 2; // Elige NO: Apaga la pantalla por completo
    limpiarVideoGlobal();
    if (typeof videoLoopPortada !== 'undefined' && videoLoopPortada !== null) {
      videoLoopPortada.stop();
      videoLoopPortada.remove();
      videoLoopPortada = null;
    }
  }
}
