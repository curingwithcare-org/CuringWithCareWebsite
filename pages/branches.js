"use client";

import React, { useState, useEffect } from 'react';
import Button from '../src/shared/components/Button';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from "motion/react";
import ChapterCard from '../src/shared/components/ChapterCard';
import { fetchRegions, regionName } from "../src/utils/chapters";

// Each region fades in as it scrolls into view, then its cards follow one by one.
const regionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
};

const Branches = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Active regions and their chapters from Supabase
  useEffect(() => {
    const loadRegions = async () => {
      try {
        setLoading(true);
        setRegions(await fetchRegions());
      } catch (e) {
        console.error("Error fetching branch data:", e);
        setError("Failed to load branch locations");
      } finally {
        setLoading(false);
      }
    };

    loadRegions();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
      <Head>
        <title>Our Branches | CARE Nonprofit Organization</title>
        <meta name="description" content="Find CARE nonprofit locations across the country" />
      </Head>
      
      <main className="container mx-auto px-4 py-12">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-green-500 mb-6 mt-24">Our Branches Worldwide</h1>
          <div className="w-24 h-1 bg-linear-to-r from-green-500 to-emerald-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            CARE has established branches across the world.
            Explore our locations below and discover how we&apos;re making a difference in each region.
          </p>
        </motion.section>
        
        <section className="mb-20">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading branch locations...</p>
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
            <div className="space-y-16">
              {regions.map((region) => (
                <motion.section
                  key={region.id ?? regionName(region)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={regionVariants}
                >
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-x-6 mb-8 pb-3 border-b-2">
                    <h2 className="text-3xl font-bold">{regionName(region)}</h2>
                    {region.slug && (
                      <Link
                        href={`/branches/${region.slug}`}
                        className="group inline-flex items-center min-h-11 text-lg font-medium text-green-600 hover:text-green-700 transition-colors"
                      >
                        <span className="mr-2">Visit Branch</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {region.chapters.map((chapter) => (
                      <ChapterCard key={chapter.id} chapter={chapter} region={region} />
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>
          )}
        </section>
        
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative bg-linear-to-r from-green-600 to-emerald-500 p-12 rounded-2xl text-center text-white max-w-5xl mx-auto overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Join Our Global Movement</h2>
            <p className="mb-8 text-lg max-w-2xl mx-auto">
              Each CARE branch focuses on serving local community needs while supporting our broader mission.
              No branch near you? Start your own and make a difference in your community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                text="Start a Branch" 
                link="https://forms.gle/S2WH6htwdTTHK2gy9"
              />
            </div>
          </div>
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white"></div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Branches;
