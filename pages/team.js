"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../src/app/components/Navbar';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Teams = () => {
  const [boardMembers, setBoardMembers] = useState([]);
  const [researchMembers, setResearchMembers] = useState([]);
  const [interns, setInterns] = useState([]);
  const [journalismMembers, setJournalismMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  
  // Fetch team members from Supabase
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        // Fetch board members
        const { data: boardData, error: boardError } = await supabase
          .from('team_members')
          .select('*')
          .eq('category', 'board')
          .order('order_rank', { ascending: true });
        
        // Fetch research & design members
        const { data: researchData, error: researchError } = await supabase
          .from('team_members')
          .select('*')
          .eq('category', 'research')
          .order('name', { ascending: true });
          
        // Fetch interns
        const { data: internsData, error: internsError } = await supabase
          .from('team_members')
          .select('*')
          .eq('category', 'intern')
          .order('name', { ascending: true });

        const { data: journalismData, error: journalismError } = await supabase
          .from('team_members')
          .select('*')
          .eq('category', 'journalism')
          .order('name', { ascending: true });

        if (boardError) {
          setError("Failed to load board members");
        } else if (researchError) {
          setError("Failed to load research members");
        } else if (internsError) {
          setError("Failed to load interns");
        } else if (journalismError) {
          setError("Failed to load journalism team");
        } else {
          setBoardMembers(boardData || []);
          setResearchMembers(researchData || []);
          setInterns(internsData || []);
          setJournalismMembers(journalismData || []);
        }
      } catch (e) {
        console.error("Unexpected error:", e);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Function to handle expanding/collapsing description
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Function to truncate text
  const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // Function to get random color
  const getRandomColor = (index) => {
    const colors = ['green', 'emerald', 'teal', 'sky', 'blue', 'indigo'];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>Our Team | CARE Nonprofit Organization</title>
        <meta name="description" content="Meet the dedicated board members behind CARE nonprofit organization" />
      </Head>
      
      <main className="container mx-auto px-4 py-12">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-green-500 mb-6 mt-24">Our Board</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Meet the dedicated individuals who guide our mission and work tirelessly 
            to ensure CARE makes a meaningful difference around the world.
          </p>
        </motion.section>
        
        <section className="mb-20">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading team members...</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {boardMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
                >
                  <div className="relative h-64">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/team-placeholder.png";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                      <h2 className="text-2xl font-bold text-white">{member.name}</h2>
                      <p className="text-green-300 font-medium">{member.position}</p>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex-grow">
                      {expandedId === member.id ? (
                        <AnimatePresence>
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-gray-700 leading-relaxed"
                          >
                            <p>{member.description}</p>
                          </motion.div>
                        </AnimatePresence>
                      ) : (
                        <p className="text-gray-700 leading-relaxed">
                          {truncateText(member.description)}
                        </p>
                      )}
                    </div>
                    
                    {/* Show read more/less button only if description is long enough */}
                    {member.description && member.description.length > 100 && (
                      <button 
                        onClick={() => toggleExpand(member.id)}
                        className="text-green-600 hover:text-green-700 font-medium mt-2 focus:outline-none group flex items-center"
                      >
                        {expandedId === member.id ? 'Read Less' : 'Read More'}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-4 w-4 ml-1 transform transition-transform ${expandedId === member.id ? 'rotate-180' : ''}`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                    
                    {/* Optional social links */}
                    {member.social && (
                      <div className="mt-4 pt-3 border-t border-gray-100 flex gap-3">
                        {member.social.linkedin && (
                          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" 
                             className="text-gray-400 hover:text-green-600 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          </a>
                        )}
                        {member.social.twitter && (
                          <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" 
                             className="text-gray-400 hover:text-green-600 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
        
        {/* Research & Design Team Section */}
        {!loading && !error && researchMembers.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-32 mb-20"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-500 mb-6">Research & Design Team</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto mb-6"></div>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                {researchMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ scale: 1.05 }}
                    className={`py-6 px-3 rounded-lg shadow-sm
                               bg-gradient-to-br from-${getRandomColor(index)}-50 to-${getRandomColor(index)}-100
                               border border-${getRandomColor(index)}-200`}
                  >
                    <span className="font-medium text-gray-800 block">
                      {member.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        )}
        
        {/* Journalism Team Section */}
        {!loading && !error && journalismMembers.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-20 mb-20"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-500 mb-6">Journalism Team</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto mb-6"></div>
            </div>

            <div className="max-w-5xl mx-auto">
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                {journalismMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ scale: 1.05 }}
                    className={`py-6 px-3 rounded-lg shadow-sm
                               bg-gradient-to-br from-${getRandomColor(index)}-50 to-${getRandomColor(index)}-100
                               border border-${getRandomColor(index)}-200`}
                  >
                    <span className="font-medium text-gray-800 block">
                      {member.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        )}
        
        {/* Interns Section */}
        {!loading && !error && interns.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-32 mb-20"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-500 mb-6">Our Interns</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto mb-6"></div>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {interns.map((intern, index) => (
                  <motion.div
                    key={intern.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    whileHover={{ y: -10 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-32 h-32 rounded-full overflow-hidden shadow-md mb-4 bg-gray-100 border-4 border-white">
                      <img 
                        src={intern.image || "/team-placeholder.png"} 
                        alt={intern.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/team-placeholder.png";
                        }}
                      />
                    </div>
                    <h3 className="text-center font-medium text-lg text-gray-800">{intern.name}</h3>
                    {intern.university && (
                      <p className="text-sm text-gray-500 text-center mt-1">{intern.university}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
};

export default Teams;
