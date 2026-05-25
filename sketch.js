// =====================================================================
// BITÁCORA Laboratorio C | Osvaldo Osorio | MAM 2026
// Cerebro Controlador - sketch.js (VERSIÓN 7 PASOS UNIFICADA)
// =====================================================================

let escenaActual = 0; 
let osc, env;
let tiempoInicioSonido = 0;
let sonidoSonando = false;
let multiplicadorTono = 1.0; 

// 📺 CONTENEDOR ÚNICO PARA TU VIDEO MP4 ACTIVO
let videoEscenaActivo = null; 

// 🎯 VARIABLES PARA LOS SONIDOS DE LA GALERÍA (ESCENA 2)
let totalPremiosFeria = 7; 
let oscFeria, envFeria; 

// Parámetros Escena 1 (Bicicleta y Cerro)
let biciX = 40, biciY = 320, velocidadBici = 0;
let paradasCompletadas = 0;
const totalParadas = 7;
let nubes = [];

// Variables del Cuadro de Texto y Slider
let textoMostrar = ""; 
let mostrandoTexto = false;
let scrollTextoY = 0;    
let sliderPosPercent = 0; 

// Melodía de la Intro (Escena 0)
let melodiaIntro = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 440.00, 392.00];
let notaActualIntro = 0;
let velocidadMelodia = 15; 

function setup() {
  createCanvas(800, 500);
  noSmooth(); 
  
  // Sintetizador Principal (Piano Escena 1)
  osc = new p5.Oscillator('triangle'); 
  env = new p5.Envelope();
  env.setADSR(0.01, 0.15, 0.1, 0.2); 
  env.setRange(0.5, 0);
  osc.start();

  // Sintetizador Escena 2 (Emulador Sonic Pi)
  oscFeria = new p5.Oscillator('sine'); 
  envFeria = new p5.Envelope();
  envFeria.setRange(0.5, 0);
  oscFeria.amp(envFeria); 
  oscFeria.start();
  
  for (let i = 0; i < 5; i++) {
    nubes.push({ x: random(width), y: random(50, 150), v: random(0.2, 0.5) });
  }
}

function draw() {
  background(15); 

  if (sonidoSonando && millis() - tiempoInicioSonido >= 1000) {
    env.triggerRelease(); 
    sonidoSonando = false;
  }

  if (escenaActual === 0) {
    if (frameCount % velocidadMelodia === 0) {
      osc.freq(melodiaIntro[notaActualIntro]);
      env.play(osc);
      notaActualIntro = (notaActualIntro + 1) % melodiaIntro.length;
    }
  }

  switch (escenaActual) {
    case 0:
      if (typeof dibujarEscena0Logo === 'function') dibujarEscena0Logo();
      break;
    default:
      dibujarInterfazUI(); 
      if (escenaActual === 1) dibujarEscena1Bici();
      if (escenaActual === 2) dibujarEscena2Theremin();
      if (escenaActual === 3) dibujarEscena3Yoasobi();
      if (escenaActual === 4) dibujarEscena4Rez();
      if (escenaActual === 5) {
        if (typeof dibujarEscena5Epilogo === 'function') dibujarEscena5Epilogo();
      }
      break;
  }

  if (mostrandoTexto) {
    dibujarCuadroTextoRetro();
  }

  if (videoEscenaActivo !== null && mostrandoTexto) {
    let canvasPos = canvas.getBoundingClientRect();
    videoEscenaActivo.position(canvasPos.left + (width - 280), canvasPos.top + 165);
  }
}

function dibujarInterfazUI() {
  fill(30); noStroke(); rect(0, 0, width, 45);
  fill(50); stroke(120); strokeWeight(1); rect(15, 10, 65, 25, 3);
  noStroke(); fill(255, 255, 0); textAlign(CENTER, CENTER); textSize(11); text("< BACK", 47, 22);
  fill(255); textAlign(LEFT, CENTER); textSize(13); textFont("Courier New");
  text("BITÁCORA Laboratorio C | Osvaldo Osorio | MAM 2026", 100, 22);
  
  textAlign(RIGHT, CENTER); fill(0, 255, 255);
  if (escenaActual === 5) {
    text("SESIÓN: EPÍLOGO", width - 15, 22);
  } else {
    text("SESIÓN: " + escenaActual + " / 4", width - 15, 22);
  }
  stroke(60); strokeWeight(2); line(0, 45, width, 45);
}

function lanzarVideoEscena(rutaVideo, posX, posY, ancho, alto) {
  limpiarVideoGlobal(); 
  videoEscenaActivo = createVideo([rutaVideo]);
  videoEscenaActivo.size(ancho, alto);
  videoEscenaActivo.loop(); 
  
  // 🌟 EL PARCHE DEFINITIVO DE AUDIO MULTIMEDIA:
  // Cambiamos el volumen a 1 (100%). Como el usuario ya hizo click/Enter al inicio,
  // el navegador permitirá el audio del video de forma fluida y sin bloqueos.
  videoEscenaActivo.volume(1); 
  
  let canvasPos = canvas.getBoundingClientRect();
  videoEscenaActivo.position(canvasPos.left + (width - 280), canvasPos.top + 165);
}

function limpiarVideoGlobal() {
  if (videoEscenaActivo !== null) {
    videoEscenaActivo.stop();
    videoEscenaActivo.remove(); 
    videoEscenaActivo = null;
  }
}

function dispararNotaPianoProgresiva() {
  let baseNotas = [261.63, 293.66, 329.63, 392.00, 440.00];
  let frecuenciaFinal = random(baseNotas) * multiplicadorTono;
  osc.freq(frecuenciaFinal);
  env.triggerAttack(); 
  tiempoInicioSonido = millis(); 
  sonidoSonando = true;
}

function dispararSonidoArcadeFeria(tipoBlanco) {
  if (tipoBlanco === "FALLO") {
    oscFeria.setType('triangle'); oscFeria.freq(180);
    envFeria.setADSR(0.005, 0.04, 0.0, 0.05); envFeria.play(oscFeria);
  } 
  else if (tipoBlanco === "CYAN") {
    oscFeria.setType('square'); let notaIndustrial = 140 + (mouseX / width) * 100;
    oscFeria.freq(notaIndustrial); envFeria.setADSR(0.01, 0.15, 0.05, 0.2); envFeria.play(oscFeria);
  } 
  else if (tipoBlanco === "AMARILLO") {
    oscFeria.setType('sawtooth'); let notaGomosa = 180 + (mouseX / width) * 120;
    oscFeria.freq(notaGomosa); envFeria.setADSR(0.02, 0.08, 0.1, 0.15); envFeria.play(oscFeria);
  } 
  else if (tipoBlanco === "MAGENTA") {
    oscFeria.setType('sine'); let notaCristal = 500 + ((height - mouseY) / height) * 250;
    oscFeria.freq(notaCristal); envFeria.setADSR(0.005, 0.2, 0.1, 0.3); envFeria.play(oscFeria);
  }
}

function ejecutarCierreDeVentana() {
  limpiarVideoGlobal(); 
  mostrandoTexto = false; 
  
  if (escenaActual === 1) {
    paradasCompletadas++; 
    biciX += 60; 
    velocidadBici = 0; 
    multiplicadorTono += 0.15; 
    dispararNotaPianoProgresiva(); 
  } else if (escenaActual === 2) {
    if (paradasCompletadas < 7) dispararSonidoArcadeFeria("FALLO");
  }
}

function mousePressed() {
  userStartAudio();
  if (mouseX > 15 && mouseX < 80 && mouseY > 10 && mouseY < 35) { 
    ejecutarBotonBack(); 
    return; 
  }

  if (mostrandoTexto) {
    let esPasoMultimedia = (escenaActual === 1 && paradasCompletadas === 2) || 
                           (escenaActual === 2 && paradasCompletadas === 3) || 
                           (escenaActual === 3 && paradasCompletadas === 3) || 
                           (escenaActual === 4 && paradasCompletadas === 3);
                           
    let cajaW = esPasoMultimedia ? width - 380 : width - 160;
    let trackX = 80 + cajaW - 20;
    if (mouseX > trackX - 10 && mouseX < trackX + 20 && mouseY > 170 && mouseY < 350) return;
    
    ejecutarCierreDeVentana();
    return;
  }

  if (!mostrandoTexto) {
    if (escenaActual === 2) {
      if (paradasCompletadas >= 7) {
        escenaActual = 3; 
        paradasCompletadas = 0; 
        multiplicadorTono = 1.0;
        dispararNotaPianoProgresiva(); 
        limpiarVideoGlobal(); 
        return;
      } else {
        let oscilacion = sin(frameCount * 0.04) * 12; 
        let premiosAntes = paradasCompletadas;
        if (typeof evaluarDisparoFeria === 'function') evaluarDisparoFeria(oscilacion);
        if (paradasCompletadas === premiosAntes) dispararSonidoArcadeFeria("FALLO");
      }
    }
    
    else if (escenaActual === 3) {
      if (paradasCompletadas >= 7) {
        escenaActual = 4; 
        paradasCompletadas = 0;
        dispararNotaPianoProgresiva();
      } else {
        if (typeof evaluarClickTV === 'function') evaluarClickTV();
      }
    }
    
    else if (escenaActual === 4) {
      // 🌟 CORRECCIÓN CRÍTICA: Al completar los 7 pasos, el siguiente clic te lleva a la Escena 5
      if (paradasCompletadas >= 7) {
        escenaActual = 5;
        paradasCompletadas = 0;
        dispararNotaPianoProgresiva();
        if (typeof videoLoopPortada !== 'undefined' && videoLoopPortada !== null) {
          videoLoopPortada.stop();
          videoLoopPortada.remove();
          videoLoopPortada = null;
          videoPortadaInicializado = false;
        }
        return;
      } else {
        if (typeof evaluarClickRez === 'function') evaluarClickRez();
      }
    }
    
    else if (escenaActual === 5) {
      if (typeof evaluarClickEpilogo === 'function') evaluarClickEpilogo();
    }
    
    if (videoEscenaActivo !== null) {
      let canvasPos = canvas.getBoundingClientRect();
      videoEscenaActivo.position(canvasPos.left + (width - 280), canvasPos.top + 165);
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    userStartAudio(); 
  }
  if (escenaActual === 0 && keyCode === ENTER) { 
    escenaActual = 1; biciX = 40; paradasCompletadas = 0; 
    multiplicadorTono = 1.0; 
    dispararNotaPianoProgresiva(); 
    return;
  }
  
  if (mostrandoTexto) {
    if (key === 'b' || key === 'B') { ejecutarBotonBack(); return; }
    ejecutarCierreDeVentana();
  }
}

function ejecutarBotonBack() {
  limpiarVideoGlobal(); 
  if (escenaActual > 0) {
    if (escenaActual === 1) {
      if (mostrandoTexto) { mostrandoTexto = false; } 
      else if (paradasCompletadas > 0) {
        paradasCompletadas--; 
        biciX = ((width / (totalParadas + 1)) * (paradasCompletadas + 1)) - 40; 
      } else { escenaActual = 0; biciX = 40; }
    } else {
      escenaActual--;
      if (escenaActual === 1) { biciX = width - 60; paradasCompletadas = totalParadas; }
    }
  }
}

function keyTyped() {
  limpiarVideoGlobal(); 
  
  if (typeof videoLoopPortada !== 'undefined' && videoLoopPortada !== null) {
    videoLoopPortada.stop();
    videoLoopPortada.remove();
    videoLoopPortada = null;
    videoPortadaInicializado = false;
  }

  if (key === '1') { escenaActual = 1; biciX = 40; paradasCompletadas = 0; }
  if (key === '2') { escenaActual = 2; paradasCompletadas = 0; totalPremiosFeria = 7; mostrandoTexto = false; }
  if (key === '3') { escenaActual = 3; paradasCompletadas = 0; mostrandoTexto = false; }
  if (key === '4') { escenaActual = 4; paradasCompletadas = 0; mostrandoTexto = false; }
  
  if (key === '5') { 
    escenaActual = 5; 
    eleccionContinuar = 0; 
    mostrandoTexto = false; 
    paradasCompletadas = 0;
  }
}

function dibujarCuadroTextoRetro() {
  let cajaX = 80; 
  let cajaW = width - 160; 
  let trackX = cajaX + cajaW - 20; 

  let esPasoMultimedia = (escenaActual === 1 && paradasCompletadas === 2) || 
                         (escenaActual === 2 && paradasCompletadas === 3) || 
                         (escenaActual === 3 && paradasCompletadas === 3) || 
                         (escenaActual === 4 && paradasCompletadas === 3);

  if (esPasoMultimedia) {
    cajaW = width - 380; 
    trackX = cajaX + cajaW - 20;
    
    fill(15); 
    if (escenaActual === 4) stroke(0, 255, 255); else stroke(255, 0, 128); 
    strokeWeight(3); 
    rect(width - 285, 160, 210, 160, 4);
    
    fill(0, 255, 255); noStroke(); textAlign(CENTER); textSize(10); textFont("Courier New");
    text("📼 FIELD REGISTRATION: " + escenaActual + ".mp4", width / 2 + 220, 340);
  }

  fill(10, 10, 30, 245); 
  if (escenaActual === 4) stroke(0, 255, 255); else stroke(255, 0, 128); 
  strokeWeight(3); 
  rect(cajaX, 160, cajaW, 200, 6);
  
  fill(30); noStroke(); rect(trackX, 170, 10, 180, 3);

  if (mouseIsPressed && mouseX > trackX - 10 && mouseX < trackX + 20 && mouseY > 170 && mouseY < 350) {
    sliderPosPercent = map(mouseY, 170, 350, 0, 1); sliderPosPercent = constrain(sliderPosPercent, 0, 1);
  }
  
  let textoAlturaTotal = esPasoMultimedia ? 420 : 250; 
  scrollTextoY = sliderPosPercent * max(0, textoAlturaTotal - 150);

  fill(0, 255, 255); rect(trackX - 2, map(sliderPosPercent, 0, 1, 170, 335), 14, 15, 2);

  push(); 
  clip(() => { rect(cajaX + 15, 170, cajaW - 40, 180); });
  fill(255); noStroke(); textAlign(LEFT, TOP); textSize(13); textFont("Courier New");
  text(textoMostrar, cajaX + 20, 175 - scrollTextoY, cajaW - 45);
  pop(); 

  if (frameCount % 40 < 20) {
    fill(255, 255, 0); textAlign(RIGHT, BOTTOM); textSize(11); textFont("Courier New");
    text("[Presiona CUALQUIER TECLA o haz CLICK para continuar ❌]", cajaX + cajaW - 30, 355);
  }
}
