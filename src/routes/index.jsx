import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ReportPage from '../pages/ReportPage';

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/reports" element={<ReportPage />} />
    <Route path="*" element={<HomePage />} />
  </Routes>
);

export default RoutesComponent;
