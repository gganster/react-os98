import { useState } from 'react';
import { useEffect } from 'react';

const Taskbar = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="taskbar fixed bottom-0 left-0 w-full h-10 bg-gray-200 border-t border-gray-400 flex items-center">
      {/* Bouton Démarrer */}
      <div className="start-button h-full px-2 flex items-center border-r border-gray-400 cursor-pointer">
        <img src="/icons/start.png" alt="Démarrer" className="h-6 w-6 mr-2" />
        <span className="text-sm font-bold">Démarrer</span>
      </div>

      {/* Zone des applications actives */}
      <div className="active-apps flex-1 h-full flex items-center px-2 overflow-hidden">
        {/* Placez ici les boutons des applications actives */}
        <div className="app-button h-8 px-2 flex items-center border border-gray-400 bg-gray-200 cursor-pointer mr-2">
          <img src="/path/to/app-icon.png" alt="App" className="h-4 w-4 mr-2" />
          <span className="text-sm">Mon Application</span>
        </div>
      </div>

      {/* Zone de notification */}
      <div className="notification-area h-full px-2 flex items-center border-l border-gray-400">
        {/* Icônes de notification */}
        <img src="/icons/task-scheduler-16x16.png" alt="Volume" className="h-5 w-5 mx-1" />
        <img src="/icons/audio-okay-16x16.png" alt="Réseau" className="h-5 w-5 mx-1" />
        {/* Horloge */}
        <div className="clock text-sm ml-2">
          {time}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
