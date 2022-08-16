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
    image.src = 'https://cdn.glitch.global/60d94363-1073-4daf-aa5b-1d90c575d322/NachoGif.png?v=1660648241228'//Transport this to ./imgfolder eventually
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
  
  if (keys.a.pressed && player.position.x >= 0){
    player.velocity.x = -5
    player.rotation = .15//change image here
  }
  
  else if (keys.d.pressed && player.position.x+player.width <=canvas.width){
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