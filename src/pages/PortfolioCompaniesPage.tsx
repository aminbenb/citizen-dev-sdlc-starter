import { useEffect, useState } from "react";
import { getPortfolioCompanies } from "../lib/data/client";
import type { PortfolioCompany } from "../lib/data/types";
import { PortfolioCompanyCard } from "../components/PortfolioCompanyCard";

export function PortfolioCompaniesPage() {
  const [companies, setCompanies] = useState<PortfolioCompany[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    getPortfolioCompanies().then((result) => {
      if (!cancelled) setCompanies(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (companies === null) {
    return (
      <div data-testid="portfolio-companies-loading">Loading portfolio companies…</div>
    );
  }

  return (
    <div>
      <h1>Portfolio Companies</h1>
      <div className="deal-list">
        {companies.map((company) => (
          <PortfolioCompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}
