import React from "react";
import { TavilyResult } from "../../lib/types";

interface DetailedFindingsProps {
  results: TavilyResult[];
}

const DetailedFindings: React.FC<DetailedFindingsProps> = ({ results }) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Hallazgos Detallados
      </h2>
      <div className="space-y-4">
        {results.map((result, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white hover:bg-gray-50"
          >
            <h3 className="font-medium text-blue-700 mb-2 text-lg leading-tight">
              {result.title}
            </h3>
            <p className="text-gray-700 mb-3 text-sm leading-relaxed">
              {result.content}
            </p>
            <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Ver fuente original
              </a>
              {result.published_date && (
                <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">
                  {new Date(result.published_date).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedFindings;
