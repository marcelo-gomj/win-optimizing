// import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { RouterLayout } from "./context/router";

function App() {
  return (
    <div className="flex items-center justify-center h-[100vh] bg-gradient-to-tr from-green-900 bg-green-500">
      <div className="bg-base-100 h-[90vh] w-[50%] rounded-[8px]">
        <RouterLayout />
      </div>
    </div>
  );
}

export default App;
