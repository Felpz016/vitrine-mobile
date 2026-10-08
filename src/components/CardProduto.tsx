// Cartão de um produto no catálogo: foto, nome, marca, preço e a estrela.
// É um componente de apresentação: não guarda estado próprio. Recebe tudo
// por props e avisa a tela pelos callbacks quando a pessoa toca em algo.
import { Image, Pressable, Text, View } from "react-native";
import { Produto } from "@/types/produto";

// O contrato do componente: o que ele precisa receber de quem o usa.
interface CardProdutoProps {
  produto: Produto; // os dados a mostrar
  favorito: boolean; // se a estrela aparece cheia ou vazia
  aoAlternarFavorito: (id: number) => void; // chamado ao tocar na estrela
  aoAbrir?: () => void; // chamado ao tocar no nome; o ? torna opcional
}

// Desestruturação: tira cada prop do objeto já na assinatura da função.
export function CardProduto({
  produto,
  favorito,
  aoAlternarFavorito,
  aoAbrir,
}: CardProdutoProps) {
  return (
    // flex-row: foto, textos e estrela lado a lado. rounded-card é um
    // arredondamento definido no tailwind.config.js (12px).
    <View className="flex-row items-center gap-3 bg-slate-100 dark:bg-superficie rounded-card p-3 mb-3">
      <Image
        source={{ uri: produto.thumbnail }}
        className="w-16 h-16 rounded-lg bg-slate-200 dark:bg-fundo"
      />

      {/* Área tocável do nome: flex-1 faz ela ocupar o espaço que sobra */}
      <Pressable
        onPress={aoAbrir}
        className="flex-1 active:opacity-70"
        accessibilityRole="button"
        accessibilityLabel={`Abrir ${produto.title}`}
      >
        {/* numberOfLines={2}: nome comprido é cortado com reticências */}
        <Text
          className="text-slate-900 dark:text-white text-[15px] font-semibold"
          numberOfLines={2}
        >
          {produto.title}
        </Text>
        <Text className="text-slate-500 dark:text-suave text-xs mt-0.5">
          {produto.brand ?? "Sem marca"}
        </Text>
        <Text className="text-sky-700 dark:text-destaque text-[17px] mt-1.5">
          R$ {produto.price.toFixed(2)}
        </Text>
      </Pressable>

      {/* Estrela: "evento sobe". O cartão não sabe quem é favorito; ele só
          avisa a tela, passando o próprio id, e a tela atualiza o estado. */}
      <Pressable
        onPress={() => aoAlternarFavorito(produto.id)}
        accessibilityRole="button"
        // O rótulo diz o que o toque vai fazer, conforme o estado atual.
        accessibilityLabel={
          favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"
        }
        className="min-w-[44px] min-h-[44px] items-center justify-center active:opacity-60"
      >
        <Text className="text-sky-600 dark:text-destaque text-2xl">
          {favorito ? "★" : "☆"}
        </Text>
      </Pressable>
    </View>
  );
}
