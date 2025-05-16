"use client";

import { motion } from "framer-motion";
import {
  Code2, 
  Layout, 
  Server, 
  Database, 
  GitBranch, 
  TestTube2, 
  Award, 
  BookOpen
} from "lucide-react";

// skill categories with skills
const skillCategories = [
  {
    name: "Languages",
    icon: <Code2 size={20} />,
    skills: ["JavaScript", "TypeScript", "Java", "SQL", "Liquid"],
    color: "bg-indigo-600",
    hoverColor: "hover:bg-indigo-500"
  },
  {
    name: "Frontend",
    icon: <Layout size={20} />,
    skills: ["React", "Next.js", "CSS / Tailwind", "HTML"],
    color: "bg-blue-600", 
    hoverColor: "hover:bg-blue-500"
  },
  {
    name: "Backend",
    icon: <Server size={20} />,
    skills: ["Node.js", "Express", "RESTful APIs"],
    color: "bg-emerald-600",
    hoverColor: "hover:bg-emerald-500"
  },
  {
    name: "Databases",
    icon: <Database size={20} />,
    skills: ["PostgreSQL", "MongoDB"],
    color: "bg-amber-600",
    hoverColor: "hover:bg-amber-500"
  },
  {
    name: "DevOps",
    icon: <GitBranch size={20} />,
    skills: ["CI/CD", "Agile / Scrum", "Git", "Client Collaboration"],
    color: "bg-rose-600",
    hoverColor: "hover:bg-rose-500"
  },
  {
    name: "Testing",
    icon: <TestTube2 size={20} />,
    skills: ["React Testing Library", "Jest"],
    color: "bg-purple-600",
    hoverColor: "hover:bg-purple-500"
  },
  {
    name: "Certifications",
    icon: <Award size={20} />,
    skills: ["AWS Cloud Practitioner", "IBM Full Stack Developer"],
    color: "bg-teal-600",
    hoverColor: "hover:bg-teal-500"
  },
  {
    name: "Currently Learning",
    icon: <BookOpen size={20} />,
    skills: ["React Native", "Cypress", "Docker", "GraphQL"],
    color: "bg-fuchsia-600",
    hoverColor: "hover:bg-fuchsia-500"
  }
];

export default function AboutContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-start w-full max-w-3xl mx-auto p-6"
    >
      <h2 className="text-3xl koulen-regular mb-6">About Me</h2>
      <div className="instrument-sans text-lg mb-8 space-y-4">
        <p>
          <strong>I&apos;m a passionate full stack software engineer</strong>{" "}
          fixated on thoughtful development and well-executed solutions. I enjoy
          turning ideas into real, working applications that run smoothly,
          look great, and make sense.
        </p>
        <p>
          I primarily work with the <strong>PERN stack</strong>
          <em> (PostgreSQL, Express, React, Node.js)</em> but I&apos;m always
          learning and expanding my skill set. Whether it&apos;s{" "}
          <strong>API integrations</strong>, <strong>creating databases</strong>
          , or <strong>building front-end user interfaces</strong>, I focus
          on&nbsp; delivering intuitive, engaging solutions with an emphasis on{" "}
          <strong>reliable</strong> and <strong>maintainable</strong> code.
        </p>
      </div>{" "}
      <h3 className="text-2xl koulen-regular mt-8 mb-6">
        Skills & Technologies
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
        {skillCategories.map((category) => (
          <div
            key={category.name}
            className="bg-[var(--secondary-bg)] p-5 rounded-lg border border-[var(--divider-color)] shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {" "}
            <h4 className="text-xl koulen-regular mb-4 text-[var(--accent-color)] border-b border-[var(--divider-color)] pb-2 flex items-center gap-2">
              <span className="text-[var(--accent-color)]">
                {category.icon}
              </span>
              {category.name}
            </h4>{" "}
            <div className="flex flex-wrap gap-2">
              {" "}
              {category.skills.map((skill) => (
                <div
                  key={skill}
                  className={`${category.color} px-3 py-1.5 rounded text-sm instrument-sans 
                  text-white ${category.hoverColor} transition-colors duration-300 shadow-sm`}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="instrument-sans text-lg mt-0">
        <p>
          <strong>
            I&apos;m <em>always</em> open to new challenges and opportunities
          </strong>{" "}
          to grow into a more competent engineer. I believe in the{" "}
          power of collaboration and am eager to work with
          others who share{" "}
          <strong>my passion for technology and innovation.</strong>
        </p>
      </div>
    </motion.div>
  );
}
