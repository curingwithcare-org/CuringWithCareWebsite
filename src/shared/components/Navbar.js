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

  // Close the mobile menu with the Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mobileMenuOpen]);

  return (
    <nav className={`navbar transition-all duration-300 w-full fixed top-0 left-0 ${
      scrolled ? "bg-color-400 scrolled" : "bg-transparent"
    } ${mobileMenuOpen ? "menu-open" : ""} z-50`}>
      <div className="navbar-brand items-center px-4">
        <Link href="/" className='block max-md:flex max-md:items-center max-md:min-h-11' style={{ margin: "1rem 0" }} onClick={closeMobileMenu}>
          <img src="/logo.png" alt="Logo" className="navbar-logo" />
        </Link>
        <button 
          className="navbar-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="site-menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
      <div id="site-menu" className={`navbar-menu pl-0 p-6 md:p-0 mr-6 ${mobileMenuOpen ? 'active' : ''}`}>
        <Link href="/" className="transition-colors duration-300 ease-in-out" onClick={closeMobileMenu}>Home</Link>
        <Link href="/about" className="transition-colors duration-300 ease-in-out" onClick={closeMobileMenu}>About</Link>
        <Link href="/events" className="transition-colors duration-300 ease-in-out min-w-fit" onClick={closeMobileMenu}>Past Events</Link>
        <Link href="/branches" className="transition-colors duration-300 ease-in-out" onClick={closeMobileMenu}>Branches</Link>
        <Link href="/team" className="transition-colors duration-300 ease-in-out" onClick={closeMobileMenu}>Team</Link>
        {/* Hidden while blog.curingwithcare.org (Ghost on Oracle Cloud) is down. Uncomment once it's back up.
        <a href="https://blog.curingwithcare.org" className="transition-colors duration-300 ease-in-out">Blog</a> */}
      </div>
    </nav>
  );
};

export default Navbar;
