"use client";

import type { Parlay } from "@/data/parlays";
import { cn } from "@/lib/cn";
import { Fragment } from "react";

const sportColors: Record<Parlay["sport"], string> = {
  NBA: "from-purple-500/90 via-indigo-500/80 to-cyan-500/70",
  NFL: "from-amber-500/90 via-orange-500/80 to-red-500/70",
  NHL: "from-blue-500/90 via-sky-500/80 to-cyan-400/70",
};

const riskBadge: Record<Parlay["riskLevel"], string> = {
  Conservative: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30",
  Balanced: "bg-blue-500/10 text-blue-500 border border-blue-500/30",
  Aggressive: "bg-rose-500/10 text-rose-500 border border-rose-500/30",
};

interface ParlayCardProps {
  parlay: Parlay;
}

export function ParlayCard({ parlay }: ParlayCardProps) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-zinc-200/60 bg-white px-6 py-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800/60 dark:bg-zinc-900">
      <div
        className={cn(
          "absolute -top-20 -right-20 h-52 w-52 rounded-full blur-3xl opacity-60",
          "bg-gradient-to-br",
          sportColors[parlay.sport],
        )}
      />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900">
            {parlay.sport}
          </span>
          <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {parlay.slate} Slate
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
              riskBadge[parlay.riskLevel],
            )}
          >
            {parlay.riskLevel}
          </span>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium uppercase text-zinc-500 dark:text-zinc-400">
            Total Odds
          </p>
          <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            {parlay.totalOdds}
          </p>
        </div>
      </div>

      <h2 className="mt-6 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        {parlay.title}
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {parlay.notes}
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-3 md:items-end">
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Confidence Index
          </p>
          <div className="mt-2 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${parlay.confidence}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {parlay.confidence}%
            </span>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Implied Probability
          </p>
          <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {parlay.impliedProbability}%
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Suggested Stake
          </p>
          <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {parlay.stakeRecommendation}
          </p>
          <p className="text-xs font-medium uppercase text-zinc-400 dark:text-zinc-500">
            Book: {parlay.book}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200/70 bg-zinc-50/80 p-5 dark:border-zinc-800/60 dark:bg-zinc-900/60">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Legs
        </h3>
        <div className="mt-4 space-y-5">
          {parlay.legs.map((leg, index) => (
            <Fragment key={`${parlay.id}-${leg.player}`}>
              <div className="flex flex-col gap-2 rounded-xl bg-white/80 p-4 shadow-sm dark:bg-zinc-950/40">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      Leg {index + 1}
                    </p>
                    <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      {leg.player}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {leg.market} · {leg.line}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      Matchup
                    </p>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {leg.opponent}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {leg.kickoff}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      Trend Insight
                    </p>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                      {leg.trend}
                    </p>
                  </div>
                  <div className="sm:min-w-[140px]">
                    <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      Leg Confidence
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{ width: `${leg.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                        {leg.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  {leg.rationale}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </article>
  );
}

