import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="navbar-header">
        <div className="navbar-container">
          <div className="navbar-menu-group">
            <button
              aria-label="Menu"
              className="navbar-btn"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
              <span className="hidden md:inline">Menu</span>
            </button>
            <Link
              to="/catalogue"
              className="navbar-btn font-medium hidden sm:flex hover:text-muted-foreground"
            >
              Catalogue
            </Link>
            <Link
              to="/catalogue"
              aria-label="Search"
              className="navbar-icon-btn"
            >
              <Search className="w-5 h-5" />
            </Link>
          </div>

          <Link to="/" className="navbar-brand">
            Eramr
          </Link>

          <div className="navbar-menu-group">
            <button aria-label="Account" className="navbar-icon-btn">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 bottom-0 w-[300px] max-w-full z-[100] bg-background border-r border-border shadow-2xl flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-serif text-2xl text-primary">Menu</span>
                <button
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 -mr-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-6 text-xl font-serif text-primary">
                <Link to="/" className="hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/catalogue" className="hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Catalogue
                </Link>
                <a href="#" className="hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Our Heritage
                </a>
                <a href="#" className="hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Artisans
                </a>
                <a href="#" className="hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
