import React, { useEffect, useState } from 'react';
import "../styles/boot.css";
import { useOSStore } from '../contexts/os';

const BootScreen = () => {
  const setBooting = useOSStore((state) => state.setBooting);

  useEffect(() => {
    setTimeout(() => {
      setBooting(false);
    }, 6000);
  }, [])

  return (
    <div className="w-full h-screen bg-cover bg-center flex flex-col justify-end" style={{backgroundImage: `url("/boot.jpg")`}}>
      <div className="h-8 " style={{
            background: "linear-gradient(90deg, navy, #6cbaff, navy, #6cbaff, navy, #6cbaff,navy, #6cbaff, navy, #6cbaff)",
            backgroundSize: "2000% 100%",
            backgroundRepeat: "no-repeat",
            animation: "boot-loading 20s infinite linear",
      }}>
      </div>
    </div>
  );
};

export default BootScreen;
