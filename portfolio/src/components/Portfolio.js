"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Twitter, Instagram, ExternalLink } from 'lucide-react';
import * as THREE from 'three';

const Portfolio = () => {
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  //const [isAboutVisible, setIsAboutVisible] = useState(false);

  useEffect(() => {
    // Three.js Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create animated particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: '#4299e1' // Tailwind blue-500
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    camera.position.z = 2;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y = scrollY * 0.0005;
      particlesMesh.rotation.x = scrollY * 0.0002;
      renderer.render(scene, camera);
    };

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Handle Scroll
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Custom hook for scroll-triggered animations
  const useScrollAnimation = (ref) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in');
              setIsVisible(true);  // Corrected here
            } else {
              setIsVisible(false); // Corrected here
            }
          });
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [ref]);
  };


  // Refs for sections
  const aboutRef = useRef(null);
  const resumeRef = useRef(null);
  const achievementsRef = useRef(null);
  const projectsRef = useRef(null);
  const blogRef = useRef(null);


  // Apply scroll animations
  const aboutVisible = useScrollAnimation(aboutRef);
  const resumeVisible = useScrollAnimation(resumeRef);
  const achievementsVisible = useScrollAnimation(achievementsRef);
  const projectsVisible = useScrollAnimation(projectsRef);
  const blogVisible = useScrollAnimation(blogRef);



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* 3D Background Container */}
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold hover:text-blue-400 transition-colors duration-300">
              Varad Kulkarni
            </span>
            <div className="space-x-6">
              <a href="#about" className="hover:text-blue-400 transition-colors duration-300">About</a>
              <a href="#achievements" className="hover:text-blue-400 transition-colors duration-300">Achievements</a>
              <a href="#projects" className="hover:text-blue-400 transition-colors duration-300">Projects</a>
              <a href="#blog" className="hover:text-blue-400 transition-colors duration-300">Blog</a>
            </div>
          </div>
        </div>
      </nav>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="min-h-screen flex items-center pt-20 relative opacity-0 transform translate-y-10 transition-all duration-1000"
      >
        <div className="container mx-auto px-6 z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Hi, I&apos;m Varad Kulkarni
              </h1>
              <p className="text-xl text-gray-300">
                I am a Full-Stack Developer with a strong interest in Computer Networks and AI. Currently pursuing a B.Tech in Computer Software Engineering at Vishwakarma Institute of Technology, I am also a Core Member of the Microsoft Learn Student Club and the winner of BASIC&apos;24 Indonesia hackathon. I specialize in building high-performance web applications and am passionate about contributing to the developer community while working on innovative tech projects.
              </p>

            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-float">

                <img src="/varad-kulkarni.jpg" alt="Your Name" className="w-200 h-200 rounded-full object-cover border border-gray-300" />

              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="resume"
        ref={resumeRef}
        className="min-h-screen flex items-center pt-20 relative opacity-0 transform translate-y-10 transition-all duration-1000"
      >
        <div className="container mx-auto px-6 z-10">
          <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            My Resume
          </h2>

          {/* Embed Resume PDF */}
          <div className="mb-12">
            <iframe
              src="/Varad Kulkarni_Full-Stack-Dev_Computer Networks.pdf"
              width="100%"
              height="800px"
              title="Resume"
              frameBorder="0"
            />
          </div>

          {/* Download Button */}
          <a
            href="/Varad Kulkarni_Full-Stack-Dev_Computer Networks.pdf"
            download
            className="bg-blue-600 px-8 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Download Resume
          </a>
        </div>
      </section>


      {/* Achievements Section */}
      <section
        id="achievements"
        ref={achievementsRef}
        className="min-h-screen flex items-center relative opacity-0 transform translate-y-10 transition-all duration-1000"
      >
        <div className="container mx-auto px-6 z-10">
          <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Achievements
          </h2>

          {/*  Wrap all achievement cards inside ONE grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-bold text-blue-400 mb-4">
                🏆 Winner (3rd Place) - Business and System Innovation Challenge 2024, Indonesia
              </div>
              <p className="text-gray-300">
                Developed an anti-plagiarism software prototype for Binus University
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-bold text-blue-400 mb-4">
                8th International Conference on Smart Trends in Computing and Communications (SmartCom’24) - 2024
              </div>
              <p className="text-gray-300">
                Image Forgery Detection Using Machine Learning
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-bold text-blue-400 mb-4">
                Contributor at the Social Winter of Code Season 5
              </div>
              <p className="text-gray-300">
                Contributed to various Open Source Repositories with successful implementation of features and bug fixes
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* Projects Section */}
      <section
  id="projects"
  ref={projectsRef}
  className="min-h-screen flex items-center relative opacity-0 transform translate-y-10 transition-all duration-1000"
>
  <div className="container mx-auto px-6 z-10">
    <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
      Projects
    </h2>

    {/* ✅ Projects Grid - 2 Adjacent, 2 Below */}
    <div className="grid md:grid-cols-2 gap-8">
      
      {/* Project 1 */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">HealthLink Central</h3>
          <a
            href="https://github.com/varad-kulkarni172/healthlink-central"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>
        <p className="text-gray-300 mb-4">
          An Electronic Health Record Mangement System for Hospitals clinics and Patients.
        </p>
        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 bg-blue-600/50 backdrop-blur-sm rounded-full text-sm">React</span>
          <span className="px-3 py-1 bg-blue-600/50 backdrop-blur-sm rounded-full text-sm">Express.js</span>
          <span className="px-3 py-1 bg-blue-600/50 backdrop-blur-sm rounded-full text-sm">Node.js</span>
          <span className="px-3 py-1 bg-blue-600/50 backdrop-blur-sm rounded-full text-sm">MySQL</span>
        </div>
      </div>

      {/* Project 2 */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Mesh-Up</h3>
          <a
            href="https://github.com/varad-kulkarni172/Mesh-Up"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>
        <p className="text-gray-300 mb-4">
        A decentralized mesh network for emergency communication using IoT devices, desktops, Raspberry Pi, and Android, with UDP messaging, rebroadcasting, and flood protection.
        </p>
        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 bg-blue-600/50 backdrop-blur-sm rounded-full text-sm">Java</span>
          <span className="px-3 py-1 bg-blue-600/50 backdrop-blur-sm rounded-full text-sm">Android Studio</span>
          <span className="px-3 py-1 bg-blue-600/50 backdrop-blur-sm rounded-full text-sm">Computer Networks</span>
        </div>
      </div>

      {/* Project 3 */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">HTTPAnalyzer</h3>
          <a
            href="https://github.com/varad-kulkarni172/httpAnalyzer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>
        <p className="text-gray-300 mb-4">
          Description of your project goes here. Highlight the key features and technologies used.
        </p>
        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 bg-blue-600/50 backdrop-blur-sm rounded-full text-sm">React</span>
          <span className="px-3 py-1 bg-blue-600/50 backdrop-blur-sm rounded-full text-sm">Java</span>
          <span className="px-3 py-1 bg-blue-600/50 backdrop-blur-sm rounded-full text-sm">Computer Networks</span>
        </div>
      </div>

      {/* Project 4 */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Heart Disease Prediction Using Random Forest Alogrithm</h3>
          <a
            href="https://github.com/varad-kulkarni172/Heart-Disease-Prediction-using-ML"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>
        <p className="text-gray-300 mb-4">
        Heart Diseases can be predicted using machine learning which uses the Random Forest Algorithm
        </p>
        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 bg-blue-600/50 backdrop-blur-sm rounded-full text-sm">Python</span>
          <span className="px-3 py-1 bg-blue-600/50 backdrop-blur-sm rounded-full text-sm">Random Forest Algorithm</span>
          <span className="px-3 py-1 bg-blue-600/50 backdrop-blur-sm rounded-full text-sm">Over-Pass API</span>
        </div>
      </div>

    </div>
  </div>
</section>


      {/* Blog Section */}
      <section
  id="blog"
  ref={blogRef}
  className="min-h-screen flex items-center relative opacity-0 transform translate-y-10 transition-all duration-1000"
>
  <div className="container mx-auto px-6 z-10">
    <div className="flex justify-between items-center mb-12">
      <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Blog Posts
      </h2>
      <a
        href="https://hashnode.com/@VaradKulkarni172"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
      >
        View all posts <ExternalLink className="w-4 h-4" />
      </a>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      {/* Blog Post 1 */}
      <div
        key={1}
        className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105"
      >
        <h3 className="text-2xl font-bold mb-4">Mastering SQL</h3>
        <p className="text-gray-300 mb-4">
        From Basics to Advanced Techniques and Real-World Applications
        Unlocking the Power of Data Management
        </p>
        <a
          href="#"
          className="text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center gap-2"
        >
        </a>
      </div>

      {/* Blog Post 2 */}
      <div
        key={2}
        className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105"
      >
        <h3 className="text-2xl font-bold mb-4">Memory Management in Mobile OS</h3>
        <p className="text-gray-300 mb-4">
          A Tour on the Android Memory Management System
        </p>
        <a
          href="#"
          className="text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center gap-2"
        >
        </a>
      </div>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-sm py-12 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center">
            <div className="flex gap-6 mb-6">
              <a
                href="https://github.com/varad-kulkarni172"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/varad-kulkarni-675504264/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://x.com/varadbuilds"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/varadkulkarni_172/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
            <p className="text-gray-400">You can contact me on my social handles here !</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fade-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;