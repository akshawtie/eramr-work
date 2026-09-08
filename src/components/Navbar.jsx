import { Menu, ShoppingBag, Search, User } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  return (
    <>
      {/* Announcement Bar */}
      <div className="navbar-announcement">
        Complimentary White-Glove Delivery on Orders Over $2,500
      </div>
      <header className="navbar-header">
        <div className="navbar-container">
          <div className="navbar-menu-group">
            <button aria-label="Menu" className="navbar-btn">
              <Menu className="w-5 h-5" />
              <span className="hidden md:inline">Menu</span>
            </button>
            <button 
              onClick={() => document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' })}
              className="navbar-btn text-accent hover:text-accent/80 font-medium hidden sm:flex"
            >
              Catalogue
            </button>
            <button 
              onClick={() => document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Search" 
              className="navbar-icon-btn"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
          <div className="navbar-brand">
            ARTISANAL
          </div>
          <div className="navbar-menu-group">
            <button aria-label="Account" className="navbar-icon-btn">
              <User className="w-5 h-5" />
            </button>
            <button aria-label="Cart" className="navbar-btn">
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden md:inline">Cart (0)</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
