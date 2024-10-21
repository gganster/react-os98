import BootScreen from "./pages/BootScreen"
import WindowManager from "./pages/WindowManager"
import {useOSStore} from "./contexts/os"

function App() {
  const booting = useOSStore((state) => state.booting);

  return (
    <div className="h-screen w-screen bg-gray-400">
      {booting ? 
        <BootScreen />
        :
        <WindowManager />
      }
    </div>
  )
}

export default App
