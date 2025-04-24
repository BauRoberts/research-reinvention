import { NextResponse } from "next/server";
import { buildTavilyQuery } from "../../../lib/utils/query-builder";
import { ResearchFormData } from "../../../lib/types";

const TAVILY_API_KEY =
  process.env.TAVILY_API_KEY || "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";

export async function POST(request: Request) {
  try {
    const formData = (await request.json()) as ResearchFormData;

    // Validar los datos recibidos
    if (!formData.marca || !formData.industria || !formData.paises) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Construir la consulta para Tavily
    const query = buildTavilyQuery(formData);

    // Llamar a la API de Tavily con los parámetros correctos
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
      console.error("Error en la respuesta de Tavily:", errorText);
      return NextResponse.json(
        { error: `Error ${response.status}: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
