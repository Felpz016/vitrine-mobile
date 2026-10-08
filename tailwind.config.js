// Configuração do Tailwind, usado pelo NativeWind para as classes
// (bg-fundo, text-destaque, rounded-card...).
/** @type {import('tailwindcss').Config} */
module.exports = {
  // 'class': o tema escuro é ligado pelo app (botão de tema), e não só
  // pelo sistema. As classes com prefixo dark: valem quando ele está ligado.
  darkMode: "class",
  // Onde procurar classes usadas. Só as classes encontradas nestes arquivos
  // são geradas, o que mantém o pacote pequeno.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  // Ajustes do NativeWind para o Tailwind funcionar em React Native.
  presets: [require("nativewind/preset")],
  theme: {
    // extend acrescenta ao tema padrão sem apagar as cores do Tailwind
    // (sky-600, slate-100...).
    extend: {
      // Paleta da Vitrine: viram classes como bg-fundo, text-destaque,
      // border-alerta. Os mesmos códigos estão em src/constants/tema.ts.
      colors: {
        fundo: "#0F1B33",
        superficie: "#1D3B73",
        destaque: "#61DAFB",
        alerta: "#F0A500", // âmbar dos erros no tema escuro
        suave: "#CBD5E1",
      },
      // Vira a classe rounded-card, usada nos cartões.
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};
