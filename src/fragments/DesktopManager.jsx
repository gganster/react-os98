import React, { useState, useRef, useEffect } from "react";
import Manifest from "../apps/appsManifest";

const DesktopIcon = ({ app }) => {
  const [clicked, setClicked] = useState(false);
  const iconRef = useRef(null);

  const onDoubleClick = () => {
    setClicked(false);
  };

  const onClick = () => {
    setClicked(true);
  };

  const handleClickOutside = (event) => {
    if (iconRef.current && !iconRef.current.contains(event.target)) {
      setClicked(false);
    }
  };

  useEffect(() => {
    // Ajouter l'écouteur d'événement lors du montage
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Supprimer l'écouteur d'événement lors du démontage
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={iconRef}
      className={
        "m-2 flex justify-center items-center flex-col max-w-[82px] " +
        `p-2 cursor-pointer ` +
        (clicked ? "bg-[#007e7d]" : "")
      }
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <img src={app.icon} alt={app.name} className={"w-14 h-14"} />
      <p
        className="mt-1 text-white text-center"
        style={{ fontSize: 15 }}
      >
        {app.name}
      </p>
    </div>
  );
};

const DesktopManager = () => {
  return (
    <div className="h-full w-full flex flex-col justify-start items-start p-4">
      {Manifest.map((app, index) => (
        <DesktopIcon key={index} app={app} />
      ))}
    </div>
  );
};

export default DesktopManager;
