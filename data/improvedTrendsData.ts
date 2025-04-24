// data/improvedTrendsData.ts
export const IMPROVED_EXAMPLES = [
  {
    name: "LATAM",
    category: "Aerolíneas y Viajes",
    categoryId: "67",
    // Usar el término de búsqueda directo en lugar del ID de entidad
    searchTerm: "LATAM Airlines",
    geo: "AR",
    time: "today 12-m", // Ampliar a 12 meses para tener más datos
  },
  {
    name: "Apple",
    category: "Tecnología",
    categoryId: "5",
    searchTerm: "Apple",
    geo: "AR",
    time: "today 12-m",
  },
  {
    name: "Nike",
    category: "Moda y Retail",
    categoryId: "71",
    searchTerm: "Nike",
    geo: "AR",
    time: "today 12-m",
  },
  {
    name: "Coca-Cola",
    category: "Alimentación y Bebidas",
    categoryId: "47",
    searchTerm: "Coca Cola",
    geo: "AR",
    time: "today 12-m",
  },
  {
    name: "Toyota",
    category: "Automóviles",
    categoryId: "12",
    searchTerm: "Toyota",
    geo: "AR",
    time: "today 12-m",
  },
];

// Función para generar una URL de iframe para Google Trends usando términos de búsqueda directos
export const generateDirectSearchUrl = (
  type: "RELATED_TOPICS" | "RELATED_QUERIES" | "GEO_MAP",
  searchTerm: string,
  categoryId: string,
  geo: string = "AR",
  time: string = "today 12-m"
) => {
  // Base URL de Google Trends embed
  const baseUrl = "https://trends.google.es/trends/embed/explore/";

  // URL encodear el término de búsqueda
  const encodedTerm = encodeURIComponent(searchTerm);

  // Construir la URL para iframe usando el término de búsqueda directo en lugar del ID
  return `${baseUrl}${type}?hl=es&q=${encodedTerm}&geo=${geo}&date=${time.replace(
    " ",
    "%20"
  )}&cat=${categoryId}&_=${Date.now()}`;
};
