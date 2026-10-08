// Formato de um produto no app. Uma interface é um contrato: todo objeto
// do tipo Produto precisa ter estes campos, com estes tipos. Ela só existe
// para o TypeScript conferir o código; some quando o app é empacotado.
export interface Produto {
  id: number; // identificador único, usado como key e no endereço /produto/[id]
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number; // nota de 0 a 5
  stock: number; // quantidade em estoque
  brand?: string; // o ? torna o campo opcional: alguns produtos não têm marca
  category: string;
  thumbnail: string; // endereço da miniatura
  images: string[]; // arranjo de endereços de imagens
}

// União de literais: o tipo só aceita exatamente um destes quatro textos.
// Qualquer outro valor vira erro de compilação.
export type CategoriaProduto =
  | "beauty"
  | "fragrances"
  | "furniture"
  | "groceries";
