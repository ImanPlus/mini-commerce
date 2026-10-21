export type Product = {
  id: number;
  title: string;
  description: string;
  price: number
}

export const products: Product[] = [
  {
    id: 1,
    title: "Wireless Headphones",
    description:
      "High-quality wireless headphones with noise cancellation.",
    price: 129,
  },
  {
    id: 2,
    title: "Mechanical Keyboard",
    description: "A compact mechanical keyboard for developers.",
    price: 99,
  },
  {
    id: 3,
    title: "Smart Watch",
    description: "A modern smartwatch with health and fitness tracking.",
    price: 179,
  },
];