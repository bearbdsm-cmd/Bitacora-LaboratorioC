// =====================================================================
// Módulo de la Sesión 1 - escena1.js (VERSIÓN FINAL COMPLETA)
// Cerro, nubes, avance de bicicleta y paso natural calibrado a Escena 2
// =====================================================================

function dibujarEscena1Bici() {
  handleTecladoContinuo();

  // ☁️ Nubes
  for (let n of nubes) {
    n.x += n.v;
    if (n.x > width + 40) n.x = -40; 
    fill(60); noStroke();
    rect(n.x, n.y, 50, 15, 4); rect(n.x + 10, n.y - 10, 30, 15, 4);
  }

  // ⛰️ Cerro
  stroke(0, 255, 100); strokeWeight(4); noFill();
  beginShape();
  for (let x = 0; x <= width; x++) { vertex(x, calcularAlturaCerro(x)); }
  endShape();

  // Checkpoints (Postes de control)
  for (let i = 1; i <= totalParadas; i++) {
    let paradaX = (width / (totalParadas + 1)) * i; let paradaY = calcularAlturaCerro(paradaX);
    stroke(100); strokeWeight(2); line(paradaX, paradaY, paradaX, paradaY - 30);
    fill(i <= paradasCompletadas ? color(0, 255, 255) : color(255, 0, 100)); noStroke();
    rect(paradaX - 4, paradaY - 35, 8, 6);
  }

  biciX += velocidadBici; velocidadBici *= 0.92; 
  biciY = calcularAlturaCerro(biciX) - 22;

  // 🚲 Bicicleta Pixel Art
  stroke(255); strokeWeight(2); noFill();
  circle(biciX, biciY + 14, 12); circle(biciX + 24, biciY + 14, 12);
  line(biciX, biciY + 14, biciX + 10, biciY + 14); line(biciX, biciY + 14, biciX + 7, biciY + 4);   
  line(biciX + 10, biciY + 14, biciX + 17, biciY + 2); line(biciX + 7, biciY + 4, biciX + 17, biciY + 2);   
  line(biciX + 24, biciY + 14, biciX + 17, biciY + 2); 
  fill(0, 255, 255); noStroke(); rect(biciX + 5, biciY - 2, 5, 8); circle(biciX + 7, biciY - 6, 6);  

  if (!mostrandoTexto) {
    fill(255, 255, 0); textAlign(CENTER); textSize(14); noStroke();
    text("MANTÉN PRESIONADA LA FLECHA [ → ] PARA AVANZAR Y SUBIR EL CERRO", width / 2, 90);
  }

  // Sensor de proximidad de los postes
  let paradaActualX = (width / (totalParadas + 1)) * (paradasCompletadas + 1);
  if (biciX >= paradaActualX && paradasCompletadas < totalParadas && !mostrandoTexto) {
    velocidadBici = 0; scrollTextoY = 0; sliderPosPercent = 0; 
    dispararNotaPianoProgresiva(); 
    inyectarTextoParada(paradasCompletadas + 1);
    mostrandoTexto = true;

    // 📺 GATILLO MULTIMEDIA: El video 1.mp4 se inyecta cuando tocamos el poste 3 (paradasCompletadas es 2)
    if (paradasCompletadas === 2) {
      lanzarVideoEscena('1.mp4', width - 280, 160, 200, 150);
    }
  }

  // 🌟 CAMBIO AUTOMÁTICO DE NIVEL: Al cruzar el borde derecho, inicializa la feria desde cero
  if (biciX >= width - 25) { 
    escenaActual = 2; 
    paradasCompletadas = 0; // Reseteo estricto para que la feria parta con 0 osos ganados
    totalPremiosFeria = 7;  // Se cargan las 7 rondas de blancos móviles
    mostrandoTexto = false; 
    limpiarVideoGlobal();
  }
}

function calcularAlturaCerro(x) {
  let baseFloor = 380;
  let altosYBajos = sin(x * 0.02) * 15 + cos(x * 0.007) * 10;
  let subidaFuerte = 0;
  if (x > width * 0.4) subidaFuerte = (x - width * 0.4) * 0.35; 
  return baseFloor - altosYBajos - subidaFuerte;
}

function inyectarTextoParada(parada) {
  switch(parada) {
    case 1:
      textoMostrar = "DIARIO DE CAMPO:\n\nMi relación con la música siempre ha sido distante. Ni siquiera me gustaba la radio o el 'modo aleatorio' de los servicios de música actuales. El escuchar canciones que no conozco y que no me resultan familiares me genera mucha incomodidad. Así que enfrentarme a cursos de sonido siempre me ha hecho sentir muy inadecuado.\n\nAnte mi completa ignorancia musical y la (absoluta) falta de conocimiento teórico, decidí abordar este ejercicio desde una vereda que me permitiera separar mis falencias y descansar en mis habilidades. La forma más sencilla de lograrlo fue la Sonificación de Datos. Mi idea original consistió en transformar variables físicas y cinéticas de mis viajes en bicicleta (coordenadas de Latitud, Longitud, altura, tiempo, ritmo cardíaco) en parámetros audibles directos.";
      break;
    case 2:
      textoMostrar = "REFLEXIONES DE CAMPO:\n\nLa decisión de abordar el proyecto desde los datos hacia los sonidos fue maravillosa. Porque esa acción no requería un solfeo, no requería conocimientos musicales, sino el establecimiento de relaciones lógicas, decisiones de datos y flujos matemáticos estructurados en el tiempo para finalmente producir un sonido.\n\nCreo que el quiebre principal que logré en este ejercicio fue derribar la barrera cognitiva que me distanciaba de la creación sonora. Utilizar los datos de mi GPS y pulso como un 'lenguaje intermedio' me liberó de una presión y de ese sentimiento de inadecuación. Al mismo tiempo experimenté una profunda apropiación tecnológica: la programación me permitió dialogar con el sonido desde mi propia experiencia como ciclista y como programador, transformando un registro cotidian en un hecho estético.";
      break;
    case 3:
      textoMostrar = "ASOCIACIONES MUSICALES:\n\nHime Hime - Segmento de Yowamushi Pedal\nEspera que se cargue el video\n\nA lo largo de la serie, el protagonista utiliza esta canción para marcar su cadencia y llegar a la cima. Pero aparte de la conexión emocional que siento con ese momento particular, el uso de los 8-bit que se escuchan al inicio me pareció lo más adecuado para este ejercicio.\n\nOpté por una instrumentación de datos simple, donde la velocidad, y posición operaban como moduladores directos del tono (note). La decisión estética clave fue dejar que los datos corrieran de manera cruda y orgánica.\n\nUna vez que el primer dato pudo ser interpretado, este proyecto explotó rápidamente. ¿Y si aparte de la latitud y longitud utilizo la altura? ¿Y si involucro el ritmo cardíaco? ¿Y si en lugar de sonidos preestablecidos en el mismo SonicPi utilizo mi grabaciones del sonido de la bicicleta o de mis destinos (el cerro, las calles), etc.?";
      break;
    case 4:
      textoMostrar = "AUTOENTREVISTA:\n\n— Al no tener formación ni conocimientos teóricos de música, ¿cómo lograste estructurar composiciones sonoras que resultaran coherentes y no un caos de ruido aleatorio?\n\n— El abandonar el pensamiento de creación basado en notas musicales y conocimiento teórico. Empecé a pensar en relaciones lógicas y flujos matemáticos. Utilicé los datos crudos de mi GPS (latitud, longitud, altura) y mi ritmo cardíaco como un lenguaje intermedio. En lugar de forzar un compás tradicional, creé un sistema donde la velocidad de la bicicleta modulaba el pulso rítmico. El código actuó como un transductor: mi esfuerzo físico y el territorio se convirtieron en los verdaderos directores de la obra, transformando un dato cinético cotidiano en un hecho estético honesto.";
      break;
    case 5:
      textoMostrar = "TEXTOS DE DESAHOGO:\n\n¡No puedo creer lo rápido que salió esto! No solo fue sencillo, sino que realmente me quitó un peso de encima. Abre la puerta a un mundo de posibilidades.";
      break;
    case 6:
      textoMostrar = "POÉTICA:\n\nDATA2MUSIC\n\nTransformar un viaje de 1 hora desde mi casa hasta la cima del cerro San Cristóbal y los datos que recolecté en ese trayecto en una partitura viva. En lugar de componer notas, dejé que las variables del GPS (las coordenadas, la altura y mi ritmo cardíaco) dictaran el sonido de forma cruda y orgánica.\n\nEl énfasis de la pieza está en usar el código como un puente: traduzco el esfuerzo físico de pedalear y las calles que recorro en un paisaje sonoro ambiental. Es una forma de perderse en el territorio y demostrar que, sin saber nada de música, puedo crear un registro sonoro honesto que nace directamente de mi experiencia cotidiana.";
      break;
    case 7:
      textoMostrar = "LLEGAMOS A LA CIMA:\n\nNo construir una pared, sino hacer un ladrillo.\n\nEsta frase me inspiró a omitir la muralla que tenía adelante (mi ignorancia musical) y volver a algo más básico que me ayudara a construir a partir de ello.\n\n- Usar un color inaceptable.\n- Perderse en territorio inútil.\n\n#Biker #GPS #Datos";
      break;
  }
}

function handleTecladoContinuo() {
  if (escenaActual === 1 && !mostrandoTexto) { if (keyIsDown(RIGHT_ARROW)) velocidadBici += 0.35; }
}
