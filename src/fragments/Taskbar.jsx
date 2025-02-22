import { useState } from 'react';
import { useEffect } from 'react';
import { useOSStore } from '../contexts/os';
import StartMenuManager from './StartMenuManager';

const Taskbar = () => {
  const windows = useOSStore((state) => state.windows);
  const restoreApp = useOSStore((state) => state.restoreApp);
  const minimizeApp = useOSStore((state) => state.minimizeApp);

  const [time, setTime] = useState(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onClick = (_window) => {
    if (_window.minimized) {
      restoreApp(_window.id)
    } else {
      minimizeApp(_window.id)
    }
  }
  
  return (
    <div className="taskbar fixed bottom-0 left-0 w-full h-10 bg-gray-200 border-t border-gray-400 flex items-center">
      <StartMenuManager />

      <div className="active-apps flex-1 h-full flex items-center px-2 overflow-hidden">
        {windows.map((window) => (
          <button
            key={window.id}
            className={
              "h-8 px-2 flex items-center border border-gray-400 bg-gray-200 cursor-pointer mr-2 disable-focus " +
              (window.minimized ? "" : "active")
            }
            onClick={() => onClick(window)}
          >
            <img src={window.icon} alt={window.name} className="h-4 w-4 mr-2" />
            <span className="text-sm">{window.name}</span>
          </button>
        ))}
      </div>

      <div className="notification-area h-full px-2 flex items-center border-l border-gray-400">
        <img src="/icons/task-scheduler-16x16.png" alt="Volume" className="h-5 w-5 mx-1" />
        <img src="/icons/audio-okay-16x16.png" alt="Réseau" className="h-5 w-5 mx-1" />
        <div className="clock text-sm ml-2">
          {time}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
