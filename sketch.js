const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');


const settings = {
  dimensions: [1080, 1080],
  animate: true,
};


let raggio = 300;

const params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 50,
  freq: 0.001,
  amp: 0.2,
  frame: 0,
  animate: true,
  lineCap: 'butt'

}
const sketch = () => {
  return ({ context, width, height, frame }) => {



    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    const cx = width * 0.5;  //RIPORTANO IL CENTRO DEL CANVAS 
    const cy = height * 0.5;
    const w = width * 0.01;
    //const h = height * 0.1;
    let x, y;






    const ora = 10;

    x = cx // + radius * Math.sin(angle);
    // creo una rotazione basandomi sul raggio 
    y = cy //+ radius * Math.cos(angle);

    const n = random.noise2D(x + frame * 20, y, params.freq);
    const angle = n * Math.PI * params.amp;


    const R = math.mapRange(n, -1, 1, 0, 180);
    const REND = math.mapRange(n, -1, 1, 0, 360);
    let raggioInt;
    for (let index = 0; index < ora; index++) {



      //PRIMA FASE
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      //context.scale(n, n);



      context.beginPath();
      context.lineWidth = 10;//random.range(1, 5);
      context.arc(0, 0, raggio, math.degToRad(R), math.degToRad(REND));
      //context.arc(0, 0, raggio, math.degToRad(0), math.degToRad(360));
      //context.moveTo(w * 0.5, 0)
      //context.lineTo(0, 150);
      //context.lineTo(0, 250);


      context.strokeStyle = "white";
      context.stroke();
      context.restore();




    }








  }

}
canvasSketch(sketch, settings);
