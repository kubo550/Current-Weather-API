class Particle {
  constructor(pos) {
    this.pos = createVector(pos.x, pos.y)
    this.vel = p5.Vector.random2D()
    this.vel.mult(random(1,4))
    this.acc = createVector()
    this.r = 8
    this.ttl = 255
    this.randomR = random(this.r - 4, this.r + 4)
  }
  draw(){
    push()
    noStroke()
    fill(120,32,75, this.ttl)
    ellipse(this.pos.x, this.pos.y, this.randomR)
    pop()
  }
  applyForce(force){
    this.acc.add(force)
  }
  isDead(){
    return(this.ttl < 0)
  }
  edges(){
    if (this.pos.y > height+1) {
      this.pos.y = height+1
    }
  }
  update(){
    this.draw()
    this.edges()
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.acc.mult(0)
    this.ttl -= 5
  }
}
