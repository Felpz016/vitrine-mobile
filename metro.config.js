// Configuração do Metro, o empacotador do React Native: ele junta todos os
// arquivos do projeto num pacote só e entrega ao Expo Go pelo QR Code.
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Parte da configuração padrão do Expo...
const config = getDefaultConfig(__dirname);

// ...e acrescenta o NativeWind, que lê o global.css, gera as classes do
// Tailwind usadas no projeto e as entrega ao app.
module.exports = withNativeWind(config, { input: "./global.css" });
