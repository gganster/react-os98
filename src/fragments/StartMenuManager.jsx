import React, { useState, useRef, useEffect } from 'react';

const StartMenuManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleStartMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest('.start-button')
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Bouton Démarrer */}
      <div
        className={`start-button h-full px-2 flex items-center border-r border-gray-400 cursor-pointer ${
          isOpen
            ? 'bg-gray-300 border-t border-l border-gray-500'
            : 'bg-[#C0C0C0] border-t border-l border-white'
        }`}
        onClick={toggleStartMenu}
      >
        <img src="/icons/start.png" alt="Démarrer" className="h-6 w-6 mr-2" />
        <span className="text-sm font-bold">Démarrer</span>
      </div>

      {/* Menu Démarrer */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute bottom-10 left-0 w-64 bg-gray-200 border-t border-l border-gray-500 shadow-lg z-50"
        >
          <div className="flex">
            {/* Icônes latérales */}
            <div className="w-8 bg-[#01017f] text-white flex flex-col justify-end items-center">
              <img src="/icons/start-menu-side-98-js.png" alt="Utilisateur" className="w-8 h-12" />
              {/* Autres icônes latérales */}
            </div>
            {/* Éléments du menu */}
            <div className="w-3/4 py-2">
              <div className="px-2 py-1 hover:bg-blue-800 hover:text-white cursor-default flex items-center">
                <img src="/icons/programs.png" alt="Programmes" className="w-5 h-5 mr-2" />
                <span>Programmes</span>
              </div>
              <div className="px-2 py-1 hover:bg-blue-800 hover:text-white cursor-default flex items-center">
                <img src="/icons/my-documents-folder-32x32.png" alt="Documents" className="w-5 h-5 mr-2" />
                <span>Documents</span>
              </div>
              <div className="px-2 py-1 hover:bg-blue-800 hover:text-white cursor-default flex items-center">
                <img src="/icons/find.png" alt="Rechercher" className="w-5 h-5 mr-2" />
                <span>Rechercher</span>
              </div>
              <div className="px-2 py-1 hover:bg-blue-800 hover:text-white cursor-default flex items-center">
                <img src="/icons/question.png" alt="Aide" className="w-5 h-5 mr-2" />
                <span>Aide</span>
              </div>
              <div className="px-2 py-1 hover:bg-blue-800 hover:text-white cursor-default flex items-center">
                <img src="/icons/msdos-32x32.png" alt="Exécuter" className="w-5 h-5 mr-2" />
                <span>Exécuter...</span>
              </div>
              <div className="border-t border-gray-400 my-2 mx-2"></div>
              <div className="px-2 py-1 hover:bg-blue-800 hover:text-white cursor-default flex items-center">
                <img src="/icons/my-computer-32x32.png" alt="Arrêter" className="w-5 h-5 mr-2" />
                <span>Arrêter</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StartMenuManager;
