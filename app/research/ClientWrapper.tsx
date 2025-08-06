// app/research/ClientWrapper.tsx
"use client";
import { useState, useEffect } from "react";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

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

  return (
    <>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
        aria-label="Toggle theme"
      >
        <span className="text-xl">{theme === "dark" ? "☀️" : "🌙"}</span>
      </button>
      {children}
    </>
  );
}
