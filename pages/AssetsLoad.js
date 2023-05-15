export let assetsLoaded = false;
import { startSceen } from "./StartScreen.js";
import { GameOversceen } from "./GameOverSceen.js";
import { GameScreen } from "./GameScreen.js";
import { progressContainer, progrssBar } from "./LoadScreen.js";
import { app } from "./PixiApp.js";

export const AssetsInitialization = async () => {
  const appBundles = {
    bundles: [
      {
        name: "game-screen",
        assets: [
          {
            name: "s1",
            srcs: "./Assets/Black_crystal1.png",
          },
          {
            name: "t1",
            srcs: "./Assets/unsplash50.jpg",
          },
          {
            name: "t2",
            srcs: "./Assets/unsplash60.jpg",
          },
          {
            name: "t3",
            srcs: "./Assets/unsplash70.jpg",
          },
          {
            name: "t4",
            srcs: "./Assets/unsplash80.jpg",
          },
          {
            name: "t5",
            srcs: "./Assets/unsplash90.jpg",
          },
          {
            name: "gameSceenBackground",
            srcs: "./Assets/images/Background4.png",
          },
          {
            name: "gameOverSceenBackground",
            srcs: "./Assets/images/Background3.png",
          },

          {
            name: "banana",
            srcs: "./Assets/images/Banana.png",
          },
          {
            name: "bananaBottom",
            srcs: "./Assets/images/BananaBottom.png",
          },
          {
            name: "bananaTop",
            srcs: "./Assets/images/BananaTop.png",
          },
          {
            name: "bomb",
            srcs: "./Assets/images/Bomb.png",
          },
          {
            name: "watermelon",
            srcs: "./Assets/images/Watermelon.png",
          },
          {
            name: "watermelonTop",
            srcs: "./Assets/images/WatermelonTop.png",
          },
          {
            name: "watermelonBottom",
            srcs: "./Assets/images/WatermelonBottom.png",
          },
          {
            name: "greenApple",
            srcs: "./Assets/images/GreenApple.png",
          },
          {
            name: "greenAppleTop",
            srcs: "./Assets/images/GreenAppleTop.png",
          },
          {
            name: "greenAppleBottom",
            srcs: "./Assets/images/GreenAppleBottom.png",
          },
          {
            name: "magicBean",
            srcs: "./Assets/images/MagicBean.png",
          },
          {
            name: "magicBeanTop",
            srcs: "./Assets/images/MagicBeanTop.png",
          },
          {
            name: "magicBeanBottom",
            srcs: "./Assets/images/MagicBeanBottom.png",
          },
          {
            name: "orange",
            srcs: "./Assets/images/Orange.png",
          },
          {
            name: "orangeTop",
            srcs: "./Assets/images/OrangeTop.png",
          },
          {
            name: "orangeBottom",
            srcs: "./Assets/images/OrangeBottom.png",
          },
          {
            name: "stain0",
            srcs: "./Assets/fruiteAnimationImages/stain_0.png",
          },
          {
            name: "stain1",
            srcs: "./Assets/fruiteAnimationImages/stain_1.png",
          },
          {
            name: "stain2",
            srcs: "./Assets/fruiteAnimationImages/stain_2.png",
          },
          {
            name: "stain3",
            srcs: "./Assets/fruiteAnimationImages/stain_3.png",
          },
          {
            name: "stain4",
            srcs: "./Assets/fruiteAnimationImages/stain_4.png",
          },
          {
            name: "stain5",
            srcs: "./Assets/fruiteAnimationImages/stain_5.png",
          },
        ],
      },
    ],
  };

  await PIXI.Assets.init({ manifest: appBundles });
};

export const LoadAssets = async () => {
  try {
    await PIXI.Assets.loadBundle("game-screen", (value) => {
      progrssBar.drawRect(50, 50, 350 * value, 60);
    });

    app.stage.removeChild(progressContainer);
    GameScreen();
    GameOversceen();
    startSceen();
    assetsLoaded = true;
  } catch (err) {
    console.log(`FAILED loading texture`);
    console.error(err.message);
  }
};
