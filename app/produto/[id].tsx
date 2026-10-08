// Tela de detalhe de um produto.
// O nome [id].tsx, com colchetes, cria uma ROTA DINÂMICA: o arquivo atende
// a /produto/1, /produto/2, /produto/37... e o pedaço do endereço que fica
// no lugar de [id] chega à tela como parâmetro.
import { Image, ScrollView, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { PRODUTOS_TESTE } from "@/utils/gerarProdutos";

export default function DetalheProduto() {
  // Lê o parâmetro do endereço. O tipo <{ id: string }> diz ao TypeScript
  // o formato esperado: parâmetro de rota chega sempre como texto.
  const { id } = useLocalSearchParams<{ id: string }>();

  // Number(id) converte o texto '37' no número 37 antes de comparar,
  // porque o === não converte tipos sozinho ('37' === 37 é falso).
  // Busca em PRODUTOS_TESTE (os 500 produtos gerados na Aula 06), porque
  // em PRODUTOS só existem os ids 1 a 4. Como o catálogo ainda mostra os
  // 4 de PRODUTOS, o detalhe exibe o mesmo produto com "#1" a "#4" no nome.
  const produto = PRODUTOS_TESTE.find((p) => p.id === Number(id));

  // Retorno antecipado: se o id não existe, mostra um aviso e para aqui.
  // Depois deste if, o TypeScript sabe que produto não é undefined.
  if (!produto) {
    return (
      <View className="flex-1 bg-white dark:bg-fundo items-center justify-center p-4">
        <Text className="text-slate-900 dark:text-white text-center">
          Produto não encontrado.
        </Text>
      </View>
    );
  }

  return (
    // ScrollView: o detalhe pode ser mais alto que a tela (imagem + textos).
    <ScrollView className="flex-1 bg-white dark:bg-fundo">
      {/* Troca o título do cabeçalho pelo nome do produto */}
      <Stack.Screen options={{ title: produto.title }} />
      {/* Imagem da internet: source recebe um objeto com a uri.
          resizeMode="contain" mostra a imagem inteira, sem cortar. */}
      <Image
        source={{ uri: produto.thumbnail }}
        className="w-full h-64 bg-slate-100 dark:bg-superficie"
        resizeMode="contain"
      />
      <View className="p-4">
        <Text className="text-slate-900 dark:text-white text-2xl font-bold">
          {produto.title}
        </Text>
        {/* ?? (coalescência nula): se brand não existir, mostra 'Sem marca' */}
        <Text className="text-slate-500 dark:text-suave text-sm mt-1">
          {produto.brand ?? "Sem marca"} · {produto.category}
        </Text>
        {/* toFixed(2) formata o preço sempre com duas casas decimais */}
        <Text className="text-sky-700 dark:text-destaque text-3xl mt-4">
          R$ {produto.price.toFixed(2)}
        </Text>
        <Text className="text-slate-600 dark:text-suave text-base mt-4 leading-6">
          {produto.description}
        </Text>
        <Text className="text-slate-500 dark:text-suave text-xs mt-4">
          {produto.stock} em estoque · nota {produto.rating}
        </Text>
      </View>
    </ScrollView>
  );
}
