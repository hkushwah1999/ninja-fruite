import { app } from "./PixiApp.js";
import { progressContainer } from "./LoadScreen.js";
import { starContainer } from "./star.js";
import {
  fruitsSpeed,
  fruitsSpeedReductionValue,
  max,
  min,
} from "./Settings.js";

import { rope } from "./mouseAnimation.js";
app.stage.addChild(progressContainer);
export const appWidth = app.screen.width;
export const appHeight = app.screen.height;

export const gameScreenBackground = new PIXI.Sprite();
export const banana = new PIXI.Sprite();
export const bananaBottom = new PIXI.Sprite();
export const bananaTop = new PIXI.Sprite();

export const greenApple = new PIXI.Sprite();
export const greenAppleBottom = new PIXI.Sprite();
export const greenAppleTop = new PIXI.Sprite();

export const watermelon = new PIXI.Sprite();
export const watermelonBottom = new PIXI.Sprite();
export const watermelonTop = new PIXI.Sprite();

export const orange = new PIXI.Sprite();
export const orangeBottom = new PIXI.Sprite();
export const orangeTop = new PIXI.Sprite();

export const magicBean = new PIXI.Sprite();
export const magicBeanBottom = new PIXI.Sprite();
export const magicBeanTop = new PIXI.Sprite();

export const gameScreenContainer = new PIXI.Container();
export const fruiteContainer = new PIXI.Container();
export const sliceAnimationContainer = new PIXI.Container();

// fruit slice animation sprite
export const sliceAnimationSprite1 = new PIXI.Sprite();
export const sliceAnimationSprite2 = new PIXI.Sprite();
export const sliceAnimationSprite3 = new PIXI.Sprite();

fruiteContainer.width = appWidth;
fruiteContainer.height = appHeight;
const style = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
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

export let scoreText = new PIXI.Text("Score: 0", style);
scoreText.x = appWidth / 2 + 360;
scoreText.y = appHeight / 2 - 380;

const fruitsArray = [
  "greenApple",
  "banana",
  "watermelon",
  "orange",
  "magicBean",
  "bomb",
];
const fruitsTopArray = [
  "greenAppleTop",
  "bananaTop",
  "watermelonTop",
  "orangeTop",
  "magicBeanTop",
  "bomb",
];
const fruitsBottomArray = [
  "greenAppleBottom",
  "bananaBottom",
  "watermelonBottom",
  "orangeBottom",
  "magicBeanBottom",
  "bomb",
];

const sliceAnimationArray = [
  "stain0",
  "stain1",
  "stain2",
  "stain3",
  "stain4",
  "stain5",
];
export const GameScreen = () => {
  gameScreenBackground.texture = PIXI.Assets.get("gameSceenBackground");
  // banana
  fruitSetup(banana, 0);
  fruiteTopSetup(bananaTop, 0);
  fruiteBottomSetup(bananaBottom, 0);
  sliceAnimationSetup(sliceAnimationSprite1, 0);

  // greenApple
  fruitSetup(greenApple, 1);
  fruiteTopSetup(greenAppleTop, 1);
  fruiteBottomSetup(greenAppleBottom, 1);
  sliceAnimationSetup(sliceAnimationSprite2, 0);

  // watermelon
  fruitSetup(watermelon, 2);
  fruiteTopSetup(watermelonTop, 2);
  fruiteBottomSetup(watermelonBottom, 2);
  sliceAnimationSetup(sliceAnimationSprite3, 0);

  gameScreenContainer.scale.set(1.13);
  gameScreenContainer.addChild(
    gameScreenBackground,
    sliceAnimationContainer,
    fruiteContainer,
    scoreText,
    starContainer,
    rope
  );
  gameScreenContainer.visible = false;
  app.stage.addChild(gameScreenContainer);
  fruitesAdd(banana, fruiteContainer);
  fruitesAdd(greenApple, fruiteContainer);
  fruitesAdd(watermelon, fruiteContainer);

  slicedFruiteAdd(bananaTop, bananaBottom, fruiteContainer);
  slicedFruiteAdd(greenAppleTop, greenAppleBottom, fruiteContainer);
  slicedFruiteAdd(watermelonTop, watermelonBottom, fruiteContainer);

  sliceAnimationAdd(sliceAnimationSprite1, sliceAnimationContainer);
  sliceAnimationAdd(sliceAnimationSprite2, sliceAnimationContainer);
  sliceAnimationAdd(sliceAnimationSprite3, sliceAnimationContainer);
};

export function fruitSetup(fruite, randomFruite) {
  fruite.texture = PIXI.Assets.get(fruitsArray[randomFruite]);

  // fruite's x axis random value range  = max - min + min;
  fruite.x = Math.floor(Math.random() * (max - min) + min);
  fruite.y = appHeight / 2 + 270;
  fruite.speedY = fruitsSpeed;
  fruite.speedX = Math.round((Math.random() - 0.5) * 4);
  fruite.name = "banana";
  fruite.anchor.set(0.5);
  fruite.interactive = true;
  fruite.cursor = "pointer";
  fruite.visible = true;
  fruite.scale.set(3);
}
export function fruiteTopSetup(fruiteTop, randomFruite) {
  // console.log("random slicedfruite value", randomFruite);
  fruiteTop.texture = PIXI.Assets.get(fruitsTopArray[randomFruite]);
  fruiteTop.speedY = banana.speedY;
  fruiteTop.speedX = banana.speedX;
  fruiteTop.name = "bananaTop";
  fruiteTop.anchor.set(0.5);
  fruiteTop.x = 0;
  fruiteTop.y = 0;
  fruiteTop.scale.set(3);
  fruiteTop.visible = false;
}
export function fruiteBottomSetup(fruiteBottom, randomFruite) {
  fruiteBottom.texture = PIXI.Assets.get(fruitsBottomArray[randomFruite]);
  fruiteBottom.speedY = banana.speedY;
  fruiteBottom.speedX = banana.speedX;
  fruiteBottom.name = "bananaTop";
  fruiteBottom.anchor.set(0.5);
  fruiteBottom.x = 0;
  fruiteBottom.y = 0;
  fruiteBottom.scale.set(3);
  fruiteBottom.visible = false;
}

export function fruitesAdd(fruite, fruiteContainer) {
  if (fruite.y >= 660) {
    fruiteContainer.addChild(fruite);
  }
}
export function fruiteTransform(fruite) {
  fruite.y -= fruite.speedY;
  fruite.x += fruite.speedX;
  fruite.speedY -= fruitsSpeedReductionValue;
  fruite.rotation -= 0.01;
}

export function slicedFruiteAdd(fruiteTop, fruiteBottom, fruiteContainer) {
  fruiteContainer.addChild(fruiteTop, fruiteBottom);
}

export function slicedFruiteRemove(fruiteTop, fruiteBottom, fruiteContainer) {
  fruiteContainer.removeChild(fruiteTop);
  fruiteContainer.removeChild(fruiteBottom);
}

export function slicedFruiteTransform(fruite, fruiteTop, fruiteBottom) {
  if (fruiteTop.x === 0 && fruiteTop.y === 0) {
    fruiteTop.visible = true;
    fruiteTop.x = fruite.x;
    fruiteTop.y = fruite.y - 60;
    fruiteTop.speedX = 1.9;
    fruiteTop.speedY = fruite.speedY;
  } else {
    fruiteTop.x += fruiteTop.speedX;
    fruiteTop.y -= fruiteTop.speedY;
  }

  fruiteTop.rotation += 0.011;
  fruiteTop.speedX -= 0.008;
  fruiteTop.speedY -= fruitsSpeedReductionValue;

  if (fruiteBottom.x === 0 && fruiteBottom.y === 0) {
    fruiteBottom.visible = true;
    fruiteBottom.x = fruite.x;
    fruiteBottom.y = fruite.y;
    fruiteBottom.speedX = 1.9;
    fruiteBottom.speedY = fruite.speedY;
  } else {
    fruiteBottom.x -= fruiteBottom.speedX;
    fruiteBottom.y -= fruiteBottom.speedY;
  }

  fruiteBottom.speedX -= 0.008;
  fruiteBottom.speedY -= fruitsSpeedReductionValue;
  fruiteBottom.rotation -= 0.01;
  fruite.visible = false;
}

export function sliceAnimationSetup(fruiteAnim, randomFruite) {
  fruiteAnim.texture = PIXI.Assets.get(sliceAnimationArray[randomFruite]);
  fruiteAnim.name = "sliceAnim";
  fruiteAnim.anchor.set(0.5);
  fruiteAnim.x = 0;
  fruiteAnim.y = 0;
  fruiteAnim.scale.set(1);
  fruiteAnim.visible = false;
  fruiteAnim.alpha = 1;
}
export function sliceAnimationAdd(
  sliceAnimationSprite,
  sliceAnimationContainer
) {
  sliceAnimationContainer.addChild(sliceAnimationSprite);
}

export function sliceAnimation(fruiteAnim, fruite) {
  if (fruiteAnim.x === 0 && fruiteAnim.y === 0) {
    fruiteAnim.visible = true;
    fruiteAnim.x = fruite.x;
    fruiteAnim.y = fruite.y - 60;
    fruiteAnim.speedX = 1.9;
    fruiteAnim.speedY = fruite.speedY;
  }
  fruiteAnim.alpha -= 0.01;
}
