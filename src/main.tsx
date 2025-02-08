import { createRoot } from "react-dom/client";
import "./index.css";

import { Page } from "./Page";

const App = () => {
  const paths = Object.keys(import.meta.glob("./stories/*.tsx"));

  return (
    <div className="h-full min-h-screen bg-gray-900 p-8">
      {paths.map((path) => (
        <Page key={path} path={path} />
      ))}
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
