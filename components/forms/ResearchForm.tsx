"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { TavilyResponse, ResearchFormData } from "../../lib/types";
import { buildTavilyQuery } from "../../lib/utils/query-builder";
import { searchTavily } from "../../lib/api-clients/tavily";
import LoadingSpinner from "../ui/LoadingSpinner";

interface ResearchFormProps {
  onSubmitSuccess: (
    results: TavilyResponse,
    formData: ResearchFormData
  ) => void;
}

const ResearchForm: React.FC<ResearchFormProps> = ({ onSubmitSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ResearchFormData>({
    marca: "",
    competidores: "",
    objetivo: "",
    propuesta: "",
    keywords: "",
    paises: "",
    industria: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Construir la consulta para Tavily
      const query = buildTavilyQuery(formData);

      // Llamar a la API de Tavily
      const results = await searchTavily(query);

      // Enviar resultados al componente padre
      onSubmitSuccess(results, formData);
    } catch (error) {
      console.error("Error:", error);
      alert(
        `Error al procesar tu solicitud: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
          Research Reinvention
        </h1>
        <p className="text-gray-600">
          Genera insights estratégicos basados en investigación avanzada y datos
          en tiempo real
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ¿Cómo se llama la marca con la que trabajaremos?
            </label>
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-800"
              placeholder="Ej: Apple, Nike, Coca-Cola"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ¿Cuál o cuáles son las principales competidoras?
            </label>
            <input
              type="text"
              name="competidores"
              value={formData.competidores}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-800"
              placeholder="Ej: Samsung, Huawei, Xiaomi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ¿Cuál es el objetivo de la campaña?
            </label>
            <input
              type="text"
              name="objetivo"
              value={formData.objetivo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-800"
              placeholder="Ej: Aumentar awareness, mejorar conversión"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ¿Qué propuesta de valor comunica esta marca?
            </label>
            <input
              type="text"
              name="propuesta"
              value={formData.propuesta}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-800"
              placeholder="Ej: Innovación, sostenibilidad, exclusividad"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ¿Cuáles son las principales keywords asociadas?
            </label>
            <input
              type="text"
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-800"
              placeholder="Ej: tecnología, premium, experiencia"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ¿Cuáles son los países destinatarios de la campaña?
            </label>
            <input
              type="text"
              name="paises"
              value={formData.paises}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-800"
              placeholder="Ej: Argentina, Chile, México"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ¿En qué industria o vertical opera esta marca?
          </label>
          <input
            type="text"
            name="industria"
            value={formData.industria}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-800"
            placeholder="Ej: Tecnología, Moda, Alimentos"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="small" text="Procesando investigación..." />
            </div>
          ) : (
            "Generar Investigación Estratégica"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResearchForm;
