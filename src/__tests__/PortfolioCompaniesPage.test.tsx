import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { PortfolioCompaniesPage } from "../pages/PortfolioCompaniesPage";

describe("PortfolioCompaniesPage", () => {
  it("shows a loading state, then renders portfolio companies from the data layer", async () => {
    render(<PortfolioCompaniesPage />);

    expect(screen.getByTestId("portfolio-companies-loading")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText("Brightwell Logistics")).toBeInTheDocument(),
    );

    expect(screen.getAllByTestId("portfolio-company-card").length).toBeGreaterThan(0);
    expect(screen.getByText("Under Review")).toBeInTheDocument();
  });
});
