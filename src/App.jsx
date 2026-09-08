import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Catalogue from './components/Catalogue';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen selection:bg-black/10">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <Gallery />
              <Testimonials />
            </>
          } />
          <Route path="/catalogue" element={<Catalogue />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
