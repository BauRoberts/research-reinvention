import { ResearchFormData } from "../types";

/**
 * Construye una consulta optimizada para Tavily basada en los datos del formulario
 * Asegura que la consulta no supere los 400 caracteres
 * @param formData Datos del formulario de investigación
 * @returns String con la consulta estructurada
 */
export const buildTavilyQuery = (formData: ResearchFormData): string => {
  // Versión optimizada y compacta de la consulta
  const query = `Análisis para ${formData.marca} en ${formData.paises}. Industria: ${formData.industria}. Competidores: ${formData.competidores}. Buscar: tendencias, comportamiento del consumidor. Enfoque: ${formData.propuesta}, ${formData.objetivo}.`;

  // Verificación de longitud
  if (query.length > 400) {
    console.warn(
      "La consulta excede los 400 caracteres permitidos por Tavily. Se truncará."
    );
    return query.substring(0, 397) + "...";
  }

  return query;
};
