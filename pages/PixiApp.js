import { loadScreenBackgroundColor } from "./Settings.js";

export const app = new PIXI.Application({
  background: loadScreenBackgroundColor,
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
});

