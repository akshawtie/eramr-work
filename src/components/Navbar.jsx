import { Link } from 'react-router-dom';
import { Menu, ShoppingBag, Search, User } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="navbar-menu-group">
          <button aria-label="Menu" className="navbar-btn">
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
          ARTISANAL
        </Link>
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
  );
}
