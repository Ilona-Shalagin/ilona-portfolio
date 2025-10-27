const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})
document.querySelectorAll(".nav-link").forEach(n => n.
  addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }))




gsap.to(".textAbout",{
    text:"I am Full Stack Developer",
    duration:3,
    delay:10,
    ease:"power1.in",
    yoyo:true,
    delay:2,
})
gsap.from(".nav-item",{y:-200,stagger:1})
gsap.from(".myPhoto",{duration:5,delay:2.6,opacity:0})
gsap.from("h1",{duration:2,delay:2.4,opacity:0,})
gsap.from("h2",{duration:2,delay:2.2,opacity:0,})
gsap.from("p",{duration:2,delay:2,opacity:0,})
gsap.from("#canvas",{duration:2,delay:4.5,opacity:0})


console.clear();


class Particle {
  
  constructor(centerX, centerY, radius, sides, path) {
    
    this.x = centerX;
    this.y = centerY - radius;
    this.path = path;
    this.offset = randomInt(5, 12);
    this.scale = 1;
    this.rotation = 0;
    this.alpha = random(0.5, 1);
    this.color = ["#05fdd8","#ccd6f6","#74cac3","#b8ddf5","#FFFFFF"];
    this.fillStyle = this.color[Math.floor(5*Math.random())];
    
    const duration1 = random(1, 2);
    console.log(duration1)
    const duration2 = random(1, 5);
    const minScale = random(0.2, 0.4);
    
    const angle = Math.PI * 2 / sides;
    
     this.pathAnimation0 = gsap.timeline();
    
     this.pathAnimation = gsap.timeline(
       {repeat:-1}
     )
      
    for (let i = 1; i <= sides; i++) {
      
      let x = centerX + radius * Math.sin(i * angle);
      let y = centerY - radius * Math.cos(i * angle);
    
       this.pathAnimation0.from(this, 1, {repeat:0,x:random(Math.PI*x,-1000), y:random(Math.PI*y,1000), ease: Linear.easeNone}); 
   
      this.pathAnimation0.to(this,duration1, {x, y, ease: Linear.easeNone});  
    
      this.pathAnimation.to(this,duration2,{x, y, ease: Linear.easeNone});  
    
      
    }
    
   
    
    this.rotationAnimation = gsap.timeline({ repeat: -1 })
      .to(this, duration2, { rotation: Math.PI * 2, ease: Linear.easeNone })   
    
    
    this.scaleAnimation = gsap.timeline({ repeat: -1, yoyo: true })
      .to(this, duration2 / 2, { scale: minScale, ease: Sine.easeInOut })
    
    this.pathAnimation0.time(random(this.pathAnimation.duration()));
    
   this.pathAnimation.time(random(this.pathAnimation.duration()));
    this.rotationAnimation.time(random(this.rotationAnimation.duration()));
    this.scaleAnimation.time(this.rotationAnimation.time());
  }
  
  draw(context) {
            
    const x = this.x + Math.cos(this.rotation) * this.offset;
    const y = this.y + Math.sin(this.rotation) * this.offset;  
    
     context.save();
     context.translate(x, y);
     context.scale(this.scale, this.scale);
     context.fillStyle = this.fillStyle;
     context.globalAlpha = this.alpha;
     context.fill(this.path);
     context.restore();
  }
}


const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

const numParticles = 160;
const particleRadius = 7;
const viewRatio = 0.7;
const sides = 4;

const path = createPath(sides, particleRadius);

let vw = canvas.width  = window.innerWidth;
let vh = canvas.height = window.innerHeight;
let cx = vw / 3;
let cy = vh / 3;

const radius = Math.min(cx, cy) * viewRatio;

const particles = [];

for (let i = 0; i < numParticles; i++) {
  particles.push(new Particle(cx, cy, radius, sides, path));
}

gsap.ticker.add( render);

function render() {
  
  context.clearRect(0, 0, vw, vh);
  
  for (let particle of particles) {
    particle.draw(context);
  }
}

function createPath(sides, radius) { 
  
  const path = new Path2D();
  const angle = Math.PI * 2 / sides;

  for (let i = 0; i < sides; i++) {

    const y =  radius * Math.sin(i * angle);
    
    const x = -radius * Math.cos(i * angle);

    if (i === 0) {
      path.moveTo(x, y);
     }
      else {
      path.lineTo(x, y);
    }
  }
  
  return path;
}

function random(min, max) {
  if (max == null) { max = min; min = 0; }
  if (min > max) { var tmp = min; min = max; max = tmp; }
  return min + (max - min) * Math.random();
}

function randomInt(min, max) {
  if (max == null) { max = min; min = 0; }
  if (min > max) { var tmp = min; min = max; max = tmp; }
  return Math.floor(min + (max - min + 1) * Math.random());
}

AOS.init({
    duration: 1200,
  })