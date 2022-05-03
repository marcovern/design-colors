const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

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
  amp: 0.3,
  frame: 0,
  animate: true,
  lineCap: "butt",
};
const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    const cx = width * 0.5; //RIPORTANO IL CENTRO DEL CANVAS
    const cy = height * 0.5;
    const w = width * 0.01;
    //const h = height * 0.1;
    let x, y;

    const ora = 12;

    x = cx; // + radius * Math.sin(angle);
    // creo una rotazione basandomi sul raggio
    y = cy; //+ radius * Math.cos(angle);

    const n = random.noise2D(x + frame * 20, y, params.freq);

    const angle = n * Math.PI * params.amp;

    let R = math.mapRange(n, -1, 1, 0, 180);
    let REND = math.mapRange(n, -1, 1, 0, 360);
    let raggioInt;

    function drawArc(raggioMod,r,r1,angleToRotate) {
      context.save();
      context.translate(x, y);
      
      context.rotate(angleToRotate);
      //context.scale(n, n);

      context.beginPath();
      context.lineWidth = 5;//random.range(1, 5);
      context.arc(0, 0, raggioMod, math.degToRad(r), math.degToRad(r1));

      //context.arc(0, 0, raggio, math.degToRad(0), math.degToRad(360));
      //context.moveTo(w * 0.5, 0)
      //context.lineTo(0, 150);
      //context.lineTo(0, 250);

      context.strokeStyle = "white";
      context.stroke();
      context.restore();
    }

    for (let index = 0; index < ora; index++) {
      
      drawArc(132.5,-REND,-R,angle);

     
      drawArc(265,R,REND,angle);
      drawArc(395.5,-REND,-R,-angle);

      drawArc(530,R,REND,-angle);


     // drawArc(raggio,-R,-REND);
     // drawArc(raggio * 1/3,-R,-REND);
      //drawArc(raggio / 2,-R1,-REND1);
      //drawArc(raggio/2 , math.degToRad(R1), math.degToRad(REND1))
      //drawArc(raggio / 3 )
      //drawArc(raggio / 4)
    }
  };
};
canvasSketch(sketch, settings);
