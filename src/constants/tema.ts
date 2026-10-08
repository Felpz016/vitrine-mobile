// Cores do app num lugar só. Mudar uma cor aqui muda em todas as telas
// que usam estas constantes.

// Paleta da Vitrine (tema escuro). As mesmas cores estão no
// tailwind.config.js, com os mesmos nomes, para as classes (bg-fundo,
// text-destaque...). Aqui elas existem como VALOR, para os lugares que
// não aceitam className.
// "as const" trava os valores: o TypeScript passa a conhecer cada cor
// exata, e ninguém consegue reatribuir uma delas por engano.
export const CORES = {
  fundo: "#0F1B33", // azul-marinho do fundo
  superficie: "#1D3B73", // cartões e campos, um tom acima do fundo
  destaque: "#61DAFB", // azul-claro de botões, links e preço
  texto: "#FFFFFF",
  textoSuave: "#CBD5E1", // textos secundários
} as const;

// As opções do Stack e das Tabs recebem objeto de estilo, e não className:
// o cabeçalho e a barra de abas precisam das cores como valor, nos dois temas.
export const CORES_NAVEGACAO = {
  light: {
    fundo: "#FFFFFF",
    borda: "#E2E8F0",
    texto: "#0F172A",
    destaque: "#0369A1",
    inativo: "#64748B", // abas não selecionadas e placeholder dos campos
  },
  // No escuro, reaproveita a paleta acima em vez de repetir os códigos.
  dark: {
    fundo: CORES.fundo,
    borda: CORES.superficie,
    texto: CORES.texto,
    destaque: CORES.destaque,
    inativo: CORES.textoSuave,
  },
} as const;

// Endereço da API de produtos, usado a partir das próximas aulas.
export const API_BASE_URL = "https://dummyjson.com";
