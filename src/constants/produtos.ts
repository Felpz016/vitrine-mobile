// Dados de exemplo do catálogo, escritos à mão (Aula 03).
// Seguem o formato dos produtos da API DummyJSON, a mesma que o app vai
// consultar nas próximas aulas: quando os dados reais chegarem, as telas
// não precisam mudar, porque o formato é o mesmo.
import { Produto } from "@/types/produto";

// Produto[] = um arranjo de objetos no formato da interface Produto.
// Se faltar um campo obrigatório ou o tipo estiver errado, o TypeScript
// acusa aqui mesmo, antes de o app rodar.
export const PRODUTOS: Produto[] = [
  {
    id: 1,
    title: "Mascara Lash Princess",
    description: "Rímel de volume.",
    price: 9.99,
    discountPercentage: 7.17,
    rating: 4.94,
    stock: 5,
    brand: "Essence",
    category: "beauty",
    // thumbnail: endereço da miniatura na internet (o Image baixa sozinho)
    thumbnail:
      "https://cdn.dummyjson.com/products/images/beauty/1/thumbnail.png",
    images: [],
  },
  {
    id: 2,
    title: "Eyeshadow Palette",
    description: "Paleta com 12 cores.",
    price: 19.99,
    discountPercentage: 5.5,
    rating: 3.28,
    stock: 44,
    brand: "Glamour",
    category: "beauty",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/beauty/2/thumbnail.png",
    images: [],
  },
  {
    id: 3,
    title: "Chanel Coco Noir",
    description: "Perfume feminino.",
    price: 129.99,
    discountPercentage: 4.5,
    rating: 4.26,
    stock: 41,
    brand: "Chanel",
    category: "fragrances",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/fragrances/6/thumbnail.png",
    images: [],
  },
  {
    id: 4,
    title: "Annibale Colombo Sofa",
    description: "Sofá de três lugares.",
    price: 2499.99,
    discountPercentage: 3.2,
    rating: 4.48,
    stock: 47,
    brand: "Annibale Colombo",
    category: "furniture",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/furniture/9/thumbnail.png",
    images: [],
  },
];
