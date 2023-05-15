import {
  GameScreen,
  appHeight,
  appWidth,
  gameScreenContainer,
  magicBean,
} from "./GameScreen.js";
import { app } from "./PixiApp.js";
import { Ticker, scoreCounter, ticker } from "./Ticker.js";
import { gameStartSound } from "./sound.js";
const startSceenBackground = new PIXI.Sprite();
const startSceenContainer = new PIXI.Container();

const relodeStyle = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 26,
  fontStyle: "italic",
  fontWeight: "bold",
  fill: ["#0c0c0c"],
  stroke: "#4a1850",
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  wordWrap: true,
  wordWrapWidth: 440,
  lineJoin: "round",
});

let relodeText = new PIXI.Text(`Start`, relodeStyle);
relodeText.x = 596;
relodeText.y = 410;

const startButton = new PIXI.Graphics();
startButton.lineStyle(3, 0xffbd01, 1);
startButton.beginFill(0xc34288);
startButton.drawRect(550, 400, 160, 50);
startButton.endFill();
startButton.x += 170;
startButton.y += 250;
startButton.interactive = true;
startButton.cursor = "pointer";
startButton.addChild(relodeText);

const mainBox = new PIXI.Graphics();
mainBox.lineStyle(3, 0xffbd01, 1);
mainBox.beginFill(0x85db6f);
mainBox.drawRect(550, 400, 500, 400);
mainBox.endFill();
mainBox.x -= 150;
mainBox.y -= 250;
mainBox.addChild(startButton);

export const startSceen = () => {
  startSceenBackground.texture = PIXI.Assets.get("gameOverSceenBackground");
  startButton.on("pointertap", () => {
    startSceenContainer.visible = false;
    gameScreenContainer.visible = true;
    gameStartSound.play();

    ticker.start();

    console.log(ticker.started);
  });
  startSceenContainer.addChild(startSceenBackground, mainBox);
  startSceenContainer.scale.set(1.22);
  startSceenContainer.visible = true;
  startSceenContainer.z = 100;
  app.stage.addChild(startSceenContainer);
};
