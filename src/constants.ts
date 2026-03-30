import { Category, Product } from "./types";

export const CATEGORIES: Category[] = [
  { id: "bebidas", name: "Refrescos y Bebidas", icon: "🥤" },
  { id: "botanas", name: "Frituras y Botanas", icon: "🍿" },
  { id: "dulces", name: "Dulces y Chocolates", icon: "🍫" },
];

export const PRODUCTS: Product[] = [
  // Bebidas
  {
    id: "b1",
    name: "Coca-Cola 600ml",
    price: 18,
    image: "https://picsum.photos/seed/coke/400/400",
    category: "bebidas",
    description: "Refresco original de 600ml"
  },
  {
    id: "b2",
    name: "Sprite 600ml",
    price: 17,
    image: "https://picsum.photos/seed/sprite/400/400",
    category: "bebidas"
  },
  {
    id: "b3",
    name: "Agua Ciel 1L",
    price: 12,
    image: "https://picsum.photos/seed/water/400/400",
    category: "bebidas"
  },
  {
    id: "b4",
    name: "Jugo del Valle Mango",
    price: 15,
    image: "https://picsum.photos/seed/juice/400/400",
    category: "bebidas"
  },

  // Botanas
  {
    id: "f1",
    name: "Sabritas Sal 42g",
    price: 16,
    image: "https://picsum.photos/seed/chips/400/400",
    category: "botanas"
  },
  {
    id: "f2",
    name: "Doritos Nacho 58g",
    price: 17,
    image: "https://picsum.photos/seed/doritos/400/400",
    category: "botanas"
  },
  {
    id: "f3",
    name: "Cheetos Torciditos",
    price: 15,
    image: "https://picsum.photos/seed/cheetos/400/400",
    category: "botanas"
  },
  {
    id: "f4",
    name: "Takis Fuego",
    price: 18,
    image: "https://picsum.photos/seed/takis/400/400",
    category: "botanas"
  },

  // Dulces
  {
    id: "d1",
    name: "Chocolate Carlos V",
    price: 10,
    image: "https://picsum.photos/seed/chocolate/400/400",
    category: "dulces"
  },
  {
    id: "d2",
    name: "Mazapán De la Rosa",
    price: 6,
    image: "https://picsum.photos/seed/mazapan/400/400",
    category: "dulces"
  },
  {
    id: "d3",
    name: "Paleta Payaso",
    price: 14,
    image: "https://picsum.photos/seed/clown/400/400",
    category: "dulces"
  },
  {
    id: "d4",
    name: "Kinder Delice",
    price: 18,
    image: "https://picsum.photos/seed/kinder/400/400",
    category: "dulces"
  },
];
