// Botão que alterna entre o tema claro e o escuro.
// Fica no canto direito do cabeçalho das abas (headerRight).
import { Pressable, Text } from "react-native";
import { useColorScheme } from "nativewind";

export function BotaoTema() {
  // colorScheme: tema atual ('light' ou 'dark').
  // toggleColorScheme: troca para o outro. O NativeWind liga ou desliga
  // todas as classes com prefixo dark: do app de uma vez.
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Pressable
      onPress={toggleColorScheme}
      // Acessibilidade: o leitor de tela anuncia "botão" e diz para que serve,
      // já que o conteúdo visível é só um emoji.
      accessibilityRole="button"
      accessibilityLabel="Alternar tema claro e escuro"
      // 44 × 44 pontos: a área mínima de toque recomendada para o dedo.
      // active:opacity-60 dá o retorno visual enquanto o dedo está apertando.
      className="min-w-[44px] min-h-[44px] items-center justify-center mr-2 active:opacity-60"
    >
      {/* Mostra a lua no tema escuro e o sol no claro */}
      <Text className="text-[20px]">
        {colorScheme === "dark" ? "🌙" : "☀️"}
      </Text>
    </Pressable>
  );
}
