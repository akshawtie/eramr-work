import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Catalogue from './components/Catalogue';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen selection:bg-accent/20">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Catalogue />
        <Gallery />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;
