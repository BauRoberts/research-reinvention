// components/ImprovedTrendsEmbed.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { STATIC_EXAMPLES } from "../data/staticTrendsData";

interface ComparisonItem {
  keyword: string;
  geo: string;
  time: string;
}

interface TrendsWidgetProps {
  type: "RELATED_TOPICS" | "RELATED_QUERIES" | "GEO_MAP";
  entity: (typeof STATIC_EXAMPLES)[0];
  height?: number;
}

// Función para generar una URL de iframe optimizada para Google Trends usando IDs
const generateOptimizedUrl = (
  type: "RELATED_TOPICS" | "RELATED_QUERIES" | "GEO_MAP",
  entityId: string,
  categoryId: string,
  geo: string = "AR",
  time: string = "today 12-m" // Usamos 12 meses para tener más datos
) => {
  // Base URL de Google Trends embed
  const baseUrl = "https://trends.google.es/trends/embed/explore/";

  // Crear la misma estructura de URL que genera Google Trends en sus ejemplos
  const exploreQuery = `cat=${categoryId}&date=${time.replace(
    " ",
    "%20"
  )}&geo=${geo}&q=${entityId}&hl=es`;
  const guestPath = "https://trends.google.es:443/trends/embed/";

  // Construir la URL completa con parámetro para evitar caché
  return `${baseUrl}${type}?hl=es&req=%7B%22comparisonItem%22:%5B%7B%22keyword%22:%22${entityId}%22,%22geo%22:%22${geo}%22,%22time%22:%22${time.replace(
    " ",
    "%20"
  )}%22%7D%5D,%22category%22:${categoryId},%22property%22:%22%22%7D&tz=-180&eq=${encodeURIComponent(
    exploreQuery
  )}&guestPath=${encodeURIComponent(guestPath)}&nocache=${Date.now()}`;
};

// Componente individual para un widget de Google Trends
const TrendsWidget: React.FC<TrendsWidgetProps> = ({
  type,
  entity,
  height = 400,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  // Títulos para los diferentes tipos de widgets
  const widgetTitles = {
    RELATED_TOPICS: "Temas relacionados en aumento",
    RELATED_QUERIES: "Consultas relacionadas en aumento",
    GEO_MAP: "Interés por subregión",
  };

  // Función para cargar el iframe
  const loadIframe = () => {
    if (!containerRef.current) return;

    setIsLoading(true);
    setHasError(false);

    // Limpiar el contenedor
    containerRef.current.innerHTML = "";

    // Generar URL para iframe con un parámetro de caché aleatorio
    const iframeUrl = generateOptimizedUrl(
      type,
      entity.entityId,
      entity.categoryId,
      entity.geo,
      "today 12-m" // Ampliamos a 12 meses para tener más datos
    );

    // Crear iframe
    const iframe = document.createElement("iframe");
    iframe.src = iframeUrl;
    iframe.width = "100%";
    iframe.height = `${height}px`;
    iframe.frameBorder = "0";
    iframe.style.border = "none";
    iframe.allow = "fullscreen";

    // Manejar eventos de carga y error
    iframe.onload = () => {
      setIsLoading(false);

      // Verificar si hay contenido después de cargar
      setTimeout(() => {
        try {
          if (
            iframe.contentDocument &&
            iframe.contentDocument.body &&
            iframe.contentDocument.body.innerHTML.includes("suficientes datos")
          ) {
            setHasError(true);
          }
        } catch (e) {
          // Si hay error de acceso al contentDocument (por CORS), simplemente ignoramos
          console.log("No se pudo acceder al contenido del iframe");
        }
      }, 1500);
    };

    iframe.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };

    // Insertar en el contenedor
    containerRef.current.appendChild(iframe);
  };

  // Cargar el iframe cuando cambie la entidad o el tipo
  useEffect(() => {
    loadIframe();
  }, [entity, type]);

  // Reintentar si hay error (hasta 3 veces)
  useEffect(() => {
    if (hasError && retryCount < maxRetries) {
      const timer = setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        loadIframe();
      }, 2000 * (retryCount + 1)); // Esperar más tiempo entre cada reintento

      return () => clearTimeout(timer);
    }
  }, [hasError, retryCount]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full">
      <h3 className="text-lg font-medium text-gray-900 mb-3">
        {widgetTitles[type]}
      </h3>

      {isLoading && (
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}

      <div
        ref={containerRef}
        className={`w-full min-h-80 ${isLoading ? "hidden" : "block"}`}
      ></div>

      {hasError && retryCount >= maxRetries && (
        <div className="mt-4 p-4 bg-red-50 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                No se pudieron cargar los datos para este gráfico
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  Google Trends no tiene suficientes datos para mostrar este
                  análisis en este momento.
                </p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setRetryCount(0);
                    loadIframe();
                  }}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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

// Componente principal que contiene todos los widgets
const ImprovedTrendsEmbed: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<string>("LATAM");
  const [entity, setEntity] = useState<(typeof STATIC_EXAMPLES)[0] | null>(
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
    const example = STATIC_EXAMPLES.find((ex) => ex.name === selectedExample);
    if (example) {
      setEntity(example);
    }
  };

  // Cargar automáticamente LATAM al iniciar
  useEffect(() => {
    if (selectedExample) {
      handleAnalyzeClick();
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Análisis de Tendencias (Versión Mejorada)
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
            {STATIC_EXAMPLES.map((example) => (
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

        <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm text-blue-700">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p>
                Los datos de Google Trends pueden tardar en cargar. Si un widget
                muestra "datos insuficientes", prueba a hacer clic en "Intentar
                nuevamente".
              </p>
            </div>
          </div>
        </div>
      </div>

      {entity && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Temas relacionados */}
          <TrendsWidget type="RELATED_TOPICS" entity={entity} />

          {/* Consultas relacionadas */}
          <TrendsWidget type="RELATED_QUERIES" entity={entity} />

          {/* Mapa geográfico */}
          <div className="lg:col-span-2">
            <TrendsWidget type="GEO_MAP" entity={entity} height={500} />
          </div>
        </div>
      )}

      {!entity && (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Selecciona una marca para comenzar el análisis
          </h3>
          <p className="text-gray-600 max-w-lg mx-auto">
            Los datos se mostrarán utilizando los widgets oficiales de Google
            Trends.
          </p>
        </div>
      )}
    </div>
  );
};

export default ImprovedTrendsEmbed;
