import type { Metadata } from "next";
import { ResultsClient } from "./ResultsClient";

export const metadata: Metadata = {
  title: "Results — Fish AI",
  description: "Mockup detection results for Fish AI capstone.",
};

export default function ResultsPage() {
  return <ResultsClient />;
}
