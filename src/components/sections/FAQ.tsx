"use client";

import { useId, useRef, useState } from "react";
import { Plus, Search, HelpCircle, MessageSquare } from "lucide-react";
import { FAQS, SOCIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/animations/scrollAnimations";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const scope = useScrollReveal<HTMLDivElement>();
  const baseId = useId();
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const filtered = FAQS.filter(
    (item) =>
      item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.a.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = filtered.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;

    if (next !== null) {
      event.preventDefault();
      buttonRefs.current[next]?.focus();
    }
  };

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden border-t border-white/[0.05] section-pad"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 animate-drift-glow rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.1) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="shell relative" ref={scope}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-24">
          {/* Left side */}
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="type-eyebrow">09 — Common Questions</span>
              <span className="flex-1 hairline lg:hidden" />
            </div>
            <h2 data-reveal className="type-section mb-2 max-w-[11ch]">
              Questions, answered.
            </h2>
            <p data-reveal className="type-lede mt-4 max-w-[32ch]">
              Straight answers about what MAHII is, what it costs, where it runs and how shared listening works.
            </p>

            {/* Search box - refined */}
            <div data-reveal className="mt-8 relative max-w-sm">
              <Search
                size={14}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions (e.g. offline, price)..."
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-ink placeholder:text-ink-muted/60 focus:border-violet-core/60 focus:outline-none focus:ring-1 focus:ring-violet-core/60 transition-all duration-300"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Contact card */}
            <div data-reveal className="mt-8 rounded-xl border border-white/[0.06] bg-surface/50 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-core/10 text-lavender">
                  <MessageSquare size={14} />
                </span>
                <span className="text-xs font-semibold text-ink">Have a specific question?</span>
              </div>
              <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                Harsh and Shubham actively answer questions and review community feedback directly on social or email.
              </p>
              <a
                href={SOCIALS.contact}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-lavender hover:underline"
              >
                Send an email inquiry →
              </a>
            </div>
          </div>

          {/* Right side - Q&A list */}
          <div data-reveal>
            {filtered.length === 0 ? (
              <div className="rounded-xl border border-white/10 p-8 text-center">
                <HelpCircle size={28} className="mx-auto mb-2 text-ink-muted/50" />
                <p className="text-sm font-medium text-ink">No matching questions found</p>
                <p className="mt-1 text-xs text-ink-muted">Try a different search term or clear the filter.</p>
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="mt-4 rounded-full bg-white/10 px-4 py-1.5 text-xs text-ink hover:bg-white/20 transition-colors"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <ul className="flex flex-col">
                {filtered.map((item, index) => {
                  const isOpen = openIndex === index;
                  const panelId = `${baseId}-panel-${index}`;
                  const buttonId = `${baseId}-button-${index}`;

                  return (
                    <li
                      key={item.q}
                      className="border-b border-white/[0.05] last:border-0"
                    >
                      <h3>
                        <button
                          ref={(el) => {
                            buttonRefs.current[index] = el;
                          }}
                          id={buttonId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                          onKeyDown={(e) => onKeyDown(e, index)}
                          className="flex w-full items-center justify-between gap-4 py-5 text-left"
                        >
                          <span
                            className={cn(
                              "text-[1.0625rem] font-medium tracking-tight transition-colors duration-300",
                              isOpen
                                ? "text-ink"
                                : "text-ink-soft group-hover:text-ink",
                            )}
                          >
                            {item.q}
                          </span>
                          <span
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-400",
                              isOpen
                                ? "rotate-45 border-violet-core/50 bg-violet-core/15 text-lavender"
                                : "border-white/12 text-ink-muted group-hover:border-white/25",
                            )}
                            style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                          >
                            <Plus size={13} strokeWidth={2} />
                          </span>
                        </button>
                      </h3>

                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className={cn(
                          "grid transition-all duration-500",
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        )}
                        style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-5 pr-12 text-[0.9375rem] leading-relaxed text-ink-soft">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
