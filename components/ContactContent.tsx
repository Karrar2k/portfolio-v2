"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_API_KEY;
    if (!apiKey) {
      setSubmitError("API key is missing. Please configure it in your environment variables.");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      apikey: apiKey,
      ...formData,
      // You can add more fields here if needed by Web3Forms, e.g., subject
      // subject: "New Contact Form Submission from Portfolio",
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", message: "" }); // Clear form
      } else {
        console.error("Error from Web3Forms:", result);
        setSubmitError(result.message || "An error occurred while submitting the form.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setSubmitError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-start w-full max-w-3xl mx-auto p-6"
    >      <h2 className="text-3xl koulen-regular mb-6">Get In Touch</h2>
      
      <p className="instrument-sans mb-8">
        Please don&apos;t hesitate to get in touch with me to discuss opportunities where my capabilities could be a valuable asset to your team.
      </p>
      
      {submitSuccess ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full bg-[var(--accent-color)] bg-opacity-10 border border-[var(--accent-color)] rounded-lg p-6 text-center"
        >
          <h3 className="text-xl koulen-regular mb-2">Message sent successfully!</h3>
          <p className="instrument-sans">Thank you for reaching out. I&apos;ll get back to you as soon as possible.</p>
          <button 
            onClick={() => setSubmitSuccess(false)}
            className="mt-4 bg-[var(--accent-color)] hover:bg-opacity-80 text-[var(--button-text-color)] transition-colors px-4 py-2 rounded-lg"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div>
            <label htmlFor="name" className="block instrument-sans mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[var(--secondary-bg)] border border-[var(--divider-color)] rounded-lg px-4 py-3 instrument-sans focus:outline-none focus:border-[var(--accent-color)] transition-colors"
            />
          </div>
            <div>
            <label htmlFor="email" className="block instrument-sans mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[var(--secondary-bg)] border border-[var(--divider-color)] rounded-lg px-4 py-3 instrument-sans focus:outline-none focus:border-[var(--accent-color)] transition-colors"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block instrument-sans mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-[var(--secondary-bg)] border border-[var(--divider-color)] rounded-lg px-4 py-3 instrument-sans focus:outline-none focus:border-[var(--accent-color)] transition-colors"
            />
          </div>
          
          {submitError && (
            <div className="text-red-400 instrument-sans">{submitError}</div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg instrument-sans ${
              isSubmitting 
                ? "bg-[var(--secondary-bg)] cursor-not-allowed" 
                : "bg-[var(--accent-color)] text-[var(--button-text-color)] hover:bg-opacity-80 transition-colors"
            }`}
          >
            {isSubmitting ? (
              <>Processing<span className="animate-pulse">...</span></>
            ) : (
              <>
                Send Message
                <FaPaperPlane size={16} />
              </>
            )}
          </button>
        </form>
      )}
    </motion.div>
  );
}
