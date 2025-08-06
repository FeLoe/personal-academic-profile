// app/research/page.tsx
"use client";
import React, { useState, useEffect } from "react";

// Data definitions
interface ProjectItem {
  title: string;
  description: string;
  url?: string;
}

interface GrantAwardItem {
  name: string;
  year: string;
  funder?: string;
  amount?: string;
  details: string[];
  url?: string;
}

export default function Research() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  // Data arrays
  const currentProjects: ProjectItem[] = [
    {
      title: "AI-driven News Diversity Analysis",
      description:
        "Analyzing the impact of recommendation algorithms on news exposure.",
      url: "#",
    },
    {
      title: "Multimodal Opinion Mining",
      description:
        "Combining text and image data to map public opinion dynamics.",
    },
    {
      title: "Digital Society Behavior Traces",
      description:
        "Tracking user interaction patterns for social science research.",
    },
  ];

  const grantsAndAwards: GrantAwardItem[] = [
    {
      name: "KHMW Keetje Hodshon Proefschriftprijs voor de Geesteswetenschappen",
      year: "2025",
      amount: "€10,000",
      details: [
        "Competitive National Dissertation Prize for Dissertations defended in the Humanities in the Netherlands",
      ],
    },
    {
      name: "TDCC NWO Grant: RIGHTS",
      year: "2025",
      amount: "€200,000",
      details: [
        "RIGHTS: Responsible Implementation of Gathering, Handling, and Treating Sensitive Individual Digital Traces",
        "Co-Applicant and Project Coordinator of interdisciplinary team of Legal Scholars, Ethicists and Data Engineers from several Dutch universities",
        "Secured grant funding to address challenges in sharing and publishing sensitive digital trace data, ensuring FAIR principles adherence within a national research infrastructure and facilitating secure data donation",
      ],
    },
    {
      name: "Project Member: AWESoMe Data Analysis Project",
      year: "2024–2026",
      details: [
        "Conceptualization and Technical Implementation of TikTok data analysis (23 million videos) of adolescents",
        "Financed by Spinoza Grant (Patti Valkenburg)",
        "Contributing own project (+ additional survey data) on effects of traditional value content ((Wo)Manosphere) on political values of adolescents",
      ],
    },
    {
      name: "Project Member: Computational Analysis within RESPOND",
      year: "2024–2026",
      details: [
        "Computational analysis of discourse about corruption in large-scale (social) media corpus across nine countries",
        "Financed by EU Horizon Project RESPOND: Rescuing Democracy from Political Corruption in Digital Societies",
      ],
    },
    {
      name: "Teaching Grant: Responsible AI",
      year: "2024",
      funder: "Teaching Learning Center, University of Amsterdam",
      amount: "€2,500",
      details: [
        "Innovating teaching programming to social scientists in times of AI",
        "Emphasizing responsible and ethical use of Large Language Models",
      ],
    },
    {
      name: "Digital Communication Methods Lab Award",
      year: "2024",
      funder: "University of Amsterdam",
      amount: "€7,000",
      details: [
        "Innovative research project focused on WhatsApp data donations for political news usage (PI, together with Laura Boeschoten, University Utrecht)",
      ],
    },
    {
      name: "Faculty of Social Science Dissertation Prize",
      year: "2024",
      amount: "€1,000",
      details: [
        "Winner of the Faculty of Social Science Dissertation Award at the Vrije Universiteit Amsterdam",
      ],
    },
    {
      name: "Member of Lowlands Science",
      year: "2022",
      details: [
        "Science outreach program, collecting digital trace data with the DataDonationLab during the Lowlands festival",
      ],
    },
    {
      name: "Media Diversity and Transparency in Smart Speakers",
      year: "2020",
      amount: "€50,000",
      details: [
        "Report commissioned by the Landesanstalt für Medien, NRW",
        "Cooperation with TU Dresden",
      ],
    },
    {
      name: "Winner Hackathon Future Recommenders for Public Service Media",
      year: "2020",
      amount: "€3,000",
      details: [
        "Dutch public broadcaster (NPO) hackathon about designing a diversity-aware recommender system",
      ],
    },
    {
      name: "Best Poster Award, ICA Political Communication Division",
      year: "2020",
      details: [
        "Poster Perceived Control and Satisfaction in News Recommender Systems with Judith Moeller, Damian Trilling, Wouter van Atteveldt and Natali Helberger",
      ],
    },
    {
      name: "Digital Communication Methods Lab Award",
      year: "2020",
      funder: "University of Amsterdam",
      amount: "€5,000",
      details: [
        "Innovative research project focused on mapping the mobile news diet in a mobile lab (with Judith Moeller, Damian Trilling, and Wouter van Atteveldt)",
      ],
    },
    {
      name: "Digital Communication Methods Lab Award",
      year: "2020",
      funder: "University of Amsterdam",
      amount: "€4,000",
      details: [
        "Innovative research project focused on methodological development (with Judith Moeller, Damian Trilling, and Wouter van Atteveldt)",
      ],
    },
  ];

  useEffect(() => {
    const currentlyDark = document.documentElement.classList.contains("dark");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const savedTheme = localStorage.getItem("theme");

    let shouldBeDark;
    if (savedTheme) {
      shouldBeDark = savedTheme === "dark";
    } else {
      shouldBeDark = prefersDark;
    }

    setTheme(currentlyDark ? "dark" : "light");

    if (shouldBeDark !== currentlyDark) {
      if (shouldBeDark) {
        document.documentElement.classList.add("dark");
        setTheme("dark");
      } else {
        document.documentElement.classList.remove("dark");
        setTheme("light");
      }
    }

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";

      if (next === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      localStorage.setItem("theme", next);
      return next;
    });
  };

  if (!mounted) {
    return <div className="min-h-screen bg-white" />;
  }

  // Modern Project Card component
  const ProjectCard: React.FC<{ project: ProjectItem; color: string }> = ({
    project,
    color,
  }) => (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${color}`}></div>
      <div className="p-6">
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-snug">
              {project.title}
            </h3>
          </a>
        ) : (
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-snug">
            {project.title}
          </h3>
        )}

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {project.description}
        </p>

        {project.url && (
          <div className="mt-4 flex items-center text-teal-600 dark:text-teal-400 text-sm font-medium">
            Learn More
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  // Modern Grant Card component
  const GrantCard: React.FC<{ grant: GrantAwardItem; color: string }> = ({
    grant,
    color,
  }) => (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${color}`}></div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug flex-1 mr-4">
            {grant.name}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${color} whitespace-nowrap`}
          >
            {grant.year}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          {grant.funder && (
            <div className="flex items-center space-x-2 text-sm">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span className="text-gray-600 dark:text-gray-300">
                {grant.funder}
              </span>
            </div>
          )}

          {grant.amount && (
            <div className="flex items-center space-x-2 text-sm">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
              <span className="text-gray-600 dark:text-gray-300 font-semibold">
                {grant.amount}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          {grant.details.map((detail, i) => (
            <div key={i} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Modern Section component
  const Section: React.FC<{
    title: string;
    color: string;
    children: React.ReactNode;
    icon: React.ReactNode;
    count?: number;
  }> = ({ title, color, children, icon, count }) => (
    <section className="mb-16">
      <div className="flex items-center space-x-3 mb-8">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white`}>
          {icon}
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        {count && (
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium">
            {count}
          </span>
        )}
      </div>
      <div className="space-y-8">{children}</div>
    </section>
  );

  return (
    <main className="transition-colors duration-300 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
        aria-label="Toggle theme"
      >
        <span className="text-xl">{theme === "dark" ? "☀️" : "🌙"}</span>
      </button>

      {/* Header Section */}
      <section className="relative py-20 bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-600 dark:from-teal-800 dark:via-emerald-800 dark:to-cyan-800">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          {/* Back to Home */}
          <div className="mb-8">
            <a
              href="/"
              className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to Home</span>
            </a>
          </div>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Research
            </h1>
            <p className="text-xl md:text-2xl text-teal-100 mb-4">
              Current projects, grants, awards, and collaborative research
              initiatives
            </p>
            <p className="text-teal-200">
              Exploring computational methods in political communication and
              digital journalism
            </p>
          </div>
        </div>
      </section>

      {/* Research Content */}
      <div className="container mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Current Projects */}
          <Section
            title="Current Projects"
            color="from-teal-500 to-emerald-500"
            count={currentProjects.length}
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProjects.map((project, idx) => (
                <ProjectCard
                  key={idx}
                  project={project}
                  color="from-teal-500 to-emerald-500"
                />
              ))}
            </div>
          </Section>

          {/* Grants, Awards, and Collaborations */}
          <Section
            title="Grants, Awards & Collaborations"
            color="from-amber-500 to-orange-500"
            count={grantsAndAwards.length}
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
            }
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {grantsAndAwards.map((grant, idx) => (
                <GrantCard
                  key={idx}
                  grant={grant}
                  color="from-amber-500 to-orange-500"
                />
              ))}
            </div>
          </Section>
        </div>
      </div>
    </main>
  );
}
