"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Overview() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check if dark class is already applied
    const currentlyDark = document.documentElement.classList.contains("dark");

    // Check system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Check saved preference
    const savedTheme = localStorage.getItem("theme");

    // Determine what theme should be active
    let shouldBeDark;
    if (savedTheme) {
      shouldBeDark = savedTheme === "dark";
    } else {
      shouldBeDark = prefersDark;
    }

    // Set React state to match current reality
    setTheme(currentlyDark ? "dark" : "light");

    // If there's a mismatch, fix it
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

      // Apply to document
      if (next === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      // Save preference
      localStorage.setItem("theme", next);

      return next;
    });
  };

  const handleContactClick = () => {
    // f.loecherbach@uva.nl encoded in ROT13
    const rot13Email = "s.ybrpureonpu@hin.ay";
    const email = rot13Email.replace(/[a-zA-Z]/g, (char) => {
      const code = char.charCodeAt(0);
      let base = code >= 97 ? 97 : 65; // 'a' or 'A'
      return String.fromCharCode(((code - base + 13) % 26) + base);
    });
    window.location.href = `mailto:${email}`;
  };

  if (!mounted) return null;

  return (
    <main className="transition-colors duration-300 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      {/* Enhanced Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
        aria-label="Toggle theme"
      >
        <span className="text-xl">{theme === "dark" ? "☀️" : "🌙"}</span>
      </button>

      {/* Modern Hero Section */}
      <section className="relative h-[55vh] flex items-center bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-600 dark:from-teal-800 dark:via-emerald-800 dark:to-cyan-800 overflow-hidden">
        {/* Simplified background pattern using CSS */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(255,255,255,0.02) 25%, transparent 25%)
          `,
            backgroundSize: "60px 60px, 40px 40px, 20px 20px, 20px 20px",
          }}
        ></div>

        {/* Subtle geometric overlay */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 border border-white/8 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-white/8 rounded-lg rotate-45"></div>
          <div className="absolute top-1/2 left-1/4 w-2 h-16 bg-white/5 rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-2 bg-white/5 rounded-full"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left space-y-6">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/10">
                  Assistant Professor • University of Amsterdam
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Dr. Felicia
                  <span className="block bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent">
                    Loecherbach
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-teal-100 max-w-2xl">
                  Political Communication & Journalism researcher specializing
                  in
                  <span className="font-semibold text-white">
                    {" "}
                    computational methods
                  </span>{" "}
                  and
                  <span className="font-semibold text-white">
                    {" "}
                    digital news diversity
                  </span>
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleContactClick}
                  className="group px-8 py-4 bg-white text-teal-700 font-semibold rounded-xl hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="flex items-center justify-center gap-2">
                    Contact Me
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </button>
                <a
                  href="/Felicia_Loecherbach_CV.pdf"
                  download="Felicia_Loecherbach_CV.pdf"
                  className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-center"
                >
                  <span className="flex items-center justify-center gap-2">
                    Download CV
                    <svg
                      className="w-5 h-5 group-hover:translate-y-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </div>

            {/* Enhanced Profile Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-72 h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden ring-8 ring-white/30 backdrop-blur-sm shadow-2xl">
                  <Image
                    src="/avatar.jpg"
                    alt="Felicia Loecherbach"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas Quick Access */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Research & Expertise
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Exploring the intersection of computational methods, political
              communication, and digital journalism
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Publications",
                href: "/publications",
                description: "Peer-reviewed articles and book chapters",
                color: "from-teal-500 to-emerald-500",
              },
              {
                title: "Research Projects",
                href: "/research",
                description: "Current and completed research initiatives",
                color: "from-emerald-500 to-green-500",
              },
              {
                title: "Teaching",
                href: "/teaching",
                description: "Courses and educational activities",
                color: "from-amber-500 to-yellow-500",
              },
              {
                title: "Talks & Workshops",
                href: "/talks-and-workshops",
                description: "Speaking engagements and presentations",
                color: "from-orange-500 to-amber-500",
              },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.color} rounded-t-2xl`}
                ></div>
                <div className="mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center`}
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center text-teal-600 dark:text-teal-400 text-sm font-medium">
                  Explore
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  About My Research
                </h2>
                <div className="prose prose-lg text-gray-700 dark:text-gray-300 space-y-6">
                  <p className="text-xl leading-relaxed">
                    Welcome to my website! I am an assistant professor in
                    political communication and journalism at the Amsterdam
                    School of Communication Research, where I explore the
                    intersection of technology, media, and democratic discourse.
                  </p>
                  <p>
                    My research interests center on{" "}
                    <span className="font-semibold text-teal-600 dark:text-teal-400">
                      news consumption diversity
                    </span>{" "}
                    in digital environments and the application of{" "}
                    <span className="font-semibold text-teal-600 dark:text-teal-400">
                      computational methods
                    </span>{" "}
                    in social science research. I'm particularly motivated by
                    understanding how technological changes reshape news
                    understanding and usage patterns.
                  </p>
                  <p>
                    Through innovative approaches like data donations, I collect
                    and analyze digital trace data to study content diversity
                    and its effects on user perceptions and attitudes. My work
                    also examines emerging challenges in news access via
                    recommender systems, private messaging platforms, and smart
                    assistants.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar with highlights */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Academic Positions
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        Postdoctoral Fellow
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        Center for Social Media and Politics, NYU
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        PhD
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        Computational Political Communication, VU Amsterdam
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Community Involvement
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• Member Computational Social Science Amsterdam</li>
                  <li>
                    • Editorial Board, Computational Communication Research
                  </li>
                  <li>• Secretary, ICA Computational Methods Division</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced News Section with Working Links */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Updates
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Awards and Grants
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                year: 2025,
                text: "Received the Keetje Hodshon Dissertation Prize (KHMW)",
                link: {
                  url: "https://khmw.nl/winnares-khmw-keetje-hodshon-proefschriftprijs-voor-de-geesteswetenschappen-2025-nieuwsdiversiteit-is-cruciaal-voor-onze-democratie/", // Replace with actual URL
                  text: "Read the interview",
                },
                type: "award",
                color: "from-amber-400 to-yellow-500",
              },
              {
                year: 2025,
                text: "Received TDCC NWO Grant: RIGHTS",
                link: {
                  url: "https://tdcc.nl/tdcc-ssh-challenge-projects/rights/", // Replace with actual URL
                  text: "View grant details",
                },
                type: "grant",
                color: "from-teal-400 to-emerald-500",
              },
              {
                year: 2024,
                text: "Teaching Grant: Responsible AI",
                link: {
                  url: "https://tlc.uva.nl/en/article/responsible-ai-grant/", // Replace with actual URL
                  text: "Learn more",
                },
                type: "teaching",
                color: "from-green-400 to-teal-500",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start space-x-6">
                  <div
                    className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white font-bold text-lg`}
                  >
                    {item.year}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span
                        className={`px-3 py-1 bg-gradient-to-r ${item.color} text-white text-xs font-semibold rounded-full`}
                      >
                        {item.type.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-lg text-gray-900 dark:text-white font-medium">
                      {item.text}
                    </p>
                    {item.link && (
                      <a
                        href={item.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-3 text-teal-600 dark:text-teal-400 hover:text-teal-500 font-medium text-sm group-hover:translate-x-1 transition-all duration-200"
                      >
                        {item.link.text}
                        <svg
                          className="w-4 h-4 ml-1"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Floating Contact Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={handleContactClick}
          className="group w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
          aria-label="Contact Me"
        >
          <svg
            className="w-8 h-8 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>

      {/* Modern Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Dr. Felicia Loecherbach
              </h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Assistant Professor of Political Communication and Journalism at
                the University of Amsterdam, researching digital news diversity
                and computational methods.
              </p>
              <div className="text-sm text-gray-400">
                © {new Date().getFullYear()} Dr. Felicia Loecherbach. All rights
                reserved.
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Connect</h4>
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    url: "https://bsky.app/profile/feloe.bsky.social",
                    name: "Bluesky",
                  },
                  { url: "https://github.com/FeLoe", name: "GitHub" },
                  {
                    url: "https://www.linkedin.com/in/felicia-loecherbach-b39a23141/",
                    name: "LinkedIn",
                  },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    className="group flex items-center space-x-3 p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    </div>
                    <span className="font-medium group-hover:text-teal-400 transition-colors">
                      {link.name}
                    </span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
