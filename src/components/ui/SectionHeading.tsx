import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  children,
  className,
  align = "left",
}: {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="type-eyebrow flex items-center gap-3">
          <span
            aria-hidden
            className="h-px w-8 bg-gradient-to-r from-violet-core/80 to-transparent"
          />
          {eyebrow}
        </span>
      ) : null}
      <h2 className="type-section max-w-[22ch] text-ink">{children}</h2>
    </div>
  );
}
