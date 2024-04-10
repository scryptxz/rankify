import { BrowserRouter, Route, Routes } from "react-router-dom";
import Library from "../pages/Library";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Library />} />
      </Routes>
    </BrowserRouter>
  );
}
