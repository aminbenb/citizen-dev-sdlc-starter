// The shared data layer — see AGENTS.md.
//
// This is the ONLY file in this repo allowed to call `fetch` (enforced by
// the no-restricted-syntax rule in eslint.config.js, not just this comment).
// Every page and component gets its data by importing functions from here.
//
// Today this is an in-memory mock, because this template assumes no access
// to a real backend. In a real deployment, these same function signatures
// would call the firm's actual operational database — directly, or through
// an MCP server — so the *pages* never need to change when the backend
// does. That indirection is the point: it's what makes the vendor/backend
// swappable without rewriting every feature built on top of it.

import type { Deal, PortfolioCompany } from "./types";

const MOCK_DEALS: Deal[] = [
  {
    id: "meridian",
    name: "Meridian Fleet Services, Inc.",
    sponsor: "Ashcroft Partners",
    stage: "IC Review",
    requestedAmount: 85_000_000,
  },
  {
    id: "cascade",
    name: "Cascade Behavioral Health",
    sponsor: "Northlake Capital",
    stage: "Diligence",
    requestedAmount: 60_000_000,
  },
  {
    id: "ironclad",
    name: "Ironclad Industrial Coatings",
    sponsor: "Ridgeline Equity",
    stage: "Screening",
    requestedAmount: 45_000_000,
  },
];

const MOCK_PORTFOLIO_COMPANIES: PortfolioCompany[] = [
  {
    id: "brightwell",
    name: "Brightwell Logistics",
    sector: "Transportation",
    status: "Active",
    ownershipPercent: 62,
  },
  {
    id: "harborview",
    name: "Harborview Diagnostics",
    sector: "Healthcare",
    status: "Active",
    ownershipPercent: 48,
  },
  {
    id: "pinnacle",
    name: "Pinnacle Metal Works",
    sector: "Industrials",
    status: "Under Review",
    ownershipPercent: 71,
  },
];

// Simulates real network latency
function delay<T>(value: T, ms = 150): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function getDeals(): Promise<Deal[]> {
  // A real implementation: `return fetch("/api/deals").then(r => r.json())`
  // or an MCP tool call against the firm's deal-tracking system.
  return delay(MOCK_DEALS);
}

export async function getDeal(id: string): Promise<Deal | undefined> {
  return delay(MOCK_DEALS.find((d) => d.id === id));
}

export async function getPortfolioCompanies(): Promise<PortfolioCompany[]> {
  return delay(MOCK_PORTFOLIO_COMPANIES);
}

export async function getPortfolioCompany(
  id: string,
): Promise<PortfolioCompany | undefined> {
  return delay(MOCK_PORTFOLIO_COMPANIES.find((c) => c.id === id));
}
