import { useState, useEffect } from "react";
import { TavilyResponse, ResearchFormData } from "../../lib/types";
import TrendsVisualization from "../trends/TrendsVisualization";
import StrategicSummary from "./StrategicSummary";
import ImageGallery from "./ImageGallery";
import DetailedFindings from "./DetailedFindings";
import { getRegionCode } from "../../lib/utils/region-codes";

interface ResultsDisplayProps {
  results: TavilyResponse;
  formData: ResearchFormData;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  formData,
  onReset,
}) => {
  const [showTrends, setShowTrends] = useState(true);
  const [loadingTrends, setLoadingTrends] = useState(true);

  // Construir la query para mostrar
  const query = `Análisis estratégico para ${formData.marca} en ${formData.paises}`;

  // Convertir el nombre del país a código de región
  const regionCode = getRegionCode(formData.paises);

  // Simular una carga corta para evitar que los datos de tendencias aparezcan antes que el resto
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingTrends(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header con título y botón de vuelta */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 sticky top-4 z-10 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Research Reinvention
          </h1>
          <p className="text-gray-600 text-sm">Resultados de investigación</p>
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
          Nueva búsqueda
        </button>
      </div>

      {/* Contenido principal en una disposición de dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda: query y resumen */}
        <div className="lg:col-span-1">
          <StrategicSummary summary={results.answer || ""} query={query} />

          {/* Imágenes - visible en móvil, oculto en desktop */}
          {results.images && results.images.length > 0 && (
            <div className="lg:hidden">
              <ImageGallery images={results.images} isMobile={true} />
            </div>
          )}
        </div>

        {/* Columna derecha: hallazgos e imágenes */}
        <div className="lg:col-span-2">
          {/* Imágenes - oculto en móvil, visible en desktop */}
          {results.images && results.images.length > 0 && (
            <div className="hidden lg:block">
              <ImageGallery images={results.images} />
            </div>
          )}

          {/* Componente de Visualización de Tendencias */}
          {showTrends && !loadingTrends && (
            <div className="mb-6">
              <TrendsVisualization
                marca={formData.marca}
                competidores={formData.competidores}
                region={regionCode}
              />
            </div>
          )}

          {/* Pantalla de carga para tendencias */}
          {showTrends && loadingTrends && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Análisis de Tendencias
              </h2>
              <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-600">
                  Obteniendo datos de tendencias...
                </p>
              </div>
            </div>
          )}

          {/* Hallazgos detallados */}
          {results.results && results.results.length > 0 && (
            <DetailedFindings results={results.results} />
          )}
        </div>
      </div>

      {/* Footer con información de créditos */}
      <div className="text-center mt-8 text-gray-500 text-sm">
        <p>
          Generado por Research Reinvention • {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
