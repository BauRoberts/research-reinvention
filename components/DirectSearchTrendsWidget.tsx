// components/DirectSearchTrendsWidget.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  IMPROVED_EXAMPLES,
  generateDirectSearchUrl,
} from "../data/improvedTrendsData";

interface TrendsWidgetProps {
  type: "RELATED_TOPICS" | "RELATED_QUERIES" | "GEO_MAP";
  searchTerm: string;
  categoryId: string;
  geo?: string;
  time?: string;
  height?: number;
  title?: string;
}

// Componente individual para un widget de Google Trends usando búsqueda directa
const DirectSearchTrendsWidget: React.FC<TrendsWidgetProps> = ({
  type,
  searchTerm,
  categoryId,
  geo = "AR",
  time = "today 12-m",
  height = 400,
  title,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  // Títulos para los diferentes tipos de widgets
  const widgetTitles = {
    RELATED_TOPICS: "Temas relacionados en aumento",
    RELATED_QUERIES: "Consultas relacionadas en aumento",
    GEO_MAP: "Interés por subregión",
  };

  const displayTitle = title || widgetTitles[type];

  // Función para cargar el iframe
  const loadIframe = () => {
    if (!containerRef.current) return;

    setIsLoading(true);
    setHasError(false);

    // Limpiar el contenedor
    containerRef.current.innerHTML = "";

    // Generar URL usando el término de búsqueda directo
    const iframeUrl = generateDirectSearchUrl(
      type,
      searchTerm,
      categoryId,
      geo,
      time
    );

    // Crear iframe
    const iframe = document.createElement("iframe");
    iframe.src = iframeUrl;
    iframe.width = "100%";
    iframe.height = `${height}px`;
    iframe.frameBorder = "0";
    iframe.style.border = "none";
    iframe.title = displayTitle;

    // Manejar eventos
    iframe.onload = () => {
      setIsLoading(false);
    };

    iframe.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };

    // Insertar en el contenedor
    containerRef.current.appendChild(iframe);
  };

  // Cargar el iframe al montar el componente o cuando cambian los props
  useEffect(() => {
    loadIframe();
  }, [searchTerm, categoryId, type, geo, time]);

  // Reintentar si hay error (con retraso)
  useEffect(() => {
    if (hasError && retryCount < maxRetries) {
      const timer = setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        loadIframe();
      }, 1500 * (retryCount + 1));

      return () => clearTimeout(timer);
    }
  }, [hasError, retryCount]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full">
      <h3 className="text-lg font-medium text-gray-900 mb-3">{displayTitle}</h3>

      {isLoading && (
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}

      <div
        ref={containerRef}
        className={`w-full min-h-80 ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
      ></div>

      {hasError && retryCount >= maxRetries && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Información limitada disponible
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Google Trends tiene datos limitados para "{searchTerm}" en
                  esta categoría.
                </p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setRetryCount(0);
                    loadIframe();
                  }}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Intentar nuevamente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente principal que contiene la selección y todos los widgets
const DirectSearchTrends: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<string>("LATAM");
  const [entity, setEntity] = useState<(typeof IMPROVED_EXAMPLES)[0] | null>(
    null
  );

  // Función para manejar el cambio de selección
  const handleExampleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedExample(e.target.value);
  };

  // Función para analizar la marca seleccionada
  const handleAnalyzeClick = () => {
    if (!selectedExample) return;

    // Encontrar el ejemplo seleccionado
    const example = IMPROVED_EXAMPLES.find((ex) => ex.name === selectedExample);
    if (example) {
      setEntity(example);
    }
  };

  // Cargar automáticamente un ejemplo al iniciar
  useEffect(() => {
    if (selectedExample) {
      handleAnalyzeClick();
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Análisis de Tendencias (Búsqueda Directa)
      </h2>

      <div className="p-4 bg-white rounded shadow mb-8">
        <h3 className="text-lg font-semibold mb-4">
          Selecciona una marca para analizar
        </h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Marca
          </label>
          <select
            value={selectedExample}
            onChange={handleExampleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Selecciona una marca</option>
            {IMPROVED_EXAMPLES.map((example) => (
              <option key={example.name} value={example.name}>
                {example.name} ({example.category})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAnalyzeClick}
          disabled={!selectedExample}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md font-medium disabled:bg-indigo-300 transition-colors"
        >
          Analizar Tendencias
        </button>

        <div className="mt-4 bg-blue-50 p-4 rounded-md text-sm text-blue-700">
          <p className="flex items-start">
            <svg
              className="h-5 w-5 text-blue-400 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Esta versión usa términos de búsqueda directos en lugar de IDs de
            entidad, lo que mejora la compatibilidad con Google Trends. También
            ampliamos el rango de tiempo a 12 meses para obtener más datos.
          </p>
        </div>
      </div>

      {entity && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Temas relacionados */}
          <DirectSearchTrendsWidget
            type="RELATED_TOPICS"
            searchTerm={entity.searchTerm}
            categoryId={entity.categoryId}
            geo={entity.geo}
            time={entity.time}
          />

          {/* Consultas relacionadas */}
          <DirectSearchTrendsWidget
            type="RELATED_QUERIES"
            searchTerm={entity.searchTerm}
            categoryId={entity.categoryId}
            geo={entity.geo}
            time={entity.time}
          />

          {/* Mapa geográfico */}
          <div className="lg:col-span-2">
            <DirectSearchTrendsWidget
              type="GEO_MAP"
              searchTerm={entity.searchTerm}
              categoryId={entity.categoryId}
              geo={entity.geo}
              time={entity.time}
              height={500}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectSearchTrends;
