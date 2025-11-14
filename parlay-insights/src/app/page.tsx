import { ParlayDashboard } from "@/components/parlay-dashboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-white to-zinc-200 px-6 py-12 dark:from-black dark:via-zinc-950 dark:to-black sm:px-10">
      <main className="mx-auto w-full max-w-5xl space-y-10">
        <ParlayDashboard />
      </main>
    </div>
  );
}
