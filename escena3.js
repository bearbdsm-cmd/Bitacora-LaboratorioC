// =====================================================================
// Módulo de la Sesión 3 - escena3.js (VERSIÓN ALINEACIÓN TOTAL)
// Sintonía, render visual de la perilla y sensor de click unificados en Y: 190
// =====================================================================

function dibujarEscena3Yoasobi() {
  let oscilacion = sin(frameCount * 0.04) * 12;

  background(25); // Ambiente oscuro de habitación de edición

  // 1. ESTRUCTURA DEL TELEVISOR (Mueble de madera retro - Desplazado a Y: 110)
  fill(60, 40, 20); noStroke();
  rect(100, 110, 600, 360, 20); 
  fill(40, 25, 10); rect(100, 465, 600, 15); // Sombra base adaptada

  // Marco de la pantalla CRT
  push();
  fill(0); stroke(80); strokeWeight(15);
  rect(130, 140, 450, 300, 10); 
  pop();

  // 📺 2. BARRAS DE COLOR SMPTE (7 Canales de información)
  let coloresBars = [
    color(220, 220, 220), // Canal 1: Blanco
    color(255, 255, 0),   // Canal 2: Amarillo
    color(0, 255, 255),   // Canal 3: Cyan
    color(0, 255, 0),     // Canal 4: Verde
    color(255, 0, 255),   // Canal 5: Magenta
    color(255, 0, 0),     // Canal 6: Rojo
    color(0, 0, 255)      // Canal 7: Azul
  ];

  let barW = 450 / 7;
  for (let i = 0; i < 7; i++) {
    if (i < paradasCompletadas) {
      fill(coloresBars[i]); // Barra sintonizada
    } else {
      let c = coloresBars[i];
      fill(red(c) * 0.15, green(c) * 0.15, blue(c) * 0.15); // Barra apagada
    }
    noStroke();
    rect(130 + (i * barW), 140, barW, 300);
  }

  // Estética de líneas de escaneo (Scanlines adaptadas al nuevo marco)
  stroke(0, 0, 0, 45); strokeWeight(1);
  for (let i = 140; i < 440; i += 4) { line(130, i, 580, i); }

  // 🎛️ 3. PANEL DE CONTROL LATERAL
  fill(30); rect(600, 140, 80, 300, 5);
  
  // 🌟 PERILLA SELECTORA UNIFICADA (Render y Sensor exactamente en Y: 190)
  let dPerilla = dist(mouseX, mouseY, 640, 190);
  let angulo = map(paradasCompletadas, 0, 7, 0, TWO_PI);

  push();
  translate(640, 190); // Mueve la perilla visual a la altura del sensor
  
  // Control de cursor y color interactivo de la perilla
  if (dPerilla < 25 && !mostrandoTexto && paradasCompletadas < 7) {
    fill(255, 255, 0); stroke(255); 
  } else {
    fill(70); stroke(100); 
  }
  strokeWeight(2); circle(0, 0, 45);
  
  // Indicador de posición de la perilla
  rotate(angulo);
  fill(20); noStroke();
  rect(-5, -20, 10, 24, 2);
  pop();

  // 👆 ACTIVACIÓN GLOBAL DEL CURSOR (HAND)
  if (mostrandoTexto) {
    cursor(HAND); 
  } else {
    if ((dPerilla < 25 && paradasCompletadas < 7) || paradasCompletadas >= 7) {
      cursor(HAND); 
    } else {
      cursor(ARROW); 
    }
  }

  // Etiquetas y botones decorativos alineados a la nueva altura
  fill(0, 255, 255); textAlign(CENTER); textSize(9); textFont("Courier New");
  text("CH SELECTOR", 640, 155); // Centrado arriba de la perilla
  
  fill(50); stroke(80); circle(640, 265, 35); // Perilla de volumen fija
  fill(120, 0, 0); noStroke(); rect(620, 335, 40, 18, 2); // Power
  fill(0, 100, 0); rect(620, 375, 40, 18, 2);  // Reset

  // 📢 TEXTO INFORMATIVO UI
  if (!mostrandoTexto) {
    fill(255, 255, 0); textAlign(CENTER); textSize(14);
    if (paradasCompletadas < 7) {
      } else {
      text("✅ SINTONÍA COMPLETADA. HAZ CLICK EN CUALQUIER LADO PARA IR AL FINAL.", width / 2, 60);
    }
  }
}

// 🎹 EMULACIÓN DE SINTETIZADORES SONIC PI
function dispararSonidoTV(i) {
  if (i % 2 === 0) {
    // Synth TB303 (Canales pares)
    oscFeria.setType('sawtooth');
    oscFeria.freq(110 + (i * 15)); 
    envFeria.setADSR(0.01, 0.2, 0.1, 0.1); envFeria.play(oscFeria);
  } else {
    // Synth Gabberkick (Canales impares)
    oscFeria.setType('square');
    oscFeria.freq(55);
    envFeria.setADSR(0.005, 0.1, 0, 0.05); envFeria.play(oscFeria);
  }
}

// 🌟 DETECCIÓN DE CLICK EN LA PERILLA (UNIFICADA CON EL DIBUJO EN Y: 190)
function evaluarClickTV() {
  if (mostrandoTexto || paradasCompletadas >= 7) return;

  let d = dist(mouseX, mouseY, 640, 190); // Coincide milimétricamente con el translate
  if (d < 25) {
    let canalSintonizadoActualmente = paradasCompletadas; 
    
    dispararSonidoTV(canalSintonizadoActualmente);
    triggerTextoTV(canalSintonizadoActualmente + 1);
    
    // 📺 Inyección del video 3.mp4 exactamente en la parada 3
    if (canalSintonizadoActualmente === 2) {
      lanzarVideoEscena('3.mp4', width - 280, 160, 200, 150);
    }
  }
}

// 📄 GESTOR DE CONTENIDOS YOASOBI
function triggerTextoTV(n) {
  scrollTextoY = 0; sliderPosPercent = 0;
  paradasCompletadas = n; 
  mostrandoTexto = true;

  switch(n) {
    case 1:
      textoMostrar = "DIARIO DE CAMPO:\n\n El éxito de los primeros experimentos con la cámara desató una ola de emoción y preguntas: si ya podía transformar mis gestos en sonido, ¿qué dirección quería tomar? ¿Qué oportunidades ofrece esta nueva forma de interacción? ¿Cómo agrego personalidad a los gestos? Tenía la libertad de cambiar el tono, la duración de las notas o llenarlo todo de efectos. Podía, incluso, replicar un Theremin si me lo proponía. Pero en medio de esa excitación, apareció una pregunta más profunda: ¿qué tipo de música quería construir realmente? Tener libertad absoluta puede convertirse en un caos hermoso, pero sigue siendo un caos.\n\nInspirado en la energía y las capas armónicas del J-Pop moderno, decidí que esta etapa no se trataría de acumular herramientas, sino de elegir con pinzas. En lugar de desechar mis pruebas anteriores, tomé la decisión de meter todas las etapas de mi experimentación dentro del mismo saco y ordenarlas a través de reglas musicales claras.";
      break;
    case 2:
      textoMostrar = "REFLEXIONES DE CAMPO:\n\nEl quiebre más importante en esta etapa ocurrió al enfrentarme a la paradoja de la libertad absoluta en el código. Pasar de la frustración inicial de no saber nada de música a tener un sistema que me permitía alterar cualquier parámetro (notas, duraciones, efectos) me generó una ansiedad creativa: ¿libertades para hacer qué?. Mi gran aprendizaje no fue técnico, sino curatorial. Comprendí que para construir un objeto artístico coherente no debía descartar mis tropiezos ni mis borradores previos, sino integrarlos como parte de mi evolución. Aprendí a dialogar con el algoritmo no desde la imposición de comandos, sino desde la negociación: seleccionar y sacrificar opciones (como reducir la complejidad del RGB a una sola variable de Tono/Hue) para alcanzar un balance sano entre el azar del cuerpo y las reglas armónicas de la música. Descubrí que ponerle límites a la máquina es, en realidad, lo que me permitió encontrar mi propia voz dentro del proyecto.";
      break;
    case 3:
      textoMostrar = "ASOCIACIONES MUSICALES:\n\nYoasobi X ADO\nEspera que se cargue el video\n\nLa música de Yoasobi, inspira fuertemente openings de Animé. \n\nEn este punto, las diferentes opciones que permitían mis experimentaciones generaban un caos hermoso, pero caos al fin. Musicalmente me interesé por de qué forma lograr sonidos armónico o que tuvieran sentido dentro de este caos, haciendo uso de escalas o armonías. Que tomaban información de los gestos y datos que compartía. Otra decisión relevante aquí fue el abandonar la idea de enviar los datos RGB (3 datos) y enviar en su lugar datos que resultaban más valiosos como el Hue(Tono) (0 a 360, rojo 0, 60 Amarillo 180 Cian 300 Magenta), reduciendo el color a solo 1 variables, la posición de las manos X,Y, la velocidad del gesto y qué mano estábamos utilizando. Esto para mapear las decisiones sonoras que finalmente se utilizarían en la obra. ";
      break;
    case 4:
      textoMostrar = "AUTOENTREVISTA (REDUCCIÓN CURATORIAL):\n\n— Si la visión por computadora te entregaba un abanico infinito como el RGB, ¿por qué decidiste 'sacrificar' esa complejidad y reducir el color a una sola variable como el Hue?\n\n— Porque descubrí la paradoja de la libertad absoluta en el código: tener el control de todos los parámetros simultáneamente no produce música, produce un caos hermoso pero incomprensible. Mi gran aprendizaje en este nodo no fue técnico, sino curatorial. El espectro RGB ofrece tres variables de gran control matemático, pero de nula practicidad para capturar la esencia cromática en una acción performática fluida. Al reducir el sistema a la variable unidimensional del Hue (0 a 360°), logré mapear de forma limpia los colores dominantes hacia decisiones armónicas estables. Esto permitió que las variaciones del tono nacieran de la corporalidad (posición y velocidad del gesto), volviendo la interacción mucho más intuitiva y orgánica.";
      break;
    case 5:
      textoMostrar = "TEXTOS DE DESAHOGO:\n\nMaldito RGB!!!! Te amo Hue. Me arreglaste la vida!!!!";
      break;
    case 6:
      textoMostrar = "POÉTICA:\n\n-DATA+MUSIC\n\nInspirado en la energía y las capas armónicas del J-Pop moderno (como Yoasobi o Ado), esta obra despliega los elementos que son relevantes para explicar el proceso de abandonar los datos y encausarlos hacia la música. En lugar de desechar mis pruebas anteriores, tomé la decisión de meter todas las etapas de mi experimentación dentro del mismo saco y ordenarlas a través de reglas musicales claras. \n\nEsta escena es una invitación a entender que poner límites y elegir qué sonidos queremos escuchar no nos quita libertad, sino que nos da el control para crear algo armónico.";
      break;
    case 7:
      textoMostrar = "LLEGAMOS A LA CIMA:\n\nFrente a la Disyuntiva elegir las 2 opciones.\n\nMe inspiró a no abandonar mis ejercicios previos (los que mostraban el proceso y dejarlo como parte integra de la obra).\n- Perderse en territorio inútil.\nUn objeto muy pequeño, su centro\n\n#Biker #Armonías #SonidoAMúsica";
      break;
  }
}

function handleTecladoContinuo() {
  if (escenaActual === 1 && !mostrandoTexto) { if (keyIsDown(RIGHT_ARROW)) velocidadBici += 0.35; }
}
