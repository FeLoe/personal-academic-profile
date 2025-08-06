// app/talks-and-workshops/page.tsx
"use client";
import React, { useState, useEffect } from "react";

// Data definitions
interface TalkItem {
  year?: string;
  desc: string;
  url?: string;
}

interface RoleItem {
  desc: string;
  url?: string;
}

export default function TalksAndWorkshops() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  // Data arrays
  const invitedTalks: TalkItem[] = [
    {
      year: "2025",
      desc: "Data Donation Workshop, LMU Munich",
      url: "https://www.linkedin.com/posts/research-unit-kuempel_datadonation-dfg-whatsapp-activity-7310937587832029184-SdJa",
    },
    {
      year: "2025",
      desc: "Automated Image Analysis Workshop, Freie Universität Berlin",
      url: "https://www.polsoz.fu-berlin.de/en/soziologie/arbeitsbereiche/empirische-methoden/DiMES/Workshops-and-Events/1st-DiMES-workshop-on-automated-image-and-video-analysis.html",
    },
    {
      year: "2024",
      desc: "How & Why of Data Donations Workshops, Ukraine",
      url: "https://sites.google.com/view/dariia-mykhailyshyna/main/r-workshops-for-ukraine#h.9cqcp42su0vs",
    },
    {
      year: "2024",
      desc: "Images as Data Workshop, Vienna Department of Communication",
      url: "https://vds-sosci.univie.ac.at/your-benefits/career-development-and-internationalisation/international-workshops/",
    },
    { year: "2024", desc: "Psychology Dept. Talk, NYU" },
    {
      year: "2024",
      desc: "Connected_Politics Lab Seminar, Dublin",
      url: "https://www.ucd.ie/connected_politics/events/theeffectsofsustainedexposuretofact-checkinginformation/",
    },
    {
      year: "2024",
      desc: "Talk Series, Vienna Department of Communication Research",
      url: "https://massmailer.univie.ac.at/action/mlr/pv?&idx=273368&cid=13540&uid=-1866255003&sid=350&cks=4a0dd9eb",
    },
    {
      year: "2023",
      desc: "Weizenbaum Symposium on AI, New York City",
      url: "https://www.weizenbaum-institut.de/events/symposium-critical-stances-towards-ai/",
    },
    {
      year: "2023",
      desc: "UNESCO Roundtable, World Press Freedom Day, New York",
      url: "https://www.unesco.org/en/articles/data-makes-difference-world-press-freedom-day-roundtable",
    },
    {
      year: "2023",
      desc: "Warwick Economics Summit",
      url: "https://www.warwickeconomicssummit.com/copy-of-2024-history",
    },
    {
      year: "2022",
      desc: "GESIS CSS Seminar on Data Donations",
      url: "https://www.gesis.org/en/research/projects-and-exchange/conferences/computational-social-science-events/css-seminar",
    },
    { year: "2022", desc: "Social Media Research Workshop, The Hague" },
    {
      year: "2022",
      desc: "DGPuK Workshop on Sustainable Social Media Research",
    },
    { year: "2021", desc: "Twitter Development (APIv2) Workshop" },
    {
      year: "2020",
      desc: "DIGSSCORE Lab Bergen; University of Stavanger; Diversity Lab Bremen; Marie Curie Alumni Event",
    },
    {
      year: "2019",
      desc: "Symposium on News Diets & Democratic Citizenship, Amsterdam",
    },
  ];

  const editorialRoles: RoleItem[] = [
    {
      desc: "Co-Organizer 1st Symposium on Diversity of News Diets and its Effect on Democratic Citizenship (2025)",
      url: "https://diversitynewsdiets.blog",
    },
    {
      desc: "Board Member Digital Communication Methods Lab University of Amsterdam (since 2024)",
      url: "https://digicomlab.github.io/about/",
    },
    {
      desc: "Organizer, ICA pre-conference hackathons (2022, 2023)",
      url: "https://hackingcommsci.org",
    },
    {
      desc: "Lead Organizer, COST action OPINION  Hackathon, Ljubljana (2024)",
      url: "https://www.opinion-network.eu",
    },
    {
      desc: "Former Student Representative & Secretary, Computational Methods ICA Division (2021–2023; 2025-2027)",
      url: "https://www.icahdq.org/group/compmethds",
    },
    {
      desc: "Former Editorial Assistant & Board Member, Computational Communication Research (2018–present)",
      url: "https://www.aup-online.com/content/journals/26659085?page=submit-a-paper",
    },
    {
      desc: "Editor, Special Issue Participant-Centered Behavioral Traces (2024)",
      url: "https://www.aup-online.com/content/journals/26659085/6/2",
    },
    {
      desc: "Trainer, COST action OPINION Training School on Multimodal Opinion Analysis (2025)",
      url: "https://www.opinion-network.eu/updates/cost-action-training-school-in-tirana-albania_2025-01-29",
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

  // Modern Talk Card component
  const TalkCard: React.FC<{ talk: TalkItem; color: string }> = ({
    talk,
    color,
  }) => (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${color}`}></div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {talk.url ? (
              <a
                href={talk.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug mb-2">
                  {talk.desc}
                </h3>
              </a>
            ) : (
              <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug mb-2">
                {talk.desc}
              </h3>
            )}
          </div>
          {talk.year && (
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${color} whitespace-nowrap ml-4`}
            >
              {talk.year}
            </span>
          )}
        </div>

        {talk.url && (
          <div className="flex items-center text-teal-600 dark:text-teal-400 text-sm font-medium">
            View Details
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

  // Modern Service Role Card component
  const ServiceCard: React.FC<{ role: RoleItem; color: string }> = ({
    role,
    color,
  }) => (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${color}`}></div>
      <div className="p-6">
        {role.url ? (
          <a
            href={role.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"
          >
            <p className="text-base font-semibold text-gray-900 dark:text-white leading-relaxed mb-4">
              {role.desc}
            </p>
          </a>
        ) : (
          <p className="text-base font-semibold text-gray-900 dark:text-white leading-relaxed mb-4">
            {role.desc}
          </p>
        )}

        {role.url && (
          <div className="flex items-center text-teal-600 dark:text-teal-400 text-sm font-medium">
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
      {children}
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
              Talks & Workshops
            </h1>
            <p className="text-xl md:text-2xl text-teal-100 mb-4">
              Invited presentations, workshops, and service to the academic
              community
            </p>
            <p className="text-teal-200">
              Sharing knowledge and contributing to computational communication
              research
            </p>
          </div>
        </div>
      </section>

      {/* Talks Content */}
      <div className="container mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Invited Talks & Workshops */}
          <Section
            title="Invited Talks & Workshops"
            color="from-teal-500 to-emerald-500"
            count={invitedTalks.length}
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
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {invitedTalks.map((talk, idx) => (
                <TalkCard
                  key={idx}
                  talk={talk}
                  color="from-teal-500 to-emerald-500"
                />
              ))}
            </div>
          </Section>

          {/* Service to the Discipline */}
          <Section
            title="Service to the Discipline"
            color="from-emerald-500 to-green-500"
            count={editorialRoles.length}
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {editorialRoles.map((role, idx) => (
                <ServiceCard
                  key={idx}
                  role={role}
                  color="from-emerald-500 to-green-500"
                />
              ))}
            </div>
          </Section>
        </div>
      </div>
    </main>
  );
}
