// Gera uma lista grande de produtos a partir dos 4 de exemplo (Aula 06).
// Serve para testar o app com volume: problemas de desempenho só aparecem
// com centenas de itens, nunca com quatro.
import { PRODUTOS } from "@/constants/produtos";
import { Produto } from "@/types/produto";

/** Repete a base de exemplo até atingir a quantidade pedida. */
export function gerarProdutos(quantidade: number): Produto[] {
  const lista: Produto[] = [];

  for (let i = 0; i < quantidade; i += 1) {
    // % é o resto da divisão: com 4 produtos dá 0, 1, 2, 3, 0, 1, 2, 3...
    // e percorre a base em círculo.
    const base = PRODUTOS[i % PRODUTOS.length];
    lista.push({
      ...base, // espalhamento: copia todos os campos do produto base
      id: i + 1, // e sobrescreve o id: cada um dos 500 precisa ser único
      title: `${base.title} #${i + 1}`, // número no nome, para distinguir na tela
    });
  }

  return lista;
}

// Constante de módulo: gerada uma única vez, quando o arquivo é carregado.
// Hoje só a tela de detalhe usa esta lista; o catálogo continua com os
// 4 produtos de PRODUTOS, porque a troca do catálogo para a lista grande
// fazia parte dos passos da Aula 06 que ficaram para depois.
export const PRODUTOS_TESTE = gerarProdutos(500);
