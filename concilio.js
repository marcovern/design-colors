const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
const Tweakpane = require("tweakpane");

const load = require("load-asset");

const params = {
  element: 1,
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 50,
  freq: 0.001,
  amp: 0.2,
  frame: 0,
  animate: true,
  lineCap: "butt",
};
const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

let colorrrrr = [];

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = "white";

    const image = new Image(60, 45); // Using optional size for image
   // image.onload = drawImageActualSize; // Draw when image has loaded

    // Load an image of intrinsic size 300x227 in CSS pixels
    image.src = "concilio.png";

    //const image = load({ url: "concilio.png", crossOrigin: "Anonymous" });
    context.drawImage(image, 0, 0, width, height);

   // context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;
    const numCells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8;

    const cellw = gridw / cols;
    const cellh = gridh / rows;

    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    /*function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }*/
    function getRandomColor(brightness) {
      function randomChannel(brightness) {
        var r = 255 - brightness;
        var n = 0 | (Math.random() * r + brightness);
        var s = n.toString(16);
        return s.length == 1 ? "0" + s : s;
      }
      return (
        "#" +
        randomChannel(brightness) +
        randomChannel(brightness) +
        randomChannel(brightness)
      );
    }

    function arrayOfColor() {
      let array = [];
      for (let index = 0; index < numCells; index++) {
        let element = getRandomColor(150);
        array.push(element);
      }
      return array;
    }

    if (colorrrrr.length == 0 || colorrrrr.length != numCells) {
      colorrrrr = arrayOfColor();
    }

    for (let index = 0; index < numCells; index++) {
      let color = colorrrrr[index];

      const column = index % cols;
      const row = Math.floor(index / cols);

      const x = column * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;

      const f = params.animate ? frame : params.frame;

      const n = random.noise2D(x + f * 20, y, params.freq);
      const angle = n * Math.PI * params.amp;
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

      context.save();

      context.translate(margx, margy);

      context.translate(x, y);
      context.translate(cellw * 0.5, cellh * 0.5);

      context.rotate(angle);

      context.lineWidth = scale;
      context.lineCap = params.lineCap;

      context.beginPath();
      context.strokeStyle = "black";

      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);

      context.stroke();
      context.restore();
    }
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;
  folder = pane.addFolder({ title: "Grid " });
  folder.addInput(params, "lineCap", {
    options: { butt: "butt", round: "round", square: "square" },
  });
  folder.addInput(params, "cols", { min: 2, max: 50, step: 1 });
  folder.addInput(params, "rows", { min: 2, max: 50, step: 1 });
  folder.addInput(params, "scaleMin", { min: 1, max: 100 });
  folder.addInput(params, "scaleMax", { min: 1, max: 100 });
  //folder.addInput(params, 'element', { min: 1, max: 100, step: 1 })

  folder = pane.addFolder({ title: "Noise " });
  folder.addInput(params, "freq", { min: -0.01, max: 0.01 });

  folder.addInput(params, "amp", { min: 0.2, max: 1 });
  folder.addInput(params, "animate");
  folder.addInput(params, "frame", { min: 0, max: 999 });
};

createPane();
canvasSketch(sketch, settings);
