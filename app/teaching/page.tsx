// app/teaching/page.tsx
"use client";
import React, { useState, useEffect } from "react";

// PhD supervision item type
interface PhDSupervisionItem {
  name: string;
  years: string;
  title: string;
  coSupervisors: string;
  url?: string;
}

// Other teaching item type
interface TeachingItem {
  desc: string;
  url?: string;
}

export default function Teaching() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  // Data arrays
  const phdSupervision: PhDSupervisionItem[] = [
    {
      name: "Youri Coudron",
      years: "2025–2028",
      title: "Financial Challenges Facing Journalism",
      coSupervisors: "Mark Boukes and Anke Wonneberger",
      url: "https://www.uva.nl/en/profile/c/o/y.m.coudron/y.m.coudron.html#PhD-Project-Description",
    },
    {
      name: "Liv van Roozendaal",
      years: "2025–2029",
      title:
        "Generative AI in Our Daily Lives: Unraveling the Trust-and-Use Calibration Dynamics",
      coSupervisors: "Theo Araujo, Anne Kroon, and Floor Fiers",
      url: "https://calibratedtrust.eu",
    },
    {
      name: "Brian Douwenga",
      years: "2025–2029",
      title:
        "Democracy by Design: How App Characteristics Shape Youth Political Worldviews",
      coSupervisors: "Tom Dobber, Linda Bos, and Bert Bakker",
      url: "https://www.linkedin.com/posts/tomdobber_vacancy-phd-position-democracy-by-design-activity-7303353462203777024-DTDt",
    },
  ];

  const coursesTaught: TeachingItem[] = [
    {
      desc: "Big Data II (2026): 6 ECTS Research Master Class, UvA—Focus on sustainability and ethics of (generative) AI methods",
      url: "https://coursecatalogue.uva.nl/xmlpages/page/2025-2026-en/search-course/course/132481",
    },
    {
      desc: "Applied Digital Citizen Science (2025): 6 ECTS elective Master Communication Science, UvA—Conceptualized with Theo Araujo",
      url: "https://coursecatalogue.uva.nl/xmlpages/page/2025-2026-en/search-course/course/131411",
    },
    {
      desc: "Data Journalism (since 2024): 6 ECTS Erasmus Mundus Master's in Journalism, UvA",
      url: "https://coursecatalogue.uva.nl/xmlpages/page/2024-2025-en/search-course/course/121373",
    },
    {
      desc: "Big Data and Automated Content Analysis (2024–2025): 12 ECTS Research Master Class, UvA—Material by Damian Trilling & Anne Kroon",
      url: "https://coursecatalogue.uva.nl/xmlpages/page/2024-2025-en/search-course/course/121423",
    },
    {
      desc: "Using R for Data Wrangling, Analysis & Visualization (2024): 6 ECTS Research Master Class, UvA",
      url: "https://coursecatalogue.uva.nl/xmlpages/page/2024-2025-en/search-course/course/121429",
    },
    {
      desc: "Digital Society Research Project (since 2024): Minor Communication in the Digital Society, UvA",
      url: "https://coursecatalogue.uva.nl/xmlpages/page/2025-2026-en/search-course/course/131317",
    },
    {
      desc: "Images as Data (2023): Summer School for Women in Political Methodology, Basel",
      url: "https://dgw.philhist.unibas.ch/fileadmin/user_upload/dgw/Aktuelles/News/Archive-2023/2023-09_-_Summer_School_-_Review.pdf",
    },
    {
      desc: "Automated Image & Video Analysis (2022–2024): GESIS Fall Seminar, co-taught with Dr. Andreu Casas",
      url: "https://www.gesis.org/en/gesis-training/courses-registration/archive/methods-seminar/2023",
    },
    {
      desc: "Automated Content Analysis using Python (2020–2021): VU Winter School",
      url: "https://vu.nl/en/education/vu-graduate-winter-school",
    },
    {
      desc: "Visualization in R (2019–2020): VU Minor Digital Humanities",
      url: "https://vu.nl/en/education/minor/digital-humanities-and-social-analytics/curriculum",
    },
    { desc: "Introduction to R (2019): VU Graduate School" },
  ];

  const thesisSupervision: TeachingItem[] = [
    { desc: "15 Master theses (Communication Science, UvA)" },
    { desc: "5 Bachelor theses (Communication Science, VU)" },
  ];

  const qualifications: TeachingItem[] = [
    {
      desc: "University Teaching Qualification (UTP, 150h), Netherlands, 2021",
      url: "https://vu.nl/en/education/vu-centre-for-teaching-learning/courses-programmes/university-teaching-programme-utq",
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

  // Fixed PhD Supervision Card component
  const PhDCard: React.FC<{ student: PhDSupervisionItem; color: string }> = ({
    student,
    color,
  }) => (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${color}`}></div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          {student.url ? (
            <a
              href={student.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-bold text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
            >
              {student.name}
            </a>
          ) : (
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {student.name}
            </h3>
          )}
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${color} whitespace-nowrap ml-4`}
          >
            {student.years}
          </span>
        </div>

        <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3 italic">
          "{student.title}"
        </h4>

        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <svg
            className="w-4 h-4"
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
          <span>
            Co-supervised with{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              {student.coSupervisors}
            </strong>
          </span>
        </div>

        {student.url && (
          <a
            href={student.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 text-sm font-medium cursor-pointer transition-colors"
          >
            View Project
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

  // Fixed Teaching Card component
  const TeachingCard: React.FC<{
    item: TeachingItem;
    color: string;
    compact?: boolean;
  }> = ({ item, color, compact = false }) => (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${color}`}></div>
      <div className="p-6">
        {item.url ? (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
          >
            <p
              className={`${
                compact ? "text-lg" : "text-base"
              } font-semibold text-gray-900 dark:text-white leading-relaxed`}
            >
              {item.desc}
            </p>
          </a>
        ) : (
          <p
            className={`${
              compact ? "text-lg" : "text-base"
            } font-semibold text-gray-900 dark:text-white leading-relaxed`}
          >
            {item.desc}
          </p>
        )}

        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 text-sm font-medium cursor-pointer transition-colors"
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
              Teaching
            </h1>
            <p className="text-xl md:text-2xl text-teal-100 mb-4">
              PhD supervision, course development, and academic qualifications
            </p>
            <p className="text-teal-200">
              Educating the next generation of computational communication
              researchers
            </p>
          </div>
        </div>
      </section>

      {/* Teaching Content */}
      <div className="container mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* PhD Supervision */}
          <Section
            title="PhD Supervision"
            color="from-teal-500 to-emerald-500"
            count={phdSupervision.length}
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            }
          >
            <div className="space-y-8">
              {phdSupervision.map((student, idx) => (
                <PhDCard
                  key={idx}
                  student={student}
                  color="from-teal-500 to-emerald-500"
                />
              ))}
            </div>
          </Section>

          {/* Courses Developed & Taught */}
          <Section
            title="Courses Developed & Taught"
            color="from-emerald-500 to-green-500"
            count={coursesTaught.length}
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coursesTaught.map((course, idx) => (
                <TeachingCard
                  key={idx}
                  item={course}
                  color="from-emerald-500 to-green-500"
                />
              ))}
            </div>
          </Section>

          {/* Thesis Supervision */}
          <Section
            title="Thesis Supervision"
            color="from-amber-500 to-orange-500"
            count={thesisSupervision.length}
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {thesisSupervision.map((thesis, idx) => (
                <TeachingCard
                  key={idx}
                  item={thesis}
                  color="from-amber-500 to-orange-500"
                  compact={true}
                />
              ))}
            </div>
          </Section>

          {/* Qualifications */}
          <Section
            title="Qualifications"
            color="from-orange-500 to-red-500"
            count={qualifications.length}
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
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {qualifications.map((qual, idx) => (
                <TeachingCard
                  key={idx}
                  item={qual}
                  color="from-orange-500 to-red-500"
                  compact={true}
                />
              ))}
            </div>
          </Section>
        </div>
      </div>
    </main>
  );
}
