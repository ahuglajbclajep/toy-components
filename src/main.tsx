import { createRoot } from "react-dom/client";
import "./index.css";

import { AutoResizingTextarea } from "./auto-resizing-textarea/AutoResizingTextarea";
import { TagSearchInput } from "./tag-search-input";
import { h1Style, h2Style, sectionStyle } from "./styles";

const App = () => {
  return (
    <div className="h-full min-h-screen bg-gray-900 p-8">
      <div className="flex flex-col gap-8">
        <h1 className={h1Style}>Inputs</h1>
        <section className={sectionStyle}>
          <h2 className={h2Style}>Auto-resizing textarea</h2>
          <AutoResizingTextarea />
        </section>
        <section className={sectionStyle}>
          <h2 className={h2Style}>Tag search input</h2>
          <TagSearchInput />
        </section>
      </div>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
