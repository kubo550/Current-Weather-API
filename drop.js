class Drop {
  constructor() {
    this.pos = createVector(random(-width/2,width), 0)
    this.vel = createVector()
    this.acc = createVector()
    this.particles = []
    this.alive = true
    this.dropped = false
  }
  draw(){
    noStroke()
    fill(120,32,75)
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.vel.heading())
    ellipse(0,0, 25, 5)
    pop()
  }
  break(){


      for (var i = 0; i < 10; i++) {
          this.particles.push(new Particle(this.pos))
      }
      this.dropped = true
      this.pos = null

  }
  edges(){
    return (this.pos.y > height)
  }
  applyForce(force, force2){
    this.acc.add(force)
    if (force2) {
      this.acc.add(force2)
    }
  }

  update(){
    for (let [i,p] of this.particles.entries()) {
      p.update()
      p.applyForce(gravity)
      if (p.isDead()) {
        this.particles.splice(i,1)
      }
    }
    if (this.pos) {
      this.draw()
      // this.break()
      this.pos.add(this.vel)
      this.vel.add(this.acc)
      this.vel.mult(0.98)
      this.acc.mult(0)
    }
    if (this.particles.length < 1 && this.dropped ) {
      this.alive = false
    }
  }
}
