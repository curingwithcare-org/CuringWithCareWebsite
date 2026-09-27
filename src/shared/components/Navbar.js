"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change navbar opacity when scrolled more than 50px
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar transition-all duration-300 w-full ${
      scrolled 
        ? "bg-color-400 sticky top-0 scrolled" 
        : "bg-transparent fixed top-0 left-0"
    } z-50`}>
      <div className="navbar-brand items-center px-4">
        <Link href="/" className='block' style={{ margin: "1rem 0" }} onClick={closeMobileMenu}>
          <img src="/logo.png" alt="Logo" className="navbar-logo" />
        </Link>
        <button 
          className="navbar-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
      <div className={`navbar-menu pl-0 p-6 md:p-0 mr-6 ${mobileMenuOpen ? 'active' : ''}`}>
        <Link href="/" className="transition-colors duration-300 ease-in-out" onClick={closeMobileMenu}>Home</Link>
        <Link href="/about" className="transition-colors duration-300 ease-in-out" onClick={closeMobileMenu}>About</Link>
        <Link href="/events" className="transition-colors duration-300 ease-in-out min-w-[fit-content]" onClick={closeMobileMenu}>Past Events</Link>
        <Link href="/branches" className="transition-colors duration-300 ease-in-out" onClick={closeMobileMenu}>Branches</Link>
        <Link href="/team" className="transition-colors duration-300 ease-in-out" onClick={closeMobileMenu}>Team</Link>
        <a href="https://blog.curingwithcare.org" className="transition-colors duration-300 ease-in-out">Blog</a>
      </div>
    </nav>
  );
};

export default Navbar;
