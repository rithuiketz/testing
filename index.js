const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight



class Player {
  constructor(){
    this.position = {
      x: 200,
      y: 200
    }
    
    this.velocity = {
      x: 0,
      y: 0 
    }
    
    const image = new Image()
    image.src = 'https://cdn.glitch.global/60d94363-1073-4daf-aa5b-1d90c575d322/NachoGif.png?v=1660648241228'//Transport this to ./imgfolder eventually
    
    
    this.image = image
    this.width = 100
    this.height = 100

  }
  draw(){
    //c.fillStyle = "red"
    //c.fillRect(this.position.x, this.position.y, this.width, this.height)
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

const player = new Player()
player.draw()

function animate(){
  requestAnimationFrame(animate)
  player.draw()
}

animate()