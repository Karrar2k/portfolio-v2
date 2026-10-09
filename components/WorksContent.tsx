"use client";

import ProjectCard, { Project } from "./ProjectCard";

const NEW_PORTFOLIO_URL = "https://www.karrar.co.uk";

const projects: Project[] = [
  {
    id: 1,
    type: "Freelance",
    title: "Freelance Work",
    description:
      "Client sites and web apps I've built, from booking systems to e-commerce. They now live on my new portfolio, with fuller write-ups and up-to-date screenshots.",
    technologies: ["React", "Node.js", "PostgreSQL", "Shopify"],
    liveLink: NEW_PORTFOLIO_URL,
  },
  {
    id: 2,
    type: "Personal",
    title: "Personal Projects",
    description:
      "Side projects and experiments, including my university final year project. You'll find the latest versions and source links on my new portfolio.",
    technologies: ["React", "TypeScript", "Next.js"],
    liveLink: NEW_PORTFOLIO_URL,
  },
  {
    id: 3,
    type: "Personal",
    title: "New Portfolio",
    description:
      "This site has been retired in favour of a new portfolio. Head over there for my current work, experience and contact details.",
    technologies: ["Next.js", "TypeScript"],
    liveLink: NEW_PORTFOLIO_URL,
  },
];

export default function WorksContent() {
  return (
    <section id="works" className="py-4 md:py-6 bg-[var(--primary-bg)] text-[var(--text-color)]">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-8 max-w-3xl mx-auto">
          <h2 className="text-3xl koulen-regular mb-3">My Works</h2>
          <p className="instrument-sans text-lg mb-4">
            My projects have moved to my new portfolio. Each card below links straight there.
          </p>
        </div>         
        
        <div className="grid gap-4 md:grid-cols-3 max-w-5xl mx-auto">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
