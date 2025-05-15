import React from 'react';
import Image from 'next/image';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  gifImage?: string;
  type: "Freelance" | "Personal";
  technologies: string[];
  link?: string;
  liveLink?: string;
  sourceLink?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [gifKey, setGifKey] = React.useState<number>(0);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (project.gifImage) {
      setGifKey(Date.now());
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  const cardClasses = [
    'w-full',
    'h-full',
    'bg-[var(--secondary-bg)]',
    'rounded-lg',
    'shadow-xl',
    'transition-all',
    'duration-500',
    'ease-in-out',
    'flex',
    'flex-col',
    'md:flex-row',
    'overflow-hidden'
  ].join(' ');

  return (
    <div className={cardClasses}>
      {/* Image Section */}
      <div 
        className="w-full md:w-1/2 aspect-square relative flex-shrink-0 md:rounded-l-lg md:rounded-tr-none rounded-t-lg overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={project.image || '/placeholder-image.png'}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className={`md:rounded-l-lg md:rounded-tr-none rounded-t-lg transition-opacity duration-250 ease-in-out z-10 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        />
          {/* GIF Image (positioned beneath, revealed on hover) */}
        {project.gifImage && (
          <Image
            key={gifKey}
            src={isHovered ? project.gifImage : ''}
            alt={`${project.title} animation`}
            layout="fill"
            objectFit="cover"
            className="md:rounded-l-lg md:rounded-tr-none rounded-t-lg z-0"
            priority={isHovered}
          />
        )}
      </div>{/* Content Section */}
      <div className="w-full md:w-1/2 p-4 md:p-5 flex flex-col justify-between flex-grow">
        <div className="flex flex-col h-full">
          <div className="flex-grow mb-3 overflow-hidden">
            <p className="text-xs md:text-sm instrument-sans line-clamp-[8] md:line-clamp-none overflow-y-auto pr-1 max-h-36 md:max-h-48">
              {project.description}
            </p>
          </div>
          <div className="mb-3 md:mb-4">
            <h4 className="font-semibold text-2xs md:text-xs mb-1 uppercase tracking-wider text-[var(--text-color-secondary)]">
              Technologies:
            </h4>
            <div className="flex flex-wrap gap-1 md:gap-1.5">
              {project.technologies.map(tech => (
                <span
                  key={tech}
                  className="px-2 py-0.5 md:px-2.5 md:py-1 bg-[var(--accent-color)] text-white dark:text-black text-[10px] md:text-xs rounded-full font-medium shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        {(project.link || project.liveLink || project.sourceLink) && (
          <div className="mt-auto pt-2 md:pt-3 border-t border-[var(--divider-color)] flex flex-col sm:flex-row gap-2 items-center">
            {(project.link || project.liveLink) && (
              <a
                href={project.link || project.liveLink!}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-grow sm:flex-grow-0 text-center px-3 py-1.5 text-xs md:text-sm rounded-md hover:bg-opacity-80 transition-colors duration-300 koulen-regular tracking-wide bg-[var(--accent-color)] text-[var(--button-text-color)]"
              >
                View Project
              </a>
            )}
            {project.type === 'Personal' && project.sourceLink && (
              <a
                href={project.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-grow sm:flex-grow-0 text-center px-3 py-1.5 border text-xs md:text-sm rounded-md hover:text-white transition-colors duration-300 koulen-regular tracking-wide border-[var(--accent-color)] text-[var(--accent-color)] hover:bg-[var(--accent-color)]"
              >
                View Repo
              </a>
            )}
            {project.type === 'Freelance' && project.sourceLink && (
              <a
                href={project.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-grow sm:flex-grow-0 text-center px-3 py-1.5 border text-xs md:text-sm rounded-md hover:text-white transition-colors duration-300 koulen-regular tracking-wide border-[var(--accent-color)] text-[var(--accent-color)] hover:bg-[var(--accent-color)]"
              >
                Source Code
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
