// =====================================================================
// Módulo de la Sesión 4 - escena4.js (VERSIÓN FINAL COMPACTA DE 7 PASOS)
// Secuenciador Rez Asimétrico, Video 5 en Loop y Registro 4 en Paso 3
// =====================================================================

let pasoActualBeat = 0; 
let rejillaRez = [
  [0,0,0,0,0,0,0], // Kick (Reducido de forma estricta a 7 columnas)
  [0,0,0,0,0,0,0], // Clap
  [0,0,0,0,0,0,0], // Closed Hat
  [0,0,0,0,0,0,0]  // Open Hat
];

// 🌟 CONTROL DE REPRODUCTORES SEPARADOS
let videoLoopPortada = null; 
let videoPortadaInicializado = false;

function dibujarEscena4Rez() {
  background(10, 10, 20); // Espacio profundo ciberespacial

  // 📺 1. CONTROL DEL VIDEO DE PORTADA (5.mp4 en Loop Nativo Blindado)
  if (mostrandoTexto && paradasCompletadas === 3) {
    if (videoLoopPortada !== null) videoLoopPortada.hide();
  } else {
    if (!videoPortadaInicializado) {
      videoLoopPortada = createVideo(['5.mp4']);
      videoLoopPortada.size(110, 70);
      videoLoopPortada.elt.muted = true; 
      videoLoopPortada.elt.setAttribute('playsinline', true);
      videoLoopPortada.loop(); 
      videoPortadaPortadaInicializado = true; // Parche para evitar bucles de carga
      videoPortadaInicializado = true;
    }
    if (videoLoopPortada !== null) {
      videoLoopPortada.show();
      let canvasPos = canvas.getBoundingClientRect();
      videoLoopPortada.position(canvasPos.left + (width / 2 - 55), canvasPos.top + 60);
    }
  }

  // Marco decorativo del Monitor Superior
  fill(0, 0, 0, 0); stroke(0, 255, 255); strokeStyle = undefined; strokeWith = undefined; 
  stroke(0, 255, 255); strokeWeight(3);
  rect(width / 2 - 57, 58, 114, 74, 4);
  strokeWeight(2);
  line(width / 2 - 20, 58, width / 2 - 45, 35);
  line(width / 2 + 20, 58, width / 2 + 45, 35);

  // 🕹️ 2. REJILLA DEL SECUENCIADOR ADAPTADA VISUALMENTE (7 Pasos x 4 Pistas)
  let startX = 145;
  let startY = 180;
  let cellW = 73; // Ampliado de 60 a 73 para equilibrar las 7 casillas de forma perfecta
  let cellH = 40;
  let nombresPistas = ["KICK", "CLAP", "C-HAT", "O-HAT"];
  let coloresPistas = [color(255, 255, 0), color(255, 0, 128), color(0, 255, 255), color(0, 255, 100)];

  for (let i = 0; i < 4; i++) {
    fill(200); noStroke(); textAlign(RIGHT, CENTER); textSize(11); textFont("Courier New");
    text(nombresPistas[i], startX - 20, startY + (i * cellH) + cellH / 2);

    // Renderizamos solo 7 tiempos
    for (let j = 0; j < 7; j++) {
      let x = startX + (j * cellW);
      let y = startY + (i * cellH);
      stroke(30, 30, 60); 
      if (rejillaRez[i][j] === 1) fill(coloresPistas[i]); 
      else fill(15, 15, 35);
      rect(x, y, cellW, cellH);

      // El cursor brillante corre en base al módulo de 7 pasos
      if (pasoActualBeat === j && paradasCompletadas >= 7) {
        fill(255, 255, 255, 90);
        rect(x, y, cellW, cellH);
      }
    }
  }

  // ⏳ 3. MOTOR DE AUDIO AUTOMÁTICO ADAPTADO A 7 TIEMPOS
  if (paradasCompletadas >= 7 && frameCount % 15 === 0) {
    pasoActualBeat = (pasoActualBeat + 1) % 7; // El lazo corre de 0 a 6
    ejecutarSonidoPaso(pasoActualBeat);
  }

  // 📢 TEXTO INSTRUCTIVO E INTERFAZ UI
  if (!mostrandoTexto) {
    fill(0, 255, 255); textAlign(CENTER); textSize(14);
    if (paradasCompletadas < 7) {
      text("🖱️ HAZ CLICK EN EL MONITOR SUPERIOR PARA CONSTRUIR EL BEAT (" + paradasCompletadas + "/7)", width / 2, 168);
    } else {
      text("✨ POLIFONÍA COMPLETADA: BITÁCORA GRABADA EN EL ESPACIO REZ ✨", width / 2, 168);
    }
    
    let sobreMonitor = (mouseX > width / 2 - 60 && mouseX < width / 2 + 60 && mouseY > 55 && mouseY < 135);
    if (sobreMonitor || paradasCompletadas >= 7) {
      cursor(HAND); 
    } else {
      dibujarMiraRez(); 
    }
  } else {
    cursor(HAND); 
  }
}

function dibujarMiraRez() {
  noCursor(); stroke(0, 255, 255, 180); strokeWeight(1); noFill();
  circle(mouseX, mouseY, 18);
  line(mouseX - 12, mouseY, mouseX + 12, mouseY);
  line(mouseX, mouseY - 12, mouseX, mouseY + 12);
}

// 🎹 REGISTRO DE PERCUSIÓN
function ejecutarSonidoPaso(paso) {
  for (let i = 0; i < 4; i++) {
    if (rejillaRez[i][paso] === 1) {
      if (i === 0) dispararKick();
      if (i === 1) dispararClap();
      if (i === 2) dispararCHat();
      if (i === 3) dispararOHat();
    }
  }
}

function dispararKick()  { oscFeria.setType('sine');   oscFeria.freq(60);   envFeria.setADSR(0.005, 0.12, 0.0, 0.04); envFeria.play(oscFeria); }
function dispararClap()  { oscFeria.setType('square'); oscFeria.freq(750);  envFeria.setADSR(0.01, 0.06, 0.0, 0.03);  envFeria.play(oscFeria); }
function dispararCHat()  { oscFeria.setType('sine');   oscFeria.freq(8500); envFeria.setADSR(0.002, 0.02, 0.0, 0.01); envFeria.play(oscFeria); }
function dispararOHat()  { oscFeria.setType('sine');   oscFeria.freq(7200); envFeria.setADSR(0.01, 0.18, 0.0, 0.08);  envFeria.play(oscFeria); }

// 🌟 INTERACCIONES SUCESIVAS COMPACTADAS A 7 TIEMPOS
function evaluarClickRez() {
  if (mostrandoTexto || paradasCompletadas >= 7) return;

  if (mouseX > width / 2 - 60 && mouseX < width / 2 + 60 && mouseY > 55 && mouseY < 135) {
    let pasoAProg = paradasCompletadas; // 0 a 6
    
    // Distribución rítmica adaptada para el loop asimétrico de 7 tiempos
    if (pasoAProg === 0) { rejillaRez[0][0] = 1; rejillaRez[0][4] = 1; dispararKick(); }
    if (pasoAProg === 1) { rejillaRez[1][2] = 1; rejillaRez[1][5] = 1; dispararClap(); }
    if (pasoAProg === 2) { 
      rejillaRez[2][1] = 1; rejillaRez[2][3] = 1; rejillaRez[2][6] = 1; dispararCHat();
    }
    if (pasoAProg === 3) { rejillaRez[3][4] = 1; dispararOHat(); }
    if (pasoAProg === 4) { rejillaRez[0][2] = 1; rejillaRez[2][0] = 1; dispararKick(); }
    if (pasoAProg === 5) { rejillaRez[1][5] = 1; dispararClap(); }
    if (pasoAProg === 6) { rejillaRez[3][2] = 1; dispararOHat(); }

    triggerTextoRez(pasoAProg + 1);

    // Encendemos el video 4.mp4 únicamente en el hito 3 estabilizado
    if (paradasCompletadas === 3) {
      lanzarVideoEscena('4.mp4', width - 280, 160, 200, 150);
    }
  }
}

// 📄 ALMACENAMIENTO DE TEXTOS ACADÉMICOS DE 7 PASOS
function triggerTextoRez(n) {
  scrollTextoY = 0; sliderPosPercent = 0;
  paradasCompletadas = n;
  mostrandoTexto = true;

  switch(n) {
    case 1:
      textoMostrar = "DIARIO DE CAMPO:\n\n¿Cómo dar control al caos? En esta última iteración antes de la presentación final, seguí avanzando hacia una idea más específica de lo que quería lograr. El enfoque evolucionó hacia el diseño de un Secuenciador de Pasos (Step Sequencer) estructural. Se dividió geométricamente la pantalla en varias zonas: Botones Inferiores, un Slider Lateral para el control del tempo (BPM), y el área del video para la inyección de notas. Los botones pasaron a controlar cadenas de efectos dinámicos extremos diseñados conceptualmente para alterar la percepción temporal del espectador. El enfoque mutó de la síntesis melódica al procesamiento destructivo de samples en tiempo real.";
      break;
    case 2:
      textoMostrar = "REFLEXIONES DE CAMPO:\n\nLa obra mezcla dos mundos. Por un lado, hay un motor rítmico que corre de fondo y ordena el caos para que todo suene en armonía. Por el otro, el espectador tiene el control total para alterar el tiempo: a través de unos botones inferiores se pueden activar efectos extremos que rompen y destruyen el audio en tiempo real, mientras que un slider lateral permite estirar o acelerar la velocidad de los sonidos a niveles impensados.\n\nLa libertad de las herramientas técnicas abrieron la puerta a que me interesara por conocer a nivel más teórico el funcionamiento de los beats y referentes musicales:\n- Switch Angel (https://www.instagram.com/_switch_angel/)\n- Ableton Learning Music (https://learningmusic.ableton.com/make-beats/make-beats.html)";
      break;
    case 3:
      textoMostrar = "ASOCIACIONES MUSICALES:\n\nREZ INFINITE\nEspera que se cargue el video\n\nInspirado en Rez Infinite —un videojuego donde cada acción de quien juega genera capas de música y ritmos que repiten secuencias interactuando con el espectador—, quise crear un espacio donde las imágenes no fueran solo para mirar, sino para tocar.\n\nSe diseñó una matriz de 7 pasos por 4 canales independientes (Drums, Claps, Synth, Bass). Para garantizar la consistencia estética y que el instrumento fuera siempre armónico, tomé la decisión crítica de acotar el universo tonal forzando los valores de matiz cromático (0-360) a una Escala Pentatónica mediante funciones de módulo matemático. Con un solo click un botón inferior activa/reproduce la referencia del canal, y con el siguiente click limpia la pista (silencio), optimizando los tiempos de reacción en la performance.";
      break;
    case 4:
      textoMostrar = "AUTOENTREVISTA:\n\n— Existe una contradicción en tu trabajo: por un lado, hay un motor rítmico que ordena el caos en armonía, y por el otro, le das al usuario herramientas para destruir el audio en tiempo real. ¿Cuál es el propósito de esta tensión? \n\n— Quería explorar mi propia autonomía frente al algoritmo. Quería crear un espacio donde la música evolucionara con quien juega o interactúa. El motor rítmico de fondo es la estructura que sostiene la obra, pero los botones inferiores y el slider lateral son herramientas de subversión temporal: le permiten al usuario estirar, acelerar y procesar destructivamente los sonidos a niveles impensados. Esa tensión entre el orden métrico y el procesamiento  invita al espectador a llevar el Imagófono al límite. ";
      break;
    case 5:
      textoMostrar = "TEXTOS DE DESAHOGO:\n\n¡Fallo la wea en la presentación final! Con un error que nunca antes había ocurrido. ¿Qué puedo aprender de eso? ¿Cómo salgo de esto en el futuro?\n\n[Reflexión post-crisis]: El desahogo técnico se transformó en una epifanía. Lo que empezó como un GPS mudo en la bicicleta ahora es una estructura polirrítmica compacta y asimétrica de 7 tiempos que corre de manera fluida frente a mis ojos. ¡La negociación con el código dio frutos!";
      break;
    case 6:
      textoMostrar = "POÉTICA:\n\nIMAGÓFONO v1.0\n\nLas imágenes digitales no solo se pueden ver. ¿Qué sonido hace un píxel? ¿Cómo suena el rojo, el azul, el cian o el magenta? Esta parte de la obra es mucho más física, expresiva y experimental. Se invita al espectador a llevar el imagófono al límite, inspirarlos con las imágenes desplegadas y descubrir qué música pueden construir con su cuerpo.";
      break;
    case 7:
      textoMostrar = "LA MÚSICA HA SIDO CREADA:\n\nEnfatizar las repeticiones.\n\nAquí la frase fue más una confirmación de lo que ya quería hacer. La construcción del sintetizador asimétrico que repite 7 tiempos me ayudó a controlar la orquesta de elementos que quería incorporar de las sesiones previas para cerrar la bitácora de forma simétrica.\n\n- Siempre darse crédito por tener algo más que personalidad.\n- Llama a tu madre y pregúntale qué hacer.\n\n#Beats #Ritmo #Secuenciador";
      break;
  }
}

// 🌟 CUADRO DE TEXTO RETRO CENTRALIZADO CON AJUSTE DE COLUMNA DE 7 PASOS
function dibujarCuadroTextoRetro() {
  let cajaX = 80; let cajaW = width - 160; let trackX = cajaX + cajaW - 20; 

  if (escenaActual === 4 && paradasCompletadas === 3) {
    cajaW = width - 380; trackX = cajaX + cajaW - 20;
    
    fill(15); stroke(0, 255, 255); strokeWeight(3); 
    rect(width - 285, 160, 210, 160, 4);
    fill(255); noStroke(); textAlign(CENTER); textSize(10); textFont("Courier New");
    text("📼 REZ SYNCHRONICITY: 4.mp4", width / 2 + 220, 340);
    
    if (videoEscenaActivo !== null) {
      let canvasPos = canvas.getBoundingClientRect();
      videoEscenaActivo.position(canvasPos.left + (width - 280), canvasPos.top + 165);
    }
  }

  fill(10, 10, 30, 245); stroke(0, 255, 255); strokeWeight(3); rect(cajaX, 160, cajaW, 200, 6);
  fill(30); noStroke(); rect(trackX, 170, 10, 180, 3);

  if (mouseIsPressed && mouseX > trackX - 10 && mouseX < trackX + 20 && mouseY > 170 && mouseY < 350) {
    sliderPosPercent = map(mouseY, 170, 350, 0, 1); sliderPosPercent = constrain(sliderPosPercent, 0, 1);
  }
  
  // Condición de scrollbar calibrada para el paso 7
  let textoAlturaTotal = (paradasCompletadas === 7) ? 350 : 250; 
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
