// data/staticTrendsData.ts
import { trendsEntities } from "./trendsEntities";

// Ejemplos predefinidos que sabemos que funcionan
export const STATIC_EXAMPLES = [
  {
    name: "LATAM",
    category: "Aerolíneas y Viajes",
    categoryId: "67",
    entityId: "/m/02690b",
    geo: "AR",
    time: "today 3-m",
  },
  {
    name: "Apple",
    category: "Tecnología",
    categoryId: "5",
    entityId: "/m/0k8z",
    geo: "AR",
    time: "today 3-m",
  },
  {
    name: "Nike",
    category: "Moda y Retail",
    categoryId: "71",
    entityId: "/m/01bby2",
    geo: "AR",
    time: "today 3-m",
  },
  {
    name: "Coca-Cola",
    category: "Alimentación y Bebidas",
    categoryId: "47",
    entityId: "/m/01x3z",
    geo: "AR",
    time: "today 3-m",
  },
  {
    name: "Toyota",
    category: "Automóviles",
    categoryId: "12",
    entityId: "/m/07s8r",
    geo: "AR",
    time: "today 3-m",
  },
];

// Función para generar una URL de iframe para Google Trends
export const generateTrendsUrl = (
  type: "RELATED_TOPICS" | "RELATED_QUERIES" | "GEO_MAP",
  entityId: string,
  categoryId: string,
  geo: string = "AR",
  time: string = "today 3-m"
) => {
  // Base URL de Google Trends embed
  const baseUrl = "https://trends.google.es/trends/embed/explore/";

  // Crear la misma estructura de URL que genera Google Trends
  const exploreQuery = `cat=${categoryId}&date=${time.replace(
    " ",
    "%20"
  )}&geo=${geo}&q=${entityId}&hl=es`;
  const guestPath = "https://trends.google.es:443/trends/embed/";

  // Construir la URL completa
  return `${baseUrl}${type}?hl=es&req=%7B%22comparisonItem%22:%5B%7B%22keyword%22:%22${entityId}%22,%22geo%22:%22${geo}%22,%22time%22:%22${time.replace(
    " ",
    "%20"
  )}%22%7D%5D,%22category%22:${categoryId},%22property%22:%22%22%7D&tz=-180&eq=${encodeURIComponent(
    exploreQuery
  )}&guestPath=${encodeURIComponent(guestPath)}`;
};
