import { useRef } from "react";
import Taskbar from "../fragments/Taskbar";
import DraggableResizableWindow from "../lib/components/DraggableResizableWindow";
import Notepad from "../apps/Notepad";
import DesktopManager from "../fragments/DesktopManager";

export default function WindowManager() {

  return (
    <div className="h-screen w-screen bg-[#23b0e6] overflow-hidden relative">
      <DesktopManager />
      <DraggableResizableWindow title="Ma fenêtre" >
        {(state) => <Notepad {...state} />}
      </DraggableResizableWindow>
      <Taskbar />
    </div>
  );
}

/*
      <DraggableResizableWindow title="Ma fenêtre">
        {(state) => <Notepad {...state} />}
      </DraggableResizableWindow>
*/