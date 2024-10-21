import Ie from "./Ie";
import Minesweeper from "./MineSweeper";
import Notepad from "./Notepad";

const apps = [
  {
    name: "Notepad",
    icon: "/icons/notepad-file-32x32.png",
    component: Notepad
  }, {
    name: "MineSweeper",
    icon: "/icons/minesweeper-32x32.png",
    component: Minesweeper,
    defaultSize: {
      width: 350 * 0.7,
      height: 520 *0.7
    }
  }, {
    name: "Internet Explorer",
    icon: "/icons/internet-explorer-32x32.png",
    component: Ie,
    defaultSize: {
      width: 800,
      height: 500
    }
  }
]

export default apps;