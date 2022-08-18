const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

var spawnTimer = 0.0

class Player {
  constructor(){
  
    this.velocity = {
      x: 0,
      y: 0 
    }
    
    const image = new Image()
    image.src = 'https://cdn.glitch.global/60d94363-1073-4daf-aa5b-1d90c575d322/Nahco_Closecut.png?v=1660739959106'//Transport this to ./imgfolder eventually
    image.onload = () => {
      const scale= 0.4
      this.image = image
      this.width = image.width *scale
      this.height = image.height * scale
      this.position = {
        x: canvas.width/2 - this.width/2,
        y: canvas.height - this.height - 50
      }
    }
    

  }
  draw(){
    //c.fillStyle = "red"
    //c.fillRect(this.position.x, this.position.y, this.width, this.height)
 
    c.drawImage(
      this.image, 
      this.position.x, 
      this.position.y, 
      this.width, 
      this.height)
    
  }
  
  
  
  update(){
    if (this.image){
      this.draw()
      this.position.x += this.velocity.x
    }
  }
}

class Projectile{
  constructor({position, velocity}){
      this.position = position
      this.velocity = velocity

      const splat = new Image()
      splat.src = 'https://cdn.glitch.global/60d94363-1073-4daf-aa5b-1d90c575d322/splat.png?v=1660812897838'//Transport this to ./imgfolder eventually
      splat.onload = () => {
        const scale= 0.2
        this.image = splat
        this.width = splat.width *scale
        this.height = splat.height * scale
        this.position = {
          x: position.x,
          y: position.y
      }
    }
  }
  
  draw(){
    
    c.drawImage(
      this.image, 
      this.position.x, 
      this.position.y, 
      this.width, 
      this.height
    ) 
  }
  
  update(){
     if (this.image){
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
     }
      //Detect Collision here... Maybe

      if (this.position.y < canvas.height/2){console.log ("halfway")}
  }
   
}


const projectiles = []


const player = new Player()
const keys = {
  a: {pressed: false},
  d: {pressed: false},
  space: {pressed: false}
}


function spawnProjectile(){
  //const projectiles.,push = [new Projectile({position: {x:canvas.width/10, y:canvas.height/10}, velocity: {x:0, y:2}})]
  projectiles.push (new Projectile({position: {x:Math.floor(Math.random() *(canvas.width*0.8 - canvas.width*0.2) + canvas.width*0.2 ), y:0}, velocity: {x:0, y:2}}))
}




function animate(){
  requestAnimationFrame(animate)
  c.fillStyle = "black"
  c.fillRect(0,0, canvas.width, canvas.height)//Canvas background
  player.update()
  
  projectiles.forEach(Projectile => {
    Projectile.update()
    //Detectcollision
    
  })
  
  if (keys.a.pressed && player.position.x >= canvas.width*0.14){
    player.velocity.x = -5
    player.rotation = .15//change image here
  }
  
  else if (keys.d.pressed && player.position.x+player.width <=canvas.width*0.86){
    player.velocity.x = 5
    player.rotation = .15
  }
  
  else{
    player.velocity.x = 0
  }
}

setInterval(spawnProjectile, 3000)

animate()




addEventListener('keydown', ({key}) => {
  switch(key){
    case "a":
      console.log("left")
      keys.a.pressed = true
      break
    case "d":
      console.log("right")
      keys.d.pressed = true
      break
    case "space":
      console.log("space")
      break
  }
})
addEventListener('keyup', ({key}) => {
  switch(key){
    case "a":
      console.log("left")
      keys.a.pressed = false
      break
    case "d":
      console.log("right")
      keys.d.pressed = false
      break
    case "space":
      console.log("space")
      break
  }
})



window.onload = function () {
  document.getElementById("left").addEventListener("click", function(){
    keys.a.pressed = true 
    keys.d.pressed = false})
  document.getElementById("right").addEventListener("click", function(){
    keys.a.pressed = false
    keys.d.pressed = true})//This is too hacky... How can you stop it when neither pressed?
  
}

  
 