import { app } from "./PixiApp.js";
export const tickerMouse = PIXI.Ticker.shared;

// Get the texture for rope.
export const trailTexture = PIXI.Texture.from("./Assets/images/trail.png");
const historyX = [];
const historyY = [];
// historySize determines how long the trail will be.
const historySize = 10;
// ropeSize determines how smooth the trail will be.
const ropeSize = 50;
const points = [];

// Create history array.
for (let i = 0; i < historySize; i++) {
  historyX.push(0);
  historyY.push(0);
}
// Create rope points.
for (let i = 0; i < ropeSize; i++) {
  points.push(new PIXI.Point(0, 0));
}


// Create the rope
export const rope = new PIXI.SimpleRope(trailTexture, points);

// Set the blendmode
rope.blendmode = PIXI.BLEND_MODES.ADD;
app.stage.addChild(rope);

let mouseposition = null;
app.stage.interactive = true;
app.stage.hitArea = app.screen;
app.stage.on("mousemove", (event) => {
  mouseposition = mouseposition || { x: 0, y: 0 };
  mouseposition.x = (event.global.x)-60;
  mouseposition.y = (event.global.y)-18;
  console.log(mouseposition.x, mouseposition.y);
});

// Listen for animate update
tickerMouse.add(() => {
  if (!mouseposition) return;

  // Update the mouse values to history
  historyX.pop();
  historyX.unshift(mouseposition.x);
  historyY.pop();
  historyY.unshift(mouseposition.y);
  // Update the points to correspond with history.
  for (let i = 0; i < ropeSize; i++) {
    const p = points[i];

    // Smooth the curve with cubic interpolation to prevent sharp edges.
    const ix = cubicInterpolation(historyX, (i / ropeSize) * historySize);
    const iy = cubicInterpolation(historyY, (i / ropeSize) * historySize);

    p.x = ix;
    p.y = iy;
  }
});

/**
 * Cubic interpolation based on https://github.com/osuushi/Smooth.js
 */
function clipInput(k, arr) {
  if (k < 0) k = 0;
  if (k > arr.length - 1) k = arr.length - 1;
  return arr[k];
}

function getTangent(k, factor, array) {
  return (factor * (clipInput(k + 1, array) - clipInput(k - 1, array))) / 2;
}

function cubicInterpolation(array, t, tangentFactor) {
  if (tangentFactor == null) tangentFactor = 1;

  const k = Math.floor(t);
  const m = [
    getTangent(k, tangentFactor, array),
    getTangent(k + 1, tangentFactor, array),
  ];
  const p = [clipInput(k, array), clipInput(k + 1, array)];
  t -= k;
  const t2 = t * t;
  const t3 = t * t2;
  return (
    (2 * t3 - 3 * t2 + 1) * p[0] +
    (t3 - 2 * t2 + t) * m[0] +
    (-2 * t3 + 3 * t2) * p[1] +
    (t3 - t2) * m[1]
  );
}
