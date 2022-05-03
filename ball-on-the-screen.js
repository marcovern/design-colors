const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');


const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const params = {
  numberOfAgents: 50
}

const animate = () => {
  requestAnimationFrame(animate);
}

const sketch = ({ context, width, height, frame }) => {

  const agents = [];

  for (let index = 0; index < params.numberOfAgents; index++) {
    const x = random.range(0, width)
    const y = random.range(0, height)
    agents.push(new Agent(x, y));

  }

  return ({ context, width, height }) => {




    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);


    //DETERMINA LE LINEE DI COLLEGAMENTO 
    for (let index = 0; index < agents.length; index++) {
      const agent = agents[index];

      for (let indexJ = index + 1; indexJ < agents.length; indexJ++) {
        const other = agents[indexJ];

        const dist = agent.pos.getDistance(other.pos);

        if (dist > 200) continue;

        context.lineWidth = math.mapRange(dist, 0, 200, 12, 1);

        context.beginPath();
        // if ((agent.pos.x.toFixed() == other.pos.x.toFixed() && agent.pos.y.toFixed() == other.pos.y.toFixed())) {
        //}
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.strokeStyle = 'white';
        context.stroke();
      }
    }

    //DETERMINA IL MOVIMENTO 
    for (let index = 0; index < agents.length; index++) {
      /*let check;
      for (let indexJ = index + 1; indexJ < agents.length; indexJ++) {
        check = agents[index].bounceAgainstOther(agents[indexJ].pos.x, agents[indexJ].pos.y, context) && agents[indexJ].bounceAgainstOther(agents[index].pos.x, agents[index].pos.y, context);
        if (check) break;
      }
      if (check) {
        continue;
      }*/
      agents[index].update();
      agents[index].bounce(width, height);
      agents[index].draw(context);
      //let lastIndex = item == agents.length ? agents.length : item + 1;
      //agents[item].bounceEachOther(agents[item], agents[lastIndex])
    }

  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;
  folder = pane.addFolder({ title: 'Grid ' });
  folder.addInput(params, 'numberOfAgents', { min: 10, max: 999, step: 1 });






}

createPane()
canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 12
  }

  getDistance(v) {

    const dx = this.x - v.x;
    const dy = this.y - v.y;

    return Math.sqrt(dx * dx + dy * dy);

  }




}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
  }

  draw(context) {

    //context.fillStyle = "red";
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.beginPath();
    context.arc(0, 0, this.pos.radius, 0, Math.PI * 2);
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = `white`;

    context.stroke();

    context.restore();
  }

  update() {

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

  }

  bounce(width, height) {

    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;


  }

  bounceAgainstOther(otherX, otherY, context) {

    let diffX = Math.floor(this.pos.x) - Math.floor(otherX);
    let diffY = Math.floor(this.pos.y) - Math.floor(otherY);
    const rangeToBounce = 18;

    if ((diffX >= -rangeToBounce && diffX <= rangeToBounce) && (diffY >= -rangeToBounce && diffY <= rangeToBounce)) {
      this.vel.x *= -1;
      this.vel.y *= -1;
      this.update();
      this.draw(context);
      return true;
    } else {
      return false;
    }



    /* if (Math.floor(this.pos.x) == Math.floor(otherX) && Math.floor(this.pos.y) == Math.floor(otherY)) {
      
     }*/


  }
}
