// Definición de tipos para los resultados de Tavily
export interface TavilyResult {
  title: string;
  url: string;
  content: string;
  published_date?: string;
}

export interface TavilyResponse {
  query: string;
  answer?: string;
  images?: string[];
  results?: TavilyResult[];
}

// Tipos para el formulario
export interface ResearchFormData {
  marca: string;
  competidores: string;
  objetivo: string;
  propuesta: string;
  keywords: string;
  paises: string;
  industria: string;
}

// Tipos para datos de tendencias
export interface TrendsData {
  interestOverTime: any[];
  interestByRegion: any[];
  relatedTopics: any[];
  relatedQueries: any[];
}

export interface TrendsResponse {
  success: boolean;
  data: TrendsData;
}
