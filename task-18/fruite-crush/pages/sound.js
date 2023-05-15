export const sliceSound = PIXI.sound.Sound.from("Assets/sounds/splatter.mp3");
export const gameStartSound = PIXI.sound.Sound.from(
  "Assets/sounds/GameStart.wav"
);
export const gameOverSound = PIXI.sound.Sound.from(
  "Assets/sounds/GameOver.wav"
);
export const fruiteThrow = PIXI.sound.Sound.from(
  "Assets/sounds/FruitThrow.wav"
);
export const BombThrow = PIXI.sound.Sound.from("Assets/sounds/BombThrow.wav");
export const BombExplode = PIXI.sound.Sound.from(
  "Assets/sounds/BombExplode.wav"
);

export function FruiteTrowSound(randomFruite) {
  if (randomFruite != 5) {
    fruiteThrow.play();
  } else {
    BombThrow.play();
  }
}
