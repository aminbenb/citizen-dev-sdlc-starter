import { useEffect, useState } from "react";
import { getDeals } from "../lib/data/client";
import type { Deal } from "../lib/data/types";
import { DealCard } from "../components/DealCard";

// A reference page: thin, gets its data from the shared data layer only,
// holds minimal local state. Copy this pattern for new pages — see
// .claude/skills/new-page/SKILL.md.
export function DealsPage() {
  const [deals, setDeals] = useState<Deal[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    getDeals().then((result) => {
      if (!cancelled) setDeals(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (deals === null) {
    return <div data-testid="deals-loading">Loading deals…</div>;
  }

  return (
    <div>
      <h1>Deal Pipeline</h1>
      <div className="deal-list">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  );
}
