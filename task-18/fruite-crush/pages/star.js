export const star1 = new PIXI.Graphics();
export const star2 = new PIXI.Graphics();
export const star3 = new PIXI.Graphics();
export const starRed1 = new PIXI.Graphics();
export const starRed2 = new PIXI.Graphics();
export const starRed3 = new PIXI.Graphics();
export const starContainer = new PIXI.Container();

starSetup(star1, 50);
starSetup(star2, 100);
starSetup(star3, 150);
starRedSetup(starRed1, 50);
starRedSetup(starRed2, 100);
starRedSetup(starRed3, 150);
starContainer.addChild(star1, star2, star3, starRed1, starRed2, starRed3);

export function starSetup(star, x) {
  star.lineStyle(2, 0xffbd01, 1);
  star.beginFill(0x0c0c0c);
  star.drawRect(x, 20, 40, 40);
  star.endFill();
}

export function starRedSetup(star, x) {
  star.lineStyle(2, 0xffbd01, 1);
  star.beginFill(0xe72309);
  star.drawRect(x, 20, 40, 40);
  star.endFill();
  star.visible = false;
}
