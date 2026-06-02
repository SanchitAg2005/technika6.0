import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Send, Sparkles, Search, CheckCircle, Clock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/query-desk")({
  component: QueryDeskPage,
  head: () => ({
    meta: [
      { title: "Query Desk & Support | Technica 6.0" },
      { name: "description", content: "Check registration progress or view support channels for Technica 6.0." },
    ],
  }),
});

function QueryDeskPage() {
  const [searchId, setSearchId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<any | null>(null);

  const handleCheckProgress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setIsSearching(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSearching(false);
      // Return mock data
      setSearchResult({
        id: searchId.trim().toUpperCase(),
        name: "Suresh Kumar",
        steps: [
          { label: "Registration Submitted", status: "completed", date: "June 02, 2026" },
          { label: "Payment Verified (UTR Received)", status: "completed", date: "June 02, 2026" },
          { label: "Confirmation Email Sent", status: "pending", date: "Processing..." },
          { label: "Entry Pass Generated", status: "pending", date: "Pending email dispatch..." },
        ],
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-parchment-texture text-[var(--navy)] flex flex-col justify-between p-6 md:p-12">
      {/* Header */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between border-b border-[var(--gold)]/20 pb-6 mb-8">
        <Link to="/" className="flex flex-col text-left transition-opacity hover:opacity-90">
          <span className="font-sans text-[0.6rem] sm:text-[0.65rem] tracking-[0.2em] font-bold text-[var(--navy)] leading-tight uppercase">
            TECHNICA 6.0
          </span>
          <span className="font-sanskrit text-[0.65rem] sm:text-[0.7rem] tracking-[0.05em] text-[var(--bronze)] font-semibold mt-0.5">
            SUPPORT & QUERY DESK (AVINYĀ)
          </span>
        </Link>
        <Link
          to="/"
          className="text-xs font-bold uppercase tracking-wider text-[var(--navy)]/80 hover:text-[var(--gold)] transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft size={14} /> Back Home
        </Link>
      </header>

      {/* Main Grid */}
      <main className="flex-grow w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-4">
        {/* Left Side: Check Registration Progress Widget */}
        <div className="lg:col-span-5 backdrop-blur-md bg-white/40 border border-[var(--gold)]/10 rounded-2xl p-6 shadow-sm">
          <h2 className="font-display text-xl sm:text-2xl font-bold tracking-wide flex items-center gap-2">
            <Search className="text-[var(--gold)]" size={20} />
            Check <span className="italic text-[var(--gold)]">Progress</span>
          </h2>
          <p className="text-xs text-[var(--navy)]/70 mt-2 leading-relaxed font-medium">
            Enter your Registration ID or registered Email address below to check the real-time status of your event ticket and payment verification.
          </p>

          <form onSubmit={handleCheckProgress} className="mt-6 flex flex-col gap-3">
            <div className="relative">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="e.g. TA-60192 or student@email.com"
                className="w-full bg-white/60 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-xs font-semibold placeholder-[var(--navy)]/30 focus:outline-none focus:border-[var(--gold)] transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#050A14] text-[#F6F1E7] py-3 text-xs font-bold uppercase tracking-[0.2em] shadow-md hover:bg-[#0A1222] transition-colors focus:outline-none disabled:opacity-75"
            >
              {isSearching ? (
                <>
                  <Loader2 className="animate-spin" size={14} /> Searching...
                </>
              ) : (
                "Verify Progress"
              )}
            </button>
          </form>

          {/* Results Box */}
          {searchResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 border-t border-[var(--gold)]/10 pt-6"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--bronze)]">
                  Reference: {searchResult.id}
                </span>
                <span className="text-[10px] font-bold uppercase text-[var(--navy)]/60">
                  {searchResult.name}
                </span>
              </div>

              {/* Progress Steps */}
              <div className="flex flex-col gap-4">
                {searchResult.steps.map((step: any, idx: number) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      {step.status === "completed" ? (
                        <CheckCircle size={18} className="text-emerald-600 shrink-0" />
                      ) : (
                        <Clock size={18} className="text-[var(--gold)]/60 shrink-0" />
                      )}
                      {idx < searchResult.steps.length - 1 && (
                        <div className="w-[1.5px] h-6 bg-[var(--gold)]/15 my-1" />
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold tracking-wide leading-none mt-0.5">
                        {step.label}
                      </p>
                      <p className="text-[9px] font-semibold text-[var(--navy)]/40 mt-1 uppercase tracking-wider">
                        {step.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Side: Chatbot UI Mockup */}
        <div className="lg:col-span-7 backdrop-blur-md bg-white/40 border border-[var(--gold)]/10 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between h-[520px]">
          {/* Chat Header */}
          <div className="bg-[#050A14] text-[#F6F1E7] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/50 flex items-center justify-center text-[var(--gold)]">
                <Sparkles size={16} />
              </div>
              <div className="text-left">
                <h3 className="text-xs font-bold uppercase tracking-[0.15em]">Technica Assistant</h3>
                <span className="text-[9px] font-semibold text-[var(--gold-soft)] uppercase tracking-widest block leading-none mt-0.5">
                  AI Guide · Coming Soon
                </span>
              </div>
            </div>
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          </div>

          {/* Chat Messages Stage */}
          <div className="flex-grow p-5 overflow-y-auto flex flex-col gap-4 bg-white/10">
            {/* Assistant Welcome Card */}
            <div className="flex gap-2.5 max-w-[85%] text-left">
              <div className="h-6 w-6 rounded-full bg-[var(--navy)] flex items-center justify-center text-[var(--gold-soft)] text-[9px] font-bold font-display shrink-0 mt-1">
                TA
              </div>
              <div className="bg-white/70 border border-[var(--gold)]/10 p-4 rounded-2xl rounded-tl-none shadow-sm">
                <p className="text-xs font-medium leading-relaxed">
                  Welcome to the **Technica 6.0 Query Desk**! I am your future AI companion.
                </p>
                <p className="text-xs font-medium leading-relaxed mt-2">
                  Once active, I will assist you with:
                </p>
                <ul className="text-xs font-bold text-[var(--bronze)] mt-2 flex flex-col gap-1.5 list-disc pl-4">
                  <li>Detailed Event Rulebooks & Queries</li>
                  <li>Payment & Registration Troubleshooting</li>
                  <li>Campus Locations, Venues, & Timings</li>
                  <li>Brochure & Schedule Breakdowns</li>
                </ul>
              </div>
            </div>

            {/* User message placeholder */}
            <div className="flex justify-end w-full">
              <div className="bg-[#050A14]/5 border border-[var(--gold)]/5 text-[var(--navy)]/40 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                AI Assistant will be available soon
              </div>
            </div>
          </div>

          {/* Chat Input Bar (Disabled) */}
          <div className="p-4 border-t border-[var(--gold)]/10 bg-white/30 flex gap-2">
            <input
              type="text"
              disabled
              placeholder="Chat assistant is currently offline..."
              className="flex-grow bg-white/50 border border-[var(--gold)]/15 rounded-lg px-4 py-3 text-xs placeholder-[var(--navy)]/30 font-medium focus:outline-none cursor-not-allowed"
            />
            <button
              disabled
              className="p-3 rounded-lg bg-[var(--navy)]/30 border border-transparent text-white cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto pt-8 border-t border-[var(--gold)]/10 mt-8 text-center text-[9px] uppercase tracking-[0.25em] text-[var(--navy)]/40 font-semibold">
        © 2026 Technica 6.0 · Department of Computer Science & Engineering
      </footer>
    </div>
  );
}
