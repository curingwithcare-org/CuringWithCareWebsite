"use client";

import React, { useEffect } from 'react';
import Navbar from '../src/app/components/Navbar';
import Button from '../src/app/components/Button';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  return (
    <div className="bg-white">
      <main className="relative p-12 pt-36 md:pt-24 bg-cover bg-center flex flex-col gap-0 row-start-2 items-center justify-start text-center sm:items-start min-h-[80vh]"
        style={{
          backgroundImage: "url('/mission.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full inset-0 bg-black opacity-60"></div>

        <div className="relative z-10 min-h-[60vh] flex flex-col gap-8 items-center justify-center text-center sm:items-start max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <h1 className="mt-8 text-6xl md:text-7xl w-full md:w-[90%] text-white font-bold text-left sm:mt-0 leading-[1.2]">
              Our <span className="text-green-400">Mission</span> to Transform Lives
            </h1>
            <p className="mt-6 text-xl md:text-2xl w-full md:w-[80%] text-green-400 font-semibold text-left leading-relaxed">
              Rewriting the narrative to foster hope, resilience, and triumph in the face of cancer.
            </p>
          </motion.div>
        </div>
      </main>

      <section className="py-20 px-6 md:px-12 flex flex-col items-center text-left max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className='text-lg md:text-xl text-left w-full font-light leading-relaxed'>
            Cancer is a mutation-driven disease, leading to the possibility of traveling infinite different paths from start to finish. Originated from cells and capable of influencing the entire body, the rapid expansion leads to missed or complicated diagnoses that harm patients. Although cancer is essentially simple, we still misunderstand the true actions that get cancer going. The complexity of each individual tumor, although pushing new forms of treatment, brings about astonishing space to recourse and address. <span className="font-medium">At CARE, we introduce and expand on the questions behind its life and the patients affected by it.</span>
          </p>
        </motion.div>

        <div className="w-full mb-20">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='text-5xl font-bold text-center w-full mb-16'
          >
            Empowerment through<span className="text-green-500">...</span>
          </motion.h2>

          <div className="space-y-24">
            <EmpowermentSection 
              title="Awareness" 
              content="Cancer awareness primarily shares information regarding signs, markers, symptoms, and situations in which cancer may develop. We <span class='text-green-500 font-medium'>support resources</span> for youth to better understand people with cancer, and learn about how cancer affects everyone. We <span class='text-green-500 font-medium'>advocate for proper treatment</span> in all regions of the country, with an emphasis on acknowledging equity gaps within our area where people do not have access to treatment. At CARE, <span class='text-green-500 font-medium'>we help provide answers and pathways</span> for change in your community."
              imageUrl="/awareness.png"
              isReversed={false}
            />
            
            <EmpowermentSection 
              title="Research" 
              content="Cancer research is a deep and comprehensive field, with unbridled limits encouraging us to continue and support research done across the world. By communicating the research's key-moments, magnitude, and presence within the community, organizations like the American Cancer Society, which we donate to, can play an invaluable role in the trajectory of finding more sustainable and less damaging treatment options for cancer patients."
              imageUrl="/research.png"
              isReversed={true}
            />
            
            <EmpowermentSection 
              title="Education" 
              content="At CARE, we take the responsibility to <span class='text-green-500 font-medium'>engage our peers</span> with guest speakers, so we provide them with relevant and pressing information so they can be well informed. A solid foundation in cancer's most fundamental role within society gives way for inquisitive minds to grasp what role they want to play in the future."
              imageUrl="/edu.png"
              isReversed={false}
            />
          </div>
        </div>

        <ImpactStats />

        <div className="w-full mt-16 bg-gray-50 p-8 rounded-lg shadow-sm">
          <h2 className="text-3xl font-bold mb-6 text-center">Join Our Mission</h2>
          <p className="text-center text-lg mb-8">Together, we can make a difference in the lives of those affected by cancer.</p>
          <div className="flex justify-center">
            <Button text="Get Involved Today" link="https://forms.gle/S2WH6htwdTTHK2gy9" className="text-lg py-3 px-8" />
          </div>
        </div>
      </section>
    </div>
  );
};

const EmpowermentSection = ({ title, content, imageUrl, isReversed }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
    >
      <div className="w-full md:w-1/2">
        <div className="relative">
          {imageUrl && (
            <div className="rounded-lg overflow-hidden shadow-md">
              <img src={imageUrl} alt={`${title}`} className="w-full h-64 md:h-80 object-cover" />
            </div>
          )}
        </div>
      </div>
      
      <div className="w-full md:w-1/2">
        <h3 className="text-4xl font-bold text-green-500 mb-4 flex items-center">
          {title}
          <span className="ml-3 h-px bg-green-300 flex-grow"></span>
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: content }}></p>
      </div>
    </motion.div>
  );
};

const ImpactStats = () => {
  const stats = [
    { value: '900+', label: 'Members Worldwide' },
    { value: '$30K', label: 'Raised' },
    { value: '40+', label: 'Chapters' },
  ];

  return (
    <div className="w-full py-16 my-12 bg-green-50 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-4xl font-bold text-green-600 mb-2">{stat.value}</p>
            <p className="text-lg text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
