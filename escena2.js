// =====================================================================
// Módulo de la Sesión 2 - escena2.js (VERSIÓN CURSOR DEDO FINAL)
// Escudo masivo (180px), Flujo Secuencial y Cursor HAND (👆)
// =====================================================================

function dibujarEscena2Theremin() {
  let oscilacion = sin(frameCount * 0.04) * 12;

  // 1. Cables decorativos colgando del techo del arcade
  stroke(100); strokeWeight(2);
  line(width * 0.25, 45, width * 0.25, 140 + oscilacion);
  line(width * 0.50, 45, width * 0.50, 120 - oscilacion);
  line(width * 0.75, 45, width * 0.75, 130 + oscilacion * 0.5);

  // 🎯 2. LÓGICA DE FLUJO SECUENCIAL ESTRICTO
  let premioActual = paradasCompletadas + 1; // El premio que estamos disputando (1 al 7)
  noStroke();

  if (paradasCompletadas < 7) {
    // Clasificamos qué figura debe renderizarse de forma exclusiva en base al premio actual
    let blancoActivo = (premioActual - 1) % 3; // 0 = Cuadrado Cyan, 1 = Círculo Amarillo, 2 = Triángulo Magenta

    // BLANCO 0: CUADRADO CYAN (Se activa en los Premios #1, #4 y #7)
    if (blancoActivo === 0) {
      fill(0, 255, 255); rectMode(CENTER);
      rect(width * 0.25, 180 + oscilacion, 60, 60, 4); // Cuadrado minimalista puro
      rectMode(CORNER);
    }

    // BLANCO 1: CÍRCULO AMARILLO (Se activa en los Premios #2 y #5)
    else if (blancoActivo === 1) {
      fill(255, 255, 0);
      circle(width * 0.50, 160 - oscilacion, 65); // Círculo minimalista puro
    }

    // BLANCO 2: TRIÁNGULO MAGENTA (Se activa en los Premios #3 y #6)
    else if (blancoActivo === 2) {
      fill(255, 0, 128);
      let tx = width * 0.75; let ty = 170 + oscilacion * 0.5;
      triangle(tx, ty - 35, tx - 35, ty + 35, tx + 35, ty + 35); // Triángulo minimalista puro
    }
  }

  // 🧸 3. ESTANTE DE PREMIOS (Visualizador de 7 osos en la repisa)
  dibujarEstanteDePremios();

  // 📢 TEXTO INSTRUCTIVO DINÁMICO
  if (!mostrandoTexto) {
    fill(255, 255, 0); textAlign(CENTER); textFont("Courier New"); textSize(14); noStroke();
    if (paradasCompletadas < 7) {
      text("TOCA LAS FIGURAS DESPLEGADAS Y RECIBE TU PREMIO: " + premioActual + " / 7 🧸", width / 2, 85);
    }
  }

  // 👆 4. CONTROL DE CURSOR: DEDO APUNTANDO (Reemplaza a la mira arcade)
  // Activamos el cursor del sistema como una manito apuntando para toda la escena
  cursor(HAND); 

  // Mensaje final al completar la recolección
  if (paradasCompletadas >= 7) {
    fill(0, 255, 255); textAlign(CENTER); textSize(15);
    text("¡Haz click para avanzar!", width / 2, 100);
  }
}

function dibujarEstanteDePremios() {
  fill(80, 50, 30); noStroke();
  rect(60, 420, width - 120, 12); // Nivel inferior (4 osos)
  rect(150, 345, width - 300, 10); // Nivel superior (3 osos)
  
  fill(50, 30, 15); rect(60, 432, width - 120, 6); rect(150, 355, width - 300, 4);

  fill(150); textFont("Courier New"); textSize(11); textAlign(CENTER);
  text("ESTANTE DE PREMIOS RECLAMADOS (" + paradasCompletadas + " / 7)", width / 2, 465);

  let cCyan = color(0, 255, 255); let cAmar = color(255, 255, 0); let cMage = color(255, 0, 128);

  if (paradasCompletadas >= 1) dibujarOsoPeluchePixel(width * 0.20, 418, cCyan);
  if (paradasCompletadas >= 2) dibujarOsoPeluchePixel(width * 0.40, 418, cAmar);
  if (paradasCompletadas >= 3) dibujarOsoPeluchePixel(width * 0.60, 418, cMage);
  if (paradasCompletadas >= 4) dibujarOsoPeluchePixel(width * 0.80, 418, cCyan);

  if (paradasCompletadas >= 5) dibujarOsoPeluchePixel(width * 0.35, 343, cAmar);
  if (paradasCompletadas >= 6) dibujarOsoPeluchePixel(width * 0.50, 343, cMage);
  if (paradasCompletadas >= 7) dibujarOsoPeluchePixel(width * 0.65, 343, cCyan);
}

function dibujarOsoPeluchePixel(x, y, colorOso) {
  fill(colorOso); noStroke();
  circle(x - 14, y - 28, 12); circle(x + 14, y - 28, 12);
  circle(x, y - 18, 24); rect(x - 14, y - 8, 28, 16, 6);
  circle(x - 10, y + 4, 10); circle(x + 10, y + 4, 10);
  fill(15); circle(x - 5, y - 20, 3); circle(x + 5, y - 20, 3);
  fill(255); circle(x, y - 14, 6); fill(15); rect(x - 2, y - 15, 4, 2);
}

// 🌟 CORRECCIÓN DE COLISIONES AMPLIADAS CON ESCUDO DE 180PX
function evaluarDisparoFeria(oscilacion) {
  if (mostrandoTexto || paradasCompletadas >= 7) return;

  let premioActual = paradasCompletadas + 1;
  let blancoActivo = (premioActual - 1) % 3; 

  // 🌟 ÁREA MASIVA DE DETECCIÓN: 90px de radio = 180px de diámetro de impacto total.
  let escudoGigante = 90; 

  // 🟩 BLANCO 0: CUADRADO CYAN (Eje X: width * 0.25)
  if (blancoActivo === 0) {
    let targetX = width * 0.25;
    let targetY = 180 + oscilacion;
    let d = dist(mouseX, mouseY, targetX, targetY);
    
    if (d < escudoGigante) {
      dispararSonidoArcadeFeria("CYAN"); 
      triggerPremioFeria(premioActual);
    }
  }
  
  // 🟡 BLANCO 1: CÍRCULO AMARILLO (Eje X: width * 0.50)
  else if (blancoActivo === 1) {
    let targetX = width * 0.50;
    let targetY = 160 - oscilacion;
    let d = dist(mouseX, mouseY, targetX, targetY);
    
    if (d < escudoGigante) {
      dispararSonidoArcadeFeria("AMARILLO"); 
      triggerPremioFeria(premioActual);
    }
  }
  
  // 🔺 BLANCO 2: TRIÁNGULO MAGENTA (Eje X: width * 0.75)
  else if (blancoActivo === 2 && paradasCompletadas < 7) {
    let targetX = width * 0.75;
    let targetY = 170 + (oscilacion * 0.5);
    let d = dist(mouseX, mouseY, targetX, targetY);
    
    if (d < escudoGigante) {
      dispararSonidoArcadeFeria("MAGENTA"); 
      triggerPremioFeria(premioActual);
      
      // 🌟 CORRECCIÓN EXCLUSIVA: El video 2.mp4 SOLO se activa en el Premio 3 (Asociaciones Musicales)
      // El Premio 6 (Poética) ya no ejecutará este bloque, desplegándose en texto normal.
      if (premioActual === 3) {
        lanzarVideoEscena('2.mp4', width - 280, 160, 200, 150);
      }
    }
  }
}

function triggerPremioFeria(numeroPremio) {
  scrollTextoY = 0; sliderPosPercent = 0; totalPremiosFeria--; paradasCompletadas++; 
  
  if (numeroPremio === 1) {
    textoMostrar = "DIARIO DE CAMPO:\n\n¿Sería posible utilizar una imagen como un instrumento musical?\n\nAnte la sorprendente velocidad en que se resolvió el primer proyecto, mi camino se fue a otro lado. Ahora con mayor confianza mi proyecto mutó hacia la Sinestesia Tecnológica y la visión por computadora. Donde pretendía transformar las imágenes y la lectura de píxeles en tiempo real en un instrumento musical expresivo.\n\nEsto lo logré implementando en P5JS junto a la librería de inteligencia artificial ml5.js para generar una capa de detección gestual capaz de escanear y extraer la información cromática (RGB) de un video de fondo, convirtiendo no solo la imagen/video en un instrumento, sino también el cuerpo en un transductor multimedia.";
  } else if (numeroPremio === 2) {
    textoMostrar = "REFLEXIONES DE CAMPO:\n\nAdmito que esta fue la etapa más excitante de todo el proceso. En esta sesión experimenté la transición de ser un espectador de datos a convertirme en un ejecutante performático.\n\nCuando logré ver mis gestos recognized en el computador y el primer sonido generado por estos gestos fue una explosión de adrenaline. Fue realmente sorprendente. El desafío radicó en aspectos más técnicos, lograr la comunicación entre todas las piezas para lograr esa primera chispa sonora.";
  } else if (numeroPremio === 3) {
    textoMostrar = "ASOCIACIONES MUSICALES:\n\nRhythm Heaven. Idol\nEspera que se cargue el video\n\nReacciones a los movimientos. Ritmos simples y sonidos complementarios que se activan con acciones específicas.\n\nLas decisiones musicales originales apuntaron a un proyecto expansivo que fuera creciendo en la medida que mis experimentos resultaran exitosos y me permitieran avanzar a otro evento más interesante. En esta primera etapa, el objetivo principal fue conectar los elements: Detectar las hands, que P5Js se comunique con SonicPi y lograr generar un sonido activado por las hands. Se estableció una arquitectura de comunicación unidireccional utilizando el protocolo OSC (Open Sound Control) a través de WebSockets (Node.js), permitiendo que el lienzo web enviara tramas de datos crudos hacia Sonic Pi de forma instantánea a través de la red local.";
  } else if (numeroPremio === 4) {
    textoMostrar = "AUTOENTREVISTA:\n\n— Mencionas como referente a Rhythm Heaven. ¿De qué manera influyó la filosofía del diseño de videojuegos en tu decisión de crear un instrumento basado en acciones específicas\n\n— Causa, efecto y recompensa visual-sonora. En Rhythm Heaven, la música se construye a través de reacciones exactas a estímulos específicos. Al diseñar este 'Theremin cromático', busqué esa misma simplicidad expresiva: ritmos sencillos y sonidos complementarios que reaccionan al gesto de las manos. Mi intención original mutó hacia un proyecto expansivo; no quería una instalación estática, sino una experiencia interactiva donde el usuario entendiera inmediatamente que su acción corporal modifica el entorno.";
  } else if (numeroPremio === 5) {
    textoMostrar = "TEXTOS DE DESAHOGO:\n\n¡No puedo creer que esto haya funcionado tan bien! El detectar los movimientos y que estos se reflejen en sonidos se siente increíble!";
  } else if (numeroPremio === 6) {
    textoMostrar = "POÉTICA:\n\nSINESTESIA\n\nEn esta obra, la cámara web es una superficie viva que permite acceder a los píxeles (de una imagen o video) como si fueran las cuerdas de un instrumento, creando sinestesia musical: traduzco la luz y los colores en frecuencias audibles.\n\nEs una invitación a experimentar el espacio vacío como una partitura invisible, demostrando que podemos hackear la pantalla del computador para convertir nuestra propia corporalidad en un puente directo hacia la creación sonora. ";
  } else if (numeroPremio === 7) {
    textoMostrar = "TODOS LOS PREMIOS SON TUYOS:\n\nUn objeto muy pequeño, su centro\n\nOriginalmente quise partir inmediatamente consturyendo la solución del theremin, pero esto me ayudó a irme un poco más atrás y enfocarme en el centro => Gesto => Pixel => Sonido\n\n -Ocupar cada tiempo con algo\n-Prestar atención a las distracciones\n\n#Pixeles #DetecciónDeManos #Sonido";
  }
  mostrandoTexto = true;
}

function handleTecladoContinuo() {
  if (escenaActual === 1 && !mostrandoTexto) { if (keyIsDown(RIGHT_ARROW)) velocidadBici += 0.35; }
}
