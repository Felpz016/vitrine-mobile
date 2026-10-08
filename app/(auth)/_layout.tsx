// Layout do grupo (auth): as telas de login e de cadastro.
// Os parênteses no nome da pasta criam um GRUPO de rotas: ele junta telas
// sob o mesmo layout, mas não entra no endereço. O login fica em /login,
// e não em /auth/login. O grupo fica fora de (tabs) porque quem ainda não
// entrou no app não deve ver a barra de abas.
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { CORES_NAVEGACAO } from "@/constants/tema";

export default function LayoutAutenticacao() {
  const { colorScheme } = useColorScheme();
  const cores = CORES_NAVEGACAO[colorScheme === "dark" ? "dark" : "light"];

  return (
    <Stack
      screenOptions={{
        // Sem barra no topo: a tela de login tem o próprio título, grande.
        headerShown: false,
        // Pinta o fundo das telas da pilha nos dois temas (mesmo motivo do
        // sceneStyle das abas): sem isso aparece o cinza padrão da navegação.
        contentStyle: { backgroundColor: cores.fundo },
      }}
    />
    // O Stack não tem filhos: as telas são descobertas pelos arquivos
    // da pasta (login.tsx e cadastro.tsx).
  );
}
