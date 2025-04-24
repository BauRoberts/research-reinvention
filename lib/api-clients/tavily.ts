import { TavilyResponse } from "../types";

const TAVILY_API_KEY =
  process.env.NEXT_PUBLIC_TAVILY_API_KEY ||
  "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";

/**
 * Realiza una búsqueda en Tavily API
 * @param query Consulta de búsqueda
 * @returns Respuesta de Tavily con resultados
 */
export const searchTavily = async (query: string): Promise<TavilyResponse> => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TAVILY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      topic: "news",
      search_depth: "basic",
      include_answer: true,
      include_images: true,
      max_results: 10,
    }),
  };

  const response = await fetch("https://api.tavily.com/search", options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  return await response.json();
};
