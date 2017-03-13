var bg;
var ground;
var ground_spritesheet;
var ground_still;
var player;
var player_spritesheet;
var player_walk;
var GRAVITY = 0.2;
var JUMP = -6;
var coins;
var seed_spritesheet;
var seed_still;
var ghost1;
var ghost1_spritesheet;
var ghost1_move;
var ghost2;
var ghost2_spritesheet;
var ghost2_move;
var score;
var lives;

function preload() {
    //load ground
    ground_spritesheet = loadSpriteSheet("assets/ground-1.png", 1100, 64, 1);
    ground_still = loadAnimation(ground_spritesheet);
    //load player
    player_spritesheet = loadSpriteSheet("assets/persephoneright.png", 64, 64, 2);
    player_walk = loadAnimation(player_spritesheet);
    player_walk.frameDelay = 25;
    //load ghost1
    ghost1_spritesheet = loadSpriteSheet("assets/ghost-1.png", 64, 64, 1);
    ghost1_move = loadAnimation(ghost1_spritesheet);
    //load ghost2
    ghost2_spritesheet = loadSpriteSheet("assets/ghost-1.png", 64, 64, 1);
    ghost2_move = loadAnimation(ghost2_spritesheet);
    //load seeds
    seed_spritesheet = loadSpriteSheet("assets/sprites/seed.png", 32, 32, 1);
    seed_still = loadAnimation(seed_spritesheet);
    seed_still.frameDelay = 20;
}

function setup() {
    //background
    bg = loadImage("assets/background-1.png");
    createCanvas(1100, 220);
    //ground 
    ground = createSprite(width / 2, height, 1100, 64);
    ground.addAnimation("still", ground_still);
    //player
    player = createSprite(width / 2, height - 64, 64, 64);
    player.addAnimation("walk", player_walk);
    //ghost1
    ghost1 = createSprite(random(0, width), height - 64);
    ghost1.addAnimation("move", ghost1_move);
    //ghost2
    ghost2 = createSprite(random(0, width), height - 64);
    ghost2.addAnimation("move", ghost2_move);
    //seeds
    coins = new Group();
    for (var i = 0; i < 15; i++) {
        var seed = createSprite(random(0, width), random(0, height - 64));
        seed.addAnimation("still", seed_still);
        coins.add(seed);
    }
    score = 0;
    lives = 5;
}

function draw() {
    background(bg);
    //move ghost1 torwards player
    if (player.position.x < ghost1.position.x - 20) {
        ghost1.changeAnimation("move");
        ghost1.mirrorX(1);
        ghost1.velocity.x = -0.5;
    }
    else if (player.position.x > ghost1.position.x + 20) {
        ghost1.changeAnimation("move");
        ghost1.mirrorX(-1);
        ghost1.velocity.x = 0.5;
    }
    else {
        ghost1.changeAnimation("move");
        ghost1.velocity.x = 0;
    }
    //move ghost2 torwards player
    if (player.position.x < ghost2.position.x - 20) {
        ghost2.changeAnimation("move");
        ghost2.mirrorX(1);
        ghost2.velocity.x = -0.5;
    }
    else if (player.position.x > ghost2.position.x + 20) {
        ghost2.changeAnimation("move");
        ghost2.mirrorX(-1);
        ghost2.velocity.x = 0.5;
    }
    else {
        ghost2.changeAnimation("move");
        ghost2.velocity.x = 0;
    }
    //player gravity
    player.velocity.y += GRAVITY;
    if (player.collide(ground)) {
        player.velocity.y = 0;
    }
    //touching seeds
    player.overlap(coins, collect);
    drawSprites();
    //score
    fill(255);
    noStroke();
    textSize(15);
    textAlign(RIGHT, TOP);
    if (coins.length > 0) {
        text(score, width - 20, height - 200);
    }
    else {
        //win
        ghost1.changeAnimation("move");
        ghost1.velocity.x = 0;
        ghost2.changeAnimation("move");
        ghost2.velocity.x = 0;
        background(0, 0, 0, 100);
        text("YOU WIN!", width / 2, height / 2);
    }
    //lives amount
    if (ghost1.overlap(player)) {
        lives = lives - 1;
    }
    if (ghost2.overlap(player)) {
        lives = lives - 1;
    }
    textAlign(LEFT, TOP);
    textSize(15);
    //lives
    if (lives == 5) {
        noStroke();
        color(255);
        text("❤ ❤ ❤ ❤ ❤", 120, 20);
    }
    if (lives == 4) {
        noStroke();
        color(255);
        text("❤ ❤ ❤ ❤", 120, 20);
    }
    if (lives == 3) {
        noStroke();
        color(255);
        text("❤ ❤ ❤", 120, 20);
    }
    if (lives == 2) {
        noStroke();
        color(255);
        text("❤ ❤", 120, 20);
    }
    if (lives == 1) {
        noStroke();
        color(255);
        text("❤", 120, 20);
    }
    //dead
    if (lives = 0) {
        ghost1.changeAnimation("move");
        ghost1.velocity.x = 0;
        ghost2.changeAnimation("move");
        ghost2.velocity.x = 0;
        stroke(0);
        fill(255);
        background(0, 0, 0, 100);
        text("GAME OVER", width / 2, height / 2);
    }
}

function keyPressed() {
    //move left
    if (keyCode == LEFT_ARROW) {
        player.changeAnimation("walk");
        //flip
        player.mirrorX(-1);
        //move left
        player.velocity.x = -2;
    }
    //move right
    else if (keyCode == RIGHT_ARROW) {
        player.changeAnimation("walk");
        player.mirrorX(1);
        //move right
        player.velocity.x = 2;
    }
    //jump
    if (keyCode == UP_ARROW) {
        player.velocity.y = JUMP;
    }
}

function keyReleased() {
   // player.changeAnimation("walk");
    player.velocity.x = 0;
}

function collect(collector, collected) {
    collected.remove();
    score += 1;
}
