import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Catalogue from './components/Catalogue';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Contact from './components/Contact';
import TraysPage from './components/TraysPage';
import PlanterStandsPage from './components/PlanterStandsPage';
import PlanterStandDetailPage from './components/PlanterStandDetailPage';

function App() {
  return (
    <div className="min-h-screen selection:bg-black/10">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              {/*<Features />*/}
              <Gallery />
              <Testimonials />
            </>
          } />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/catalogue/trays" element={<TraysPage />} />
          <Route path="/catalogue/iron-planter-stands" element={<PlanterStandsPage />} />
          <Route path="/catalogue/iron-planter-stands/:productId" element={<PlanterStandDetailPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
