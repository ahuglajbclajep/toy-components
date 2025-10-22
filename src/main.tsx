import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";
import "./index.css";

import { Layout } from "./Layout";
import { Welcome } from "./Welcome";
import { Page } from "./Page";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path=":stories" element={<Page />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
