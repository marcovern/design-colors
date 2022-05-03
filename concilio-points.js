const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const { pathsToPolylines } = require('canvas-sketch-util/penplot');


const settings = {
  dimensions: [1080, 1080],
  // animate: true
};

let manager;

let text = 'M';
let fontSize = 1200;
let fontFamily = 'serif';
let image;


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

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
  const cell = 10;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height, frame }) => {
    //typeContext.fillStyle = 'black';
    //typeContext.fillRect(0, 0, cols, rows);

    // fontSize = cols * 1.2;
    context.fillStyle = "black";

    //typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.fontFamily = "Impact,Charcoal,sans-serif";
    typeContext.textBaseline = 'top';

    const metrics = typeContext.measureText(image);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (cols - mw) * 0.5 - mx;
    const ty = (rows - mh) * 0.5 - my;

    typeContext.save();
    //typeContext.translate(tx, ty);

    typeContext.beginPath();
    //typeContext.rect(mx, my, mw, mh);
    //typeContext.stroke();
    typeContext.drawImage(image, 0, 0, cols, rows);

    //typeContext.fillText(text, 0, 0);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;


    //context.fillStyle = 'black';
    // context.fillRect(0, 0, width, height);

    //context.textBaseline = 'middle';
    //context.textAlign = 'center';

    //context.drawImage(typeCanvas, 0, 0);



    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      const glyph = getGlyph(r);


      context.fillStyle = `rgb(${r},${g},${b})` //'black';

      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);
      getDimension(context, r, cell)

      // context.fillRect(0, 0, cell, cell);

      context.fillText(glyph, 0, 0);




      context.restore();

    }
  };
};


const onKeyUp = (e) => {
  text = e.key.toUpperCase();
  manager.render();
}

const getDimension = (context, v, cell) => {
  let randomV;

  switch (v) {
    case v < 50:
      randomV = math.mapRange(Math.random(), -1, 1, 1, 3);
      context.font = `${cell * randomV}px ${fontFamily}`;
      break;
    case v < 100:
      randomV = math.mapRange(Math.random(), -1, 1, 1, 7);
      context.font = `${cell * randomV}px ${fontFamily}`;
      break;
    case v < 150:
      randomV = math.mapRange(Math.random(), -1, 1, 1, 10);
      context.font = `${cell * randomV}px ${fontFamily}`;
      break;

    default:
      context.font = `${cell * 2}px ${fontFamily}`;
      break;
  }



}

const getGlyph = (v) => {
  if (v < 50) return '.';
  if (v < 75) return '.';
  if (v < 100) return '.';
  if (v < 125) return '.';
  if (v < 150) return '.';
  if (v < 175) return '.';
  if (v < 200) return '.';

  const glyphs = '.'.split('');

  return random.pick(glyphs);
};


document.addEventListener('keyup', onKeyUp);

const url = "concilio.png"



const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
    console.log(img)
  });



}


const start = async () => {
  image = await loadImage(url);
  manager = await canvasSketch(sketch, settings);
}

start();


/*
const url = 'https://picsum.photos/200';

const loadMeSomeImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
};

const start = async () => {
  const img = await loadMeSomeImage(url);
  console.log('image width', img.width);
  console.log('this line');
};

// const start = () => {
// 	loadMeSomeImage(url).then(img => {
// 		console.log('image width', img.width);
// 	});
// 	console.log('this line');
// };


start();
*/

/*const getValue = (url,token) =>{
  return new Promise((resolve, reject) => {

     resolve();

  });

}



export const getDataPDFForm = async (id, token, state) => {

  let url = Endpoint.API_URL + Endpoint.API_ACQUISITION + id;

  await axios

    .get(url, {

      headers: {

        Authorization: "Bearer " + token,

      },

    })

    .then((response) => {

      console.log("RESPONSE SERVIZIO", response);

      return response.data;

    })

    .catch((error) => {

      console.log("getDataPDFFormr error: ", error);

      return null;

    });*/
