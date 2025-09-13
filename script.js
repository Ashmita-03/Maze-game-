let player;
let walls;
let level = 0;
let gameWon = false;

// Game buttons
let enterButton, nextLevelButton, playAgainButton;

/* SETUP */
function setup() {
  createCanvas(600, 400);

  // Start Game Button
  enterButton = createButton("Start Game");
  enterButton.position(width / 2 - 50, height / 2 + 100);
  enterButton.mousePressed(() => {
    level = 1;
    enterButton.hide();
    startLevel1();
  });

  // Next Level Button
  nextLevelButton = createButton("Next Level");
  nextLevelButton.position(-200, -200); 
  nextLevelButton.mousePressed(() => {
    level = 2;
    nextLevelButton.hide();
    startLevel2();
  });
  nextLevelButton.hide();
}

/* DRAW LOOP */
function draw() {
  background(220);

  if (level === 0) {
    // Intro Screen
    background("#90c97b");
    textAlign(CENTER);
    fill(0);
    textSize(28);
    text("Welcome to the Maze Adventure!", width / 2, height / 2 - 50);
    textSize(16);
    text("Level 1: Grassland 🌿", width / 2, height / 2 - 20);
    text("Use arrow keys to move. Reach the 'End'.", width / 2, height / 2);
    return;
  }

  // Draw themed background and decor
  if (level === 1) {
    background("#a4d68e");
    drawGrasslandDecor();
  } else if (level === 2) {
    background("#f4d78e");
    drawSandlandDecor();
  }

  // Sprite movement
  if (kb.pressing('left')) player.vel.x = -3, player.vel.y = 0;
  else if (kb.pressing('right')) player.vel.x = 3, player.vel.y = 0;
  else if (kb.pressing('up')) player.vel.y = -3, player.vel.x = 0;
  else if (kb.pressing('down')) player.vel.y = 3, player.vel.x = 0;
  else player.vel.x = 0, player.vel.y = 0;

  // Labels on maze
  fill(0);
  textSize(18);
  text('Start', 520, 45);
  text('End', 60, height - 20);

  // Stay in canvas
  if (player.y < 20) player.y = 20;

  // Check win
  if (player.x < 70 && player.y > height - 60 && !gameWon) {
    player.vel.x = 0;
    player.vel.y = 0;
    gameWon = true;

    if (level === 1) {
      nextLevelButton.show();
      nextLevelButton.position(width / 2 - 50, height / 2 - 50);
    } else {
      showPlayAgainButton();
    }
  }

  // Win text
  if (gameWon) {
    fill(0);
    textSize(24);
    text('You Win!', width / 2 - 40, height / 2 - 100);
  }
}

/* Level set up */
function startLevel1() {
  resetGame();
  player = new Sprite(550, 50, 40, 40);
  setupMaze1();
}

function startLevel2() {
  resetGame();
  player = new Sprite(550, 50, 40, 40);
  setupMaze2();
}

/* Resets */
function resetGame() {
  gameWon = false;

  // Remove walls
  if (walls) walls.removeAll();
  walls = new Group();
  walls.collider = "s";
  walls.color = color(0);

  // Hide buttons 
  if (nextLevelButton) nextLevelButton.hide();
  if (playAgainButton) {
    playAgainButton.remove();
    playAgainButton = null;
  }
}

/* Mazes */
function setupMaze1() {
  new walls.Sprite(300, 10, 500, 5);
  new walls.Sprite(10, height / 2, 5, height - 15);
  new walls.Sprite(150, 80, 5, 100);
  new walls.Sprite(80, 300, 120, 5);
  new walls.Sprite(400, 200, 110, 5);
}

function setupMaze2() {
  new walls.Sprite(300, 10, 500, 5);
  new walls.Sprite(10, height / 2, 5, height - 15);
  new walls.Sprite(150, 80, 5, 100);
  new walls.Sprite(width / 2 + 35, 390, 325, 5);
  new walls.Sprite(80, 300, 120, 5);
  new walls.Sprite(400, 150, 110, 5);
  new walls.Sprite(400, 250, 110, 5);
  new walls.Sprite(355, 200, 5, 110);
  new walls.Sprite(225, 332, 5, 109);
  new walls.Sprite(250, 200, 180, 5);
  new walls.Sprite(595, 200, 5, 400);
}

/* Theme */
function drawGrasslandDecor() {
  fill("#86592d");
  for (let i = 0; i < 4; i++) {
    rect(100 + i * 100, 350, 10, 30);
    fill("#267e3e");
    ellipse(100 + i * 100, 340, 40, 40);
    fill("#86592d");
  }
}

function drawSandlandDecor() {
  fill("#2a7c3d");
  for (let i = 0; i < 3; i++) {
    let x = 120 + i * 150;
    rect(x, 340, 10, 40);
    rect(x - 5, 350, 5, 15);
    rect(x + 10, 350, 5, 15);
  }
}

/* Play again */
function showPlayAgainButton() {
  if (!playAgainButton) {
    playAgainButton = createButton('Play Again');
    playAgainButton.position(width / 2 - 40, height / 2 - 50);
    playAgainButton.mousePressed(() => {
      level = 0;
      gameWon = false;
      if (walls) walls.removeAll();
      if (player) {
        player.visible = false;
        player.x = -500;
        player.y = -500;
      }
      playAgainButton.remove();
      playAgainButton = null;
      enterButton.show();
    });
  }
}
