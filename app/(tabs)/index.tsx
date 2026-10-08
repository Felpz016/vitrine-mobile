// Tela do catálogo: a primeira aba e a tela inicial do app (endereço "/").
// Mostra os produtos, um filtro por categoria e a estrela de favorito.
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { CardProduto } from "@/components/CardProduto";
import { FiltroCategorias } from "@/components/FiltroCategorias";
import { PRODUTOS } from "@/constants/produtos";

// Fora do componente: é uma lista fixa, criada uma vez só.
const CATEGORIAS = ["todas", "beauty", "fragrances", "furniture"];

export default function CatalogoScreen() {
  // Objeto de navegação do Expo Router: é com ele que se troca de tela.
  const router = useRouter();

  // ESTADO: valores que, quando mudam, fazem a tela redesenhar.
  const [categoria, setCategoria] = useState("todas"); // filtro escolhido
  const [favoritos, setFavoritos] = useState<number[]>([]); // ids marcados com estrela

  // Não é estado: é DERIVADO do estado. É recalculado a cada renderização,
  // então nunca fica desatualizado em relação à categoria escolhida.
  const visiveis =
    categoria === "todas"
      ? PRODUTOS
      : PRODUTOS.filter((p) => p.category === categoria);

  // Liga ou desliga a estrela de um produto.
  // A forma (atuais) => ... recebe o valor mais recente do estado, o que
  // evita trabalhar com uma cópia velha quando há toques seguidos.
  // Se já era favorito, filter cria uma lista sem ele; se não era,
  // [...atuais, id] cria uma lista nova com o id no fim. Nunca se altera
  // o arranjo original (push, splice): o React só percebe a mudança
  // quando recebe um arranjo NOVO.
  function alternarFavorito(id: number) {
    setFavoritos((atuais) =>
      atuais.includes(id) ? atuais.filter((f) => f !== id) : [...atuais, id],
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-fundo p-4">
      {/* "Props descem, eventos sobem": o filtro recebe a categoria atual
          e avisa a tela, pelo aoSelecionar, quando a pessoa escolhe outra. */}
      <FiltroCategorias
        categorias={CATEGORIAS}
        selecionada={categoria}
        aoSelecionar={setCategoria}
      />
      <ScrollView className="mt-4" showsVerticalScrollIndicator={false}>
        {/* Renderização condicional: lista vazia mostra um aviso em vez de nada */}
        {visiveis.length === 0 ? (
          <Text className="text-slate-500 dark:text-suave text-center mt-10">
            Nenhum produto nesta categoria.
          </Text>
        ) : (
          // map transforma cada produto num cartão.
          // key é a identidade do item para o React: usa o id, e nunca a
          // posição, para o React não confundir os cartões ao filtrar.
          visiveis.map((produto) => (
            <CardProduto
              key={produto.id}
              produto={produto}
              favorito={favoritos.includes(produto.id)}
              aoAlternarFavorito={alternarFavorito}
              // Abre o detalhe. O endereço /produto/3 cai no arquivo
              // app/produto/[id].tsx, que recebe o "3" como parâmetro.
              aoAbrir={() => router.push(`/produto/${produto.id}`)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
