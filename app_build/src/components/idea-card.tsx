import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ideaFits } from "@/engine/idea-fit";
import type { Allocation, Idea } from "@/engine/schemas";
import { formatInr } from "@/lib/format";
import { PaisleyCorner } from "@/components/motifs";

type Props = {
  idea: Idea;
  allocation?: Allocation;
  index?: number;
};

export function IdeaCard({ idea, allocation, index = 0 }: Props) {
  const allocAmount = allocation?.amount ?? 0;
  const fit = ideaFits({ costBand: idea.costBand, allocationAmount: allocAmount });

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="p-5 rounded-lg border border-[var(--border)] bg-[var(--card)] shadow-xs flex flex-col justify-between relative overflow-hidden"
    >
      <div className="absolute top-1 right-1 opacity-20 pointer-events-none text-[var(--accent)]" aria-hidden="true">
        <PaisleyCorner size={28} position="top-right" />
      </div>

      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold bg-[var(--surface-muted)] text-[var(--accent)] border border-[var(--border)]">
            {idea.costBand} Cost
          </span>
          <span className="text-xs text-[var(--muted-foreground)]">
            {allocation?.label || idea.categoryId}
          </span>
        </div>
        <h3 className="font-serif font-semibold text-base text-[var(--foreground)] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
          <span>{idea.title}</span>
        </h3>
        <p className="text-xs text-[var(--muted-foreground)] mt-2 leading-relaxed">
          {idea.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
        <span className="text-[var(--muted-foreground)]">Estimated ceiling</span>
        <span className="font-semibold text-[var(--foreground)]">
          ≤ {formatInr(fit.bandCeiling)}
        </span>
      </div>
    </motion.article>
  );
}
