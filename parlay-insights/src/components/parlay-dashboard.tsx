"use client";

import { useMemo, useState } from "react";
import { Parlay, Sport, parlays, updateTimestamp } from "@/data/parlays";
import { ParlayCard } from "./parlay-card";

const sports: Sport[] = ["NBA", "NFL", "NHL"];
const riskLevels: Parlay["riskLevel"][] = [
  "Conservative",
  "Balanced",
  "Aggressive",
];

export function ParlayDashboard() {
  const [selectedSport, setSelectedSport] = useState<Sport | "ALL">("ALL");
  const [selectedRisk, setSelectedRisk] = useState<Parlay["riskLevel"] | "ALL">(
    "ALL",
  );
  const [search, setSearch] = useState("");

  const filteredParlays = useMemo(() => {
    return parlays.filter((parlay) => {
      const matchesSport =
        selectedSport === "ALL" ? true : parlay.sport === selectedSport;
      const matchesRisk =
        selectedRisk === "ALL" ? true : parlay.riskLevel === selectedRisk;
      const matchesSearch = search
        ? [parlay.title, parlay.notes, parlay.legs.map((leg) => leg.player).join(" ")]
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
        : true;
      return matchesSport && matchesRisk && matchesSearch;
    });
  }, [search, selectedRisk, selectedSport]);

  return (
    <div className="space-y-10">
      <header className="rounded-3xl border border-zinc-200/60 bg-white/80 p-8 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-900/70">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400">
              Friday · November 14, 2025
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Player Prop Parlays Spotlight
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              Curated multi-leg tickets leveraging matchup data, pace
              projections, and recent form. These builds balance exposure across
              marquee NBA, NFL, and NHL slates while highlighting correlation
              angles worth pairing in DFS and betting cards alike.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-3 text-sm font-medium text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            {updateTimestamp}
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="col-span-1 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedSport("ALL")}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                selectedSport === "ALL"
                  ? "bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              }`}
            >
              All Sports
            </button>
            {sports.map((sport) => (
              <button
                key={sport}
                type="button"
                onClick={() => setSelectedSport(sport)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                  selectedSport === sport
                    ? "bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                {sport}
              </button>
            ))}
          </div>

          <div className="col-span-1 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedRisk("ALL")}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                selectedRisk === "ALL"
                  ? "bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              }`}
            >
              All Risk
            </button>
            {riskLevels.map((risk) => (
              <button
                key={risk}
                type="button"
                onClick={() => setSelectedRisk(risk)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                  selectedRisk === risk
                    ? "bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                {risk}
              </button>
            ))}
          </div>

          <div className="col-span-1">
            <label className="sr-only" htmlFor="search">
              Search for players or notes
            </label>
            <div className="relative">
              <input
                id="search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search players, matchups, or keywords…"
                className="w-full rounded-full border border-zinc-200 bg-white py-2.5 pl-5 pr-12 text-sm text-zinc-700 shadow-inner focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-600 dark:focus:ring-zinc-800"
              />
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-zinc-400">
                ⌕
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">
            Featured Builds
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Showing {filteredParlays.length} of {parlays.length} curated cards
          </p>
        </div>
        <div className="grid gap-8">
          {filteredParlays.map((parlay) => (
            <ParlayCard key={parlay.id} parlay={parlay} />
          ))}
        </div>
        {!filteredParlays.length && (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-12 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-400">
            No parlays match your filters. Adjust sport, risk, or search terms to
            discover curated cards.
          </div>
        )}
      </section>

      <footer className="rounded-3xl border border-zinc-200/70 bg-white/80 p-6 text-xs leading-relaxed text-zinc-500 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900/60 dark:text-zinc-400">
        These projections synthesize pace-adjusted matchup data, rolling player
        efficiency and betting market signals as of midweek. Always verify final
        injury reports and shop lines before staking. Wager responsibly—set limits
        and seek help if betting stops being fun (Call 1-800-GAMBLER).
      </footer>
    </div>
  );
}
