import { Routes, Route } from "react-router-dom";
import Thread from "./components/Thread";
import App from "./App";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/thread/:id" element={<Thread />} />
    </Routes>
  );
}

export default Router;
