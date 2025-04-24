# Research Reinvention - Documentación del Proyecto

# Reglas básicas

- Siempre intenta pedir los archivos relevantes antes de codificar
- Si crees que algún archivo o comando proporcionaría mejor contexto y te permitiría escribir mejor código, solicítalo
- Primero hacemos que funcione, luego lo hacemos bonito

# Descripción general del proyecto

Research Reinvention es una aplicación web que genera investigaciones estratégicas de marca utilizando inteligencia artificial. Combina información de múltiples fuentes para proporcionar insights valiosos sobre marcas, competidores y tendencias de mercado.
La idea es poder generar inspiracion en las personas que definen lineamientos de creacion de contenido. Cuando les falta inspiracion tenemos que ser ese puntapie inicial para generar en ellos una inspiracion.

# Flujo de usuario

El usuario completa un formulario con información clave sobre una marca (nombre, industria, público objetivo, valores, competidores, objetivos de marketing y países objetivo). Tras enviar el formulario, la aplicación hace dos búsquedas paralelas:

1. Una consulta a Tavily Search API para obtener información textual y visual relevante
2. Una consulta a Google Trends (a través de Apify) para obtener datos de tendencias

Los resultados se combinan en una interfaz visualmente atractiva que muestra tanto el análisis de texto como las visualizaciones de tendencias.

# Características principales

## 1. Formulario de investigación

- Captura de 7 datos clave sobre una marca
- Interfaz intuitiva con validación de campos
- Experiencia de usuario fluida

## 2. Integración con APIs externas

- Tavily Search API para obtención de datos textuales y visuales
- Apify para scraping de Google Trends
- Sistema de construcción de consultas optimizadas

## 3. Visualización de datos

- Resumen estratégico generado por IA
- Gráficos de tendencias comparativas
- Galería de imágenes relevantes
- Listado de hallazgos con enlaces a fuentes

## 4. Análisis de tendencias

- Interés a lo largo del tiempo para la marca y competidores
- Términos de búsqueda relacionados
- Temas populares asociados

# Stack tecnológico

## Frontend

- Next.js 14 con TypeScript
- Tailwind CSS para diseño responsivo
- React Hooks para gestión de estado
- Recharts para visualización de datos

## APIs y servicios

- Tavily Search API para búsqueda de información
- Apify para scraping de Google Trends
- SendGrid para notificaciones por email (planeado)

## Despliegue

- Vercel para hosting del frontend
- Variables de entorno seguras

# Estructura del proyecto

```
research-reinvention/
├── app/
│   ├── api/
│   │   ├── research/      # API para Tavily Search
│   │   └── trends/        # API para Google Trends (Apify)
│   └── page.tsx           # Página principal con formulario
├── components/
│   ├── TrendsVisualization.tsx   # Visualización de tendencias
│   └── ui/                # Componentes de UI reutilizables
├── public/
│   └── assets/            # Imágenes y recursos estáticos
├── styles/
│   └── globals.css        # Estilos globales con Tailwind
├── .env.local             # Variables de entorno (no en repositorio)
└── package.json           # Dependencias del proyecto
```

# APIs y endpoints

## Tavily Search

- Endpoint: `https://api.tavily.com/search`
- Método: POST
- Parámetros clave: query, topic, search_depth, include_answer, include_images

## Apify Google Trends

- Endpoint: `https://api.apify.com/v2/acts/apify~google-trends-scraper/runs`
- Método: POST
- Parámetros clave: keyword, compareWithKeywords, granularity, timeRange, geo

# Variables de entorno

```
TAVILY_API_KEY=tu_clave_api_de_tavily
APIFY_API_TOKEN=tu_token_api_de_apify
```

# Procesos principales

## Investigación de marca

1. Usuario completa el formulario
2. Se genera una consulta estructurada para Tavily
3. Se obtienen datos relevantes de múltiples fuentes
4. Se procesa y formatea la información
5. Se presenta en una interfaz visualmente atractiva

## Análisis de tendencias

1. Se extraen datos de la marca y competidores del formulario
2. Se envía solicitud a Google Trends (Apify)
3. Se procesa la respuesta para obtener tendencias temporales
4. Se generan visualizaciones con Recharts
5. Se presentan junto con el análisis textual

# Próximos pasos

- Implementar exportación PDF de resultados
- Añadir integración con redes sociales
- Desarrollar dashboard para seguimiento de marcas
- Implementar sistema de cuentas de usuario
- Añadir más fuentes de datos (Twitter, Reddit, etc.)

# Notas adicionales

- Las API keys no deben ser expuestas en el código
- La documentación debe actualizarse con cada nueva característica
- Se recomienda probar con marcas reales para verificar la calidad de los resultados
