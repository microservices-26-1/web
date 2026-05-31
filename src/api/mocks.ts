import { Product, Order, ExchangeRate } from "@/types";
import macarons from "@/assets/product-macarons.jpg";
import truffles from "@/assets/product-truffles.jpg";
import cake from "@/assets/product-cake.jpg";
import croissant from "@/assets/product-croissant.jpg";
import brigadeiro from "@/assets/product-brigadeiro.jpg";
import eclair from "@/assets/product-eclair.jpg";
import cookies from "@/assets/product-cookies.jpg";

export const mockProducts: Product[] = [
  {
    id: "p-001",
    name: "Caixa de Macarons",
    description:
      "Seleção de 9 macarons artesanais nos sabores baunilha, caramelo salgado, pistache, chocolate belga e frutas vermelhas. Massa crocante e recheio cremoso.",
    price: 68,
    currency: "BRL",
    stock: 24,
    category: "Macarons",
    image: macarons,
    rating: 4.9,
  },
  {
    id: "p-002",
    name: "Trufas de Chocolate 70%",
    description:
      "Trufas de ganache feitas com chocolate intenso 70% cacau e finalizadas com cacau em pó. Caixa com 12 unidades.",
    price: 54,
    currency: "BRL",
    stock: 30,
    category: "Chocolates",
    image: truffles,
    rating: 4.8,
  },
  {
    id: "p-003",
    name: "Bolo de Cenoura com Brigadeiro",
    description:
      "Bolo de cenoura fofinho coberto com calda de brigadeiro cremoso. Receita de família, feito no dia. Serve 10 pessoas.",
    price: 89,
    currency: "BRL",
    stock: 6,
    category: "Bolos",
    image: cake,
    rating: 4.9,
  },
  {
    id: "p-004",
    name: "Croissants de Manteiga",
    description:
      "Croissants folhados com manteiga francesa, fermentação lenta e assados ao ponto. Pacote com 4 unidades, ideais para o café da manhã.",
    price: 42,
    currency: "BRL",
    stock: 18,
    category: "Padaria",
    image: croissant,
    rating: 4.7,
  },
  {
    id: "p-005",
    name: "Brigadeiros Gourmet",
    description:
      "Brigadeiros artesanais feitos com chocolate belga e leite condensado. Caixa com 16 unidades em forminhas de papel.",
    price: 48,
    currency: "BRL",
    stock: 41,
    category: "Doces",
    image: brigadeiro,
    rating: 4.6,
  },
  {
    id: "p-006",
    name: "Éclair de Chocolate",
    description:
      "Massa choux clássica recheada com creme pâtissière de baunilha e cobertura de chocolate meio amargo.",
    price: 18,
    currency: "BRL",
    stock: 22,
    category: "Doces",
    image: eclair,
    rating: 4.7,
  },
  {
    id: "p-007",
    name: "Cookies de Canela",
    description:
      "Cookies macios por dentro e crocantes nas bordas, com canela e açúcar mascavo. Pacote com 8 unidades.",
    price: 32,
    currency: "BRL",
    stock: 38,
    category: "Padaria",
    image: cookies,
    rating: 4.5,
  },
];

export const mockOrders: Order[] = [
  {
    id: "ord-1042",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    status: "delivered",
    currency: "BRL",
    total: 122,
    lines: [
      { productId: "p-001", productName: "Caixa de Macarons", quantity: 1, unitPrice: 68 },
      { productId: "p-002", productName: "Trufas de Chocolate 70%", quantity: 1, unitPrice: 54 },
    ],
  },
  {
    id: "ord-1051",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    status: "shipped",
    currency: "BRL",
    total: 89,
    lines: [
      { productId: "p-003", productName: "Bolo de Cenoura com Brigadeiro", quantity: 1, unitPrice: 89 },
    ],
  },
  {
    id: "ord-1063",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    status: "pending",
    currency: "BRL",
    total: 138,
    lines: [
      { productId: "p-005", productName: "Brigadeiros Gourmet", quantity: 2, unitPrice: 48 },
      { productId: "p-004", productName: "Croissants de Manteiga", quantity: 1, unitPrice: 42 },
    ],
  },
];

// Taxas com base em BRL (moeda principal da doceria)
export const mockRates: ExchangeRate[] = [
  { base: "BRL", target: "BRL", rate: 1 },
  { base: "BRL", target: "USD", rate: 0.2 },
  { base: "BRL", target: "EUR", rate: 0.18 },
];
