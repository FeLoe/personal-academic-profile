// app/research/page.tsx
"use client";
import React, { useState, useEffect } from "react";

// Data definitions
interface RelatedItem {
  title: string;
  type:
    | "publication"
    | "grant"
    | "course"
    | "workshop"
    | "award"
    | "collaboration"
    | "dataset"
    | "tool";
  url?: string;
}

interface ProjectItem {
  title: string;
  description: string;
  url?: string;
  status: "active" | "completed" | "upcoming";
  researchArea: string;
  relatedWork?: RelatedItem[];
}

interface ResearchArea {
  name: string;
  description: string;
  background: string;
  keyQuestions: string[];
  methods: string[];
  impact: string;
  color: string;
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

  // Research Areas Data
  const researchAreas: ResearchArea[] = [
    {
      name: "News Diversity & Algorithmic Curation",
      description:
        "Understanding how recommendation algorithms shape news consumption patterns and democratic discourse.",
      background:
        "In our increasingly digital media landscape, algorithmic systems play a crucial role in determining what news people see. My research examines the complex relationship between algorithmic curation, news diversity, and democratic participation. I investigate how recommender systems can either enhance or limit exposure to diverse perspectives, and develop methods to measure and improve content diversity in digital news environments.",
      keyQuestions: [
        "How do recommendation algorithms affect the diversity of news content people consume?",
        "What are the democratic implications of algorithmically curated news diets?",
        "How can we design algorithms that promote healthy information diversity?",
      ],
      methods: [
        "Data donations",
        "Computational content analysis",
        "User behavior tracking",
        "Algorithm auditing",
      ],
      impact:
        "This research contributes to policy discussions about platform regulation and helps design more democratic algorithmic systems.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Computational Methods & AI",
      description:
        "Developing and applying cutting-edge computational methods for social science research.",
      background:
        "The intersection of artificial intelligence and social science research opens unprecedented opportunities to understand human behavior at scale. My work focuses on developing ethical and responsible computational methods that can handle multimodal data (text, images, video) while maintaining transparency and accountability. I particularly emphasize the responsible use of AI in research contexts and teaching these methods to the next generation of scholars.",
      keyQuestions: [
        "How can we responsibly integrate AI tools into social science research?",
        "What are the ethical implications of using automated content analysis?",
        "How do we maintain transparency in computational research methods?",
      ],
      methods: [
        "Machine learning",
        "Natural language processing",
        "Computer vision",
        "Multimodal analysis",
      ],
      impact:
        "Advancing methodological standards in computational social science and training researchers in responsible AI practices.",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Private Messaging & Political Communication",
      description:
        "Exploring how political information spreads through private communication channels.",
      background:
        'While much research focuses on public social media platforms, significant political communication occurs in private messaging apps like WhatsApp, Telegram, and Signal. These "dark" channels present unique methodological challenges but offer crucial insights into how political information, misinformation, and opinions spread through personal networks. My research develops innovative data donation methods to ethically study these private communication patterns.',
      keyQuestions: [
        "How does political news consumption differ between public and private platforms?",
        "What role do private messaging apps play in political opinion formation?",
        "How can we ethically study private communication while protecting user privacy?",
      ],
      methods: [
        "Data donations",
        "Network analysis",
        "Privacy-preserving research methods",
        "Qualitative interviews",
      ],
      impact:
        "Providing insights into understudied but crucial aspects of digital political communication while establishing ethical research practices.",
      color: "from-green-500 to-teal-500",
    },
    {
      name: "Digital Political Socialization",
      description:
        "Understanding how digital media shapes political attitudes, especially among young people.",
      background:
        "Digital platforms are increasingly central to how young people form political opinions and engage with civic life. My research examines how specific types of content—particularly around traditional gender roles and political values—influence adolescent political development. Using large-scale data analysis of platforms like TikTok, I investigate how algorithmic feeds expose young users to political content and shape their worldviews.",
      keyQuestions: [
        "How do social media algorithms influence young people's political development?",
        "What is the relationship between gender role content and political attitudes?",
        "How do different platforms contribute to political socialization processes?",
      ],
      methods: [
        "Large-scale content analysis",
        "Survey research",
        "Longitudinal studies",
        "Mixed methods",
      ],
      impact:
        "Informing educational policies and platform design to support healthy democratic participation among young citizens.",
      color: "from-orange-500 to-red-500",
    },
  ];

  // Data arrays
  const currentProjects: ProjectItem[] = [
    {
      title: "AI-driven News Diversity Analysis",
      description:
        "Analyzing the impact of recommendation algorithms on news exposure using computational methods and user data donations.",
      url: "#",
      status: "active",
      researchArea: "News Diversity & Algorithmic Curation",
      relatedWork: [
        {
          title: "TDCC NWO Grant: RIGHTS",
          type: "grant",
          url: "#rights-grant",
        },
        {
          title: "News Diversity in Digital Environments",
          type: "publication",
          url: "/publications#news-diversity-2024",
        },
        {
          title: "Data Journalism Course",
          type: "course",
          url: "/teaching#data-journalism",
        },
        {
          title: "GESIS Data Donations Workshop",
          type: "workshop",
          url: "/talks-and-workshops#gesis-2022",
        },
      ],
    },
    {
      title: "Multimodal Opinion Mining",
      description:
        "Combining text, image, and video data to map public opinion dynamics across social media platforms.",
      status: "active",
      researchArea: "Computational Methods & AI",
      relatedWork: [
        {
          title: "Images as Data Workshop",
          type: "workshop",
          url: "/talks-and-workshops#images-data-2023",
        },
        {
          title: "Automated Image Analysis Course",
          type: "course",
          url: "/teaching#image-analysis",
        },
        {
          title: "COST OPINION Network",
          type: "collaboration",
          url: "https://www.opinion-network.eu",
        },
        { title: "Teaching Grant: Responsible AI", type: "grant" },
      ],
    },
    {
      title: "WhatsApp Political News Usage",
      description:
        "Understanding how political news spreads through private messaging platforms using data donation methodologies.",
      status: "active",
      researchArea: "Private Messaging & Political Communication",
      relatedWork: [
        {
          title: "Digital Communication Lab Award",
          type: "award",
          url: "#dcm-award-2024",
        },
        {
          title: "Data Donation Methodologies",
          type: "publication",
          url: "/publications#data-donation-2025",
        },
        { title: "WhatsApp Dataset (with Utrecht)", type: "dataset", url: "#" },
        {
          title: "Data Donation Workshop Munich",
          type: "workshop",
          url: "/talks-and-workshops#munich-2025",
        },
      ],
    },
    {
      title: "(Wo)Manosphere Content & Political Values",
      description:
        "Analyzing how traditional gender role content on TikTok affects adolescent political attitudes and values.",
      status: "active",
      researchArea: "Digital Political Socialization",
      relatedWork: [
        {
          title: "AWESoMe Data Analysis Project",
          type: "collaboration",
          url: "#awesome-project",
        },
        {
          title: "TikTok Analysis Pipeline",
          type: "tool",
          url: "https://github.com/example",
        },
        {
          title: "Big Data & Content Analysis Course",
          type: "course",
          url: "/teaching#big-data",
        },
        { title: "Spinoza Grant (Valkenburg)", type: "grant" },
      ],
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

  // Research Area Card component with integrated projects
  const ResearchAreaCard: React.FC<{ area: ResearchArea }> = ({ area }) => {
    const [expanded, setExpanded] = useState(false);

    // Filter projects for this research area
    const areaProjects = currentProjects.filter(
      (project) => project.researchArea === area.name
    );

    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className={`h-3 bg-gradient-to-r ${area.color}`}></div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {area.name}
            </h3>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium">
                {areaProjects.length} project
                {areaProjects.length !== 1 ? "s" : ""}
              </span>
              <button
                onClick={() => setExpanded(!expanded)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <svg
                  className={`w-5 h-5 text-gray-600 dark:text-gray-300 transform transition-transform ${
                    expanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {area.description}
          </p>

          {/* Current Projects in this area */}
          <div className="space-y-4 mb-6">
            <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-teal-500"
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
              Current Projects
            </h4>
            <div className="space-y-3">
              {areaProjects.map((project, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center justify-between mb-2">
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
                      >
                        {project.title}
                      </a>
                    ) : (
                      <h5 className="font-semibold text-gray-900 dark:text-white">
                        {project.title}
                      </h5>
                    )}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : project.status === "completed"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Related Work for this project */}
                  {project.relatedWork && project.relatedWork.length > 0 && (
                    <div>
                      <div className="flex flex-wrap gap-2">
                        {project.relatedWork.map((item, i) =>
                          item.url ? (
                            <a
                              key={i}
                              href={item.url}
                              target={
                                item.url.startsWith("http") ? "_blank" : "_self"
                              }
                              rel={
                                item.url.startsWith("http")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${getTagStyle(
                                item.type
                              )}`}
                            >
                              {item.title}
                              <svg
                                className="w-3 h-3 ml-1"
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
                            </a>
                          ) : (
                            <span
                              key={i}
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTagStyle(
                                item.type
                              )} opacity-75`}
                            >
                              {item.title}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {expanded && (
            <div className="space-y-6 border-t border-gray-200 dark:border-gray-600 pt-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Background & Context
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {area.background}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Key Research Questions
                </h4>
                <ul className="space-y-2">
                  {area.keyQuestions.map((question, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        {question}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Methods & Approaches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {area.methods.map((method, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Impact & Applications
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {area.impact}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Helper function to get tag styling based on type
  const getTagStyle = (type: RelatedItem["type"]) => {
    const styles = {
      publication:
        "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800/30",
      grant:
        "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-800/30",
      course:
        "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800/30",
      workshop:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-800/30",
      award:
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 hover:bg-yellow-200 dark:hover:bg-yellow-800/30",
      collaboration:
        "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-800/30",
      dataset:
        "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-200 dark:hover:bg-cyan-800/30",
      tool: "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200 hover:bg-pink-200 dark:hover:bg-pink-800/30",
    };
    return styles[type];
  };

  // Fixed Project Card component
  const ProjectCard: React.FC<{ project: ProjectItem; color: string }> = ({
    project,
    color,
  }) => (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${color}`}></div>
      <div className="p-6">
        {/* Status Badge & Research Area */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              project.status === "active"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : project.status === "completed"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
            }`}
          >
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>

        {/* Research Area */}
        <div className="mb-3">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
            {project.researchArea}
          </span>
        </div>

        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
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

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Related Work - Enhanced with clickable tags */}
        {project.relatedWork && project.relatedWork.length > 0 && (
          <div className="mb-4">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 block">
              Related Work:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.relatedWork.map((item, i) =>
                item.url ? (
                  <a
                    key={i}
                    href={item.url}
                    target={item.url.startsWith("http") ? "_blank" : "_self"}
                    rel={
                      item.url.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${getTagStyle(
                      item.type
                    )}`}
                  >
                    {item.title}
                    <svg
                      className="w-3 h-3 ml-1"
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
                  </a>
                ) : (
                  <span
                    key={i}
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTagStyle(
                      item.type
                    )} opacity-75`}
                  >
                    {item.title}
                  </span>
                )
              )}
            </div>
          </div>
        )}

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 text-sm font-medium cursor-pointer transition-colors"
          >
            Learn More
            <svg
              className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
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
          </a>
        )}
      </div>
    </div>
  );

  // Fixed Grant Card component (removed dollar sign icon)
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
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
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
              Research areas, active projects, grants, awards, and collaborative
              research initiatives
            </p>
            <p className="text-teal-200">
              Exploring computational methods in political communication and
              digital journalism across methodological and substantive research
              themes
            </p>
          </div>
        </div>
      </section>

      {/* Research Content */}
      <div className="container mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Simple Introduction */}
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              My research program bridges methodological innovation and
              substantive inquiry in computational communication science. I
              develop new methods for collecting and analyzing digital
              behavioral data while investigating how technology shapes
              democratic discourse and political participation.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Methodological Research
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Advancing techniques for digital trace data collection, visual
                  content analysis, and responsible AI applications in social
                  science research.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Substantive Research
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Investigating algorithmic influence on news consumption,
                  political socialization processes, and the role of AI systems
                  in democratic society.
                </p>
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-6">
              Click on any research area below to explore the background, key
              questions, and methodological approaches. The colored tags show
              related publications, courses, workshops, and collaborations
              across my work.
            </p>
          </div>

          {/* Research Areas & Projects */}
          <Section
            title="Research Areas & Projects"
            color="from-indigo-500 to-purple-500"
            count={researchAreas.length}
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            }
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {researchAreas.map((area, idx) => (
                <ResearchAreaCard key={idx} area={area} />
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
