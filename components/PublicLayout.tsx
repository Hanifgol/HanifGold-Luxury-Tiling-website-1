import { useState, PropsWithChildren, FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icons } from './Icons';
import { useContent } from '../context/ContentContext';

const PublicLayout = ({ children }: PropsWithChildren) => {
  const { config } = useContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'News', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen font-sans bg-luxury-black text-gray-200 selection:bg-gold-500 selection:text-white">
      {/* Header */}
      <header className="fixed w-full z-50 bg-luxury-black/95 backdrop-blur-md border-b border-white/5 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              {config.logoUrl ? (
                <img src={config.logoUrl} alt={config.companyName} className="h-12 w-auto object-contain" />
              ) : (
                <>
                  <div className="w-10 h-10 bg-gold-500 rounded-sm flex items-center justify-center shadow-lg group-hover:bg-gold-400 transition-colors">
                    <span className="text-luxury-black font-serif font-black text-xl">H</span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-xl font-serif font-bold tracking-tight text-white group-hover:text-gold-500 transition-colors">HANIFGOLD</span>
                    <span className="text-[0.6rem] uppercase tracking-[0.25em] text-gray-400 font-medium">Luxury Tiling</span>
                  </div>
                </>
              )}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm uppercase tracking-wider font-medium hover:text-gold-500 transition-all duration-300 relative py-2 ${
                    isActive(link.path) ? 'text-gold-500' : 'text-gray-300'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gold-500 transform origin-left transition-transform duration-300 ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0'}`}></span>
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link to="/contact" className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-gold-500/20 rounded-sm">
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-300 hover:text-white transition-colors">
                {mobileMenuOpen ? <Icons.X size={28} /> : <Icons.Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-luxury-black border-t border-white/10 absolute w-full shadow-2xl animate-fade-in-down">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-4 text-sm font-bold uppercase tracking-wider border-b border-white/5 hover:bg-white/5 transition-colors ${
                     isActive(link.path) ? 'text-gold-500 pl-6 border-l-2 border-l-gold-500' : 'text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-white/5 text-gray-400 py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
             {config.logoUrl ? (
                <img src={config.logoUrl} alt={config.companyName} className="h-10 w-auto object-contain" />
             ) : (
                <span className="text-xl font-serif font-bold tracking-tight text-white block">HANIFGOLD</span>
             )}
             <p className="text-sm leading-relaxed text-gray-500 font-light max-w-xs">{config.missionStatement}</p>
             <div className="flex space-x-5">
                <a href={config.instagramUrl} className="text-gray-500 hover:text-gold-500 transition-colors transform hover:-translate-y-1"><Icons.Instagram size={20} /></a>
                <a href={config.facebookUrl} className="text-gray-500 hover:text-gold-500 transition-colors transform hover:-translate-y-1"><Icons.Facebook size={20} /></a>
                <a href={config.tiktokUrl} className="text-gray-500 hover:text-gold-500 transition-colors transform hover:-translate-y-1"><Icons.TikTok className="w-5 h-5" /></a>
             </div>
          </div>
          <div>
            <h4 className="text-white font-serif font-bold mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-gold-500 transition-colors flex items-center gap-2"><Icons.ArrowRight size={12} className="opacity-0 hover:opacity-100 transition-opacity" /> All Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-gold-500 transition-colors flex items-center gap-2"><Icons.ArrowRight size={12} className="opacity-0 hover:opacity-100 transition-opacity" /> Our Portfolio</Link></li>
              <li><Link to="/news" className="hover:text-gold-500 transition-colors flex items-center gap-2"><Icons.ArrowRight size={12} className="opacity-0 hover:opacity-100 transition-opacity" /> News & Blog</Link></li>
              <li><Link to="/about" className="hover:text-gold-500 transition-colors flex items-center gap-2"><Icons.ArrowRight size={12} className="opacity-0 hover:opacity-100 transition-opacity" /> About Us</Link></li>
              <li><Link to="/admin" className="text-xs text-gray-700 hover:text-gray-500 mt-6 block uppercase tracking-widest font-bold">Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-serif font-bold mb-6 tracking-wide">Services</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-gray-300 transition-colors">Marble Installation</li>
              <li className="hover:text-gray-300 transition-colors">Granite Flooring</li>
              <li className="hover:text-gray-300 transition-colors">Bathroom Renovation</li>
              <li className="hover:text-gray-300 transition-colors">Outdoor Tiling</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-serif font-bold mb-6 tracking-wide">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group"><Icons.MapPin size={18} className="text-gold-600 group-hover:text-gold-500 mt-0.5 transition-colors"/> <span className="group-hover:text-gray-300 transition-colors">{config.address}</span></li>
              <li className="flex items-center gap-3 group"><Icons.Phone size={18} className="text-gold-600 group-hover:text-gold-500 transition-colors"/> <span className="group-hover:text-gray-300 transition-colors font-medium">{config.phone}</span></li>
              <li className="flex items-center gap-3 group"><Icons.Mail size={18} className="text-gold-600 group-hover:text-gold-500 transition-colors"/> <span className="group-hover:text-gray-300 transition-colors">{config.email}</span></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 uppercase tracking-wider">
          <p>© {new Date().getFullYear()} HanifGold Luxury Tiling. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-gray-500">Privacy Policy</span>
            <span className="cursor-pointer hover:text-gray-500">Terms of Service</span>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floater */}
      <a 
        href={`https://wa.me/${config.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-2xl z-50 transition-all hover:scale-110 hover:shadow-[#25D366]/40 flex items-center gap-3 group"
      >
        <Icons.MessageCircle size={24} fill="white" className="group-hover:rotate-12 transition-transform" />
        <span className="hidden md:inline font-bold pr-1 tracking-wide">Chat on WhatsApp</span>
      </a>
    </div>
  );
};

export default PublicLayout;