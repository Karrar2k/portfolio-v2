'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ProjectCard from './ProjectCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

// Import the Project type
import { Project } from './ProjectCard';

interface WorksCarouselProps {
  projects: Project[];
}

const WorksCarousel: React.FC<WorksCarouselProps> = ({ projects: projectsProp }) => {
  const [projects, setProjects] = useState<Project[]>(projectsProp);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (projectsProp && projectsProp.length > 0 && projectsProp !== projects) {
      setProjects(projectsProp);
      setCurrentIndex(0);
    }
  }, [projectsProp, projects]);

  const totalProjects = projects.length;

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalProjects);
    setTimeout(() => setIsAnimating(false), 500);
  }, [totalProjects, isAnimating]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalProjects) % totalProjects);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    if (totalProjects <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 15000);
    return () => clearInterval(timer);
  }, [handleNext, totalProjects]);

  // Moved useEffect for title underline animation
  useEffect(() => {
    const titleUnderlineElement = document.getElementById('title-underline');

    if (totalProjects <= 1) {
      if (titleUnderlineElement) {
        titleUnderlineElement.style.width = '0';
        titleUnderlineElement.style.transition = 'none';
      }
      return;
    }

    if (!titleUnderlineElement) return;

    titleUnderlineElement.style.width = '0';
    titleUnderlineElement.style.transition = 'none';
    
    void titleUnderlineElement.offsetHeight; 
    
    const animationTimeout: NodeJS.Timeout = setTimeout(() => {
      titleUnderlineElement.style.transition = 'width 14.7s linear';
      titleUnderlineElement.style.width = '100%';
    }, 50);
    
    return () => {
      clearTimeout(animationTimeout);
    };
  }, [totalProjects, currentIndex]);

  if (totalProjects === 0) {
    return <div className="text-center py-10">No projects.</div>;
  }

  const getCardStyle = (index: number): React.CSSProperties => {
    const styleBase: React.CSSProperties = {
      transformOrigin: 'center center',
      transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), filter 0.6s cubic-bezier(0.25, 1, 0.5, 1)', // Smoother transition
    };

    const scaleFactorSide = 0.88;
    const zOffsetSide = -180;
    const rotateYDegSide = 35;
    const blurSide = 'blur(3px)';
    const opacitySide = 0.8;

    let horizontalOffsetPercent = 30;
    if (totalProjects === 2) {
      horizontalOffsetPercent = 25;
    } else if (totalProjects === 1) {
      horizontalOffsetPercent = 0;
    }

    if (index === currentIndex) { // middle card
      return {
        ...styleBase,
        transform: `translateX(-50%) translateY(-50%) translateZ(0px) rotateY(0deg) scale(1)`,
        opacity: 1,
        zIndex: 20,
        filter: 'blur(0px)',
      };
    } else if (totalProjects > 1 && index === (currentIndex + 1) % totalProjects) { // right card
      return {
        ...styleBase,
        transform: `translateX(calc(-50% + ${horizontalOffsetPercent}%)) translateY(-50%) translateZ(${zOffsetSide}px) rotateY(-${rotateYDegSide}deg) scale(${scaleFactorSide})`,
        opacity: opacitySide,
        zIndex: 10,
        filter: blurSide,
      };
    } else if (totalProjects > 1 && index === (currentIndex - 1 + totalProjects) % totalProjects) { // left cad
      return {
        ...styleBase,
        transform: `translateX(calc(-50% - ${horizontalOffsetPercent}%)) translateY(-50%) translateZ(${zOffsetSide}px) rotateY(${rotateYDegSide}deg) scale(${scaleFactorSide})`,
        opacity: opacitySide,
        zIndex: 10,
        filter: blurSide,
      };
    } else { // non showing cards
      const offset = index - currentIndex;
      const normalizedOffset = (offset + totalProjects) % totalProjects;
      let sign = 0;
      if (normalizedOffset !== 0) {
        if (normalizedOffset < totalProjects / 2) {
          sign = 1;
        } else {
          sign = -1;
        }
      }
      return {
        ...styleBase,
        transform: `translateX(calc(-50% + ${sign * horizontalOffsetPercent * 1.5}%)) translateY(-50%) translateZ(${zOffsetSide * 2.5}px) rotateY(${sign * rotateYDegSide * 0.5}deg) scale(0.7)`,
        opacity: 0,
        zIndex: 0,
        filter: 'blur(10px)',
        pointerEvents: 'none',
      };
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center py-0 overflow-hidden">
      <div className="flex items-center justify-center w-full mb-0 gap-3">
        <div className="h-px bg-[var(--divider-color)] w-8 md:w-16 lg:w-20"></div>
        <h2 className="text-2xl md:text-3xl font-bold text-center transition-all duration-500 relative py-1">
          <span className="relative z-10">
            {projects[currentIndex]?.title || 'My Works'}
          </span>
          <span 
            id="title-underline"
            className="absolute bottom-0 left-0 w-0 h-1 bg-[var(--accent-color)]"
          ></span>
        </h2>
        <div className="h-px bg-[var(--divider-color)] w-8 md:w-16 lg:w-20"></div>
      </div>      {/* for 3d effect purposes */}      <div 
        className="relative w-full h-[380px] sm:h-[430px] md:h-[480px] lg:h-[520px] flex items-center justify-center mt-0"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        {projects.map((project, index) => {
          return (
            <div
              key={project.id}
              className="absolute w-11/12 sm:w-10/12 md:w-[680px] lg:w-[720px] xl:w-[800px] h-auto"
              style={{
                ...getCardStyle(index),
                left: '50%',
                top: '50%'
              }}
              onClick={() => {
                if (index !== currentIndex && !isAnimating) {
                  handleDotClick(index);
                }
              }}
            >
              <ProjectCard project={project} />
            </div>
          );
        })}
      </div>

      {/* left/right arrows */}
      {totalProjects > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-5 top-1/2 -translate-y-1/2 z-30 p-2 bg-[var(--secondary-bg)] hover:bg-[var(--accent-color)] hover:text-[var(--button-text-color)] rounded-full transition-colors text-[var(--text-color)] shadow-md cursor-pointer"
            aria-label="Previous Project"
          >
            <ChevronLeftIcon className="h-8 w-8 md:h-10 md:w-10" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 md:right-5 top-1/2 -translate-y-1/2 z-30 p-2 bg-[var(--secondary-bg)] hover:bg-[var(--accent-color)] hover:text-[var(--button-text-color)] rounded-full transition-colors text-[var(--text-color)] shadow-md cursor-pointer"
            aria-label="Next Project"
          >
            <ChevronRightIcon className="h-8 w-8 md:h-10 md:w-10" />
          </button>
        </>
      )}      {/* Dots below */}
      {totalProjects > 1 && (
        <div className="flex justify-center space-x-2 mt-0 z-30">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300
                ${currentIndex === index ? 'bg-[var(--accent-color)] scale-125' : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500'}`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WorksCarousel;