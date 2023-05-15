import { startSceen } from "./pages/StartScreen.js";
import { app } from "./pages/PixiApp.js";

import { AssetsInitialization, LoadAssets } from "./pages/AssetsLoad.js";
import { Ticker } from "./pages/Ticker.js";
//PixiApp
document.body.appendChild(app.view);

//AssetsLoad
AssetsInitialization().then(() => {LoadAssets();});
Ticker();

