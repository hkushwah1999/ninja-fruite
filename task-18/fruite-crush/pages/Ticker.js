import {
  gameOverSceenContainer,
  gameOverSceenScoreText,
} from "./GameOverSceen.js";
import {
  banana,
  bananaBottom,
  bananaTop,
  fruitSetup,
  fruiteBottomSetup,
  fruiteContainer,
  fruiteTopSetup,
  fruiteTransform,
  gameScreenContainer,
  greenApple,
  greenAppleBottom,
  greenAppleTop,
  scoreText,
  sliceAnimation,
  sliceAnimationSetup,
  sliceAnimationSprite1,
  sliceAnimationSprite2,
  sliceAnimationSprite3,
  slicedFruiteTransform,
  watermelon,
  watermelonBottom,
  watermelonTop,
} from "./GameScreen.js";
import { starRed1, starRed2, starRed3 } from "./star.js";
import {
  BombExplode,
  FruiteTrowSound,
  gameOverSound,
  sliceSound,
} from "./sound.js";
import { app } from "./PixiApp.js";

const starRedArray = [starRed1, starRed2, starRed3];
let starRedIdx = 0;
export let bananaSlicedTransformFlag = 0,
  greenAppleSlicedTransformFlag = 0,
  orangeSlicedTransformFlag = 0,
  watermelonSlicedTransformFlag = 0;

export let scoreCounter = 0;

let randomFruite = 0,
  randomFruite1 = 3,
  randomFruite2 = 2,
  randomFruite3 = 1;

export const ticker = PIXI.Ticker.shared;
export function Ticker() {
  ticker.autoStart = false;
  ticker.stop();
  banana.on("pointerenter", () => {
    bananaSlicedTransformFlag = 1;
    scoreCounter += 1;
    sliceSound.play();
    if (randomFruite == 5) {
      BombExplode.play();
      gameOverSceenScoreText.text = `Highest Score: ${scoreCounter}`;
      setTimeout(() => {
        gameOverSound.play();
      }, 2000);
      ticker.stop();
      gameOverSceenContainer.visible = true;
      app.stage.removeChild(gameScreenContainer);
    }
    scoreText.text = `Score: ${scoreCounter}`;
  });

  greenApple.on("pointerenter", () => {
    scoreCounter += 1;
    greenAppleSlicedTransformFlag = 1;
    sliceSound.play();
    if (randomFruite1 == 5) {
      gameOverSceenScoreText.text = `Highest Score: ${scoreCounter}`;
      setTimeout(() => {
        gameOverSound.play();
      }, 2000);
      gameOverSceenContainer.visible = true;
      BombExplode.play();
      ticker.stop();
      app.stage.removeChild(gameScreenContainer);
    }
    scoreText.text = `Score: ${scoreCounter}`;
  });

  watermelon.on("pointerenter", () => {
    scoreCounter += 1;
    watermelonSlicedTransformFlag = 1;
    sliceSound.play();

    if (randomFruite3 == 5) {
      gameOverSceenScoreText.text = `Highest Score: ${scoreCounter}`;
      setTimeout(() => {
        gameOverSound.play();
      }, 2000);
      gameOverSceenContainer.visible = true;
      BombExplode.play();
      ticker.stop();
      app.stage.removeChild(gameScreenContainer);
    }
    scoreText.text = `Score: ${scoreCounter}`;
  });

  ticker.add((delta) => {
    //banana
    if (banana.y < 820) {
      fruiteTransform(banana);
    }
    if (banana.y >= 820 && banana.y <= 830) {
      starRed(banana, randomFruite);
      randomFruite = Math.floor(Math.random() * 6);
      FruiteTrowSound(randomFruite);
      fruitSetup(banana, randomFruite);
      fruiteTopSetup(bananaTop, randomFruite);
      fruiteBottomSetup(bananaBottom, randomFruite);
      bananaSlicedTransformFlag = 0;

      //sliceAnimation setup
      sliceAnimationSetup(sliceAnimationSprite1, randomFruite);
    }
    if (bananaBottom.y < 830 && bananaSlicedTransformFlag == 1) {
      slicedFruiteTransform(banana, bananaTop, bananaBottom, fruiteContainer);

      //sliceAnimation
      if (sliceAnimationSprite1.alpha > 0) {
        sliceAnimation(sliceAnimationSprite1, banana);
      }
    }
    // green apple
    if (greenApple.y < 880) {
      fruiteTransform(greenApple);
    }
    if (greenApple.y >= 880 && greenApple.y <= 890) {
      starRed(greenApple, randomFruite1);
      randomFruite1 = Math.floor(Math.random() * 6);
      FruiteTrowSound(randomFruite1);
      fruitSetup(greenApple, randomFruite1);
      fruiteTopSetup(greenAppleTop, randomFruite1);
      fruiteBottomSetup(greenAppleBottom, randomFruite1);
      greenAppleSlicedTransformFlag = 0;

      //sliceAnimation setup
      sliceAnimationSetup(sliceAnimationSprite2, randomFruite1);
    }

    if (greenAppleBottom.y < 880 && greenAppleSlicedTransformFlag == 1) {
      slicedFruiteTransform(
        greenApple,
        greenAppleTop,
        greenAppleBottom,
        fruiteContainer
      );

      //sliceAnimation
      if (sliceAnimationSprite2.alpha > 0) {
        sliceAnimation(sliceAnimationSprite2, greenApple);
      }
    }

    //watermelon
    if (watermelon.y < 920) {
      fruiteTransform(watermelon);
    }
    if (watermelon.y >= 920 && watermelon.y <= 930) {
      starRed(watermelon, randomFruite3);
      randomFruite3 = Math.floor(Math.random() * 6);
      FruiteTrowSound(randomFruite3);
      fruitSetup(watermelon, randomFruite3);
      fruiteTopSetup(watermelonTop, randomFruite3);
      fruiteBottomSetup(watermelonBottom, randomFruite3);
      watermelonSlicedTransformFlag = 0;

      //sliceAnimation setup
      sliceAnimationSetup(sliceAnimationSprite3, randomFruite3);
    }

    if (watermelonBottom.y < 930 && watermelonSlicedTransformFlag == 1) {
      slicedFruiteTransform(
        watermelon,
        watermelonTop,
        watermelonBottom,
        fruiteContainer
      );

      //sliceAnimation
      if (sliceAnimationSprite3.alpha > 0) {
        sliceAnimation(sliceAnimationSprite3, watermelon);
      }
    }
  });
}

export function starRed(fruite, randomFruiteVal) {
  if (fruite.visible == true && randomFruiteVal != 5) {
    starRedArray[starRedIdx++].visible = true;
  }
  if (starRedIdx == 3) {
    starRedIdx = 0;
    gameOverSceenContainer.visible = true;
    gameOverSceenScoreText.text = `Highest Score: ${scoreCounter}`;
    ticker.stop();
    gameOverSound.play();
    app.stage.removeChild(gameScreenContainer);
  }
}

//!optimization
export function fruiteAnimation(
  fruite,
  fruiteTop,
  fruiteBottom,
  fruiteSlicedTransformFlag,
  randomFruiteval
) {
  if (fruite.y < 820) {
    fruiteTransform(fruite);
  }
  if (fruite.y >= 820 && fruite.y <= 830) {
    randomFruiteval = Math.floor(Math.random() * 6);
    // console.log(" banana random  value", randomFruite);
    fruitSetup(fruite, randomFruiteval);
    fruiteTopSetup(fruiteTop, randomFruiteval);
    fruiteBottomSetup(fruiteBottom, randomFruiteval);
    fruiteSlicedTransformFlag = 0;
    // console.log("banana setup");
  }
  if (fruiteBottom.y < 830 && fruiteSlicedTransformFlag == 1) {
    slicedFruiteTransform(fruite, fruiteTop, fruiteBottom, fruiteContainer);
    // console.log(banana.y, bananaBottom.y);
  }
}
//! optimization
