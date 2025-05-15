"use client";

import { useState } from "react";
import WorksCarousel from "./WorksCarousel";
import { Project } from "./ProjectCard";

const allProjects: Project[] = [
  // FREELANCE
  {
    id: 1,
    type: "Freelance",
    title: "Medical Express Clinic",
    description:
      "This project involved the full-stack rebuild of a medical clinic's website into a feature-rich web application using the PERN stack. The goal was to transform a basic online presence into a comprehensive platform that streamlined clinic operations and enhanced the patient experience. Key features included a custom appointment booking system, user accounts for patients, and multilingual support. I also integrated third-party APIs for payment processing and appointment confirmations.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Stripe",
      "Mailchimp",
      "RESTful APIs",
      "Git",
    ],
    image: "/MECss.png",
    gifImage: "/MECgif.gif",
    liveLink: "https://www.medicalexpressclinic.co.uk/",
  },
  {
    id: 2,
    type: "Freelance",
    title: "The Zahra Trust",
    description:
      "This project focused on developing a multi-page donation site for a charity, addressing the need for online fundraising capabilities. The outdated website lacked a payment gateway, hindering donation collection. I designed and built a solution that integrated Stripe for processing single and recurring donations and Mailchimp for donor communication. This project allowed me to further refine my RESTful API integration skills.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Stripe",
      "Mailchimp",
      "RESTful APIs",
      "Git",
    ],
    image: "/ZTss.png",
    gifImage: "/ZTgif.gif",
    liveLink: "https://zahratrust.com/",
  },
  {
    id: 3,
    type: "Freelance",
    title: "The Zahra Trust Shop",
    description:
      "This was a volunteer project to create an online storefront for The Zahra Trust, selling apparel and merchandise to raise funds for the charity. Due to the client's preference for a separate site, I utilised the Shopify platform to quickly establish the store. The project demonstrated my ability to learn and implement a new platform and templating language efficiently. ",
    technologies: ["Shopify", "Liquid", "JavaScript", "HTML", "CSS"],
    image: "/ZTSss.png",
    gifImage: "/ZTSgif.gif",
    liveLink: "https://zahratrustshop.com/",
  },
  {
    id: 4,
    type: "Freelance",
    title: "Design The Wall",
    description:
      "A Shopify store for a wall-panel company, delivered in under a week with a modern, sleek design.",
    technologies: ["Shopify", "Liquid", "CSS"],
    image: "/DTWss.png",
    gifImage: "/DTWgif.gif",
    liveLink: "https://designthewall.co.uk/",
  },
  {
    id: 5,
    type: "Freelance",
    title: "Blood Test London",
    description:
      "This project involved developing a specialized website for blood test appointments for Medical Express Clinic, using the Shopify platform. A key challenge was the lack of a suitable appointment booking app within Shopify, which led to the development of a custom JavaScript-based booking system. This system included features like custom time-slot control and synchronized live availability. The project also included the implementation of automated test result delivery and a streamlined booking process.",
    technologies: ["Shopify", "JavaScript", "Liquid", "HTML", "CSS"],
    image: "/BTLss.png",
    gifImage: "/BTLgif.gif",
    liveLink: "https://1gw1xk-pf.myshopify.com/",
  },
  // PERSONAL
  {
    id: 6,
    type: "Personal",
    title: "Beckton FC",
    description:
      "A full stack e-commerce web app for my university final year project, with ticket booking, merchandise, and user accounts. Complete with a custom admin panel for managing users and orders, as well as a tailored news display through an API integration.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "RESTful APIs",
      "HTML",
      "CSS",
      "Git",
    ],
    image: "/BFCv2ss.png",
    gifImage: "/BFCv2gif.gif",
    liveLink: "#",
  },
  {
    id: 7,
    type: "Personal",
    title: "React To-Do List",
    description:
      "A creative to-do list app with theme selection, attractive animations, and localStorage for persistence.",
    technologies: ["React", "JavaScript", "HTML", "CSS"],
    image: "/TODOss.png",
    gifImage: "/TODOgif.gif",
    sourceLink: "#",
  },
  {
    id: 8,
    type: "Personal",
    title: "Prayer Times App",
    description:
      "I developed a full-stack web application using the PERN stack to display daily prayer times with a focus on user customization and accessibility. This personal project allowed me to explore features such as a custom reminder system and a dynamic English-Arabic language toggle. It demonstrates my ability to independently design and implement a complete application with a user-centric approach.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "JavaScript",
      "HTML",
      "CSS",
    ],
    image: "/PRAYss.png",
    gifImage: "/PRAYgif.gif",
    liveLink: "#",
    sourceLink: "#",
  },
];

type ProjectType = "All" | "Freelance" | "Personal";

export default function WorksContent() {
  const [activeTab, setActiveTab] = useState<ProjectType>("All");

  // Filter project
  const filteredProjects = activeTab === "All"
    ? allProjects
    : allProjects.filter((p) => p.type === activeTab);  return (
    <section id="works" className="py-4 md:py-6 bg-[var(--primary-bg)] text-[var(--text-color)]">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-8 max-w-3xl mx-auto">
          <h2 className="text-3xl koulen-regular mb-3">My Works</h2>
          <p className="instrument-sans text-lg mb-4">
            Here&apos;s a selection of projects I&apos;ve worked on, showcasing my skills in developing modern, responsive, and user-friendly web applications. Explore a mix of freelance work and personal endeavors.
          </p>
        </div>         
        <div className="flex justify-center gap-3 mb-2">
          {["All", "Freelance", "Personal"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as ProjectType)}
              className={`px-3 py-1.5 rounded-full instrument-sans transition-all duration-300 border-2 font-semibold text-sm 
                ${activeTab === tab 
                  ? "bg-[var(--accent-color)] text-[var(--button-text-color)] border-[var(--accent-color)] scale-105 shadow-md" 
                  : "bg-[var(--secondary-bg)] text-[var(--text-color)] border-[var(--divider-color)] hover:border-[var(--accent-color)] hover:scale-105"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <WorksCarousel projects={filteredProjects} />
      </div>
    </section>
  );
}
