const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight



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

      const image = new Image()
      image.src = 'https://cdn.glitch.global/60d94363-1073-4daf-aa5b-1d90c575d322/Nahco_Closecut.png?v=1660739959106'//Transport this to ./imgfolder eventually
      image.onload = () => {
        const scale= 0.4
        this.image = image
        this.width = image.width *scale
        this.height = image.height * scale
        this.position = {
          x: position.x,
          y: position.y
      }
    }
  }
  
  //draw(){
    
    //c.drawImage(
    //  this.image, 
    //  this.position.x, 
    //  this.position.y, 
     // this.width, 
    //  this.height) 
 // }
  
  update(){
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
   
}


const projectiles = [new Projectile({position: {x:300, y:300}, velocity: {x:0, y:2}})]

const player = new Player()
const keys = {
  a: {pressed: false},
  d: {pressed: false},
  space: {pressed: false}
}




function animate(){
  requestAnimationFrame(animate)
  c.fillStyle = "black"
  c.fillRect(0,0, canvas.width, canvas.height)//Canvas background
  player.update()
  
  projectiles.forEach(Projectile => {
    Projectile.update()
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

  
 