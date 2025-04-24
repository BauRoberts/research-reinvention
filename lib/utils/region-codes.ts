/**
 * Obtiene el código de país para Google Trends basado en el nombre del país
 * @param paisesStr String con nombres de países separados por comas
 * @returns Código de región de Google Trends (2 letras)
 */
export const getRegionCode = (paisesStr: string): string => {
  const paises = paisesStr.toLowerCase();

  if (paises.includes("estados unidos") || paises.includes("usa")) return "US";
  if (paises.includes("méxico") || paises.includes("mexico")) return "MX";
  if (paises.includes("españa") || paises.includes("spain")) return "ES";
  if (paises.includes("argentina")) return "AR";
  if (paises.includes("colombia")) return "CO";
  if (paises.includes("chile")) return "CL";
  if (paises.includes("perú") || paises.includes("peru")) return "PE";

  // Por defecto, utilizamos Estados Unidos
  return "US";
};
