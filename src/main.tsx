import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";

import { Layout } from "./Layout";
import { Page } from "./Page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route caseSensitive element={<Layout />}>
          <Route path="/" element={<Page />} />
          <Route path=":stories" element={<Page />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
