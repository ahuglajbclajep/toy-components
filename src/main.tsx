import { createRoot } from "react-dom/client";
import "./index.css";
import { h1Style } from "./styles";

import { AutoResizingTextarea } from "./auto-resizing-textarea/AutoResizingTextarea";
import { TagSearchInput } from "./tag-search-input";

const App = () => {
  return (
    <div className="flex h-full min-h-screen flex-col gap-4 bg-gray-900 p-4">
      <section>
        <h1 className={h1Style}>Auto-resizing textarea</h1>
        <AutoResizingTextarea />
      </section>
      <section>
        <h1 className={h1Style}>Tag search input</h1>
        <TagSearchInput />
      </section>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
