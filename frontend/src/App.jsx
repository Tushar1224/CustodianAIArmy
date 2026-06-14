import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import LearnPage from './pages/LearnPage';
import PortfolioPage from './pages/PortfolioPage';
import BuildPage from './pages/BuildPage';
import CustomAgentsPage from './pages/CustomAgentsPage';
import PaymentPage from './pages/PaymentPage';
import ResumePage from './pages/ResumePage';
import JobsPage from './pages/JobsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/build" element={<BuildPage />} />
        <Route path="/agents" element={<CustomAgentsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/jobs" element={<JobsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;