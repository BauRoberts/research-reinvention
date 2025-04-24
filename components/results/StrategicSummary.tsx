import React from "react";

interface StrategicSummaryProps {
  summary: string;
  query: string;
}

const StrategicSummary: React.FC<StrategicSummaryProps> = ({
  summary,
  query,
}) => {
  if (!summary) return null;

  return (
    <>
      {/* Cuadro de consulta */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-blue-600 flex items-center">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Consulta
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-700">
          {query}
        </div>
      </div>

      {/* Resumen estratégico */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-blue-600 flex items-center">
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Resumen Estratégico
        </h2>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 text-gray-700 leading-relaxed">
          {summary}
        </div>
      </div>
    </>
  );
};

export default StrategicSummary;
