// Fileira horizontal de botões ("pílulas") para filtrar o catálogo.
// Não guarda qual categoria está escolhida: recebe isso da tela
// (selecionada) e avisa a tela quando a pessoa toca em outra (aoSelecionar).
import { Pressable, ScrollView, Text } from "react-native";

interface FiltroCategoriasProps {
  categorias: string[]; // os nomes a mostrar
  selecionada: string; // qual está ativa agora
  aoSelecionar: (categoria: string) => void; // avisa a tela da escolha
}

export function FiltroCategorias({
  categorias,
  selecionada,
  aoSelecionar,
}: FiltroCategoriasProps) {
  return (
    // ScrollView horizontal: se as pílulas não couberem, rolam para o lado.
    // grow-0 impede a fileira de crescer e ocupar a altura da tela.
    <ScrollView
      horizontal
      className="grow-0"
      showsHorizontalScrollIndicator={false}
      // contentContainerClassName estiliza o conteúdo de dentro da rolagem:
      // as pílulas lado a lado, com espaço (gap) entre elas.
      contentContainerClassName="flex-row items-start gap-2 py-1"
    >
      {/* Uma pílula para cada categoria */}
      {categorias.map((categoria) => {
        const ativa = categoria === selecionada;
        return (
          <Pressable
            key={categoria} // o nome é único, então serve de identidade
            onPress={() => aoSelecionar(categoria)}
            accessibilityRole="button"
            accessibilityLabel={`Filtrar por ${categoria}`}
            // A pílula ativa tem fundo de destaque; as outras, fundo neutro.
            // Cada cor tem a versão do tema claro e a do escuro (dark:).
            className={`px-4 py-2.5 rounded-full active:opacity-60 ${
              ativa
                ? "bg-sky-600 dark:bg-destaque"
                : "bg-slate-200 dark:bg-superficie"
            }`}
          >
            {/* A cor do texto acompanha o fundo, para manter o contraste */}
            <Text
              className={`text-sm font-semibold ${
                ativa
                  ? "text-white dark:text-fundo"
                  : "text-slate-700 dark:text-suave"
              }`}
            >
              {categoria}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
