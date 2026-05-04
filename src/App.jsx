import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar           from './components/shared/Sidebar';
import DashboardPage     from './pages/DashboardPage';
import FaceDetectionPage from './pages/FaceDetectionPage';
import FaceAnalysisPage  from './pages/FaceAnalysisPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen text-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/"               element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard"      element={<DashboardPage />} />
            <Route path="/face-detection" element={<FaceDetectionPage />} />
            <Route path="/face-analysis"  element={<FaceAnalysisPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
