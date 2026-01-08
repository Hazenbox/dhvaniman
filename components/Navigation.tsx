import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useJourney } from '../context/JourneyContext';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useJourney();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    
    // Handle home link
    if (targetId === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      // Offset for fixed header (approx 100px to be safe)
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleBeginJourney = () => {
    openModal();
    setIsOpen(false);
  };

  const navLinks = [
    { label: 'Moods', href: '#moods' },
    { label: 'Rhythm', href: '#rhythm' },
    { label: 'Journeys', href: '#journeys' },
    { label: 'Workshops', href: '#workshops' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-void-950/90 backdrop-blur-md py-4 shadow-sm border-b border-void-800 text-earth-100' 
          : 'bg-transparent py-6 text-earth-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a 
          href="#" 
          onClick={(e) => scrollToSection(e, '#')}
          className="font-serif text-2xl tracking-wide font-medium relative z-50"
        >
          The Dhvaniman
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              onClick={(e) => scrollToSection(e, link.href)}
              className={`text-sm uppercase tracking-widest hover:text-clay-500 transition-colors cursor-pointer ${isScrolled ? 'text-earth-300' : 'text-earth-200'}`}
            >
              {link.label}
            </a>
          ))}
          <button 
            onClick={handleBeginJourney}
            className={`px-5 py-2 rounded-full border transition-all hover:bg-clay-600 hover:border-clay-600 hover:text-white ${isScrolled ? 'border-void-700 text-earth-100' : 'border-white text-white'}`}
          >
            Begin Journey
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden z-50 relative" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`fixed inset-0 bg-void-950 text-earth-100 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              onClick={(e) => scrollToSection(e, link.href)}
              className="font-serif text-3xl hover:text-clay-500 transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <button 
            onClick={handleBeginJourney}
            className="font-serif text-3xl text-clay-500 hover:text-clay-400 transition-colors cursor-pointer"
          >
            Begin Journey
          </button>
      </div>
    </nav>
  );
};