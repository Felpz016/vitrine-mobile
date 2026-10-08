// Layout do grupo (tabs): desenha a barra de abas no rodapé.
// Os parênteses no nome da pasta criam um GRUPO de rotas: as telas daqui
// dividem este layout, mas "(tabs)" não aparece no endereço. O catálogo
// responde em "/", e não em "/tabs".
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // pacote de ícones que já vem com o Expo
import { useColorScheme } from "nativewind";
import { BotaoTema } from "@/components/BotaoTema";
import { CORES_NAVEGACAO } from "@/constants/tema";

export default function LayoutAbas() {
  // Tema atual (claro ou escuro), controlado pelo NativeWind.
  const { colorScheme } = useColorScheme();
  // As opções de navegação recebem cor como VALOR, e não className,
  // por isso as cores vêm de uma tabela escolhida pelo tema.
  const cores = CORES_NAVEGACAO[colorScheme === "dark" ? "dark" : "light"];

  return (
    <Tabs
      // screenOptions vale para todas as abas deste grupo.
      screenOptions={{
        tabBarActiveTintColor: cores.destaque, // cor do ícone e do texto da aba ativa
        tabBarInactiveTintColor: cores.inativo, // cor das abas não selecionadas
        tabBarStyle: {
          backgroundColor: cores.fundo,
          borderTopColor: cores.borda,
        },
        headerStyle: { backgroundColor: cores.fundo }, // barra do topo
        headerTintColor: cores.texto, // título da barra do topo
        headerRight: () => <BotaoTema />, // botão de tema no canto direito do topo
        // Fundo da área onde cada aba desenha a sua tela, nos dois temas.
        // Sem isto, telas que não pintam o próprio fundo mostram o cinza padrão.
        sceneStyle: { backgroundColor: cores.fundo },
      }}
    >
      {/* Cada Tabs.Screen aponta para um arquivo da pasta pelo nome:
          "index" é o index.tsx (o catálogo), "favoritos" é o favoritos.tsx. */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Catálogo",
          // A barra entrega a cor e o tamanho certos para o ícone.
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
