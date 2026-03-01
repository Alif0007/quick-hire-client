import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import JobDetail from './pages/JobDetail';
import Dashboard from './pages/Dashboard';
import AllJobs from './pages/AllJobs';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<AllJobs />} />
                <Route path="/job/:id" element={<JobDetail />} />
                <Route path="/admin" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}