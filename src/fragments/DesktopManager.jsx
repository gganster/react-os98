import React, { useState, useRef, useEffect } from "react";
import Manifest from "../apps/appsManifest";
import { useOSStore } from "../contexts/os";

const DesktopIcon = ({ app }) => {
  const startApp = useOSStore((state) => state.startApp);

  const [clicked, setClicked] = useState(false);
  const iconRef = useRef(null);

  const onDoubleClick = () => {
    setClicked(false);
    startApp(app);
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={iconRef}
      className={
        "m-2 flex justify-center items-center flex-col w-[82px] " +
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
    <div className="flex flex-col justify-start items-start p-4 absolute">
      {Manifest.map((app, index) => (
        <DesktopIcon key={index} app={app} />
      ))}
    </div>
  );
};

export default DesktopManager;
