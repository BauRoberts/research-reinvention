"use client";

import { useState } from "react";
import ResearchForm from "../components/forms/ResearchForm";
import ResultsDisplay from "../components/results/ResultsDisplay";
import { TavilyResponse, ResearchFormData } from "../lib/types";

export default function Home() {
  const [results, setResults] = useState<TavilyResponse | null>(null);
  const [formData, setFormData] = useState<ResearchFormData | null>(null);

  const handleResearchSubmit = (
    results: TavilyResponse,
    formData: ResearchFormData
  ) => {
    setResults(results);
    setFormData(formData);
  };

  const handleReset = () => {
    setResults(null);
    setFormData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10">
      {!results ? (
        <ResearchForm onSubmitSuccess={handleResearchSubmit} />
      ) : (
        <ResultsDisplay
          results={results}
          formData={formData!}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
