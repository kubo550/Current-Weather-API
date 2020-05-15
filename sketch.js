const query = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiid = '&appid=8c9bd199bd76994ee86a9c6413fa453a&units=metric';

let input, btn, failP, absDiv
let weatherData, cityName, wind, temp
let drops
let gravity
let hot, cold, col = 1
function setup() {
  createCanvas(innerWidth- 10, innerHeight-20)
  absDiv = createElement("DIV")
  input = createInput("Kraków")
  btn = createButton("Submit")
  failP= createP("")

  absDiv.addClass("absolute")
  failP.addClass("incorrect")

  btn.mousePressed(weatherQuery)

  absDiv.child(input)
  absDiv.child(btn)
  absDiv.child(failP)


  hot = color(158,228,217)
  cold = color(249, 40, 6)

  gravity = createVector(0,0.1)
  drops = []
  weatherQuery()
}

function draw() {
  background(col)
  if (random() < 0.35) {
    drops.push(new Drop())
  }
  for (let [i,d] of drops.entries()) {

    d.update()
    if (!d.alive) {
      drops.splice(i,1)
    }
    if (d.pos) {
      d.applyForce(gravity, wind)
      if (d.edges()) {
        d.break()
      }
    }
  }
  stroke(0)
  textSize(48)
  textAlign(CENTER)
  fill(120,32,75)
  push()
  text(cityName,width/2, width*0.20)
  textSize(32)
  text(`Current wind force: ${Round(wind*100,1)}`,width/2, height/2 )
  fill(120,32,75)
  text(`Temp. : ${temp} °C`,width/2, height/2 +height/4 )
  pop()
}
function weatherQuery() {
  let q = query + input.value() + apiid
  loadJSON(q, loadedData, failedData)
}
function loadedData(data) {
  drops = []
  weatherData = data
  cityName= weatherData.name
  let windF = weatherData.wind.speed
  wind = windF /100
  failP.html("")
  temp = weatherData.main.temp
  let t = map(temp, -20, 30, 0 , 1)
  col = lerpColor(hot, cold, t)
}
function failedData() {
  failP.html("Error, incorrect city name")
}

function Round(n, k){
    var factor = Math.pow(10, k);
    return Math.round(n*factor)/factor;
}
