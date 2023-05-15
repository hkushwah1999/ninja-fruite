import { app } from "./PixiApp.js";

export const progressContainer = new PIXI.Container();
progressContainer.width = app.width;
progressContainer.height = app.height;

export const progrssBar = new PIXI.Graphics();
progrssBar.beginFill(0xf8fcfb);
progrssBar.x += 480;
progrssBar.y += 300;

const progressBox = new PIXI.Graphics();
progressBox.lineStyle(2, 0xfeeb77, 1);
progressBox.beginFill(0x000000);
progressBox.drawRect(50, 50, 350, 60);
progressBox.x += 480;
progressBox.y += 300;

const loadingTextStyle = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 17,
  fontStyle: "italic",
  fill: ["#f8fcfb"],
  stroke: "#4a1850",
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: "#000000",
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  wordWrap: true,
  wordWrapWidth: 440,
  lineJoin: "round",
});

const loadingText = new PIXI.Text("Loading...", loadingTextStyle);
loadingText.x = 800;
loadingText.y = 419;

progressContainer.addChild( progressBox, progrssBar, loadingText);
