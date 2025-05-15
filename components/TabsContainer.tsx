"use client";

import AboutContent from "./AboutContent";
import ContactContent from "./ContactContent";

interface TabsContainerProps {
  activeTab: "about" | "contact"; // "works" is handled by page.tsx
}

export default function TabsContainer({ activeTab }: TabsContainerProps) {
  return (
    <div className="w-full">
      {activeTab === "about" && <AboutContent />}
      {activeTab === "contact" && <ContactContent />}
    </div>
  );
}
