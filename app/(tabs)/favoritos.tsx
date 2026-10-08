// Aba Favoritos (endereço "/favoritos").
// Por enquanto é uma tela fixa, sem dados: os favoritos ainda moram só
// na tela do catálogo, e esta aba não tem acesso a eles.
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function FavoritosScreen() {
  return (
    // flex-1 ocupa a tela toda; items-center e justify-center centralizam
    // o conteúdo na horizontal e na vertical.
    <View className="flex-1 bg-white dark:bg-fundo p-4 items-center justify-center">
      {/* Cada classe tem a versão do tema claro e a do escuro (prefixo dark:) */}
      <Text className="text-slate-900 dark:text-white text-lg text-center">
        Você ainda não tem favoritos.
      </Text>
      <Text className="text-slate-500 dark:text-suave text-sm text-center mt-2">
        Marque produtos com a estrela no catálogo.
      </Text>
      {/* Link é a navegação declarativa do Expo Router: um texto tocável
          que leva ao endereço do href. "/" é o catálogo. O typedRoutes
          confere esse endereço na compilação. */}
      <Link href="/" className="text-sky-700 dark:text-destaque mt-6">
        Ir para o catálogo
      </Link>
    </View>
  );
}
