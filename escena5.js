// =====================================================================
// Módulo de la Sesión 5 - escena5.js (ARCADE CONTINUAR / EPÍLOGO)
// Menú de decisión interactivo, imagen final y cierre de la obra
// =====================================================================

let eleccionContinuar = 0; // 0 = Esperando decisión, 1 = Presionó SÍ, 2 = Presionó NO
let imagenFinalObra = null;
let imagenCargadaRez = false;

function dibujarEscena5Epilogo() {
  // 1. CASO APAGADO TOTAL (Eligió NO)
  if (eleccionContinuar === 2) {
    background(0); // Pantalla negra absoluta de terminal apagada
    cursor();
    return;
  }

  // 2. CASO REVELACIÓN FINAL (Eligió SÍ)
  if (eleccionContinuar === 1) {
    background(10, 10, 25);
    cursor();

    // Carga asíncrona de tu imagen "1.jpg" para que no congele el canvas
    if (!imagenCargadaRez) {
      // Nota: Asegúrate de tener el archivo "1.jpg" en tu carpeta de p5.js
      imagenFinalObra = loadImage('1.jpg', () => {
        imagenCargadaRez = true;
      });
    }

    // Dibujamos la imagen centrada si ya está lista en memoria
    if (imagenCargadaRez && imagenFinalObra) {
      push();
      imageMode(CENTER);
      // Escalamos la imagen de forma sutil en el pecho de la pantalla
      image(imagenFinalObra, width / 2, height / 2 - 40, 240, 180);
      pop();
    }

    // Cuadro de texto final estilizado en color verde de sistema estabilizado
    fill(10, 15, 35, 230); stroke(0, 255, 100); strokeWeight(2);
    rect(80, 310, width - 160, 140, 4);

    fill(0, 255, 100); noStroke(); textAlign(CENTER, TOP); textFont("Courier New"); textSize(13);
    let textoCierreObra = "SISTEMA INTEGRADO COMPLETO - BITACORA A MÁXIMA CAPACIDAD\n\n¿Qué nos espera ahora? Me interesa seguir perfeccionando este proceso. Me gustaría que le comunicación entre las visuales y SonicPi fuera bidireccional, explorar otras oportunidades de manipulación, y el tema de la performance activó un bichito que no tenía haha";
    text(textoCierreObra, 100, 325, width - 200);

    // Botón retro para reiniciar el juego completo si se desea volver al inicio (0)
    fill(255, 255, 0); textSize(11); textAlign(CENTER);
    text("", width / 2, 430);
    return;
  }

  // 🕹️ 3. CASO MENÚ EN ESPERA (¿CONTINUE?)
  background(5, 5, 15);
  noCursor();

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
  cursor(HAND);
}

// 📦 EVALUACIÓN DE CLICK EXCLUSIVA PARA LA ESCENA 5
function evaluarClickEpilogo() {
  // Si ya estábamos en el final (SÍ) y clickean abajo, reseteamos todo al logo (Escena 0)
  if (eleccionContinuar === 1) {
    escenaActual = 0;
    eleccionContinuar = 0;
    paradasCompletadas = 0;
    imagenCargadaRez = false;
    dispararNotaPianoProgresiva();
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