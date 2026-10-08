// Tela de "não encontrado". O nome +not-found é reservado pelo Expo Router:
// ela aparece quando o app recebe um endereço que não corresponde a
// nenhum arquivo da pasta app (por exemplo, um link antigo ou digitado errado).
import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NaoEncontrado() {
  return (
    <View className="flex-1 bg-white dark:bg-fundo items-center justify-center p-6">
      {/* Stack.Screen dentro da tela muda as opções do cabeçalho só desta tela */}
      <Stack.Screen options={{ title: "Ops" }} />
      <Text className="text-slate-900 dark:text-white text-lg text-center">
        Esta tela não existe.
      </Text>
      {/* Sempre oferecer uma saída: a pessoa não fica presa numa tela sem ação */}
      <Link href="/" className="text-sky-700 dark:text-destaque mt-4">
        Voltar ao catálogo
      </Link>
    </View>
  );
}
