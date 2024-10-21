import Taskbar from "../fragments/Taskbar";
import DraggableResizableWindow from "../lib/components/DraggableResizableWindow";
import Notepad from "../apps/Notepad";

export default function WindowManager() {
  return (
    <div className="h-screen w-screen bg-[#23b0e6]">
      <DraggableResizableWindow title="Ma fenêtre">
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