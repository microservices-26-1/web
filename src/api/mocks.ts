import { Product, Order, ExchangeRate } from "@/types";
import headphones from "@/assets/product-headphones.jpg";
import watch from "@/assets/product-watch.jpg";
import laptop from "@/assets/product-laptop.jpg";
import phone from "@/assets/product-phone.jpg";
import speaker from "@/assets/product-speaker.jpg";
import earbuds from "@/assets/product-earbuds.jpg";

export const mockProducts: Product[] = [
  {
    id: "p-001",
    name: "Aurora Headphones",
    description:
      "Fones over-ear com cancelamento ativo de ruído, 40h de bateria e drivers de 40mm para áudio cristalino em qualquer ambiente.",
    price: 299,
    currency: "USD",
    stock: 24,
    category: "Áudio",
    image: headphones,
    rating: 4.8,
  },
  {
    id: "p-002",
    name: "Pulse Watch S2",
    description:
      "Smartwatch leve com GPS integrado, monitor cardíaco contínuo e até 7 dias de bateria. Resistente a água até 50m.",
    price: 399,
    currency: "USD",
    stock: 12,
    category: "Wearables",
    image: watch,
    rating: 4.6,
  },
  {
    id: "p-003",
    name: "Stratus Book Pro",
    description:
      "Notebook ultrafino de 14\" com chip de nova geração, 16GB de RAM e tela retina anti-reflexo. Ideal para criadores.",
    price: 1599,
    currency: "USD",
    stock: 6,
    category: "Computadores",
    image: laptop,
    rating: 4.9,
  },
  {
    id: "p-004",
    name: "Nimbus Phone X",
    description:
      "Smartphone com câmera tripla profissional, tela OLED 120Hz e bateria de longa duração em corpo de alumínio.",
    price: 899,
    currency: "USD",
    stock: 18,
    category: "Smartphones",
    image: phone,
    rating: 4.7,
  },
  {
    id: "p-005",
    name: "Echo Mini Speaker",
    description:
      "Caixa de som portátil com som 360°, conexão multipoint e bateria para 18 horas de música.",
    price: 129,
    currency: "USD",
    stock: 41,
    category: "Áudio",
    image: speaker,
    rating: 4.4,
  },
  {
    id: "p-006",
    name: "Aurora Buds",
    description:
      "Earbuds true wireless com cancelamento adaptativo, áudio espacial e estojo com carregamento sem fio.",
    price: 199,
    currency: "USD",
    stock: 33,
    category: "Áudio",
    image: earbuds,
    rating: 4.5,
  },
];

export const mockOrders: Order[] = [
  {
    id: "ord-1042",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    status: "delivered",
    currency: "USD",
    total: 498,
    lines: [
      { productId: "p-001", productName: "Aurora Headphones", quantity: 1, unitPrice: 299 },
      { productId: "p-006", productName: "Aurora Buds", quantity: 1, unitPrice: 199 },
    ],
  },
  {
    id: "ord-1051",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    status: "shipped",
    currency: "USD",
    total: 1599,
    lines: [
      { productId: "p-003", productName: "Stratus Book Pro", quantity: 1, unitPrice: 1599 },
    ],
  },
  {
    id: "ord-1063",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    status: "pending",
    currency: "USD",
    total: 528,
    lines: [
      { productId: "p-005", productName: "Echo Mini Speaker", quantity: 2, unitPrice: 129 },
      { productId: "p-002", productName: "Pulse Watch S2", quantity: 1, unitPrice: 399 },
    ],
  },
];

export const mockRates: ExchangeRate[] = [
  { base: "USD", target: "BRL", rate: 5.05 },
  { base: "USD", target: "EUR", rate: 0.92 },
  { base: "USD", target: "USD", rate: 1 },
];
