// app/publications/page.tsx
import { headers } from "next/headers";
import React from "react";
import ClientWrapper from "./ClientWrapper";

export const runtime = "edge";
export const revalidate = 3600;

type WorkSummary = {
  "put-code": number;
  type: string;
  title: { title: { value: string } };
  "publication-date": {
    year: { value: string };
    month?: { value: string };
    day?: { value: string };
  };
  "journal-title"?: { value: string };
  "external-ids": {
    "external-id": {
      "external-id-type"?: string;
      "external-id-url"?: { value: string };
      "external-id-value"?: string;
    }[];
  };
};

export default async function Publications() {
  // Your existing ORCID fetch logic
  const hd = await headers();
  const host = hd.get("host") || "localhost:3000";
  const proto = hd.get("x-forwarded-proto") || "http";
  const apiUrl = new URL("/api/orcid", `${proto}://${host}`).toString();

  const res = await fetch(apiUrl, { cache: "force-cache" });
  if (!res.ok) throw new Error(`ORCID fetch failed ${res.status}`);
  const { group = [] } = await res.json();

  // Your existing data processing logic
  const map = new Map<number, WorkSummary>();
  group.forEach((g: any) =>
    g["work-summary"].forEach((s: WorkSummary) => map.set(s["put-code"], s))
  );
  let summaries = Array.from(map.values());

  // Your existing exclusions
  const excludeTitles = new Set<string>([
    "3bij3: A framework for testing effects of recommender systems on news exposure",
    "3bij3 - a framework for testing effects of recommender systems on news exposure",
    "3bij3 -- A framework for testing effects of recommender systems on news exposure",
    "The unified framework of media diversity",
    "Reading news with a purpose",
    "Threat or efficacy? Effects of competitive media frames on climate change mitigation support",
    "Hoping for the best or fearing the worst? How emotions mediate effects of news coverage of the COP21 Paris Climate Summit",
    "Googling politics? The computational identification of political and news-related searches from web browser histories",
    "Unified framework of media diversity: A systematic literature review",
    "Googling Politics? The Computational Identification of Political and News-related Searches from Web Browser Histories",
    "3bij3",
    "It takes three to tango: The interplay of political press releases, Facebook, and press coverage in the Netherland",
  ]);
  const excludePutCodes = new Set<number>([]);
  summaries = summaries.filter(
    (s) =>
      !excludeTitles.has(s.title.title.value) &&
      !excludePutCodes.has(s["put-code"])
  );

  // Your existing sorting logic
  summaries.sort((a, b) => {
    const da = a["publication-date"],
      db = b["publication-date"];
    const ta = new Date(
      `${da.year.value}-${da.month?.value || "01"}-${da.day?.value || "01"}`
    ).getTime();
    const tb = new Date(
      `${db.year.value}-${db.month?.value || "01"}-${db.day?.value || "01"}`
    ).getTime();
    return tb - ta;
  });

  // Your existing categorization logic
  const dissertationTitle =
    "Diversity of News Consumption in a Digital Information Environment";
  const dissertation = summaries.filter(
    (s) => s.title.title.value.trim() === dissertationTitle
  );
  summaries = summaries.filter(
    (s) => s.title.title.value.trim() !== dissertationTitle
  );

  const uniqueByTitle = (items: WorkSummary[]) => {
    const seen = new Set<string>();
    return items.filter((s) => {
      const key = s.title.title.value.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const seenGlobal = new Set<string>();
  const categorize = (filterFn: (s: WorkSummary) => boolean) => {
    return uniqueByTitle(summaries.filter(filterFn)).filter((s) => {
      const key = s.title.title.value.trim().toLowerCase();
      if (seenGlobal.has(key)) return false;
      seenGlobal.add(key);
      return true;
    });
  };

  const peerReviewed = categorize(
    (s) => s.type.toLowerCase() === "journal-article"
  );
  const bookChapters = categorize(
    (s) => s.type.toLowerCase() === "book-chapter"
  );
  const conferencePapers = categorize(
    (s) => s.type.toLowerCase() === "conference-paper"
  );
  const preprints = categorize((s) => s.type.toLowerCase() === "preprint");
  const others = categorize(
    (s) =>
      ![
        "journal-article",
        "book-chapter",
        "conference-paper",
        "preprint",
      ].includes(s.type.toLowerCase())
  );

  // Date formatter
  const formatDate = (d: WorkSummary["publication-date"]) =>
    new Date(
      `${d.year.value}-${d.month?.value || "01"}-${d.day?.value || "01"}`
    ).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Modern Card component
  const Card: React.FC<{ s: WorkSummary; label: string; color: string }> = ({
    s,
    label,
    color,
  }) => {
    const journal = s["journal-title"]?.value || "—";
    const ids = s["external-ids"]["external-id"];

    const doiUrlExt = ids.find(
      (e) =>
        e["external-id-type"]?.toLowerCase() === "doi" &&
        e["external-id-url"]?.value
    )?.["external-id-url"]?.value;
    const doiVal = ids.find(
      (e) =>
        e["external-id-type"]?.toLowerCase() === "doi" &&
        e["external-id-value"]?.trim()
    )?.["external-id-value"];
    const doiUrlVal = doiVal ? `https://doi.org/${doiVal}` : undefined;
    const anyExt = ids.find((e) => e["external-id-url"]?.value)?.[
      "external-id-url"
    ]?.value;
    const url =
      doiUrlExt ||
      doiUrlVal ||
      anyExt ||
      `https://orcid.org/${process.env.ORCID_ID}`;
    const date = formatDate(s["publication-date"]);

    return (
      <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className={`h-2 bg-gradient-to-r ${color}`}></div>
        <div className="p-6">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-snug">
              {s.title.title.value}
            </h3>
          </a>

          <div className="space-y-2 mb-4">
            <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
              {journal}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{date}</p>
          </div>

          <div className="flex items-center justify-between">
            <span
              className={`inline-block text-xs font-semibold px-3 py-1 rounded-full text-white bg-gradient-to-r ${color}`}
            >
              {label}
            </span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 dark:text-teal-400 hover:text-teal-500 transition-colors"
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  };

  // Modern Section component
  const Section: React.FC<{
    title: string;
    color: string;
    items: WorkSummary[];
    icon: React.ReactNode;
  }> = ({ title, color, items, icon }) => (
    <section className="mb-16">
      <div className="flex items-center space-x-3 mb-8">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white`}>
          {icon}
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium">
          {items.length}
        </span>
      </div>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((s) => (
            <Card key={s["put-code"]} s={s} label={title} color={color} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
          <p className="text-gray-500 dark:text-gray-400">
            No publications in this category yet.
          </p>
        </div>
      )}
    </section>
  );

  return (
    <ClientWrapper>
      <main className="transition-colors duration-300 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
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
                Publications
              </h1>
              <p className="text-xl md:text-2xl text-teal-100 mb-4">
                Peer-reviewed research, book chapters, and academic
                contributions
              </p>
              <p className="text-teal-200 italic">
                Data automatically retrieved from ORCID
              </p>
            </div>
          </div>
        </section>

        {/* Publications Content */}
        <div className="container mx-auto px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto space-y-16">
            {dissertation.length > 0 && (
              <Section
                title="Dissertation"
                color="from-amber-500 to-yellow-500"
                items={dissertation}
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
              />
            )}

            {peerReviewed.length > 0 && (
              <Section
                title="Peer-Reviewed Articles"
                color="from-teal-500 to-emerald-500"
                items={peerReviewed}
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
              />
            )}

            {bookChapters.length > 0 && (
              <Section
                title="Book Chapters"
                color="from-emerald-500 to-green-500"
                items={bookChapters}
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
              />
            )}

            {conferencePapers.length > 0 && (
              <Section
                title="Conference Proceedings"
                color="from-orange-500 to-amber-500"
                items={conferencePapers}
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                }
              />
            )}

            {preprints.length > 0 && (
              <Section
                title="Preprints"
                color="from-gray-500 to-gray-600"
                items={preprints}
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
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                }
              />
            )}

            {others.length > 0 && (
              <Section
                title="Other Publications"
                color="from-indigo-500 to-purple-500"
                items={others}
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
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                }
              />
            )}
          </div>
        </div>
      </main>
    </ClientWrapper>
  );
}
