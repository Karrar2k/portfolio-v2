"use client";

import WorksCarousel from "./WorksCarousel";
import { Project } from "./ProjectCard";

const NEW_PORTFOLIO_URL = "https://www.karrar.co.uk";

const newPortfolioCard = {
  type: "Personal" as const,
  title: "My New Portfolio",
  description:
    "My projects have moved. This site has been retired, and you'll find all my latest work, experience and contact details on my new portfolio.",
  technologies: [],
  liveLink: NEW_PORTFOLIO_URL,
};

const projects: Project[] = [1, 2, 3].map((id) => ({ id, ...newPortfolioCard }));

export default function WorksContent() {
  return (
    <section id="works" className="py-4 md:py-6 bg-[var(--primary-bg)] text-[var(--text-color)]">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-8 max-w-3xl mx-auto">
          <h2 className="text-3xl koulen-regular mb-3">My Works</h2>
          <p className="instrument-sans text-lg mb-4">
            I&apos;ve moved my projects over to my new portfolio.
          </p>
        </div>         
        
        <WorksCarousel projects={projects} />
      </div>
    </section>
  );
}
