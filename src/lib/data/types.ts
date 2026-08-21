// Types for the shared data layer. In a real deployment these would mirror
// the firm's canonical ontology (see Soal Labs' operational data platform
// white paper) — the same Deal shape every tool in the firm reads and
// writes, instead of each citizen-built tool defining its own.

export type DealStage = "Sourced" | "Screening" | "Diligence" | "IC Review" | "Closed";

export interface Deal {
  id: string;
  name: string;
  sponsor: string;
  stage: DealStage;
  requestedAmount: number;
}
