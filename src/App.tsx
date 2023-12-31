// import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { ConfigProvider } from "./context/BoosterConfig";
import { RouterLayout } from "./context/router";

function App() {
  return (
    <div className="flex items-center justify-center h-[100vh] bg-gradient-to-tr from-green-900 bg-green-500">
      <div className="relative bg-base-100 h-[94vh] w-[50%] rounded-[8px] overflow-hidden">
        <ConfigProvider>
          <RouterLayout />
        </ConfigProvider>
      </div>
    </div>
  );
}

export default App;
