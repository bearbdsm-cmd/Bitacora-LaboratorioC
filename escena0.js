// =====================================================================
// Módulo del Opening - escena0.js
// Pantalla de inicio estilo arcade retro animada
// =====================================================================

function dibujarEscena0Logo() {
  // Animación cíclica de brillo sutil en el fondo fucsia oscuro
  let brillo = map(sin(frameCount * 0.05), -1, 1, 20, 40);
  background(brillo, 10, brillo * 0.5);

  // Marco perimetral NetArt
  stroke(255, 255, 0);
  strokeWeight(3);
  noFill();
  rect(40, 40, width - 80, height - 80);
  
  stroke(0, 255, 255);
  line(40, height / 2 + 60, width - 40, height / 2 + 60);

  textFont("Courier New");
  textAlign(CENTER, CENTER);
  
  noStroke();
  fill(0, 255, 255);
  textSize(36);
  text("BITÁCORA", width / 2, height / 2 - 80);
  
  fill(255, 0, 128);
  textSize(42);
  text("Laboratorio C", width / 2, height / 2 - 35);
  
  fill(255);
  textSize(18);
  text("Osvaldo Osorio", width / 2, height / 2 + 20);
  
  fill(150);
  textSize(14);
  text("MAM 2026", width / 2, height / 2 + 45);

  // Texto parpadeante estilo "Insert Coin"
  if (frameCount % 50 < 30) {
    fill(255, 255, 0);
    textSize(16);
    text("PRESS [ ENTER ] TO START", width / 2, height / 2 + 120);
  }
}