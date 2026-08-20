import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { DealsPage } from "../pages/DealsPage";

// Pattern to copy for new pages: render, wait past the loading state,
// assert on real content from the (mock) data layer — not just that the
// component didn't throw. See .claude/skills/new-page/SKILL.md.
describe("DealsPage", () => {
  it("shows a loading state, then renders deals from the data layer", async () => {
    render(<DealsPage />);

    expect(screen.getByTestId("deals-loading")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText("Meridian Fleet Services, Inc.")).toBeInTheDocument(),
    );

    expect(screen.getAllByTestId("deal-card").length).toBeGreaterThan(0);
    expect(screen.getByText("IC Review")).toBeInTheDocument();
  });
});
