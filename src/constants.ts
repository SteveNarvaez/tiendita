import { Category, Product } from "./types";

export const CATEGORIES: Category[] = [
  { id: "alcohol", name: "Cervezas y Licores", icon: "🍺" },
  { id: "bebidas", name: "Refrescos y Bebidas", icon: "🥤" },
  { id: "botanas", name: "Frituras y Botanas", icon: "🍿" },
  { id: "dulces", name: "Dulces y Chocolates", icon: "🍫" },
];

export const PRODUCTS: Product[] = [
  // Cervezas y Licores (El Fuerte)
  {
    id: "a1",
    name: "Caguama Victoria 1.2L",
    price: 45,
    image: "https://tse2.mm.bing.net/th/id/OIP.Zs5GTxlRr9Zf2yjaEK6WWQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    category: "alcohol",
    description: "Bien fría, envase retornable (entregar envase)"
  },
  {
    id: "a2",
    name: "Six Pack Corona Extra 355ml",
    price: 115,
    image: "https://images.rappi.com.mx/products/62f7f1db-b7f8-4af3-b14f-021453c3a141.jpg",
    category: "alcohol"
  },
  {
    id: "a3",
    name: "Six Pack Modelo Especial Lata",
    price: 125,
    image: "https://th.bing.com/th/id/OIP.WzCUpsyANicOBtECckAEfwHaHa?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "alcohol"
  },
  {
    id: "a4",
    name: "Bacardí Carta Blanca 750ml",
    price: 240,
    image: "https://th.bing.com/th/id/OIP.D_J5HlPGw9DcYCi3AWyoDgHaHa?w=208&h=208&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "alcohol"
  },
  {
    id: "a5",
    name: "Tequila José Cuervo Especial 990ml",
    price: 280,
    image: "https://th.bing.com/th/id/OIP.Tos5E8h4larTj24xCgLQVAHaHa?w=211&h=211&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "alcohol"
  },
  {
    id: "a6",
    name: "Caribe Cooler Tinto 300ml",
    price: 32,
    image: "https://th.bing.com/th/id/OIP.MtnV8RmQFQ57AmO0e26sSgAAAA?w=200&h=200&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "alcohol"
  },

  // Bebidas
  {
    id: "b1",
    name: "Coca-Cola 600ml",
    price: 18,
    image: "https://th.bing.com/th/id/OIP.TUaLsx-PqOHIyOfWZwxRxQHaHa?w=187&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "bebidas",
    description: "Refresco original de 600ml"
  },
  {
    id: "b2",
    name: "Coca-Cola 3 Litros Retornable",
    price: 48,
    image: "https://picsum.photos/seed/coke3l/400/400",
    category: "bebidas",
    description: "Entregar envase al repartidor"
  },
  {
    id: "b3",
    name: "Sprite 600ml",
    price: 17,
    image: "https://picsum.photos/seed/sprite/400/400",
    category: "bebidas"
  },
  {
    id: "b4",
    name: "Agua Ciel 1L",
    price: 13,
    image: "https://picsum.photos/seed/water/400/400",
    category: "bebidas"
  },
  {
    id: "b5",
    name: "Jugo del Valle Mango 500ml",
    price: 16,
    image: "https://picsum.photos/seed/juice/400/400",
    category: "bebidas"
  },

  // Botanas
  {
    id: "f1",
    name: "Sabritas Sal 42g",
    price: 17,
    image: "https://picsum.photos/seed/chips/400/400",
    category: "botanas"
  },
  {
    id: "f2",
    name: "Doritos Nacho 58g",
    price: 18,
    image: "https://picsum.photos/seed/doritos/400/400",
    category: "botanas"
  },
  {
    id: "f3",
    name: "Cheetos Torciditos 52g",
    price: 16,
    image: "https://picsum.photos/seed/cheetos/400/400",
    category: "botanas"
  },
  {
    id: "f4",
    name: "Takis Fuego 62g",
    price: 19,
    image: "https://picsum.photos/seed/takis/400/400",
    category: "botanas"
  },
  {
    id: "f5",
    name: "Ruffles Queso 50g",
    price: 18,
    image: "https://picsum.photos/seed/ruffles/400/400",
    category: "botanas"
  },

  // Dulces
  {
    id: "d1",
    name: "Chocolate Carlos V",
    price: 12,
    image: "https://picsum.photos/seed/chocolate/400/400",
    category: "dulces"
  },
  {
    id: "d2",
    name: "Mazapán De la Rosa (Chico)",
    price: 7,
    image: "https://picsum.photos/seed/mazapan/400/400",
    category: "dulces"
  },
  {
    id: "d3",
    name: "Paleta Payaso",
    price: 16,
    image: "https://picsum.photos/seed/clown/400/400",
    category: "dulces"
  },
  {
    id: "d4",
    name: "Kinder Delice",
    price: 20,
    image: "https://picsum.photos/seed/kinder/400/400",
    category: "dulces"
  },
  {
    id: "d5",
    name: "Gomitas Panditas 115g",
    price: 22,
    image: "https://picsum.photos/seed/panditas/400/400",
    category: "dulces"
  }
];
