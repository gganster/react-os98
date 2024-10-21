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
  }
]

export default apps;