"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../src/app/components/Navbar';
import { motion } from 'framer-motion';

export default function ResearchCompetition() {
  // Example data for winners and submissions
  const firstPlace = { 
    id: 1, 
    title: "The Global Burden of Cervical Cancer: A Systematic Review of Social Implications, Ethical Considerations, and Scientific Challenges ", 
    author: "Angela Choi", 
    award: "First Place", 
    abstract: "",
    pdfUrl: "https://sharex.shuchir.dev/u/ORb5uK.pdf",
  };

  const runnerUps = [
    { 
      id: 2, 
      title: "From Prevention to Cure: Ethical, Social, and Scientific Perspectives on Cervical Cancer Management and Innovations in Treatment", 
      author: "Sanvi Jain and Sophie Hesseling", 
      award: "Second Place", 
      abstract: "" 
    },
    { 
      id: 3, 
      title: "CERVICAL CANCER: A NEEDED URGENT REFORM", 
      author: "Medhansh Garadala and Junseo Lee", 
      award: "Third Place", 
      abstract: "" 
    }
  ];

  const otherSubmissions = [
    { id: 4, title: "Cervical Cancer: Knowledge is the Cure", author: "Neerajana Chatterjee and Harshini Rajmohan" },
    { id: 5, title: "Towards the Elimination of Cervical Cancer: Challenges, Ethics, and Directions for the Future", author: "Vaanya Agarwal" },
    { id: 6, title: "Breaking the Silence: A Global Fight Against Cervical Cancer", author: "Riya Amara and Diya Kumar" },
    { id: 7, title: "Cervical Cancer: A Newfound Hope", author: "Shruthi Karri and Ananti Burman" },
    { id: 8, title: "Cervical Cancer: Global Challenges and a Path to Eradication", author: "Angela Zeng" },
    { id: 9, title: "An Analysis Of Cervical Cancer: Overcoming a Bridge in Women's Health", author: "Obuthanusre Obulisundar and Anvi Mathur" },
    { id: 10, title: "An Overview of Cervical Cancer", author: "Nikhil Amalraj and Rohan Paranjpe" },
  ];

  // State to manage PDF viewer visibility - now true by default
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>Research Paper Competition | CARE Nonprofit Organization</title>
        <meta name="description" content="Annual Research Paper Competition on Climate Action and Renewable Energy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-green-500 mb-6 mt-24">CARE Review Paper Competition</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto mb-6"></div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-green-600 mb-6">Prompt</h2>
          <p className="text-gray-700 mb-6">
          Cervical cancer remains a major public health problem in the world despite the increase in prevention and management methods. The introduction of HPV vaccination and improvement of screening methods have reduced its incidence in many regions, though accessibility and awareness remain problems in most underprivileged areas. Discuss the current obstacles to the eradication of cervical cancer, the ethical considerations in the improvement of access to prevention and care, and new research directions that will contribute to the early detection, prevention, and treatment of cervical cancer. 
          </p>
        </motion.section>

        {/* First Place Feature Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-1 bg-green-300"></div>
            <h2 className="text-3xl font-bold text-center text-green-600 mx-4">First Place Winner</h2>
            <div className="w-12 h-1 bg-green-300"></div>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left side with image and basic info */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="inline-block bg-yellow-400 text-gray-800 px-4 py-1 rounded-full font-bold shadow-md mb-4">
                    First Place
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{firstPlace.title}</h3>
                  <p className="text-green-600 font-medium mb-1">{firstPlace.author}</p>
                  <p className="text-gray-600 mb-6">{firstPlace.abstract}</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <a 
                    href={firstPlace.pdfUrl} 
                    download="Angela_Choi_Cervical_Cancer_Research.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Paper
                  </a>
                </div>
              </div>
              
              {/* Right side with PDF preview - now shown by default */}
              <div className="relative bg-gray-100 min-h-[300px] md:min-h-[500px]">
                {isPdfViewerOpen ? (
                  <iframe 
                    src={`${firstPlace.pdfUrl}#toolbar=1&navpanes=0`} 
                    className="absolute inset-0 w-full h-full"
                    title={`${firstPlace.title} by ${firstPlace.author}`}
                    loading="lazy"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full p-8">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-gray-600 mb-4">Click "View Paper" to read the full research paper</p>
                      <p className="text-gray-500 text-sm">PDF preview will be displayed here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* Second and Third Place Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-1 bg-green-300"></div>
            <h2 className="text-3xl font-bold text-center text-green-600 mx-4">Runners-Up</h2>
            <div className="w-12 h-1 bg-green-300"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {runnerUps.map((paper) => (
              <motion.div 
                key={paper.id} 
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <div className="p-6">
                  <div className="inline-block bg-yellow-400 text-gray-800 px-4 py-1 rounded-full font-bold shadow-md mb-4">
                    {paper.award}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{paper.title}</h3>
                  <p className="text-green-600 font-medium mb-1">{paper.author}</p>
                  <p className="text-gray-600 mb-6">{paper.abstract}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Other Submissions Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-1 bg-green-300"></div>
            <h2 className="text-3xl font-bold text-center text-green-600 mx-4">Honorable Mentions</h2>
            <div className="w-12 h-1 bg-green-300"></div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-12 bg-green-600 text-white font-semibold py-4 px-6">
              <div className="col-span-6 md:col-span-7">Paper Title</div>
              <div className="col-span-4 md:col-span-3">Author</div>
            </div>
            
            {otherSubmissions.map((paper, index) => (
              <div 
                key={paper.id} 
                className={`grid grid-cols-12 py-4 px-6 items-center ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <div className="col-span-6 md:col-span-7 font-medium text-gray-800">{paper.title}</div>
                <div className="col-span-4 md:col-span-3 text-gray-600">{paper.author}</div>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
