import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { QuizPage } from "./pages/QuizPage";
import { RewardPage } from "./pages/RewardPage";
import { ParkPage } from "./pages/ParkPage";
import { DinoDetailPage } from "./pages/DinoDetailPage";
import { StarsPage } from "./pages/StarsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/reward" element={<RewardPage />} />
        <Route path="/park" element={<ParkPage />} />
        <Route path="/park/:slug" element={<DinoDetailPage />} />
        <Route path="/stars" element={<StarsPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
