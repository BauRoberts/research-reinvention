// app/trends-direct-search/page.tsx
"use client";

import React from "react";
import DirectSearchTrends from "../../components/DirectSearchTrendsWidget";

export default function DirectSearchPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Research Reinvention - Análisis de Tendencias Mejorado
          </h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <DirectSearchTrends />
        </div>
      </main>

      <footer className="bg-white mt-12 py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Research Reinvention © {new Date().getFullYear()} - Powered by
            Google Trends
          </p>
        </div>
      </footer>
    </div>
  );
}
