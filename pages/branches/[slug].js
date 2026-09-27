"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from "motion/react";
import ChapterCard from "../../src/shared/components/ChapterCard";
import RegionImage from "../../src/shared/components/RegionImage";
import { fetchRegion, regionName } from "../../src/utils/chapters";


const BranchDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBranchData = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const data = await fetchRegion(slug);
        if (!data) {
          setError("Branch not found");
        } else if (!data.active) {
          setError("This branch is no longer active");
        } else {
          setBranch(data);
        }
      } catch (e) {
        console.error("Error fetching branch data:", e);
        setError("Failed to load branch information");
      } finally {
        setLoading(false);
      }
    };

    fetchBranchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading branch information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center py-12 bg-red-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-700 mb-4">{error}</h2>
          <p className="text-gray-600 mb-6">We couldn&apos;t find the information you&apos;re looking for.</p>
          <Link href="/branches" className="inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Return to All Branches
          </Link>
        </div>
      </div>
    );
  }

  if (!branch) {
    return null;
  }

  const name = regionName(branch);

  return (
    <div className="min-h-screen mt-16 bg-linear-to-b from-gray-50 to-gray-100">
      <Head>
        <title>{`${name} Branch | CARE Nonprofit Organization`}</title>
        <meta name="description" content={`Learn about CARE's work in ${name} and how we're making a difference locally.`} />
      </Head>
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-96 rounded-2xl overflow-hidden mb-12"
        >
          <RegionImage src={branch.image} alt={`${name} Branch`} logo="corner" />
          
          <div className="absolute inset-0 flex flex-col justify-center text-white p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-md">{name}</h1>
              <div className="w-20 h-1 bg-white mb-6"></div>
              {branch.description && <p className="text-xl max-w-2xl">{branch.description}</p>}
            </motion.div>
          </div>
        </motion.section>
        
        {/* About (only when the branch has a description) */}
        {branch.description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-white rounded-xl p-8 shadow-md mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About Our {name} Branch</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{branch.description}</p>
          </motion.div>
        )}

        {/* Chapters */}
        {branch.chapters.length > 0 && (
          <motion.section
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { delayChildren: 0.3, staggerChildren: 0.1 } } }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Local Chapters</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {branch.chapters.map((chapter) => (
                <ChapterCard key={chapter.id} chapter={chapter} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Back to All Branches */}
        <div className="text-center mt-12">
          <Link href="/branches" className="inline-flex items-center min-h-11 text-green-600 hover:text-green-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Branches
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BranchDetail;
