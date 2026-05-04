import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MobileBottomNav from './components/layout/MobileBottomNav';
import PageWrapper from './components/layout/PageWrapper';
import HomePage from './pages/HomePage';
import ProfileBuilderPage from './pages/ProfileBuilderPage';
import CVBuilderPage from './pages/CVBuilderPage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import CoverLetterPage from './pages/CoverLetterPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">
          <PageWrapper>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfileBuilderPage />} />
              <Route path="/cv-builder" element={<CVBuilderPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:slug" element={<JobDetailPage />} />
              <Route path="/cover-letter" element={<CoverLetterPage />} />
              <Route path="/opportunities" element={<OpportunitiesPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </PageWrapper>
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    </BrowserRouter>
  );
}
