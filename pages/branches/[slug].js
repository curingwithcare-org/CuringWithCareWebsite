"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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
        const { data, error } = await supabase
          .from('branches')
          .select('*')
          .eq('slug', slug)
          .single();
        
        if (error) {
          console.error("Error fetching branch data:", error);
          setError("Failed to load branch information");
        } else if (data) {
          setBranch(data);
        } else {
          setError("Branch not found");
        }
      } catch (e) {
        console.error("Unexpected error:", e);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBranchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading branch information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center py-12 bg-red-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-700 mb-4">{error}</h2>
          <p className="text-gray-600 mb-6">We couldn't find the information you're looking for.</p>
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

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>{branch.city} Branch | CARE Nonprofit Organization</title>
        <meta name="description" content={`Learn about CARE's work in ${branch.city} and how we're making a difference locally.`} />
      </Head>
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-96 rounded-2xl overflow-hidden mb-12"
        >
          <div className="absolute inset-0">
            <img 
              src={branch.image} 
              alt={`${branch.city} Branch`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/branch-placeholder.png";
              }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${branch.color || "from-green-600 to-emerald-500"} opacity-70`}></div>
          </div>
          
          <div className="absolute inset-0 flex flex-col justify-center text-white p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-md">{branch.city}</h1>
              <div className="w-20 h-1 bg-white mb-6"></div>
              <p className="text-xl max-w-2xl">{branch.description}</p>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Branch Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="lg:col-span-2 bg-white rounded-xl p-8 shadow-md"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About Our {branch.city} Branch</h2>
            <p className="text-gray-700 leading-relaxed mb-8 text-lg">{branch.description}</p>
            
            {/* Chapters Section */}
            {branch.chapters && branch.chapters.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Local Chapters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {branch.chapters.map((chapter, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      className={`p-4 rounded-lg text-white bg-gradient-to-br ${branch.color || "from-green-600 to-emerald-500"}`}
                    >
                      <div className="font-medium">{chapter}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Regional Directors Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-white rounded-xl p-8 shadow-md"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Regional Directors</h2>
            {branch.rds && branch.rds.length > 0 ? (
              <div className="space-y-6">
                {branch.rds.map((rd, index) => (
                  <div key={index} className="flex items-center">
                    <div className="mr-4 w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                      <img 
                        src={`${supabaseUrl}/storage/v1/object/public/images/RDs/${rd.image}`} 
                        alt={rd.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/avatar-placeholder.png";
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{rd.name}</h3>
                      <p className="text-sm text-gray-500">Regional Director</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No regional directors listed at this time.</p>
            )}
          </motion.div>
        </div>
        
        {/* Back to All Branches */}
        <div className="text-center mt-12">
          <Link href="/branches" className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors">
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
