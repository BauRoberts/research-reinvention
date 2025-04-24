// components/TrendsVisualization.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TrendsVisualizationProps {
  marca: string;
  competidores: string;
  region?: string;
}

interface TrendsData {
  interestOverTime: any[];
  interestByRegion: any[];
  relatedTopics: any[];
  relatedQueries: any[];
}

const TrendsVisualization: React.FC<TrendsVisualizationProps> = ({
  marca,
  competidores,
  region = "US",
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<TrendsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

  // Convertir string de competidores a array
  const competidoresArray = competidores
    .split(",")
    .map((comp) => comp.trim())
    .filter(Boolean);

  useEffect(() => {
    const fetchTrendsData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/trends", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            marca,
            competidores: competidoresArray,
            region,
          }),
        });

        if (!response.ok) {
          throw new Error("Error al obtener datos de tendencias");
        }

        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError("No se pudieron cargar los datos de tendencias");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (marca) {
      fetchTrendsData();
    }
  }, [marca, competidores, region]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!data || !data.interestOverTime || data.interestOverTime.length === 0) {
    return (
      <div className="bg-yellow-50 p-4 rounded-lg">
        <p className="text-yellow-700">
          No hay datos de tendencias disponibles para esta marca.
        </p>
      </div>
    );
  }

  // Convertir datos para el gráfico de líneas
  const chartData = data.interestOverTime.map((point) => {
    const result: Record<string, any> = {
      date: new Date(point.date).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    point.values.forEach((value: any, index: number) => {
      const termName = index === 0 ? marca : competidoresArray[index - 1];
      if (termName) {
        result[termName] = value;
      }
    });

    return result;
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
        Análisis de Tendencias
      </h2>

      {/* Gráfico de interés a lo largo del tiempo */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Interés a lo largo del tiempo
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={marca}
                stroke={colors[0]}
                activeDot={{ r: 8 }}
              />
              {competidoresArray.slice(0, 4).map((competitor, index) => (
                <Line
                  key={competitor}
                  type="monotone"
                  dataKey={competitor}
                  stroke={colors[index + 1]}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Términos de búsqueda relacionados */}
      {data.relatedQueries && data.relatedQueries.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
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
            Búsquedas relacionadas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.relatedQueries
              .slice(0, 8)
              .map((query: any, index: number) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">{query.query}</p>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${query.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Temas relacionados */}
      {data.relatedTopics && data.relatedTopics.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
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
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            Temas relacionados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.relatedTopics.slice(0, 6).map((topic: any, index: number) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{topic.topic}</p>
                <p className="text-sm text-gray-500 mt-1">{topic.type}</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${topic.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendsVisualization;
