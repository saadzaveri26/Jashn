import { Sparkles } from "lucide-react";
import { ideaFits } from "@/engine/idea-fit";
import type { Allocation, Idea } from "@/engine/schemas";
import { formatInr } from "@/lib/format";

type Props = {
  idea: Idea;
  allocation?: Allocation;
};

export function IdeaCard({ idea, allocation }: Props) {
  const allocAmount = allocation?.amount ?? 0;
  const fit = ideaFits({ costBand: idea.costBand, allocationAmount: allocAmount });

  return (
    <article className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-2xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs px-2 py-0.5 rounded-sm uppercase tracking-wider font-semibold bg-amber-50 text-amber-900 border border-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800">
            {idea.costBand} Cost
          </span>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            {allocation?.label || idea.categoryId}
          </span>
        </div>
        <h3 className="font-serif font-medium text-base text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500 shrink-0" aria-hidden="true" />
          <span>{idea.title}</span>
        </h3>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
          {idea.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
        <span className="text-stone-500 dark:text-stone-400">Estimated ceiling</span>
        <span className="font-medium text-stone-900 dark:text-stone-200">
          ≤ {formatInr(fit.bandCeiling)}
        </span>
      </div>
    </article>
  );
}

