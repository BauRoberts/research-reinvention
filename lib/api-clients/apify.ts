/**
 * Cliente para interactuar con la API de Apify para Google Trends
 */

// Utiliza variables de entorno para las credenciales
const APIFY_API_TOKEN =
  process.env.NEXT_PUBLIC_APIFY_API_TOKEN || "your-default-apify-token";

/**
 * Procesa y estructura los datos de Google Trends
 * @param data Datos crudos de Google Trends
 * @param mainBrand Marca principal para referencia
 * @returns Datos procesados y estructurados
 */
export function processGoogleTrendsData(data: any[], mainBrand: string) {
  // Estructura para devolver los datos procesados
  const processedData = {
    interestOverTime: [],
    interestByRegion: [],
    relatedTopics: [],
    relatedQueries: [],
  };

  // Procesar los diferentes tipos de datos
  data.forEach((item) => {
    if (item.type === "INTEREST_OVER_TIME") {
      processedData.interestOverTime = item.value;
    } else if (item.type === "INTEREST_BY_REGION") {
      processedData.interestByRegion = item.value;
    } else if (item.type === "RELATED_TOPICS") {
      processedData.relatedTopics = item.value;
    } else if (item.type === "RELATED_QUERIES") {
      processedData.relatedQueries = item.value;
    }
  });

  return processedData;
}

/**
 * Obtiene los elementos del dataset de Apify
 * @param datasetId ID del dataset de Apify
 * @returns Elementos del dataset
 */
export async function fetchDatasetItems(datasetId: string) {
  const response = await fetch(
    `https://api.apify.com/v2/datasets/${datasetId}/items`,
    {
      headers: {
        Authorization: `Bearer ${APIFY_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error al obtener los resultados del dataset");
  }

  return response.json();
}
