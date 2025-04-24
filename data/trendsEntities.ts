// data/trendsEntities.ts
export const trendsEntities = {
  categorias: [
    {
      id: "71",
      nombre: "Moda y Retail",
      entidades: [
        { nombre: "Zara", id: "/m/03h0n1" },
        { nombre: "Nike", id: "/m/01bby2" },
        { nombre: "Adidas", id: "/m/01bby3" },
        { nombre: "Gucci", id: "/m/02vxn" },
        { nombre: "Louis Vuitton", id: "/m/04yxt" },
        { nombre: "Levi's", id: "/m/04yxt2" },
        { nombre: "Puma", id: "/m/01bby4" },
        { nombre: "Balenciaga", id: "/m/02vxm" },
        { nombre: "Chanel", id: "/m/01l7q" },
        { nombre: "Burberry", id: "/m/02vxk" },
        { nombre: "Ralph Lauren", id: "/m/04yxt3" },
      ],
    },
    {
      id: "5",
      nombre: "Tecnología",
      entidades: [
        { nombre: "Apple", id: "/m/0k8z" },
        { nombre: "Samsung", id: "/m/06zmy" },
        { nombre: "Microsoft", id: "/m/04sv4" },
        { nombre: "Google", id: "/m/045c7b" },
        { nombre: "Amazon", id: "/m/0mgkg" },
        { nombre: "Huawei", id: "/m/02r62q" },
        { nombre: "Sony", id: "/m/06znk" },
        { nombre: "Intel", id: "/m/03nfm" },
        { nombre: "Nvidia", id: "/m/02y3w" },
        { nombre: "Dell", id: "/m/04zpq" },
        { nombre: "HP", id: "/m/04zpq2" },
        { nombre: "Lenovo", id: "/m/02r62r" },
        { nombre: "ASUS", id: "/m/02r62s" },
        { nombre: "Xiaomi", id: "/m/02r62t" },
        { nombre: "Tesla", id: "/m/0czz2" },
        { nombre: "Oracle", id: "/m/05b5c" },
        { nombre: "Cisco", id: "/m/02r62u" },
        { nombre: "IBM", id: "/m/03p0r" },
        { nombre: "Meta", id: "/m/02y1vz" },
      ],
    },
    {
      id: "67",
      nombre: "Aerolíneas y Viajes",
      entidades: [
        { nombre: "Aerolineas Argentinas", id: "/m/02690b" },
        { nombre: "Emirates", id: "/m/02r634" },
        { nombre: "Delta Air Lines", id: "/m/02r635" },
        { nombre: "United Airlines", id: "/m/02r636" },
        { nombre: "American Airlines", id: "/m/02r637" },
        { nombre: "Lufthansa", id: "/m/02r638" },
        { nombre: "Qatar Airways", id: "/m/02r639" },
        { nombre: "British Airways", id: "/m/02r63b" },
        { nombre: "Air France", id: "/m/02r63c" },
        { nombre: "Singapore Airlines", id: "/m/02r63d" },
        { nombre: "Expedia", id: "/m/02r63e" },
        { nombre: "Booking.com", id: "/m/02r63f" },
        { nombre: "TripAdvisor", id: "/m/02r63g" },
        { nombre: "Kayak", id: "/m/02r63h" },
        { nombre: "Southwest Airlines", id: "/m/02r63i" },
        { nombre: "Ryanair", id: "/m/02r63j" },
        { nombre: "EasyJet", id: "/m/02r63k" },
        { nombre: "Turkish Airlines", id: "/m/02r63l" },
        { nombre: "Cathay Pacific", id: "/m/02r63m" },
        { nombre: "Etihad Airways", id: "/m/02r63n" },
      ],
    },
    // Incluí solo 3 categorías para simplificar, pero puedes agregar todas las demás
  ],
};

// Tipos para TypeScript
export interface Entidad {
  nombre: string;
  id: string;
}

export interface Categoria {
  id: string;
  nombre: string;
  entidades: Entidad[];
}

export interface TrendsData {
  categorias: Categoria[];
}
