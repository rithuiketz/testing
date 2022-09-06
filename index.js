const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

var score = 0;
var highScore = 0;
var missed = 0;
var timer = 0.0;
var interval = 3000;


//const startGameButton = document.getElementById("startGameBtn")

class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0,
    };

    const image = new Image();
    image.src =
      "https://cdn.glitch.global/60d94363-1073-4daf-aa5b-1d90c575d322/Nahco_Closecut.png?v=1660739959106"; //Transport this to ./imgfolder eventually
    image.onload = () => {
      const scale = 0.4;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 50,
      };
    };
  }
  draw() {

    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    if (this.image) {
      this.draw();
      this.position.x += this.velocity.x;
    }
  }
}

class Projectile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;

    const splat = new Image();
    splat.src =
      "https://cdn.glitch.global/60d94363-1073-4daf-aa5b-1d90c575d322/splat.png?v=1660812897838"; //Transport this to ./imgfolder eventually
    splat.onload = () => {
      const scale = 0.2;
      this.image = splat;
      this.width = splat.width * scale;
      this.height = splat.height * scale;
      this.position = {
        x: position.x,
        y: position.y,
      };
    };
  }

  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    if (this.image) {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }
}

const projectiles = [];


const player = new Player();
const keys = {
  a: { pressed: false },
  d: { pressed: false },
  space: { pressed: false },
};


////Functions////

function spawnProjectile() {
  //const projectiles.,push = [new Projectile({position: {x:canvas.width/10, y:canvas.height/10}, velocity: {x:0, y:2}})]
  
  projectiles.push(
    new Projectile({
      position: {
        x: Math.floor(
          Math.random() * (canvas.width * 0.8 - canvas.width * 0.2) +
            canvas.width * 0.2
        ),
        y: 0,
      },
      velocity: { x: 0, y: 2+(score/5) },
    })
  );
}

function detectCollision(Projectile, Player, index) {
  //increase score
  if (
    Player.position.x - Player.width / 2 < Projectile.position.x &&
    Projectile.position.x < Player.position.x + Player.width / 2 &&
    Projectile.position.y > Player.position.y
  ) {
    var audio = new Audio("https://cdn.glitch.global/60d94363-1073-4daf-aa5b-1d90c575d322/zapsplat_multimedia_game_sound_collect_coin_single_003_40823.mp3?v=1661163672804");
    audio.loop = false;
    audio.play();
    projectiles.splice(projectiles[index], 1);
    score = score + 1;
    if (score > highScore){
      highScore = score;
    }
    console.log("score = " + score);
    document.getElementById("score").innerHTML = "SCORE " + score;
    document.getElementById("highScore").innerHTML = highScore;
  }
  //loss point
  if (Projectile.position.y > canvas.height) {
    projectiles.splice(projectiles[index], 1);
    missed = missed + 1;
    console.log("Missed = " + missed);
      if (missed > 2){
        document.getElementById("startGame").style.visibility = "visible";
      }
      else{}
  } else {
  }
}

function animate() {
  
  if (missed > 2){
    
    console.log("Lost, stop animation")
    return;
    }
  requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height); //Canvas background
  player.update();

  projectiles.forEach((Projectile, index) => {
    Projectile.update();

    //Detectcollision
    detectCollision(Projectile, player, index);
  });

  if (keys.a.pressed && player.position.x >= canvas.width * 0.14) {
    player.velocity.x = -5;
    player.rotation = 0.15; //change image here
  } else if (
    keys.d.pressed &&
    player.position.x + player.width <= canvas.width * 0.86
  ) {
    player.velocity.x = 5;
    player.rotation = 0.15;
  } else {
    player.velocity.x = 0;
  }
  
}

//Start Game



//setInterval(spawnProjectile, 3000)
//animate();


//// Event Listeners for UI////

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "a":
      //console.log("left")
      keys.a.pressed = true;
      break;
    case "d":
      //console.log("right")
      keys.d.pressed = true;
      break;
  }
});
addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "a":
      //console.log("left")
      keys.a.pressed = false;
      break;
    case "d":
      //console.log("right")
      keys.d.pressed = false;
      break;
  }
});

////UI for Windows
window.onload = function () {
    document.getElementById("startGameBtn").addEventListener("click", () => {
    setInterval(spawnProjectile, 3000)
    document.getElementById("startGame").style.visibility = "hidden";
    score = 0;
    missed = 0;
    animate();
    
  })
  document.getElementById("left").addEventListener("mousedown", function () {
    keys.a.pressed = true;
    keys.d.pressed = false;
  });
  document.getElementById("right").addEventListener("mousedown", function () {
    keys.a.pressed = false;
    keys.d.pressed = true;
  }); //This is too hacky... How can you stop it when neither pressed?
  document.getElementById("left").addEventListener("mouseup", function () {
    keys.a.pressed = false;
    keys.d.pressed = false;
  });
  document.getElementById("right").addEventListener("mouseup", function () {
    keys.a.pressed = false;
    keys.d.pressed = false;
  });
};

////UI for Phone
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

  window.onload = function () {
    document.getElementById("startGameBtn").addEventListener("touchstart", () => {
      document.getElementById("GameBody").requestFullscreen();
      document.getElementById("startGame").style.visibility = "hidden";
      setInterval(spawnProjectile, 3000)
      score = 0;
      missed = 0;
      projectiles.forEach((Projectile, index) => {
        Projectile.delete();
      })
      animate();
    })
    document.getElementById("left").addEventListener('touchstart', function () {
      keys.a.pressed = true;
      keys.d.pressed = false;
    });
    document.getElementById("right").addEventListener('touchstart', function () {
      keys.a.pressed = false;
      keys.d.pressed = true;
    }); //This is too hacky... How can you stop it when neither pressed?
    document.getElementById("left").addEventListener('touchend', function () {
      keys.a.pressed = false;
      keys.d.pressed = false;
    });
    document.getElementById("right").addEventListener('touchend', function () {
      keys.a.pressed = false;
      keys.d.pressed = false;
    });
  };
  
  screen.orientation.lock("portrait")
}


