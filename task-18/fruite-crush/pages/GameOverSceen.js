import { appHeight, appWidth, magicBean } from "./GameScreen.js";
import { app } from "./PixiApp.js";
export const gameOverSceenBackground = new PIXI.Sprite();
export const gameOverSceenContainer = new PIXI.Container();

const style = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 46,
  fontStyle: "italic",
  fontWeight: "bold",
  fill: ["#ffffff", "#00ff99"], // gradient
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
export let gameOverSceenScoreText = new PIXI.Text(
  `Highest Score: werwe`,
  style
);
gameOverSceenScoreText.x = appWidth / 2 - 100;
gameOverSceenScoreText.y = appHeight / 2 + 100;

export let relodeText = new PIXI.Text(`Restart`, relodeStyle);
relodeText.x = 596;
relodeText.y = 410;

const relodeButten = new PIXI.Graphics();
relodeButten.lineStyle(3, 0xffbd01, 1);
relodeButten.beginFill(0xc34288);
relodeButten.drawRect(550, 400, 160, 50);
relodeButten.endFill();
relodeButten.x += 170;
relodeButten.y += 250;
relodeButten.interactive = true;
relodeButten.cursor = "pointer";
relodeButten.addChild(relodeText);

export const mainBox = new PIXI.Graphics();
mainBox.lineStyle(3, 0xffbd01, 1);
mainBox.beginFill(0x85db6f);
mainBox.drawRect(550, 400, 500, 400);
mainBox.endFill();
mainBox.x -= 150;
mainBox.y -= 250;
mainBox.addChild(relodeButten, gameOverSceenScoreText);

export const GameOversceen = () => {
  gameOverSceenBackground.texture = PIXI.Assets.get("gameSceenBackground");
  relodeButten.on("pointertap", () => {
    window.location.reload();
    // gameOverSceenContainer.visible = false;
  });
  gameOverSceenContainer.addChild(gameOverSceenBackground, mainBox);
  gameOverSceenContainer.scale.set(1.22);
  gameOverSceenContainer.visible = false;
  app.stage.addChild(gameOverSceenContainer);
};
