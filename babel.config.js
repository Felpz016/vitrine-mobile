// Configuração do Babel, o tradutor que transforma o código moderno
// (TypeScript e JSX) em JavaScript que o celular entende. Roda no Metro,
// a cada vez que o app é empacotado.
module.exports = function (api) {
  // Guarda o resultado desta configuração em cache: ela não muda entre
  // um arquivo e outro, então não precisa ser recalculada.
  api.cache(true);
  return {
    presets: [
      // Preset padrão do Expo. jsxImportSource: 'nativewind' faz todo JSX
      // passar pelo NativeWind, que é quem transforma className em estilo
      // do React Native (Aula 04).
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      // Regras extras do NativeWind para o Babel.
      "nativewind/babel",
    ],
  };
};
