"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Button from "../src/app/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { throttle } from "../src/utils/throttle";
import Head from "next/head";
import ErrorBoundary from "../src/app/components/ErrorBoundary";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Animation variants for better performance
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Loading component for Suspense fallback
const LoadingPlaceholder = () => (
  <div className="flex items-center justify-center h-40">
    <div className="animate-pulse flex space-x-2">
      <div className="w-3 h-3 bg-color-500 rounded-full"></div>
      <div className="w-3 h-3 bg-color-500 rounded-full"></div>
      <div className="w-3 h-3 bg-color-500 rounded-full"></div>
    </div>
  </div>
);

export default function Home() {
  const [files, setFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("Awareness");
  const features = ["Awareness", "Research", "Education"];
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Optimized Intersection Observer configurations
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [eventsRef, eventsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [numbersRef, numbersInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [stayUpToDateRef, stayUpToDateInView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Check for mobile device on mount with a more efficient approach
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    // Initial check
    checkMobile();
    
    // Throttled resize handler
    const handleResize = throttle(checkMobile, 200);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Improved data fetching with proper error handling
  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        let { data, error } = await supabase.from('data').select("section, file_ids");
        if (error) throw error;
        
        // Find landing.events section data
        let eventData = data.find(row => row.section === "landing.events");
        if (!eventData) throw new Error("Event data not found");
        
        // Fetch all file URLs in parallel
        const filePromises = eventData.file_ids.map(async (fileName) => {
          const { data, error } = supabase.storage.from('images').getPublicUrl(fileName);
          if (error) return null;
          return data.publicUrl;
        });
        
        const fileLinks = await Promise.all(filePromises);
        setFiles(fileLinks.filter(Boolean));
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  // Text animation for hero section
  const heroText = "curingwithCARE";
  
  useEffect(() => {
    const banner = document.getElementById("announcement-banner");
    if (banner) {
      const nav = document.querySelector("nav");
      if (nav) nav.style.marginTop = "3rem";
    }
  }, []);

  return (
    <>
      <Head>
        <title>CARE - Cancer Awareness, Research, and Education</title>
        <meta name="description" content="Dedicated to the advancement of cancer awareness, research, and education" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      {/* Announcement Banner */}
      {/* <div id="announcement-banner" className="w-full bg-gradient-to-r from-pink-500 to-red-400 text-white py-3 px-4 text-center font-semibold text-lg shadow-md">
        🚨 <span className="font-bold">New!</span> Cancer Awareness & Action Challenge is happening now! 
        <a href="/caac" className="underline font-bold ml-2 hover:text-yellow-200 transition-colors">More info here</a>
      </div> */}

      <div className="pattern-back min-h-screen">
        <motion.main 
          ref={heroRef}
          className="p-6 md:p-12 pt-32 md:pt-48 bg-[url('/bg.svg')] bg-cover bg-center flex flex-col gap-0 row-start-2 items-center justify-start text-center sm:items-start min-h-[85vh]"
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className="overflow-hidden">
            <motion.div 
              className="flex flex-wrap w-full text-[3.3rem] md:text-[10rem] mb-0 font-semibold text-color-900 --font-fredoka text-center w-full"
              style={{ lineHeight: 0.9, willChange: "transform" }}
            >
              {heroText.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.div>
          </div>
          
          <motion.p 
            className="w-full mt-8 md:mt-12 text-2xl md:text-3xl leading-relaxed text-left"
            variants={slideUp}
          >
            <i>Dedicated to the advancement of <br className="md:hidden" />
            cancer <span className="relative inline-block">
              <span className="absolute bottom-0 left-0 w-full h-1 bg-color-500"></span>
              awareness
            </span>, <span className="relative inline-block">
              <span className="absolute bottom-0 left-0 w-full h-1 bg-color-500"></span>
              research
            </span>, and <span className="relative inline-block">
              <span className="absolute bottom-0 left-0 w-full h-1 bg-color-500"></span>
              education
            </span></i>
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row gap-6 md:gap-12 mt-12 md:mt-16 w-full justify-center"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.5, delay: 0.3, staggerChildren: 0.1 } }
            }}
          >
            <Button 
              link="https://www.zeffy.com/en-US/donation-form/donate-to-curingwithcare" 
              text="Donate Now" 
              className="bg-color-500 hover:bg-color-600 text-white px-8 py-4 text-xl font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-color-400 flex items-center justify-center" 
              aria-label="Donate to CARE"
            />
            <Button 
              link="https://forms.gle/S2WH6htwdTTHK2gy9" 
              text="Join Our Cause" 
              className="bg-white hover:bg-color-100 px-8 py-4 text-xl font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-color-600 flex items-center justify-center" 
              style={{
                color: "black"
              }}
              aria-label="Join CARE"
            />
          </motion.div>
        </motion.main>

        <section 
          ref={featuresRef}
          className="p-4 md:p-12 text-center row-start-2 flex flex-col md:grid md:grid-cols-1 md:grid-rows-1 gap-8 justify-center min-h-[60vh] pt-16" 
        >     
          <motion.div 
            className="flex flex-col md:flex-row w-full md:w-11/12 mx-auto mt-10 p-4 md:p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-full md:w-1/3 flex md:flex-col border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0">
              {features.map((tab, index) => (
                <motion.button
                  key={tab}
                  className={`--font-fredoka font-bold text-[1.4rem] md:text-5xl text-color-900 mb-4 w-full py-3 px-4 text-left md:text-right relative overflow-hidden ${
                    activeTab === tab ? "text-color-600" : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  aria-selected={activeTab === tab}
                  role="tab"
                >
                  {features[index]}
                  {activeTab === tab && (
                    <motion.div 
                      className="absolute bottom-0 left-0 h-1 bg-color-500 md:right-0 md:left-auto md:w-1 md:h-full"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="w-full md:w-2/3 p-5">
              <ErrorBoundary fallback={<p>Something went wrong displaying this content.</p>}>
                <Suspense fallback={<LoadingPlaceholder />}>
                  <AnimatePresence mode="wait">
                    {activeTab === "Awareness" && (
                      <motion.div
                        key="awareness"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-gray-600 text-xl md:text-2xl text-center md:text-left mt-2 leading-relaxed">
                          CARE's outreach initiatives encompass a wide range of activities from partaking in local events to various fundraising opportunities.
                        </p>

                        <div className="mx-auto max-w-7xl px-0 md:px-6 mt-10">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                              { stat: "33%", text: "Chance for a woman to be diagnosed with cancer" },
                              { stat: "50%", text: "Chance for a man to be diagnosed with cancer" },
                              { stat: "42%", text: "Of all cancer cases are preventable" },
                              { stat: "85%", text: "Of children survive cancer past 5 years" }
                            ].map((item, index) => (
                              <motion.div 
                                key={index}
                                className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md border border-color-100"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                              >
                                <div className="font-bold text-4xl md:text-5xl text-color-800 mb-3">{item.stat}</div>
                                <span className="text-base md:text-lg text-gray-600">{item.text}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {activeTab === "Research" && (
                      <motion.div
                        key="research"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-gray-600 text-xl md:text-2xl text-center md:text-left mt-2 leading-relaxed">
                          CARE actively engages in impactful service projects aimed at benefiting individuals and communities affected by cancer.
                        </p>
                        <motion.div 
                          className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center mt-8 bg-gradient-to-r from-color-400 to-color-300 p-6 md:p-10 rounded-lg shadow-xl"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                          <h1 className="text-2xl md:text-3xl text-color-900 font-semibold text-left">Check out the CARE research competition!</h1>
                          <Button 
                            link="/research-competition" 
                            text="See More" 
                          />
                        </motion.div>
                      </motion.div>
                    )}
                    {activeTab === "Education" && (
                      <motion.div
                        key="education"
                        className="flex flex-col items-center md:items-start"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-gray-600 text-xl md:text-2xl text-center md:text-left mt-2 leading-relaxed">
                          CARE brings in expert guest speakers who share their knowledge and experiences of cancer research and treatment.
                        </p>
                        <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">Watch the CARE Series</h2>
                        <div className="relative w-full md:w-[560px] h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-xl">
                          <iframe 
                            className="absolute top-0 left-0 w-full h-full rounded-lg" 
                            src="https://www.youtube-nocookie.com/embed/aEKpFeLqMDo?si=UKbAZZlE-E3s6NEk" 
                            title="CARE Educational Series Video" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            loading="lazy"
                            aria-label="CARE Educational Video"
                          ></iframe>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Suspense>
              </ErrorBoundary>
            </div>
          </motion.div>
        </section>

        <section 
          ref={eventsRef}
          className="text-center px-4 md:p-12 flex flex-col gap-8 justify-center items-center min-h-[80vh] mt-12 md:mt-24 pt-8 relative overflow-hidden"
        >
          {loading ? (
            <LoadingPlaceholder />
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              <p>There was a problem loading events. Please try again later.</p>
            </div>
          ) : (
            <>
              <motion.div 
                className="relative z-10 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-10 w-full md:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={eventsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h1 
                  className="--font-fredoka font-bold text-4xl md:text-[5rem] leading-none text-color-800"
                  style={{ willChange: "transform" }}
                >
                  Our Events
                </motion.h1>
                <p className="text-gray-600 text-xl mt-4 max-w-2xl mx-auto">
                  Join us for our upcoming events where we bring together researchers, survivors, and supporters in the fight against cancer.
                </p>
                <div className="flex items-center w-full justify-center gap-4 mt-6">
                  <Button className="--font-hoss-normal bg-color-500 hover:bg-color-600 text-white" link="/events" text="See All Events" />
                </div>
              </motion.div>
              
              <div className="absolute inset-0 z-0 grid grid-cols-2 md:grid-cols-3 gap-0 opacity-80 left-0 right-0">
                {files.map((file, index) => (
                  <motion.div 
                    key={index} 
                    className={`hexagon ${index === 4 ? 'hidden' : ''} md:inline-grid`}
                    initial={{ opacity: 0 }}
                    animate={eventsInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: eventsInView ? Math.min(index * 0.1, 0.5) : 0 }}
                  >
                    <Image 
                      src={file} 
                      alt={`CARE Event ${index + 1}`} 
                      layout="fill" 
                      objectFit="cover" 
                      className="hexagon-image hover:scale-110 transition-transform duration-700" 
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </section>

        <motion.section 
          ref={numbersRef}
          className="p-6 md:p-12 text-center grid grid-cols-1 sm:grid-cols-1 gap-8 justify-center min-h-[60vh] pt-8 mt-12 md:mt-24" 
          style={{ placeItems: "center" }}
          initial="hidden"
          animate={numbersInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <motion.h1 
            className="--font-fredoka font-bold text-5xl md:text-[7rem] leading-none w-full text-color-800 mb-4" 
            style={{ transform: "rotate(-3deg)" }}
          >
            By The Numbers
          </motion.h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 w-full max-w-6xl">
            {[
              { number: "900+", text: "Members worldwide", blob: "blob3.svg" },
              { number: "$30k+", text: "raised", blob: "blob2.svg" },
              { number: "40+", text: "Chapters", blob: "blob.svg" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className={`text-center flex flex-col items-center justify-center gap-4 bg-[url('/${item.blob}')] w-full aspect-square bg-no-repeat bg-center pb-8`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 * index } }
                }}
              >
                <motion.h2 
                  className="ml-6 w-full text-4xl md:text-5xl lg:text-6xl leading-none font-bold --font-fredoka text-color-900"
                  initial={{ scale: 0.8 }}
                  animate={numbersInView ? { scale: 1 } : { scale: 0.8 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  {item.number}
                </motion.h2>
                <p className="ml-6 w-full text-xl md:text-2xl text-color-900 font-semibold">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          ref={stayUpToDateRef}
          className="p-6 md:p-12 text-center gap-8 justify-center min-h-[40vh] pt-8 mt-12 mb-16" 
          initial="hidden"
          animate={stayUpToDateInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 max-w-6xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            <h1 className="--font-fredoka font-bold text-4xl md:text-6xl leading-tight w-full text-color-800">Stay Connected</h1>
            <p className="italic col-span-3 text-xl text-gray-600 mb-8 mt-2">Follow @curingwithcare to stay updated on all our initiatives</p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
              {[
                { icon: faInstagram, name: '@curingwithcare', color: '#dd2a7b', url: 'https://www.instagram.com/curingwithcare/' },
                { icon: faLinkedin, name: 'curingwithCARE', color: '#0a66c2', url: 'https://www.linkedin.com/company/curingwithcare' },
                { icon: faFacebook, name: 'curingwithcare', color: '#0861f2', url: 'https://www.facebook.com/people/curingwithcare/61551833566559/' }
              ].map((social, index) => (
                <motion.a 
                  key={social.name}
                  href={social.url} 
                  className="relative inline-block text-lg group"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.4, delay: 0.1 * index } }
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <span
                    className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 rounded-lg group-hover:text-white"
                    style={{ borderColor: social.color }}
                  >
                    <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                    <span 
                      className="absolute left-0 w-72 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 ease"
                      style={{ backgroundColor: social.color, willChange: "transform" }}
                      aria-hidden="true"
                    ></span>
                    <span className="relative flex items-center gap-2" style={{ color: social.color }}>
                      <FontAwesomeIcon size="lg" icon={social.icon} /> {social.name}
                    </span>
                  </span>
                  <span 
                    className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear rounded-lg group-hover:mb-0 group-hover:mr-0" 
                    style={{ backgroundColor: social.color }}
                    data-rounded="rounded-lg"
                    aria-hidden="true"
                  ></span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
}
