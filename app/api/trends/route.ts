// app/api/trends/route.ts
import { NextResponse } from "next/server";

const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN;
const GOOGLE_TRENDS_ACTOR_ID = "pocesar/google-trends";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      marca,
      competidores = [],
      region = "US",
      timeframe = "PAST_12_MONTHS",
    } = body;

    if (!marca) {
      return NextResponse.json(
        { error: "Se requiere el nombre de la marca" },
        { status: 400 }
      );
    }

    // Convertir string de competidores a array si viene como string
    let competidoresArray = competidores;
    if (typeof competidores === "string") {
      competidoresArray = competidores
        .split(",")
        .map((comp) => comp.trim())
        .filter(Boolean);
    }

    // Preparar los términos para consultar (marca principal + competidores)
    const searchTerms = [marca, ...competidoresArray]
      .filter(Boolean)
      .slice(0, 5);

    // ---- AQUÍ ESTÁ EL CAMBIO DE LA URL ----
    // URL correcta para el actor de Google Trends en Apify
    const response = await fetch(
      `https://api.apify.com/v2/acts/apify~google-trends-scraper/runs?token=${APIFY_API_TOKEN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword: marca,
          compareWithKeywords: competidoresArray.slice(0, 4),
          granularity: "monthly",
          timeRange: timeframe,
          geo: region,
          category: "0",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error en la respuesta de Apify:", errorText);
      return NextResponse.json(
        { error: "Error al obtener datos de Google Trends" },
        { status: 500 }
      );
    }

    // Obtener el ID de la tarea ejecutada
    const runData = await response.json();

    // Esperar a que termine la ejecución y obtener los resultados
    const datasetItems = await fetchDatasetItems(runData.data.defaultDatasetId);

    return NextResponse.json({
      success: true,
      data: processGoogleTrendsData(datasetItems, marca),
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Función para obtener los items del dataset de Apify
async function fetchDatasetItems(datasetId: string) {
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

// Función para procesar y estructurar los datos de Google Trends
function processGoogleTrendsData(data: any[], mainBrand: string) {
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
