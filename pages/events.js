"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../src/app/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import dynamic from 'next/dynamic';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"; // Fixed import
import "yet-another-react-lightbox/plugins/thumbnails.css"; // Added proper CSS import
import Button from '@/app/components/Button';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Global state for lightbox
let lightboxState = {
  open: false,
  index: 0,
  slides: []
};

export default function Events() {
  const [events, setEvents] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [activeBranchId, setActiveBranchId] = useState(null);
  const [pittsburghBranchId, setPittsburghBranchId] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxSlides, setLightboxSlides] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch branches
        const { data: branchesData, error: branchesError } = await supabase
          .from('branches')
          .select('*')
          .order('city');

        if (branchesError) {
          console.error("Error fetching branch data:", branchesError);
          setError("Failed to load branch data");
          return;
        }

        // Fetch events
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .order('title');

        if (eventsError) {
          console.error("Error fetching events data:", eventsError);
          setError("Failed to load events");
          return;
        }

        // Find Pittsburgh branch
        const pittsburghBranch = branchesData.find(branch => 
          branch.city.toLowerCase() === 'pittsburgh');
        
        if (pittsburghBranch) {
          setPittsburghBranchId(pittsburghBranch.id);
          
          // Reorder branches to put Pittsburgh first if it exists
          const orderedBranches = [...branchesData];
          const pittsburghIndex = orderedBranches.findIndex(b => b.id === pittsburghBranch.id);
          if (pittsburghIndex > -1) {
            const [removed] = orderedBranches.splice(pittsburghIndex, 1);
            orderedBranches.unshift(removed);
          }
          
          setBranches(orderedBranches);
        } else {
          setBranches(branchesData);
        }
        
        setEvents(eventsData);
        
        // Keep "All Branches" as default view
        setActiveBranchId(null);
      } catch (e) {
        console.error("Unexpected error:", e);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Group events by branch
  const eventsByBranch = {};
  events.forEach(event => {
    if (!eventsByBranch[event.branch_id]) {
      eventsByBranch[event.branch_id] = [];
    }
    eventsByBranch[event.branch_id].push(event);
  });

  // Filter events based on active branch
  const filteredBranches = activeBranchId === null 
    ? branches 
    : branches.filter(branch => branch.id === activeBranchId);

  // Handle tab click
  const handleTabClick = (branchId) => {
    setActiveBranchId(branchId);
    // Smooth scroll to top of events section
    document.getElementById('events-section').scrollIntoView({ behavior: 'smooth' });
  };

  // Function to open lightbox from any event card
  const openGlobalLightbox = (slides, index) => {
    setLightboxSlides(slides);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>Past Events | CARE Nonprofit Organization</title>
        <meta name="description" content="Explore past events hosted by CARE" />
      </Head>
      
      <main className="container mx-auto px-4 py-12">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-green-500 mb-6 mt-24">Our Past Events</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Explore the events we've hosted across our branches. Each event showcases our commitment to making a positive impact in communities worldwide.
          </p>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="rounded-3xl border border-green-100 bg-white/80 p-6 shadow-xl backdrop-blur md:p-8">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-green-600">
                  Review Paper Competitions
                </p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
                  Explore both CARE review paper competitions
                </h2>
                <p className="mt-2 max-w-2xl text-gray-600">
                  Read the first edition and the new 2nd Edition, with prompts,
                  winners, and submission details collected in one place.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
                  First Edition
                </p>
                <h3 className="mt-2 text-xl font-bold text-gray-900">
                  CARE Review Paper Competition
                </h3>
                <p className="mt-2 text-gray-600">
                  View the original competition prompt, finalist papers, and
                  award recipients.
                </p>
                <div className="mt-5">
                  <Button link="/research-competition" text="Open First Edition" />
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                  2nd Edition
                </p>
                <h3 className="mt-2 text-xl font-bold text-gray-900">
                  CARE Review Paper Competition 2nd Edition
                </h3>
                <p className="mt-2 text-gray-600">
                  Read the new prompts and see the 2nd Edition placements.
                  Paper titles and the first-place PDF will be added soon.
                </p>
                <div className="mt-5">
                  <Button link="/research-competition-2" text="Open Second Edition" />
                </div>
              </div>
            </div>
          </div>
        </motion.section>
                              
        {/* Branch Navigation */}
        {!loading && !error && branches.length > 0 && (
          <div className="mb-12 overflow-x-auto pb-2">
            <div className="flex justify-center min-w-max">
              <div className="inline-flex bg-white rounded-lg shadow-md p-1">
                <button
                  onClick={() => handleTabClick(null)}
                  className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium rounded-md transition-all duration-200 ${
                    activeBranchId === null
                      ? 'bg-green-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All Branches
                </button>
                {branches.map(branch => (
                  <button
                    key={branch.id}
                    onClick={() => handleTabClick(branch.id)}
                    className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium rounded-md transition-all duration-200 ${
                      activeBranchId === branch.id
                        ? 'bg-green-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {branch.city}
                    {branch.id === pittsburghBranchId && <span className="ml-1 text-green-600">★</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Events Content */}
        <div id="events-section">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading events...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-red-50 rounded-lg">
              <p className="text-red-500">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBranchId || 'all'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {filteredBranches.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No branches found</p>
                  </div>
                ) : (
                  filteredBranches.map(branch => {
                    const branchEvents = eventsByBranch[branch.id] || [];
                    if (branchEvents.length === 0) return null;
                    
                    const isPittsburgh = branch.id === pittsburghBranchId;

                    return (
                      <motion.section 
                        key={branch.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className={`mb-16`}
                      >
                        <h2 className={`text-3xl font-bold mb-8 pb-3 border-b-2`}>
                          {branch.city}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {branchEvents.map(event => (
                            <EventCard 
                              key={event.id} 
                              event={event} 
                              branchData={branch}
                              openGlobalLightbox={openGlobalLightbox}
                              isPittsburgh={false}
                            />
                          ))}
                        </div>
                      </motion.section>
                    );
                  })
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        
        {/* Back to top button */}
        <BackToTopButton />
      </main>

      {/* Global Lightbox Component */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        plugins={[Zoom, Thumbnails]}
        className="full-page-lightbox"
        carousel={{
          padding: "0px",
          spacing: "16px",
        }}
        thumbnails={{
          position: "bottom",
          width: 120,
          height: 80,
          border: 2,
          borderRadius: 4,
          padding: 4,
          gap: 16
        }}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .9)" } }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </div>
  );
}

function EventCard({ event, branchData, openGlobalLightbox, isPittsburgh }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchEventImages() {
      try {
        if (!event.images_folder) {
          setImages([]);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .storage
          .from('images')
          .list("events/" + event.images_folder, {
            sortBy: { column: 'name', order: 'asc' },
          });

        if (error) {
          console.error("Error fetching images:", error);
          setError("Failed to load images");
          return;
        }

        const filteredImages = data.filter(item => 
          !item.name.endsWith('/') && 
          (item.name.endsWith('.jpg') || 
           item.name.endsWith('.jpeg') || 
           item.name.endsWith('.png') || 
           item.name.endsWith('.gif'))
        );
        
        setImages(filteredImages);
      } catch (e) {
        console.error("Unexpected error loading images:", e);
        setError("An error occurred loading images");
      } finally {
        setLoading(false);
      }
    }

    fetchEventImages();
  }, [event]);

  const getImageUrl = (path) => {
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(`${"events/" + event.images_folder}/${path}`);
    return data.publicUrl;
  };

  // Generate lightbox slides
  const openLightbox = (index) => {
    const slides = images.map(image => ({
      src: getImageUrl(image.name),
      alt: `${event.title} - ${image.name}`,
      width: 1600,
      height: 900
    }));
    openGlobalLightbox(slides, index);
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl overflow-hidden shadow-lg 
        ${isPittsburgh ? 'ring-2 ring-green-400 ring-offset-2' : ''}`}
    >
      <div className="p-6">
        <h3 className={`text-2xl font-bold mb-3 ${isPittsburgh ? 'text-green-700' : 'text-gray-800'}`}>
          {event.title}
        </h3>
        {event.description && (
          <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        )}
        
        <div className="mt-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 text-sm text-center py-4">{error}</p>
          ) : images.length === 0 ? (
            <p className="text-gray-400 italic text-center py-4">No images available</p>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-1">
                {images.slice(0, 6).map((image, index) => (
                  <div 
                    key={image.id} 
                    className="relative aspect-square overflow-hidden rounded cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <Image 
                      src={getImageUrl(image.name)}
                      alt={`Image from ${event.title}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="hover:scale-110 transition-transform duration-300"
                    />
                    {index === 5 && images.length > 6 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white font-bold">
                        +{images.length - 6} more
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {images.length > 0 && (
                <button 
                  onClick={() => openLightbox(0)}
                  className="w-full mt-3 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8v8a2 2 0 002 2h12a2 2 0 002-2V8m-12 4h.01M8 12h.01M12 12h.01M16 12h.01M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
                  </svg>
                  View Gallery ({images.length} images)
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button when page is scrolled down
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all duration-300"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
