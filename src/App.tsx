import { useState } from "react";
import { DealsPage } from "./pages/DealsPage";
import { PortfolioCompaniesPage } from "./pages/PortfolioCompaniesPage";

type Route = "deals" | "portfolio-companies";

export function App() {
  const [route, setRoute] = useState<Route>("deals");

  return (
    <div>
      <nav className="app-nav">
        <button
          className={route === "deals" ? "app-nav-link active" : "app-nav-link"}
          onClick={() => setRoute("deals")}
        >
          Deals
        </button>
        <button
          className={
            route === "portfolio-companies" ? "app-nav-link active" : "app-nav-link"
          }
          onClick={() => setRoute("portfolio-companies")}
        >
          Portfolio Companies
        </button>
      </nav>
      {route === "deals" ? <DealsPage /> : <PortfolioCompaniesPage />}
    </div>
  );
}
