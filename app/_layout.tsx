// Layout raiz: a pilha (Stack) que envolve o app inteiro.
// Hoje a única mudança é registrar o grupo (auth), marcado com NOVO.
import "../global.css"; // estilos do NativeWind; só a raiz importa

import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { CORES_NAVEGACAO } from "@/constants/tema";

export default function LayoutRaiz() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const cores = CORES_NAVEGACAO[colorScheme === "dark" ? "dark" : "light"];

  // Na abertura, o hook já segue o tema do sistema, mas no navegador as
  // classes dark: só ligam depois de um setColorScheme. Confirmar o tema
  // uma vez deixa a navegação e as telas pintadas do mesmo jeito.
  useEffect(() => {
    setColorScheme(colorScheme ?? "light");
  }, []);

  return (
    <>
      <Stack
        screenOptions={{
          // As opções de navegação recebem objeto de estilo, não className.
          headerStyle: { backgroundColor: cores.fundo },
          headerTintColor: cores.destaque,
          headerTitleStyle: { color: cores.texto },
          contentStyle: { backgroundColor: cores.fundo },
        }}
      >
        {/* Cada grupo decide o próprio topo, então a raiz esconde o cabeçalho dele */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* NOVO: o grupo de autenticação, sem o cabeçalho da pilha.
            Sem esta linha, aparece um cabeçalho escrito "(auth)" em cima do login. */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="produto/[id]"
          options={{ title: "Detalhe do produto" }}
        />
      </Stack>
      {/* Ícones da barra de status claros no tema escuro, e vice-versa */}
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </>
  );
}
