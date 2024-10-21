import Taskbar from "../fragments/Taskbar";
import DraggableResizableWindow from "../lib/components/DraggableResizableWindow";
import DesktopManager from "../fragments/DesktopManager";
import { useOSStore } from "../contexts/os";

export default function WindowManager() {
  const windows = useOSStore((state) => state.windows);

  return (
    <div className="h-screen w-screen bg-[#23b0e6] overflow-hidden relative">
      <DesktopManager />
      {windows.map((window) => (
        <DraggableResizableWindow key={window.id} wm_state={window}>
          {window.component}
        </DraggableResizableWindow>
      ))}
      <Taskbar />
    </div>
  );
}