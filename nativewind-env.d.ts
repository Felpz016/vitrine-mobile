// Arquivo de declarações para o TypeScript (.d.ts: só tipos, nenhum código).
// Ensina ao TypeScript que os componentes do React Native aceitam a prop
// className, que é o NativeWind quem acrescenta.
/// <reference types="nativewind/types" />

// Permite o import '../global.css' no layout raiz sem erro de tipo.
declare module "*.css";
