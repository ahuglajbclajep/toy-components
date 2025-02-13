import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router";
import "./index.css";

import { Layout } from "./Layout";
import { Welcome } from "./Welcome";
import { Page } from "./Page";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route caseSensitive element={<Layout />}>
          <Route path="/" element={<Welcome />} />
          <Route path=":stories" element={<Page />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
