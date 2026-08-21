import type { PortfolioCompany } from "../lib/data/types";

export function PortfolioCompanyCard({ company }: { company: PortfolioCompany }) {
  return (
    <div className="deal-card" data-testid="portfolio-company-card">
      <div className="deal-card-name">{company.name}</div>
      <div className="deal-card-meta">
        <span>{company.sector}</span>
        <span className="deal-card-stage">{company.status}</span>
        <span>{company.ownershipPercent}% owned</span>
      </div>
    </div>
  );
}
