import type { Deal } from "../lib/data/types";

function formatMoney(n: number): string {
  return `$${(n / 1_000_000).toFixed(1)}M`;
}

export function DealCard({ deal }: { deal: Deal }) {
  return (
    <div className="deal-card" data-testid="deal-card">
      <div className="deal-card-name">{deal.name}</div>
      <div className="deal-card-meta">
        <span>{deal.sponsor}</span>
        <span className="deal-card-stage">{deal.stage}</span>
        <span>{formatMoney(deal.requestedAmount)}</span>
      </div>
    </div>
  );
}
