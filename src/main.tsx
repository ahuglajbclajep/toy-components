import { createRoot } from "react-dom/client";
import "./index.css";
import { h1Style } from "./styles";

import { AutoHeightTextarea } from "./auto-height-textarea/AutoHeightTextarea";

const App = () => {
  return (
    <div className="flex h-full flex-col bg-gray-800 p-4">
      <h1 className={h1Style}>Auto-resizing textarea</h1>
      <AutoHeightTextarea />
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
