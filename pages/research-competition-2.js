"use client";

import Head from "next/head";
import Navbar from "../src/app/components/Navbar";
import { motion } from "framer-motion";

const prompts = [
  "The moral issues surrounding the availability of treatment and the new technologies developed.",
  "The present treatment modalities, their effectiveness, and their drawbacks.",
  "The future of research that can enhance detection, prevention, and treatment.",
  "The risk factors, the disparities in the affected population, and the impact on society.",
];

const placements = [
  {
    place: "1st Place",
    authors: "Anna Chen and Sanai Purkait",
    paperTitle: "Paper title coming soon",
    note: "First-place PDF link will be added once available.",
  },
  {
    place: "2nd Place",
    authors: "Rishabh Patel, Akshajan Nadanasaran, Prithvi Damodhar",
  },
  {
    place: "3rd Place",
    authors: "Jimin Yoo and Hyowon Jo",
  },
  {
    place: "4th Place",
    authors: "Nirmal Vasanth, Rithvik Chintakuntla, Naomika Reddy",
  },
  {
    place: "5th Place",
    authors: "Grace Yang, Riya Piwar, Srinika Dasari",
  },
  {
    place: "6th Place",
    authors: "Clarissa Gunawan, Puja Raut, Lily Fabella",
  },
  {
    place: "7th Place",
    authors: "Dharshenee Kasiviswanathan",
  },
  {
    place: "8th Place",
    authors: "Vivian Zheng",
  },
  {
    place: "9th Place",
    authors: "Emy Reetoo and Khloe Martinez",
  },
  {
    place: "10th Place",
    authors: "Sophia Hesseling and Sanvi Jain",
  },
];

export default function ResearchCompetitionSecondEdition() {
  const firstPlace = placements[0];
  const runnerUps = placements.slice(1, 3);
  const otherPlacements = placements.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>CARE Review Paper Competition 2nd Edition | CARE</title>
        <meta
          name="description"
          content="CARE Review Paper Competition 2nd Edition, prompts, and winners"
        />
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
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-green-600 mt-24">
            CARE Review Paper Competition
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-green-600 mt-4 mb-6">
            2nd Edition
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            The second edition expands the review paper challenge with new
            prompts focused on treatment access, ethics, research directions,
            and the broader impact of cancer on society.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
            Prompts
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {prompts.map((prompt, index) => (
              <div
                key={prompt}
                className="rounded-xl border border-green-100 bg-green-50/60 p-5"
              >
                <p className="text-sm font-semibold text-green-700 mb-2">
                  Prompt {index + 1}
                </p>
                <p className="text-gray-700 leading-relaxed">{prompt}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-1 bg-green-300" />
            <h2 className="text-3xl font-bold text-center text-green-600 mx-4">
              First Place Winner
            </h2>
            <div className="w-12 h-1 bg-green-300" />
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="inline-block bg-yellow-400 text-gray-800 px-4 py-1 rounded-full font-bold shadow-md mb-4">
                    {firstPlace.place}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {firstPlace.authors}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold text-gray-900">Paper:</span>{" "}
                    {firstPlace.paperTitle}
                  </p>
                  <p className="text-gray-600 mb-6">{firstPlace.note}</p>
                  <div className="rounded-xl border border-dashed border-green-200 bg-green-50 p-4 text-sm text-green-800">
                    The paper title and PDF link will appear here once they are available.
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    disabled
                    className="inline-flex items-center bg-gray-100 text-gray-500 py-2 px-4 rounded-md cursor-not-allowed"
                  >
                    Download Paper Coming Soon
                  </button>
                </div>
              </div>

              <div className="relative bg-gray-100 min-h-[300px] md:min-h-[500px]">
                <div className="flex items-center justify-center h-full p-8">
                  <div className="text-center max-w-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-600 mb-4">The first-place paper PDF will be embedded here when it is ready.</p>
                    <p className="text-gray-500 text-sm">Paper title and link are pending.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-1 bg-green-300" />
            <h2 className="text-3xl font-bold text-center text-green-600 mx-4">
              Runners-Up
            </h2>
            <div className="w-12 h-1 bg-green-300" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {runnerUps.map((paper) => (
              <motion.div
                key={paper.place}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <div className="p-6">
                  <div className="inline-block bg-yellow-400 text-gray-800 px-4 py-1 rounded-full font-bold shadow-md mb-4">
                    {paper.place}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {paper.authors}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-1 bg-green-300" />
            <h2 className="text-3xl font-bold text-center text-green-600 mx-4">
              Honorable Mentions
            </h2>
            <div className="w-12 h-1 bg-green-300" />
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-12 bg-green-600 text-white font-semibold py-4 px-6">
              <div className="col-span-3 md:col-span-2">Place</div>
              <div className="col-span-5 md:col-span-7">Paper Title</div>
              <div className="col-span-4 md:col-span-3">Author</div>
            </div>

            {otherPlacements.map((paper, index) => (
              <div
                key={paper.place}
                className={`grid grid-cols-12 py-4 px-6 items-center ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <div className="col-span-3 md:col-span-2 font-semibold text-gray-900">
                  {paper.place}
                </div>
                <div className="col-span-5 md:col-span-7 font-medium text-gray-800">
                  Paper title coming soon
                </div>
                <div className="col-span-4 md:col-span-3 text-gray-600">
                  {paper.authors}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}